import { PasswordInput } from "../PasswordInput";

export function YorixAuthModal({
  authOpen,
  setAuthOpen,
  authTab,
  setAuthTab,
  selectedRole,
  setSelectedRole,
  authForm,
  setAuthForm,
  authError,
  setAuthError,
  authLoading,
  doLogin,
  doRegister,
  doGoogle,
}) {
  if (!authOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setAuthOpen(false)}>
      <div className="modal" style={{ width: "100%", maxWidth: 480, margin: "0 auto" }}>
        <button type="button" className="modal-close" onClick={() => setAuthOpen(false)}>
          ✕
        </button>
        <div className="modal-title">{authTab === "login" ? "Bon retour ! 👋" : "Rejoindre Yorix 🇨🇲"}</div>
        <p className="modal-sub">Votre marketplace camerounaise de confiance</p>
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab${authTab === "login" ? " active" : ""}`}
            onClick={() => {
              setAuthTab("login");
              setAuthError("");
            }}
          >
            🔑 Connexion
          </button>
          <button
            type="button"
            className={`auth-tab${authTab === "register" ? " active" : ""}`}
            onClick={() => {
              setAuthTab("register");
              setAuthError("");
            }}
          >
            🚀 Inscription
          </button>
        </div>
        {authError && <div className="error-msg">⚠️ {authError}</div>}

        {authTab === "register" && (
          <>
            <div
              style={{
                background: "var(--green-pale)",
                border: "1px solid var(--green-light)",
                borderRadius: 9,
                padding: "10px 12px",
                marginBottom: 12,
                fontSize: ".78rem",
                color: "var(--green)",
                fontWeight: 600,
              }}
            >
              👇 Choisissez votre profil pour commencer
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[
                { id: "buyer", icon: "🛍️", label: "Acheteur", desc: "J'achète des produits" },
                { id: "seller", icon: "🏪", label: "Vendeur", desc: "Je vends mes produits" },
                { id: "delivery", icon: "🚚", label: "Livreur", desc: "J'effectue des livraisons" },
                { id: "provider", icon: "👷", label: "Prestataire", desc: "Je propose des services" },
              ].map((r) => (
                <div
                  key={r.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedRole(r.id)}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedRole(r.id)}
                  style={{
                    border: `2px solid ${selectedRole === r.id ? "var(--green)" : "var(--border)"}`,
                    borderRadius: 10,
                    padding: "12px 10px",
                    cursor: "pointer",
                    background: selectedRole === r.id ? "var(--green-pale)" : "var(--surface)",
                    textAlign: "center",
                    transition: "all .2s",
                  }}
                >
                  <div style={{ fontSize: "1.8rem", marginBottom: 4 }}>{r.icon}</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem", color: "var(--ink)" }}>
                    {r.label}
                  </div>
                  <div style={{ fontSize: ".67rem", color: "var(--gray)", marginTop: 2 }}>{r.desc}</div>
                  {selectedRole === r.id && (
                    <div style={{ marginTop: 5, fontSize: ".62rem", fontWeight: 700, color: "var(--green)" }}>✅ Sélectionné</div>
                  )}
                </div>
              ))}
            </div>
            <div className="form-group">
              <label className="form-label">
                Nom complet <span>*</span>
              </label>
              <input
                className="form-input"
                placeholder="Ex: Amina Bello"
                value={authForm.nom}
                onChange={(e) => setAuthForm((f) => ({ ...f, nom: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Téléphone <span>*</span>
              </label>
              <input
                className="form-input"
                type="tel"
                placeholder="+237 6XX XXX XXX"
                value={authForm.tel}
                onChange={(e) => setAuthForm((f) => ({ ...f, tel: e.target.value }))}
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label className="form-label">
            Email <span>*</span>
          </label>
          <input
            className="form-input"
            type="email"
            placeholder="votre@email.com"
            value={authForm.email}
            onChange={(e) => setAuthForm((f) => ({ ...f, email: e.target.value }))}
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            Mot de passe <span>*</span>
          </label>
          <PasswordInput
            value={authForm.password}
            onChange={(val) => setAuthForm((f) => ({ ...f, password: val }))}
            placeholder={authTab === "login" ? "Entrez votre mot de passe" : "Choisissez un mot de passe"}
            autoComplete={authTab === "login" ? "current-password" : "new-password"}
            showStrength={authTab === "register"}
            showRules={authTab === "register"}
            ariaLabel="Mot de passe"
            id="auth-password"
          />
          {authTab === "login" && (
            <div
              style={{
                fontSize: ".7rem",
                color: "var(--gray)",
                marginTop: 5,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              💡 Cliquez sur l'œil pour afficher ou masquer votre mot de passe
            </div>
          )}
        </div>

        <button
          type="button"
          className="form-submit"
          onClick={authTab === "login" ? doLogin : doRegister}
          disabled={authLoading}
          style={{ fontSize: ".9rem", padding: "13px" }}
        >
          {authLoading ? (
            <>
              <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
              Chargement...
            </>
          ) : authTab === "login" ? (
            "🔑 Se connecter"
          ) : (
            `🚀 Créer mon compte ${
              selectedRole === "buyer"
                ? "Acheteur"
                : selectedRole === "seller"
                  ? "Vendeur"
                  : selectedRole === "delivery"
                    ? "Livreur"
                    : "Prestataire"
            }`
          )}
        </button>
        {authTab === "register" && (
          <p style={{ fontSize: ".68rem", color: "var(--gray)", textAlign: "center", marginTop: 8 }}>
            En vous inscrivant, vous acceptez nos conditions d'utilisation
          </p>
        )}
        <div className="divider">ou</div>
        <button type="button" className="social-btn" onClick={doGoogle}>
          <span>🇬</span> Continuer avec Google
        </button>
      </div>
    </div>
  );
}
