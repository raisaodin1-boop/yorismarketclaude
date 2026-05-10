import { useCallback, useMemo, useState } from "react";
import { buildCheckoutIntent, detectCheckoutType } from "../domain/checkoutOrchestrator";
import { confirmCheckout, createCheckoutIntent, initPaymentCinetPay } from "../lib/checkoutApi";
import { CheckoutProgressBar } from "./CheckoutProgressBar";

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
}) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cinetpay");
  const [address, setAddress] = useState(userData?.adresse || "");
  const [locationType, setLocationType] = useState("home");
  const [checkoutError, setCheckoutError] = useState("");
  const [orderDone, setOrderDone] = useState(null);

  const checkoutType = useMemo(() => detectCheckoutType(cartItems), [cartItems]);

  const canContinueIdentity = Boolean((userData?.nom || "").trim() && (userData?.telephone || "").trim());
  const hasItems = cartItems.length > 0;

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

  const openWhatsAppFallback = (intentId) => {
    const lines = cartItems
      .map((i) => `• [${i.kind === "service" ? "Service" : "Produit"}] ${i.name} x${i.qty} = ${(i.prix * i.qty).toLocaleString()} FCFA`)
      .join("\n");
    const msg = [
      "🛒 *CHECKOUT YORIX*",
      "",
      `🔎 Référence checkout : ${intentId || "N/A"}`,
      `🧩 Type: ${checkoutType}`,
      "",
      lines,
      "",
      `💰 Sous-total: ${summary.subtotal.toLocaleString()} FCFA`,
      `🚚 Livraison: ${summary.delivery ? summary.delivery.toLocaleString() + " FCFA" : "Offerte / N/A"}`,
      `💵 Total: ${summary.total.toLocaleString()} FCFA`,
      "",
      `👤 Client: ${userData?.nom || "N/A"}`,
      `📱 Tel: ${userData?.telephone || "N/A"}`,
      `📍 Adresse: ${address || "N/A"}`,
      "",
      `Modes disponibles: MTN ${momoNumber} / Orange ${orangeNumber}`,
    ].join("\n");
    window.open(`https://wa.me/${fallbackWhatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handlePlaceOrder = async () => {
    if (!hasItems) return;
    if (!user) {
      setCheckoutError("Connexion requise pour finaliser la commande.");
      return;
    }
    setCheckoutError("");
    setLoading(true);
    try {
      const intentPayload = buildCheckoutIntent({
        items: cartItems,
        user,
        userData: { ...userData, adresse: address },
        summary,
      });
      const intent = await createCheckoutIntent(intentPayload);
      const confirmation = await confirmCheckout({
        checkout_intent_id: intent.checkout_intent_id,
        payment_method: paymentMethod,
        location_type: locationType,
        address,
      });

      if (paymentMethod === "cinetpay") {
        const payment = await initPaymentCinetPay({
          checkout_intent_id: intent.checkout_intent_id,
          order_group_id: confirmation.order_group_id,
          amount: summary.total,
          channel: "ALL",
        });
        if (payment?.payment_url) {
          window.location.href = payment.payment_url;
          return;
        }
      }

      if (paymentMethod === "whatsapp_backup" || !confirmation?.order_group_id) {
        openWhatsAppFallback(intent.checkout_intent_id);
      }

      setCartItems([]);
      setOrderDone({
        mode: paymentMethod === "whatsapp_backup" || !confirmation?.order_group_id ? "whatsapp" : "standard",
        orderGroupId: confirmation?.order_group_id || null,
        intentId: intent.checkout_intent_id,
      });
    } catch (e) {
      console.warn("Checkout:", e?.message || e);
      setCheckoutError("Impossible de finaliser le checkout. Utilisez le backup WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sec anim checkout-page-wrap">
      <CheckoutProgressBar
        activeIndex={progressActiveIndex}
        onNavigate={handleProgressNavigate}
        navigationDisabled={Boolean(orderDone)}
      />

      <h1 className="sec-title" style={{ marginBottom: 6 }}>
        {orderDone ? "Commande enregistrée" : "Finaliser la commande"}
      </h1>
      <p style={{ color: "var(--gray)", marginBottom: 16, fontSize: ".88rem" }}>
        {orderDone
          ? "Merci pour votre confiance. Conservez votre référence pour le suivi."
          : `Étape suivante après le panier : adresse & livraison, puis paiement sécurisé (${
              checkoutType === "mixed" ? "panier mixte" : checkoutType === "service_only" ? "prestations" : "produits"
            }).`}
      </p>

      {orderDone && (
        <div className="card checkout-confirm-card">
          <div className="checkout-confirm-icon" aria-hidden>
            ✅
          </div>
          <h2 className="h2" style={{ fontSize: "1.05rem", marginBottom: 8 }}>
            {orderDone.mode === "whatsapp" ? "Finalisez sur WhatsApp" : "Récapitulatif"}
          </h2>
          <p style={{ color: "var(--gray)", marginBottom: 12, lineHeight: 1.45 }}>
            {orderDone.mode === "whatsapp"
              ? "Une conversation WhatsApp a été ouverte avec le détail de votre commande. Notre équipe confirme le paiement (MoMo, Orange ou autre) avec vous."
              : "Votre commande a été enregistrée. Suivez l’avancement depuis votre espace client."}
          </p>
          <div style={{ background: "var(--surface2)", borderRadius: 10, padding: 12, marginBottom: 16, textAlign: "left", fontSize: ".84rem" }}>
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
          <div className="card">
            {step === 1 && (
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ fontWeight: 700, fontSize: ".9rem", color: "var(--ink)" }}>Adresse & contact</div>
                <div style={{ fontSize: ".86rem" }}>
                  Client : <strong>{userData?.nom || "Non renseigné"}</strong>
                </div>
                <div style={{ fontSize: ".86rem" }}>
                  Téléphone : <strong>{userData?.telephone || "Non renseigné"}</strong>
                </div>
                <input
                  className="form-input"
                  placeholder="Adresse de livraison / localisation"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button
                  className="form-submit"
                  style={{ width: "100%" }}
                  disabled={!canContinueIdentity}
                  onClick={() => setStep(2)}
                >
                  Continuer vers la livraison
                </button>
                <button type="button" className="btn-ghost" style={{ width: "100%" }} onClick={() => goPage("cart")}>
                  ← Retour au panier
                </button>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ fontWeight: 700, fontSize: ".9rem", color: "var(--ink)" }}>Mode de réception</div>
                <label className="form-label">Livraison / retrait / en ligne</label>
                <select className="form-input" value={locationType} onChange={(e) => setLocationType(e.target.value)}>
                  <option value="home">À domicile</option>
                  <option value="shop">En boutique / retrait</option>
                  <option value="online">En ligne (services)</option>
                </select>
                <button className="form-submit" style={{ width: "100%" }} onClick={() => setStep(3)}>
                  Continuer vers le paiement
                </button>
                <button type="button" className="btn-ghost" style={{ width: "100%" }} onClick={() => setStep(1)}>
                  ← Retour à l&apos;adresse
                </button>
              </div>
            )}

            {step === 3 && (
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ fontWeight: 700, fontSize: ".9rem", color: "var(--ink)" }}>Paiement</div>
                <label className="form-label">Mode de paiement</label>
                <select className="form-input" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="cinetpay">CinetPay (MoMo / Orange / carte)</option>
                  <option value="cod">Paiement à la livraison</option>
                  <option value="whatsapp_backup">Backup WhatsApp</option>
                </select>

                <div style={{ background: "var(--surface2)", borderRadius: 10, padding: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".88rem" }}>
                    <span>Sous-total</span>
                    <strong>{summary.subtotal.toLocaleString()} FCFA</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".88rem", marginTop: 4 }}>
                    <span>Livraison</span>
                    <strong>{summary.delivery ? `${summary.delivery.toLocaleString()} FCFA` : "Offerte / N/A"}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--border)", fontWeight: 700 }}>
                    <span>Total</span>
                    <strong>{summary.total.toLocaleString()} FCFA</strong>
                  </div>
                </div>
                {checkoutError && <div className="info-msg" style={{ color: "var(--red)" }}>{checkoutError}</div>}
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
