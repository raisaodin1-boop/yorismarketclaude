import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CITIES } from "../lib/constants";
import {
  clearCheckoutDraft,
  composeFullAddress,
  loadCheckoutDraft,
  normalizeCmMobileDigits,
  saveCheckoutDraft,
  validateCheckoutAddressStep,
} from "../domain/checkoutForm";
import { buildCheckoutIntent, detectCheckoutType } from "../domain/checkoutOrchestrator";
import {
  checkoutReturnStatus,
  confirmCheckout,
  createCheckoutIntent,
  initPaymentCinetPay,
} from "../lib/checkoutApi";
import { PAGE_PATH } from "../lib/seoRoutes";
import { YORIX_WA_NUMBER } from "../lib/supabase";
import { CheckoutProgressBar } from "./CheckoutProgressBar";
import { FreeShippingProgress } from "./FreeShippingProgress";

const CITY_OPTIONS = (CITIES || []).filter((c) => c && !/^toutes/i.test(String(c)));

/** Avant redirection CinetPay ; secours si l’URL de retour perd le query `tx`. */
const CINETPAY_RETURN_TX_KEY = "yorix_cinetpay_return_tx";
/** Mis à true au moment du départ paiement ; évite une relecture automatique hors contexte retour. */
const CINETPAY_RETURN_EXPECT_KEY = "yorix_expect_cinetpay_return";

/** Numéro wa.me sans + ni espaces ; défaut +237696565654 (Yorix). */
function waMeRecipient(configured) {
  const official = String(YORIX_WA_NUMBER).replace(/\D/g, "");
  const raw = String(configured ?? "").replace(/\D/g, "");
  if (!raw) return official;
  if (raw.startsWith("237") && raw.length >= 12) return raw.slice(0, 12);
  if (raw.length === 9 && /^6\d{8}$/.test(raw)) return `237${raw}`;
  if (raw.length >= 10 && raw.startsWith("237")) return raw.slice(0, 12);
  return official;
}

function deliveryEstimateHint(ville, locationType, carrier) {
  const v = (ville || "").toLowerCase();
  const metro = v.includes("douala") || v.includes("yaound");
  if (locationType === "online") return "Prestation préparée en visio / échange numérique — délai communiqué par le prestataire.";
  if (locationType === "shop") return "Retrait — vous serez notifié dès que la commande est prête au point convenu.";
  if (carrier === "yorix" && metro) return "Estimation Yorix Delivery zones prioritaires : J+1 à J+2 ouvrés (sous réserve du vendeur).";
  if (metro) return "Livraison grand ville — souvent sous 48–72 h. Le livreur ou le vendeur peut vous préciser le créneau.";
  return "Autres régions Cameroun — livraison typique sur 3 à 7 jours ouvrés selon la route.";
}

export function CheckoutPage({
  user,
  userData,
  cartItems,
  summary,
  setCartItems,
  goPage,
  fallbackWhatsappNumber,
  momoNumber,
  orangeNumber,
  persistCheckoutContact,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const processedCinetpayReturnRef = useRef(new Set());

  const [step, setStep] = useState(1);

  const [phoneLocal, setPhoneLocal] = useState("");
  const [nomLocal, setNomLocal] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [quartier, setQuartier] = useState("");
  const [ville, setVille] = useState("");
  const [landmark, setLandmark] = useState("");

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cinetpay");
  const [locationType, setLocationType] = useState("home");
  const [carrier, setCarrier] = useState("seller");
  const [checkoutError, setCheckoutError] = useState("");
  const [orderDone, setOrderDone] = useState(null);
  const [cinetpayReturnBanner, setCinetpayReturnBanner] = useState("");

  const [addressErrors, setAddressErrors] = useState({});
  const [attemptedAdvance, setAttemptedAdvance] = useState(false);

  const checkoutType = useMemo(() => detectCheckoutType(cartItems), [cartItems]);
  const hasProducts = checkoutType !== "service_only";
  const hasServices = checkoutType !== "product_only";

  const hasItems = cartItems.length > 0;

  /** Profil fusionné avec saisie checkout (pour Edge + WhatsApp). */
  const mergedUserData = useMemo(() => {
    const digits = normalizeCmMobileDigits(phoneLocal || userData?.telephone || "");
    const composed = composeFullAddress({
      line1: addressLine,
      quartier,
      ville,
      landmark,
      deliveryTag:
        locationType === "home" && hasProducts && carrier === "yorix"
          ? "Livraison : Yorix Delivery"
          : locationType === "home" && hasProducts
            ? "Livraison : standard vendeur"
            : "",
    });
    return {
      ...userData,
      nom: (nomLocal || userData?.nom || user?.email?.split("@")[0] || "").trim(),
      telephone: digits || "",
      telephoneDisplay: digits ? `+237 ${digits}` : userData?.telephone || "",
      adresse: composed || addressLine.trim(),
      ville: (ville || userData?.ville || "").trim(),
    };
  }, [userData, user, nomLocal, phoneLocal, addressLine, quartier, ville, landmark, locationType, carrier, hasProducts]);

  const addressValidation = useMemo(
    () =>
      validateCheckoutAddressStep({
        phone: phoneLocal || userData?.telephone || "",
        line1: addressLine,
        ville,
        quartier,
      }),
    [phoneLocal, userData?.telephone, addressLine, ville, quartier]
  );

  const canContinueStep1 = addressValidation.ok;

  const progressActiveIndex = useMemo(() => {
    if (orderDone) return 3;
    if (!hasItems) return 0;
    if (step <= 2) return 1;
    return 2;
  }, [step, hasItems, orderDone]);

  const handleProgressNavigate = useCallback(
    (i) => {
      if (orderDone) return;
      if (i === 0) {
        goPage("cart");
        return;
      }
      if (i === 1 && step >= 3) {
        setStep(1);
        setCheckoutError("");
      }
    },
    [goPage, step, orderDone]
  );

  useEffect(() => {
    if (!user?.id) return;
    const draft = loadCheckoutDraft(user.id);
    if (draft) {
      if (typeof draft.phoneLocal === "string") setPhoneLocal(draft.phoneLocal);
      if (typeof draft.nomLocal === "string") setNomLocal(draft.nomLocal);
      if (typeof draft.addressLine === "string") setAddressLine(draft.addressLine);
      if (typeof draft.quartier === "string") setQuartier(draft.quartier);
      if (typeof draft.ville === "string") setVille(draft.ville);
      if (typeof draft.landmark === "string") setLandmark(draft.landmark);
      if (typeof draft.locationType === "string") setLocationType(draft.locationType);
      if (typeof draft.carrier === "string") setCarrier(draft.carrier);
      if (typeof draft.paymentMethod === "string") setPaymentMethod(draft.paymentMethod);
      if (typeof draft.step === "number" && draft.step >= 1 && draft.step <= 3) setStep(draft.step);
      return;
    }
    if (userData) {
      setPhoneLocal((p) => p || userData.telephone || "");
      setNomLocal((n) => n || userData.nom || "");
      setAddressLine((a) => a || userData.adresse || "");
      setVille((v) => v || userData.ville || "");
    }
  }, [user?.id, userData]);

  useEffect(() => {
    if (!user?.id || orderDone) return;
    saveCheckoutDraft(user.id, {
      step,
      phoneLocal,
      nomLocal,
      addressLine,
      quartier,
      ville,
      landmark,
      locationType,
      carrier,
      paymentMethod,
    });
  }, [user?.id, step, phoneLocal, nomLocal, addressLine, quartier, ville, landmark, locationType, carrier, paymentMethod, orderDone]);

  useEffect(() => {
    if (orderDone) clearCheckoutDraft();
  }, [orderDone]);

  useEffect(() => {
    if (checkoutType === "product_only" && locationType === "online") {
      setLocationType("home");
    }
  }, [checkoutType, locationType]);

  /** Retour CinetPay : `?status=return&tx=YRXPAY-…` + secours sessionStorage après redirection paiement. */
  useEffect(() => {
    if (orderDone) return undefined;

    let cancelled = false;

    function clearStoredTx() {
      try {
        sessionStorage.removeItem(CINETPAY_RETURN_TX_KEY);
        sessionStorage.removeItem(CINETPAY_RETURN_EXPECT_KEY);
      } catch {
        /* ignore */
      }
    }

    async function hydrateFromPaymentReturn(txRef) {
      const data = await checkoutReturnStatus({ transaction_ref: txRef });
      if (cancelled) return;

      const deliveryTracking = Array.isArray(data.delivery_tracking) ? data.delivery_tracking : [];
      const pay = String(data.payment_status || "");

      setCartItems([]);
      setCheckoutError("");
      setOrderDone({
        mode: "cinetpay_return",
        paymentStatus: pay,
        orderGroupId: data.order_group_id || null,
        intentId: data.checkout_intent_id || "",
        providerRef: data.provider_ref || txRef,
        deliveryTracking,
        amountReturned: Number(data.amount || 0),
        currencyReturned: String(data.currency || "XAF"),
      });

      processedCinetpayReturnRef.current.add(txRef);
      setCinetpayReturnBanner("");
      clearStoredTx();
      navigate(PAGE_PATH.checkout, { replace: true });
    }

    const params = new URLSearchParams(location.search || "");
    const st = params.get("status");
    let rawTx = params.get("tx");
    if (rawTx) {
      try {
        rawTx = decodeURIComponent(String(rawTx).trim());
      } catch {
        rawTx = String(rawTx).trim();
      }
    }

    let storedTx = "";
    let expectReturn = false;
    try {
      storedTx = sessionStorage.getItem(CINETPAY_RETURN_TX_KEY) || "";
      expectReturn = sessionStorage.getItem(CINETPAY_RETURN_EXPECT_KEY) === "1";
    } catch {
      storedTx = "";
    }

    const hasReturnHint =
      st === "return" ||
      (rawTx && rawTx.startsWith("YRXPAY-")) ||
      (expectReturn && Boolean(storedTx.startsWith("YRXPAY-")) && location.pathname === PAGE_PATH.checkout);
    if (!hasReturnHint) return undefined;

    const cand = [];
    if (rawTx?.startsWith("YRXPAY-")) cand.push(rawTx.trim());
    if ((st === "return" || expectReturn) && storedTx.startsWith("YRXPAY-")) cand.push(storedTx.trim());

    const txRefFirst = cand.find(Boolean) || "";

    if (!txRefFirst) {
      setCinetpayReturnBanner((prev) =>
        st === "return"
          ? "Retour paiement incomplet — référence manquante. Consultez vos e-mails CinetPay ou réessayez."
          : prev,
      );
      return undefined;
    }

    if (processedCinetpayReturnRef.current.has(txRefFirst)) return undefined;

    if (!user?.id) {
      try {
        sessionStorage.setItem(CINETPAY_RETURN_TX_KEY, txRefFirst);
      } catch {
        /* ignore */
      }
      setCinetpayReturnBanner(
        "Reconnectez-vous pour afficher le récapitulatif de paiement et les codes de suivi.",
      );
      return undefined;
    }

    (async () => {
      try {
        setLoading(true);
        setCheckoutError("");
        await hydrateFromPaymentReturn(txRefFirst);
      } catch (e) {
        if (!cancelled) {
          setCheckoutError(
            e instanceof Error ? e.message : "Impossible de charger le résumé après paiement.",
          );
          processedCinetpayReturnRef.current.delete(txRefFirst);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [location.search, user?.id, navigate, setCartItems, orderDone]);

  const persistIdentityIfPossible = useCallback(async () => {
    if (typeof persistCheckoutContact !== "function" || !user?.id) return;
    try {
      await persistCheckoutContact({
        telephone: mergedUserData.telephone,
        adresse: mergedUserData.adresse,
        ville: mergedUserData.ville,
        nom: mergedUserData.nom,
      });
    } catch (e) {
      console.warn("checkout persist profile:", e?.message || e);
    }
  }, [persistCheckoutContact, user?.id, mergedUserData]);

  const openWhatsAppFallback = (intentId, recapTotals) => {
    const t = recapTotals || {
      subtotal: summary.subtotal,
      delivery: summary.delivery,
      total: summary.total,
    };
    const lines = cartItems
      .map((i) => `• [${i.kind === "service" ? "Service" : "Produit"}] ${i.name} x${i.qty} = ${(i.prix * i.qty).toLocaleString()} FCFA`)
      .join("\n");
    const telHuman = mergedUserData.telephoneDisplay || mergedUserData.telephone || "N/A";
    const msg = [
      "🛒 *CHECKOUT YORIX*",
      "",
      `🔎 Référence checkout : ${intentId || "N/A"}`,
      `🧩 Type: ${checkoutType}`,
      "",
      lines,
      "",
      `💰 Sous-total: ${t.subtotal.toLocaleString()} FCFA`,
      `🚚 Livraison: ${t.delivery ? `${t.delivery.toLocaleString()} FCFA` : "Offerte / N/A"}`,
      `💵 Total: ${t.total.toLocaleString()} FCFA`,
      "",
      `👤 Client: ${mergedUserData.nom || "N/A"}`,
      `📱 Tel: ${telHuman}`,
      `📍 Adresse: ${mergedUserData.adresse || "N/A"}`,
      "",
      `Modes disponibles: MTN ${momoNumber} / Orange ${orangeNumber}`,
    ].join("\n");
    const phone = waMeRecipient(fallbackWhatsappNumber || YORIX_WA_NUMBER);
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handlePlaceOrder = async () => {
    if (!hasItems) return;
    if (!user) {
      setCheckoutError("Connexion requise pour finaliser la commande.");
      return;
    }
    if (!canContinueStep1) {
      setCheckoutError("Complétez l’adresse et le téléphone à l’étape précédente.");
      return;
    }
    setCheckoutError("");
    setLoading(true);

    if (paymentMethod === "whatsapp_backup") {
      let intentId = null;
      let orderGroupId = null;
      let serverRecap = null;
      /** @type {{ order_id: string; code_suivi: string }[]} */
      let deliveryTracking = [];
      try {
        const intentPayload = buildCheckoutIntent({
          items: cartItems,
          user,
          userData: mergedUserData,
          summary,
        });
        try {
          const intent = await createCheckoutIntent(intentPayload);
          intentId = intent?.checkout_intent_id || null;
          if (intent != null) {
            serverRecap = {
              subtotal: Math.round(Number(intent.subtotal ?? summary.subtotal)),
              delivery: Math.round(Number(intent.delivery_fee ?? summary.delivery)),
              total: Math.round(Number(intent.total ?? summary.total)),
            };
          }
          if (intentId) {
            try {
              const confirmation = await confirmCheckout({
                checkout_intent_id: intentId,
                payment_method: paymentMethod,
                location_type: locationType,
                address: mergedUserData.adresse,
              });
              orderGroupId = confirmation?.order_group_id || null;
              if (Array.isArray(confirmation?.delivery_tracking)) {
                deliveryTracking = confirmation.delivery_tracking;
              }
            } catch (ce) {
              console.warn("confirm checkout (WhatsApp):", ce?.message || ce);
            }
          }
        } catch (ie) {
          console.warn("create intent (WhatsApp):", ie?.message || ie);
        }
      } catch (e) {
        console.warn("checkout WhatsApp préparation:", e?.message || e);
      }
      openWhatsAppFallback(intentId, serverRecap);
      setCartItems([]);
      setOrderDone({
        mode: "whatsapp",
        orderGroupId,
        intentId: intentId || `LOCAL-${Date.now()}`,
        deliveryTracking,
      });
      setLoading(false);
      return;
    }

    try {
      const intentPayload = buildCheckoutIntent({
        items: cartItems,
        user,
        userData: mergedUserData,
        summary,
      });
      const intent = await createCheckoutIntent(intentPayload);
      const confirmation = await confirmCheckout({
        checkout_intent_id: intent.checkout_intent_id,
        payment_method: paymentMethod,
        location_type: locationType,
        address: mergedUserData.adresse,
      });
      const serverPayTotal = Math.round(
        Number(confirmation?.total ?? intent?.total ?? summary.total),
      );

      if (paymentMethod === "cinetpay") {
        const payment = await initPaymentCinetPay({
          checkout_intent_id: intent.checkout_intent_id,
          order_group_id: confirmation.order_group_id,
          amount: serverPayTotal,
          channel: "ALL",
        });
        if (payment?.payment_url) {
          try {
            if (payment.transaction_ref) {
              sessionStorage.setItem(CINETPAY_RETURN_TX_KEY, String(payment.transaction_ref));
              sessionStorage.setItem(CINETPAY_RETURN_EXPECT_KEY, "1");
            }
          } catch {
            /* ignore */
          }
          window.location.href = payment.payment_url;
          return;
        }
      }

      if (!confirmation?.order_group_id) {
        openWhatsAppFallback(intent.checkout_intent_id, {
          subtotal: Math.round(Number(intent?.subtotal ?? summary.subtotal)),
          delivery: Math.round(Number(intent?.delivery_fee ?? summary.delivery)),
          total: serverPayTotal,
        });
      }

      setCartItems([]);
      setOrderDone({
        mode: !confirmation?.order_group_id ? "whatsapp" : "standard",
        orderGroupId: confirmation?.order_group_id || null,
        intentId: intent.checkout_intent_id,
        deliveryTracking: Array.isArray(confirmation?.delivery_tracking)
          ? confirmation.delivery_tracking
          : [],
      });
    } catch (e) {
      console.warn("Checkout:", e?.message || e);
      setCheckoutError("Impossible de finaliser le checkout. Réessayez ou contactez Yorix sur WhatsApp (+237 696 56 56 54).");
    } finally {
      setLoading(false);
    }
  };

  const tryAdvanceFromStep1 = async () => {
    setAttemptedAdvance(true);
    setAddressErrors(addressValidation.errors);
    if (!canContinueStep1) return;
    await persistIdentityIfPossible();
    setStep(2);
    setCheckoutError("");
  };

  const locationBody = useMemo(() => {
    if (locationType === "online") return "Visio / téléphone / livrables numériques selon prestataire.";
    if (locationType === "shop") return hasProducts ? "Préparez une pièce d’identité si le vendeur exige une vérification au retrait." : "Coordonnées exactes envoyées après confirmation.";
    if (carrier === "yorix") return `Yorix Delivery — vérifiez que ${ville || "la ville"} est bien desservie. Frais définitifs au paiement si le montant catalogue évolue.`;
    return "Livraison standard coordonnée par le vendeur et nos livreurs partenaires.";
  }, [locationType, carrier, ville, hasProducts]);

  const deliveryHintText = deliveryEstimateHint(ville, locationType, carrier);

  return (
    <section className="sec anim checkout-page-wrap">
      <CheckoutProgressBar
        activeIndex={progressActiveIndex}
        onNavigate={handleProgressNavigate}
        navigationDisabled={Boolean(orderDone)}
      />

      {!orderDone && hasItems && <FreeShippingProgress summary={summary} variant={step >= 2 ? "compact" : "cart"} />}

      <h1 className="sec-title" style={{ marginBottom: 6 }}>
        {orderDone ? "Commande enregistrée" : "Finaliser la commande"}
      </h1>
      <p style={{ color: "var(--gray)", marginBottom: 16, fontSize: ".88rem" }}>
        {orderDone
          ? "Merci pour votre confiance. Conservez votre référence pour le suivi."
          : `Tunnel sécurisé : adresse • livraison • paiement (${
              checkoutType === "mixed" ? "panier mixte" : checkoutType === "service_only" ? "prestations" : "produits"
            }).`}
      </p>

      {cinetpayReturnBanner && !orderDone && (
        <div
          role="status"
          style={{
            marginBottom: 14,
            padding: "12px 14px",
            borderRadius: 10,
            background: "var(--surface2)",
            border: "1px solid var(--accent-gold-soft, rgba(176,142,74,.25))",
            fontSize: ".86rem",
            lineHeight: 1.45,
          }}
        >
          {cinetpayReturnBanner}
        </div>
      )}

      {orderDone && (
        <div className="card checkout-confirm-card">
          <div className="checkout-confirm-icon" aria-hidden>
            ✅
          </div>
          <h2 className="h2" style={{ fontSize: "1.05rem", marginBottom: 8 }}>
            {orderDone.mode === "whatsapp"
              ? "Finalisez sur WhatsApp"
              : orderDone.mode === "cinetpay_return"
                ? "Paiement CinetPay"
                : "Récapitulatif"}
          </h2>
          <p style={{ color: "var(--gray)", marginBottom: 12, lineHeight: 1.45 }}>
            {orderDone.mode === "whatsapp"
              ? "Une conversation WhatsApp a été ouverte avec le détail de votre commande. Notre équipe confirme le paiement (MoMo, Orange ou autre) avec vous."
              : orderDone.mode === "cinetpay_return"
                ? "Statut mis à jour depuis notre serveur. En cas de « en attente », le webhook peut encore finaliser sous quelques minutes."
                : "Votre commande a été enregistrée. Suivez l’avancement depuis votre espace client."}
          </p>
            <div style={{ background: "var(--surface2)", borderRadius: 10, padding: 12, marginBottom: 16, textAlign: "left", fontSize: ".84rem" }}>
            {orderDone.mode === "cinetpay_return" && orderDone.paymentStatus && (
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                <span>État paiement</span>
                <strong>
                  {orderDone.paymentStatus === "paid"
                    ? "Payé"
                    : orderDone.paymentStatus === "failed"
                      ? "Échoué"
                      : orderDone.paymentStatus === "pending"
                        ? "En attente"
                        : orderDone.paymentStatus}
                </strong>
              </div>
            )}
            {orderDone.mode === "cinetpay_return" &&
              orderDone.amountReturned != null &&
              Number.isFinite(Number(orderDone.amountReturned)) && (
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                  <span>Montant enregistré</span>
                  <strong>
                    {Number(orderDone.amountReturned).toLocaleString()} {orderDone.currencyReturned || "XAF"}
                  </strong>
                </div>
              )}
            {orderDone.providerRef && orderDone.mode === "cinetpay_return" && (
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: orderDone.orderGroupId ? 6 : 0 }}>
                <span>Réf. transaction</span>
                <strong style={{ wordBreak: "break-all" }}>{orderDone.providerRef}</strong>
              </div>
            )}
            {orderDone.orderGroupId && (
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                <span>Groupe commande</span>
                <strong style={{ wordBreak: "break-all" }}>{orderDone.orderGroupId}</strong>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              <span>Réf. checkout</span>
              <strong style={{ wordBreak: "break-all" }}>{orderDone.intentId}</strong>
            </div>
            {Array.isArray(orderDone.deliveryTracking) && orderDone.deliveryTracking.length > 0 && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border-subtle, #e5e5e5)" }}>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>Codes de suivi livraison</div>
                <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.5 }}>
                  {orderDone.deliveryTracking.map((row) => (
                    <li key={row.order_id}>
                      <strong style={{ letterSpacing: ".02em" }}>{row.code_suivi}</strong>
                    </li>
                  ))}
                </ul>
                <p style={{ margin: "8px 0 0", fontSize: ".78rem", color: "var(--gray)" }}>
                  Suivez l’avancement sur la page Livraison avec ce code.
                </p>
              </div>
            )}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            <button type="button" className="form-submit" style={{ width: "auto", minWidth: 200 }} onClick={() => goPage("dashboard")}>
              Voir mon espace
            </button>
            <button type="button" className="btn-ghost" onClick={() => goPage("produits")}>
              Continuer mes achats
            </button>
          </div>
        </div>
      )}

      {!hasItems && !orderDone && (
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <p>Votre panier est vide.</p>
          <button className="form-submit" style={{ width: "auto" }} onClick={() => goPage("produits")}>
            Voir le catalogue
          </button>
        </div>
      )}

      {hasItems && !orderDone && (
        <div style={{ display: "grid", gap: 12 }}>
          <div className="card checkout-form-card">
            {step === 1 && (
              <div className="checkout-step-grid">
                <div style={{ fontWeight: 700, fontSize: ".95rem", color: "var(--ink)", gridColumn: "1 / -1" }}>
                  Adresse & contact
                </div>
                <p style={{ gridColumn: "1 / -1", fontSize: ".8rem", color: "var(--gray)", margin: "-4px 0 6px", lineHeight: 1.4 }}>
                  Téléphone utilisé pour la livraison et les validations MoMo / Orange. Les données sont aussi enregistrées sur cet appareil pour votre prochain passage.
                </p>

                <label className="checkout-field">
                  <span className="form-label">Nom complet</span>
                  <input className="form-input" value={nomLocal} onChange={(e) => setNomLocal(e.target.value)} placeholder="Ex. Mari Kamga" />
                </label>
                <label className="checkout-field">
                  <span className="form-label">
                    Mobile <strong style={{ color: "var(--red)" }}>*</strong>
                  </span>
                  <input
                    className={`form-input ${attemptedAdvance && addressErrors.phone ? "checkout-input-invalid" : ""}`}
                    inputMode="tel"
                    autoComplete="tel"
                    value={phoneLocal}
                    onChange={(e) => setPhoneLocal(e.target.value)}
                    placeholder="6XX XXX XXX ou +237 6XX XXX XXX"
                  />
                  {attemptedAdvance && addressErrors.phone && <span className="checkout-field-error">{addressErrors.phone}</span>}
                </label>

                <label className="checkout-field checkout-field-wide">
                  <span className="form-label">
                    Adresse / rue & numéro <strong style={{ color: "var(--red)" }}>*</strong>
                  </span>
                  <input
                    className={`form-input ${attemptedAdvance && addressErrors.line1 ? "checkout-input-invalid" : ""}`}
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder="Ex. Avenue Kennedy, immeuble bleu, 2e étage"
                  />
                  {attemptedAdvance && addressErrors.line1 && <span className="checkout-field-error">{addressErrors.line1}</span>}
                </label>

                <label className="checkout-field">
                  <span className="form-label">Quartier</span>
                  <input className="form-input" value={quartier} onChange={(e) => setQuartier(e.target.value)} placeholder="Ex. Bastos, Akwa…" />
                </label>
                <label className="checkout-field">
                  <span className="form-label">
                    Ville <strong style={{ color: "var(--red)" }}>*</strong>
                  </span>
                  <select
                    className={`form-input ${attemptedAdvance && addressErrors.ville ? "checkout-input-invalid" : ""}`}
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                  >
                    <option value="">— Choisir une ville —</option>
                    {CITY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {attemptedAdvance && addressErrors.ville && <span className="checkout-field-error">{addressErrors.ville}</span>}
                </label>

                <label className="checkout-field checkout-field-wide">
                  <span className="form-label">Point de repère (optionnel)</span>
                  <input
                    className="form-input"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="Ex. près de la station Total, portail vert…"
                  />
                </label>

                <div className="checkout-trust-row" style={{ gridColumn: "1 / -1" }}>
                  <span>🔒 Paiement sécurisé</span>
                  <span>🛡️ Protection acheteur</span>
                  <span>📦 Suivi commande</span>
                </div>

                <button type="button" className="form-submit" style={{ width: "100%", gridColumn: "1 / -1" }} onClick={tryAdvanceFromStep1}>
                  Continuer vers la livraison
                </button>
                <button type="button" className="btn-ghost" style={{ width: "100%", gridColumn: "1 / -1" }} onClick={() => goPage("cart")}>
                  ← Retour au panier
                </button>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ fontWeight: 700, fontSize: ".95rem", color: "var(--ink)" }}>Livraison & réception</div>
                <p style={{ fontSize: ".8rem", color: "var(--gray)", lineHeight: 1.45, margin: 0 }}>{locationBody}</p>

                <label className="form-label">Mode principal</label>
                <select className="form-input" value={locationType} onChange={(e) => setLocationType(e.target.value)}>
                  {(hasProducts || hasServices) && (
                    <option value="home">
                      {hasProducts && hasServices
                        ? "À domicile (livraison colis ou prestation)"
                        : hasProducts
                          ? "Livraison à domicile"
                          : "Prestation à domicile / visite"}
                    </option>
                  )}
                  {(hasProducts || hasServices) && (
                    <option value="shop">{hasProducts ? "Retrait colis / point relais" : "Sur place — atelier / boutique"}</option>
                  )}
                  {hasServices && <option value="online">100 % en ligne (visio, fichier, téléphone)</option>}
                </select>

                {locationType === "home" && hasProducts && (
                  <>
                    <label className="form-label">Option livraison</label>
                    <select className="form-input" value={carrier} onChange={(e) => setCarrier(e.target.value)}>
                      <option value="seller">Standard — vendeur / partenaire</option>
                      <option value="yorix">Yorix Delivery — prioritaire (Douala, Yaoundé et zones actives)</option>
                    </select>
                  </>
                )}

                <div className="checkout-estimate-box">
                  <div style={{ fontWeight: 700, fontSize: ".82rem", marginBottom: 4 }}>Estimation délai</div>
                  <p style={{ margin: 0, fontSize: ".8rem", color: "var(--gray)", lineHeight: 1.45 }}>{deliveryHintText}</p>
                  <div style={{ marginTop: 8, fontSize: ".78rem", color: "var(--ink)" }}>
                    Frais livraison (articles à livrer) :{" "}
                    <strong>
                      {!summary.hasShippableProducts
                        ? "N/A pour ce panier"
                        : summary.freeShippingUnlocked
                          ? "offerts"
                          : `${summary.delivery.toLocaleString()} FCFA`}
                    </strong>
                    {summary.freeShippingUnlocked && hasProducts && summary.hasShippableProducts && (
                      <span style={{ color: "var(--green)", fontWeight: 700 }}>
                        {" "}
                        — Livraison standard offerte ({(summary.policyThreshold ?? 50000).toLocaleString("fr-FR")} FCFA d’articles
                        livrables atteints).
                      </span>
                    )}
                  </div>
                </div>

                <button type="button" className="form-submit" style={{ width: "100%" }} onClick={() => setStep(3)}>
                  Continuer vers le paiement
                </button>
                <button type="button" className="btn-ghost" style={{ width: "100%" }} onClick={() => setStep(1)}>
                  ← Retour à l&apos;adresse
                </button>
              </div>
            )}

            {step === 3 && (
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ fontWeight: 700, fontSize: ".95rem", color: "var(--ink)" }}>Paiement</div>
                <label className="form-label">Mode de paiement</label>
                <select className="form-input" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="cinetpay">CinetPay — MTN MoMo, Orange Money ou carte</option>
                  <option value="cod">Espèces — paiement à la livraison</option>
                  <option value="whatsapp_backup">WhatsApp — backup & preuve manuelle</option>
                </select>

                <div style={{ background: "var(--surface2)", borderRadius: 10, padding: 12 }}>
                  {summary.hasShippableProducts && summary.freeShippingUnlocked && (
                    <div className="fs-ship-badge" style={{ marginBottom: 10 }}>
                      Livraison standard offerte · Bon plan Yorix
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".88rem" }}>
                    <span>Sous-total</span>
                    <strong>{summary.subtotal.toLocaleString()} FCFA</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".88rem", marginTop: 4 }}>
                    <span>Livraison (produits à expédier)</span>
                    <strong>
                      {!summary.hasShippableProducts
                        ? "N/A"
                        : summary.freeShippingUnlocked
                          ? "0 FCFA (offerte)"
                          : `${summary.delivery.toLocaleString()} FCFA`}
                    </strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--border)", fontWeight: 700 }}>
                    <span>Total à payer</span>
                    <strong>{summary.total.toLocaleString()} FCFA</strong>
                  </div>
                  <p style={{ fontSize: ".65rem", color: "var(--gray)", marginTop: 8, marginBottom: 0, lineHeight: 1.35 }}>
                    Montant validé côté serveur au paiement (seuil livraison offerte appliqué automatiquement).
                  </p>
                </div>
                <p style={{ fontSize: ".72rem", color: "var(--gray)", margin: 0, lineHeight: 1.4 }}>
                  Si CinetPay est indisponible, choisissez WhatsApp : notre équipe valide votre paiement manuellement. Aucune commission affichée ici — uniquement votre total commande.
                </p>
                {checkoutError && <div className="info-msg checkout-error-banner">{checkoutError}</div>}
                <button className="form-submit" type="button" onClick={handlePlaceOrder} disabled={loading}>
                  {loading ? "Traitement..." : "Confirmer la commande"}
                </button>
                <button type="button" className="btn-ghost" style={{ width: "100%" }} onClick={() => setStep(2)} disabled={loading}>
                  ← Retour à la livraison
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
