import { useMemo, useState } from "react";
import { buildCheckoutIntent, detectCheckoutType } from "../domain/checkoutOrchestrator";
import { confirmCheckout, createCheckoutIntent, initPaymentCinetPay } from "../lib/checkoutApi";

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

  const checkoutType = useMemo(() => detectCheckoutType(cartItems), [cartItems]);

  const canContinueIdentity = Boolean((userData?.nom || "").trim() && (userData?.telephone || "").trim());
  const hasItems = cartItems.length > 0;

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
      } else {
        alert("✅ Checkout confirmé. Suivez votre commande depuis votre dashboard.");
      }

      setCartItems([]);
      goPage("dashboard");
    } catch (e) {
      console.warn("Checkout:", e?.message || e);
      setCheckoutError("Impossible de finaliser le checkout. Utilisez le backup WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sec anim" style={{ maxWidth: 980, margin: "0 auto" }}>
      <h1 className="h2" style={{ marginBottom: 6 }}>Checkout Yorix</h1>
      <p style={{ color: "var(--gray)", marginBottom: 14 }}>
        Flow intelligent: {checkoutType === "mixed" ? "panier mixte" : checkoutType === "service_only" ? "services" : "produits"}.
      </p>

      {!hasItems && (
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <p>Votre panier est vide.</p>
          <button className="form-submit" style={{ width: "auto" }} onClick={() => goPage("produits")}>
            Voir le catalogue
          </button>
        </div>
      )}

      {hasItems && (
        <div style={{ display: "grid", gap: 12 }}>
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 10 }}>Étape {step}/3</div>
            {step === 1 && (
              <div style={{ display: "grid", gap: 8 }}>
                <div>Client: <strong>{userData?.nom || "Non renseigné"}</strong></div>
                <div>Téléphone: <strong>{userData?.telephone || "Non renseigné"}</strong></div>
                <input
                  className="form-input"
                  placeholder="Adresse de livraison / localisation"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button
                  className="form-submit"
                  style={{ width: "auto" }}
                  disabled={!canContinueIdentity}
                  onClick={() => setStep(2)}
                >
                  Continuer
                </button>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: "grid", gap: 8 }}>
                <label className="form-label">Fulfillment</label>
                <select
                  className="form-input"
                  value={locationType}
                  onChange={(e) => setLocationType(e.target.value)}
                >
                  <option value="home">A domicile</option>
                  <option value="shop">En boutique / retrait</option>
                  <option value="online">En ligne (services)</option>
                </select>
                <button className="form-submit" style={{ width: "auto" }} onClick={() => setStep(3)}>
                  Continuer vers paiement
                </button>
              </div>
            )}

            {step === 3 && (
              <div style={{ display: "grid", gap: 8 }}>
                <label className="form-label">Mode de paiement</label>
                <select
                  className="form-input"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="cinetpay">CinetPay (MoMo/Orange/Card)</option>
                  <option value="cod">Paiement a la livraison</option>
                  <option value="whatsapp_backup">Backup WhatsApp</option>
                </select>

                <div style={{ background: "var(--surface2)", borderRadius: 10, padding: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Sous-total</span><strong>{summary.subtotal.toLocaleString()} FCFA</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Livraison</span><strong>{summary.delivery ? `${summary.delivery.toLocaleString()} FCFA` : "Offerte / N/A"}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <span>Total</span><strong>{summary.total.toLocaleString()} FCFA</strong>
                  </div>
                </div>
                {checkoutError && <div className="info-msg" style={{ color: "var(--red)" }}>{checkoutError}</div>}
                <button className="form-submit" onClick={handlePlaceOrder} disabled={loading}>
                  {loading ? "Traitement..." : "Confirmer checkout"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

