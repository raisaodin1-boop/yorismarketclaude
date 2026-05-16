import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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
import { PAGE_PATH, parseLocaleSegments, localePath } from "../lib/seoRoutes";
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

  const { t } = useTranslation("checkout");
  const checkoutLocaleSeg = parseLocaleSegments(location.pathname);
  const checkoutLocale =
    checkoutLocaleSeg.locale === "fr" || checkoutLocaleSeg.locale === "en" ? checkoutLocaleSeg.locale : "fr";
  const localizedCheckoutPath = localePath(checkoutLocale, PAGE_PATH.checkout);

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
      navigate(localizedCheckoutPath, { replace: true });
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
        (expectReturn && Boolean(storedTx.startsWith("YRXPAY-")) && checkoutLocaleSeg.barePath === PAGE_PATH.checkout);
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
      setCheckoutError(t("errors.loginRequired"));
      return;
    }
    if (!canContinueStep1) {
      setCheckoutError(t("errors.addressIncomplete"));
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
      setCheckoutError(t("errors.checkoutFailed"));
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

  const checkoutTypeLabel = useMemo(() => {
    if (checkoutType === "mixed") return t("lead.typeMixed");
    if (checkoutType === "service_only") return t("lead.typeServices");
    return t("lead.typeProducts");
  }, [checkoutType, t]);

  const locationBody = useMemo(() => {
    if (locationType === "online") return t("location.online");
    if (locationType === "shop") return hasProducts ? t("location.shopProducts") : t("location.shop");
    if (carrier === "yorix") return t("location.yorix", { city: ville || "—" });
    return t("location.standard");
  }, [locationType, carrier, ville, hasProducts, t]);

  const deliveryHintText = deliveryEstimateHint(ville, locationType, carrier);

  return (
    <section className="sec anim checkout-page-wrap yorix-page-flow yorix-pro-page">
      <CheckoutProgressBar
        activeIndex={progressActiveIndex}
        onNavigate={handleProgressNavigate}
        navigationDisabled={Boolean(orderDone)}
      />

      {!orderDone && hasItems && <FreeShippingProgress summary={summary} variant={step >= 2 ? "compact" : "cart"} />}

      <h1 className="sec-title yorix-ds-tight">
        {orderDone ? t("title.done") : t("title.active")}
      </h1>
      <p className="yorix-ds-lead">
        {orderDone ? t("lead.done") : t("lead.active", { type: checkoutTypeLabel })}
      </p>

      {cinetpayReturnBanner && !orderDone && (
        <div role="status" className="yorix-ds-inline-banner">
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
              ? t("confirm.whatsapp")
              : orderDone.mode === "cinetpay_return"
                ? t("confirm.cinetpay")
                : t("confirm.summary")}
          </h2>
          <p style={{ color: "var(--gray)", marginBottom: 12, lineHeight: 1.45 }}>
            {orderDone.mode === "whatsapp"
              ? t("confirm.whatsappBody")
              : orderDone.mode === "cinetpay_return"
                ? t("confirm.cinetpayBody")
                : t("confirm.standardBody")}
          </p>
            <div className="yorix-ds-inset-panel">
            {orderDone.mode === "cinetpay_return" && orderDone.paymentStatus && (
              <div className="yorix-ds-kvrow">
                <span>{t("confirm.paymentStatus")}</span>
                <strong>
                  {orderDone.paymentStatus === "paid"
                    ? t("confirm.paid")
                    : orderDone.paymentStatus === "failed"
                      ? t("confirm.failed")
                      : orderDone.paymentStatus === "pending"
                        ? t("confirm.pending")
                        : orderDone.paymentStatus}
                </strong>
              </div>
            )}
            {orderDone.mode === "cinetpay_return" &&
              orderDone.amountReturned != null &&
              Number.isFinite(Number(orderDone.amountReturned)) && (
                <div className="yorix-ds-kvrow">
                  <span>{t("confirm.amountRecorded")}</span>
                  <strong>
                    {Number(orderDone.amountReturned).toLocaleString()} {orderDone.currencyReturned || "XAF"}
                  </strong>
                </div>
              )}
            {orderDone.providerRef && orderDone.mode === "cinetpay_return" && (
              <div className="yorix-ds-kvrow" style={{ marginBottom: orderDone.orderGroupId ? 6 : 0 }}>
                <span>{t("confirm.txRef")}</span>
                <strong style={{ wordBreak: "break-all" }}>{orderDone.providerRef}</strong>
              </div>
            )}
            {orderDone.orderGroupId && (
              <div className="yorix-ds-kvrow" style={{ marginBottom: 6 }}>
                <span>{t("confirm.orderGroup")}</span>
                <strong style={{ wordBreak: "break-all" }}>{orderDone.orderGroupId}</strong>
              </div>
            )}
            <div className="yorix-ds-kvrow">
              <span>{t("confirm.checkoutRef")}</span>
              <strong style={{ wordBreak: "break-all" }}>{orderDone.intentId}</strong>
            </div>
            {Array.isArray(orderDone.deliveryTracking) && orderDone.deliveryTracking.length > 0 && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border-subtle, #e5e5e5)" }}>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>{t("confirm.trackingCodes")}</div>
                <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.5 }}>
                  {orderDone.deliveryTracking.map((row) => (
                    <li key={row.order_id}>
                      <strong style={{ letterSpacing: ".02em" }}>{row.code_suivi}</strong>
                    </li>
                  ))}
                </ul>
                <p style={{ margin: "8px 0 0", fontSize: ".78rem", color: "var(--gray)" }}>
                  {t("confirm.trackingHint")}
                </p>
              </div>
            )}
          </div>
          <div className="yorix-ds-stack">
            <button type="button" className="form-submit" style={{ width: "auto", minWidth: 200 }} onClick={() => goPage("dashboard")}>
              {t("confirm.myAccount")}
            </button>
            <button type="button" className="btn-ghost" onClick={() => goPage("produits")}>
              {t("confirm.continueShopping")}
            </button>
          </div>
        </div>
      )}

      {!hasItems && !orderDone && (
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <p>{t("empty.cart")}</p>
          <button className="form-submit" style={{ width: "auto" }} onClick={() => goPage("produits")}>
            {t("empty.browse")}
          </button>
        </div>
      )}

      {hasItems && !orderDone && (
        <div style={{ display: "grid", gap: 12 }}>
          <div className="card checkout-form-card">
            {step === 1 && (
              <div className="checkout-step-grid">
                <div className="checkout-step-heading">{t("step1.heading")}</div>
                <p className="checkout-step-lead">
                  {t("step1.lead")}
                </p>

                <label className="checkout-field">
                  <span className="form-label">{t("step1.fullName")}</span>
                  <input className="form-input" value={nomLocal} onChange={(e) => setNomLocal(e.target.value)} placeholder={t("step1.fullNamePh")} />
                </label>
                <label className="checkout-field">
                  <span className="form-label">{t("step1.mobile")} <strong style={{ color: "var(--red)" }}>*</strong>
                  </span>
                  <input
                    className={`form-input ${attemptedAdvance && addressErrors.phone ? "checkout-input-invalid" : ""}`}
                    inputMode="tel"
                    autoComplete="tel"
                    value={phoneLocal}
                    onChange={(e) => setPhoneLocal(e.target.value)}
                    placeholder={t("step1.mobilePh")}
                  />
                  {attemptedAdvance && addressErrors.phone && <span className="checkout-field-error">{addressErrors.phone}</span>}
                </label>

                <label className="checkout-field checkout-field-wide">
                  <span className="form-label">
                    {t("step1.address")} <strong style={{ color: "var(--red)" }}>*</strong>
                  </span>
                  <input
                    className={`form-input ${attemptedAdvance && addressErrors.line1 ? "checkout-input-invalid" : ""}`}
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder={t("step1.addressPh")}
                  />
                  {attemptedAdvance && addressErrors.line1 && <span className="checkout-field-error">{addressErrors.line1}</span>}
                </label>

                <label className="checkout-field">
                  <span className="form-label">{t("step1.district")}</span>
                  <input className="form-input" value={quartier} onChange={(e) => setQuartier(e.target.value)} placeholder={t("step1.districtPh")} />
                </label>
                <label className="checkout-field">
                  <span className="form-label">{t("step1.city")} <strong style={{ color: "var(--red)" }}>*</strong>
                  </span>
                  <select
                    className={`form-input ${attemptedAdvance && addressErrors.ville ? "checkout-input-invalid" : ""}`}
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                  >
                    <option value="">{t("step1.cityChoose")}</option>
                    {CITY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {attemptedAdvance && addressErrors.ville && <span className="checkout-field-error">{addressErrors.ville}</span>}
                </label>

                <label className="checkout-field checkout-field-wide">
                  <span className="form-label">{t("step1.landmark")}</span>
                  <input
                    className="form-input"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder={t("step1.landmarkPh")}
                  />
                </label>

                <div className="checkout-trust-row" style={{ gridColumn: "1 / -1" }}>
                  <span>🔒 {t("step1.trustSecure")}</span>
                  <span>🛡️ {t("step1.trustBuyer")}</span>
                  <span>📦 {t("step1.trustTrack")}</span>
                </div>

                <button type="button" className="form-submit" style={{ width: "100%", gridColumn: "1 / -1" }} onClick={tryAdvanceFromStep1}>
                  {t("step1.continueDelivery")}
                </button>
                <button type="button" className="btn-ghost" style={{ width: "100%", gridColumn: "1 / -1" }} onClick={() => goPage("cart")}>
                  {t("step1.backCart")}
                </button>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: "grid", gap: 12 }}>
                <div className="checkout-step-heading" style={{ gridColumn: "1 / -1" }}>
                  {t("step2.heading")}
                </div>
                <p className="checkout-step-lead" style={{ marginTop: "-6px" }}>{locationBody}</p>

                <label className="form-label">{t("step2.mainMode")}</label>
                <select className="form-input" value={locationType} onChange={(e) => setLocationType(e.target.value)}>
                  {(hasProducts || hasServices) && (
                    <option value="home">
                      {hasProducts && hasServices
                        ? t("step2.homeBoth")
                        : hasProducts
                          ? t("step2.homeProducts")
                          : "Prestation à domicile / visite"}
                    </option>
                  )}
                  {(hasProducts || hasServices) && (
                    <option value="shop">{hasProducts ? t("step2.shopProducts") : t("step2.shopServices")}</option>
                  )}
                  {hasServices && <option value="online">{t("step2.online")}</option>}
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
                  {t("step2.continuePayment")}
                </button>
                <button type="button" className="btn-ghost" style={{ width: "100%" }} onClick={() => setStep(1)}>
                  {t("step2.backAddress")}
                </button>
              </div>
            )}

            {step === 3 && (
              <div style={{ display: "grid", gap: 10 }}>
                <div className="checkout-step-heading">{t("step3.heading")}</div>
                <label className="form-label">{t("step3.method")}</label>
                <select className="form-input" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="cinetpay">CinetPay — MTN MoMo, Orange Money ou carte</option>
                  <option value="cod">Espèces — paiement à la livraison</option>
                  <option value="whatsapp_backup">WhatsApp — backup & preuve manuelle</option>
                </select>

                <div className="yorix-ds-inset-panel checkout-pay-recap" style={{ marginBottom: 0 }}>
                  {summary.hasShippableProducts && summary.freeShippingUnlocked && (
                    <div className="fs-ship-badge" style={{ marginBottom: 10 }}>
                      Livraison standard offerte · Bon plan Yorix
                    </div>
                  )}
                  <div className="checkout-pay-recap-row">
                    <span>Sous-total</span>
                    <strong>{summary.subtotal.toLocaleString()} FCFA</strong>
                  </div>
                  <div className="checkout-pay-recap-row">
                    <span>Livraison (produits à expédier)</span>
                    <strong>
                      {!summary.hasShippableProducts
                        ? "N/A"
                        : summary.freeShippingUnlocked
                          ? "0 FCFA (offerte)"
                          : `${summary.delivery.toLocaleString()} FCFA`}
                    </strong>
                  </div>
                  <div className="checkout-pay-recap-total">
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
                  {loading ? t("step3.processing") : t("step3.placeOrder")}
                </button>
                <button type="button" className="btn-ghost" style={{ width: "100%" }} onClick={() => setStep(2)} disabled={loading}>
                  {t("step3.backDelivery")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
