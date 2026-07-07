import { useState } from "react";
import { supabase } from "../lib/supabase";
import { showAppToast } from "../lib/appToast";

const MIN_WITHDRAWAL = 5000;

function SvgMomo() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="8" fill="#FFCB05"/>
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1a1a1a">MTN</text>
    </svg>
  );
}
function SvgOrange() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="8" fill="#FF6600"/>
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">OM</text>
    </svg>
  );
}

export function WalletWithdrawal({ userId, solde, onSuccess }) {
  const [step, setStep]       = useState("form"); // form | confirm | done
  const [method, setMethod]   = useState(null);   // "mtn_momo" | "orange_money"
  const [phone, setPhone]     = useState("");
  const [amount, setAmount]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [history, setHistory] = useState(null);

  const net    = amount ? Math.round(Number(amount) * 0.97) : 0;   // frais 3%
  const isValid = method && phone.replace(/\s/g,"").length >= 9 && Number(amount) >= MIN_WITHDRAWAL && Number(amount) <= solde;

  const loadHistory = async () => {
    const { data } = await supabase
      .from("wallet_transactions")
      .select("id, amount, status, provider, created_at, meta")
      .eq("user_id", userId)
      .eq("transaction_type", "withdrawal")
      .order("created_at", { ascending: false })
      .limit(10);
    setHistory(data || []);
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const { data, error: rpcErr } = await supabase.rpc("fn_request_wallet_withdrawal", {
        p_amount: Number(amount),
        p_provider: method,
        p_phone: phone.replace(/\s/g, ""),
        p_notes: `Retrait vers ${method === "mtn_momo" ? "MTN MoMo" : "Orange Money"} — ${phone}`,
      });
      if (rpcErr) throw rpcErr;

      setStep("done");
      onSuccess?.(Number(amount));
      showAppToast(`✅ Retrait de ${Number(amount).toLocaleString()} FCFA en cours`, "success", 5000);
      if (!data) console.warn("[wallet] withdrawal RPC returned no id");
    } catch (e) {
      setError(e.message || "Erreur lors de la demande.");
    }
    setLoading(false);
  };

  if (step === "done") {
    return (
      <div className="withdrawal-done">
        <div className="withdrawal-done__icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="9 12 11 14 15 10"/>
          </svg>
        </div>
        <div className="withdrawal-done__title">Demande envoyée !</div>
        <p className="withdrawal-done__sub">
          Votre retrait de <strong>{Number(amount).toLocaleString()} FCFA</strong> vers{" "}
          <strong>{phone}</strong> est en cours de traitement.<br/>
          Vous recevrez <strong>{net.toLocaleString()} FCFA</strong> nets sous 24h ouvrées.
        </p>
        <button
          className="form-submit"
          style={{ width: "auto", padding: "10px 24px", marginTop: 16 }}
          onClick={() => { setStep("form"); setAmount(""); setPhone(""); setMethod(null); loadHistory(); }}
        >
          Nouveau retrait
        </button>
      </div>
    );
  }

  return (
    <div className="withdrawal-form">
      {/* Méthode de paiement */}
      <div className="withdrawal-section">
        <div className="withdrawal-label">Méthode de retrait</div>
        <div className="withdrawal-methods">
          {[
            { id: "mtn_momo",      icon: <SvgMomo />,    name: "MTN MoMo",     color: "#FFCB05", prefix: "67" },
            { id: "orange_money",  icon: <SvgOrange />,  name: "Orange Money", color: "#FF6600", prefix: "69" },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              className={`withdrawal-method-btn${method === m.id ? " withdrawal-method-btn--active" : ""}`}
              onClick={() => setMethod(m.id)}
              aria-pressed={method === m.id}
            >
              {m.icon}
              <div>
                <div className="withdrawal-method-name">{m.name}</div>
                <div className="withdrawal-method-hint">Numéro 6{m.prefix}X XXX XXX</div>
              </div>
              {method === m.id && (
                <svg className="withdrawal-method-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Numéro */}
      <div className="withdrawal-section">
        <label className="withdrawal-label" htmlFor="w-phone">
          Numéro {method === "mtn_momo" ? "MTN" : method === "orange_money" ? "Orange" : "de téléphone"}
        </label>
        <input
          id="w-phone"
          className="form-input"
          type="tel"
          inputMode="numeric"
          placeholder="Ex: 677 123 456"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ fontSize: 16 }}
        />
      </div>

      {/* Montant */}
      <div className="withdrawal-section">
        <label className="withdrawal-label" htmlFor="w-amount">
          Montant à retirer (FCFA)
        </label>
        <input
          id="w-amount"
          className="form-input"
          type="number"
          inputMode="numeric"
          min={MIN_WITHDRAWAL}
          max={solde}
          placeholder={`Min ${MIN_WITHDRAWAL.toLocaleString()} FCFA`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ fontSize: 16 }}
        />
        <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
          {[10000, 25000, 50000].filter(v => v <= solde).map(v => (
            <button
              key={v}
              type="button"
              className="withdrawal-quick-btn"
              onClick={() => setAmount(String(v))}
            >
              {v.toLocaleString()} F
            </button>
          ))}
          {solde >= MIN_WITHDRAWAL && (
            <button
              type="button"
              className="withdrawal-quick-btn"
              onClick={() => setAmount(String(solde))}
            >
              Tout ({solde.toLocaleString()} F)
            </button>
          )}
        </div>
      </div>

      {/* Récap frais */}
      {amount && Number(amount) >= MIN_WITHDRAWAL && (
        <div className="withdrawal-recap">
          <div className="withdrawal-recap__row">
            <span>Montant demandé</span>
            <strong>{Number(amount).toLocaleString()} FCFA</strong>
          </div>
          <div className="withdrawal-recap__row">
            <span>Frais de traitement (3%)</span>
            <span style={{ color: "var(--red)" }}>−{(Number(amount) - net).toLocaleString()} FCFA</span>
          </div>
          <div className="withdrawal-recap__row withdrawal-recap__row--total">
            <span>Vous recevez</span>
            <strong style={{ color: "var(--green)", fontSize: "1.05rem" }}>{net.toLocaleString()} FCFA</strong>
          </div>
        </div>
      )}

      {error && <p className="rcm-error" role="alert">{error}</p>}

      {/* Solde insuffisant */}
      {Number(amount) > solde && solde > 0 && (
        <p className="rcm-error" role="alert">
          Solde insuffisant. Disponible : {solde.toLocaleString()} FCFA
        </p>
      )}

      <div className="withdrawal-info">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r=".5" fill="currentColor"/>
        </svg>
        Retrait minimum {MIN_WITHDRAWAL.toLocaleString()} FCFA · Traitement sous 24h ouvrées · Frais 3%
      </div>

      <button
        className="form-submit"
        style={{ marginTop: 16 }}
        disabled={!isValid || loading}
        onClick={handleSubmit}
      >
        {loading ? (
          <><div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Traitement…</>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
            </svg>
            Demander le retrait
          </>
        )}
      </button>

      {/* Historique */}
      {history === null ? (
        <button
          type="button"
          style={{ background: "none", border: "none", color: "var(--green)", fontSize: ".78rem", cursor: "pointer", marginTop: 12, fontWeight: 600 }}
          onClick={loadHistory}
        >
          Voir l'historique des retraits ›
        </button>
      ) : history.length === 0 ? (
        <p style={{ fontSize: ".75rem", color: "var(--gray)", marginTop: 12, textAlign: "center" }}>Aucun retrait effectué.</p>
      ) : (
        <div className="withdrawal-history">
          <div className="withdrawal-label" style={{ marginBottom: 8 }}>Historique</div>
          {history.map((tx) => (
            <div key={tx.id} className="withdrawal-history-row">
              <div>
                <div style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--ink)" }}>
                  {Number(tx.amount).toLocaleString()} FCFA
                </div>
                <div style={{ fontSize: ".68rem", color: "var(--gray)" }}>
                  {tx.provider === "mtn_momo" ? "MTN MoMo" : "Orange Money"} · {tx.meta?.phone}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className={`withdrawal-status withdrawal-status--${tx.status}`}>
                  {tx.status === "pending" ? "En cours" : tx.status === "completed" ? "Versé" : "Refusé"}
                </span>
                <div style={{ fontSize: ".65rem", color: "var(--gray)", marginTop: 2 }}>
                  {new Date(tx.created_at).toLocaleDateString("fr-FR")}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
