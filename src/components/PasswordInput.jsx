// ═══════════════════════════════════════════════════════════════
//  YORIX CM — PASSWORD INPUT PREMIUM
//  ✅ Toggle œil afficher/masquer
//  ✅ Indicateur de force (Faible / Moyen / Fort)
//  ✅ Validation en temps réel
//  ✅ Confirmation password (matching)
//  ✅ Mobile-first, accessible (aria-label)
//  ✅ Auto-remask après 10s (sécurité)
// ═══════════════════════════════════════════════════════════════

import { useState, useRef, useMemo, useEffect } from "react";

/**
 * Props :
 * - value         : string (valeur du champ)
 * - onChange      : fn (handler de changement, reçoit la valeur)
 * - placeholder   : string (placeholder personnalisé)
 * - showStrength  : bool (afficher l'indicateur de force, par défaut false)
 * - showRules     : bool (afficher les règles de validation live, par défaut false)
 * - confirmValue  : string (si renseigné, ce champ est un "confirmer mdp" et doit matcher)
 * - autoComplete  : string ("new-password" pour inscription, "current-password" pour login)
 * - autoMask      : nombre (secondes avant remasquage auto, 0 = désactivé, défaut 10)
 * - id            : string (id pour accessibilité)
 * - ariaLabel     : string (description du champ pour lecteurs d'écran)
 */
export function PasswordInput({
  value = "",
  onChange,
  placeholder = "Entrez votre mot de passe",
  showStrength = false,
  showRules = false,
  confirmValue = null,
  autoComplete = "current-password",
  autoMask = 10,
  id,
  ariaLabel = "Mot de passe",
}) {
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);

  // ── Auto-remasquage après X secondes (sécurité) ──
  useEffect(() => {
    if (visible && autoMask > 0) {
      timeoutRef.current = setTimeout(() => {
        setVisible(false);
      }, autoMask * 1000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [visible, autoMask]);

  // ── Toggle visibilité (sans perdre le focus) ──
  const toggleVisible = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible((v) => !v);
    // Re-focus l'input après le toggle pour ne pas perdre le curseur
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  // ── Calcul de la force du mot de passe ──
  const strength = useMemo(() => {
    if (!value) return { score: 0, label: "", color: "" };
    let score = 0;
    if (value.length >= 6) score++;
    if (value.length >= 10) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score <= 1) return { score: 1, label: "Faible", color: "#dc2626" };
    if (score <= 2) return { score: 2, label: "Moyen", color: "#f59e0b" };
    if (score <= 3) return { score: 3, label: "Bon", color: "#3b82f6" };
    if (score <= 4) return { score: 4, label: "Fort", color: "#16a34a" };
    return { score: 5, label: "Très fort", color: "#15803d" };
  }, [value]);

  // ── Validation des règles ──
  const rules = useMemo(() => ({
    length: value.length >= 6,
    uppercase: /[A-Z]/.test(value),
    digit: /[0-9]/.test(value),
  }), [value]);

  // ── Confirmation matching ──
  const confirmMatch = confirmValue !== null
    ? value && confirmValue && value === confirmValue
    : null;

  const confirmMismatch = confirmValue !== null
    ? confirmValue.length > 0 && value !== confirmValue
    : false;

  // ── Couleur de bordure selon état ──
  const getBorderColor = () => {
    if (confirmMismatch) return "var(--red, #dc2626)";
    if (confirmMatch) return "var(--green, #1a6b3a)";
    if (focused) return "var(--green, #1a6b3a)";
    return "var(--border, #e5e5e5)";
  };

  return (
    <div style={{ width: "100%" }}>
      {/* ═══ INPUT WRAPPER ═══ */}
      <div
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        <input
          ref={inputRef}
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-label={ariaLabel}
          style={{
            width: "100%",
            padding: "12px 48px 12px 14px", // 48px à droite pour l'icône
            borderRadius: 9,
            border: `1.5px solid ${getBorderColor()}`,
            background: "var(--surface, #fff)",
            color: "var(--ink, #111)",
            fontSize: ".88rem",
            fontFamily: "'DM Sans',sans-serif",
            outline: "none",
            transition: "border-color .15s",
            boxSizing: "border-box",
            // Police monospace si visible pour mieux lire
            letterSpacing: visible ? "0.02em" : "0.1em",
          }}
        />

        {/* ═══ ICÔNE ŒIL ═══ */}
        <button
          type="button"
          onClick={toggleVisible}
          aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          title={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          tabIndex={0}
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 8,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--gray, #666)",
            transition: "background .15s, color .15s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "var(--surface2, #f5f5f5)";
            e.currentTarget.style.color = "var(--green, #1a6b3a)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--gray, #666)";
          }}
        >
          {visible ? (
            // Œil OUVERT (mdp visible)
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          ) : (
            // Œil BARRÉ (mdp masqué)
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
              <line x1="2" y1="2" x2="22" y2="22" />
            </svg>
          )}
        </button>
      </div>

      {/* ═══ INDICATEUR DE FORCE (si activé) ═══ */}
      {showStrength && value && (
        <div style={{ marginTop: 6 }}>
          <div
            style={{
              display: "flex",
              gap: 3,
              marginBottom: 4,
            }}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 4,
                  borderRadius: 2,
                  background:
                    i <= strength.score ? strength.color : "var(--border, #e5e5e5)",
                  transition: "background .25s",
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: ".68rem",
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            <span style={{ color: "var(--gray, #666)" }}>
              💪 Force du mot de passe
            </span>
            <span style={{ color: strength.color, fontWeight: 700 }}>
              {strength.label}
            </span>
          </div>
        </div>
      )}

      {/* ═══ RÈGLES DE VALIDATION (si activé) ═══ */}
      {showRules && value && (
        <div
          style={{
            marginTop: 8,
            padding: "8px 10px",
            background: "var(--surface2, #f5f5f5)",
            border: "1px solid var(--border, #e5e5e5)",
            borderRadius: 7,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <RuleItem ok={rules.length} text="Au moins 6 caractères" />
          <RuleItem ok={rules.uppercase} text="Une majuscule (recommandé)" optional />
          <RuleItem ok={rules.digit} text="Un chiffre (recommandé)" optional />
        </div>
      )}

      {/* ═══ MATCHING CONFIRMATION ═══ */}
      {confirmValue !== null && confirmValue.length > 0 && (
        <div
          style={{
            marginTop: 6,
            fontSize: ".74rem",
            fontFamily: "'DM Sans',sans-serif",
            fontWeight: 600,
            color: confirmMatch ? "var(--green, #16a34a)" : "var(--red, #dc2626)",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          {confirmMatch ? (
            <>✓ Les mots de passe correspondent</>
          ) : (
            <>✗ Les mots de passe ne correspondent pas</>
          )}
        </div>
      )}
    </div>
  );
}

// ── Sous-composant : ligne de règle de validation ──
function RuleItem({ ok, text, optional }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: ".72rem",
        color: ok ? "var(--green, #16a34a)" : "var(--gray, #666)",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <span
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: ok ? "var(--green, #16a34a)" : "var(--border, #e5e5e5)",
          color: "#fff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: ".55rem",
          fontWeight: 800,
          flexShrink: 0,
        }}
      >
        {ok ? "✓" : "·"}
      </span>
      <span>
        {text}
        {optional && !ok && (
          <span style={{ opacity: 0.6, fontSize: ".66rem" }}> (optionnel)</span>
        )}
      </span>
    </div>
  );
}
