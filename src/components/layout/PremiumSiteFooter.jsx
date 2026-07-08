/** Pied de page refonte v1.0 — 4 colonnes + newsletter intégrée */
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { showAppToast } from "../../lib/appToast";

const SOCIAL = [
  { id: "fb", label: "Facebook", href: "https://facebook.com/yorixcm" },
  { id: "ig", label: "Instagram", href: "https://instagram.com/yorixcm" },
  { id: "tw", label: "X / Twitter", href: "https://twitter.com/yorixcm" },
  { id: "li", label: "LinkedIn", href: "https://linkedin.com/company/yorix" },
];

export function PremiumSiteFooter({
  goPage,
  freeShippingThresholdXaf = 25000,
  nlEmail: controlledEmail,
  setNlEmail: setControlledEmail,
  nlSent: controlledSent,
  setNlSent: setControlledSent,
}) {
  const [localEmail, setLocalEmail] = useState("");
  const [localSent, setLocalSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const email = controlledEmail ?? localEmail;
  const setEmail = setControlledEmail ?? setLocalEmail;
  const sent = controlledSent ?? localSent;
  const setSent = setControlledSent ?? setLocalSent;

  const subscribe = async (e) => {
    e.preventDefault();
    const trimmed = email?.trim();
    if (!trimmed || !trimmed.includes("@")) {
      showAppToast("Entrez une adresse email valide", "error");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.from("newsletter").insert({ email: trimmed });
      if (error && !/duplicate|unique/i.test(error.message)) throw error;
      setSent(true);
      showAppToast("Inscription confirmée — merci !", "success");
    } catch (err) {
      showAppToast(err?.message || "Inscription impossible — réessayez", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <footer className="footer footer--premium footer--refonte">
      <div className="footer-premium-accent" aria-hidden />

      <div className="footer-trust-strip">
        <span className="fts-item">Escrow vérifiable</span>
        <span className="fts-item">MTN MoMo · Orange Money</span>
        <span className="fts-item">
          Livraison offerte dès {freeShippingThresholdXaf?.toLocaleString?.("fr-FR") ?? "—"} FCFA
        </span>
        <span className="fts-item">Support WhatsApp CM</span>
      </div>

      <div className="footer-grid footer-grid--refonte">
        <div className="footer-brand-col">
          <div className="footer-logo">
            Yo<span>rix</span> CM
          </div>
          <p className="footer-desc">
            La marketplace camerounaise — achetez en confiance, vendez en sécurité, livraison suivie.
          </p>
          <div className="footer-social" aria-label="Réseaux sociaux">
            {SOCIAL.map((s) => (
              <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                {s.label.slice(0, 2).toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        <nav className="footer-col" aria-label="Explorer">
          <h4>Explorer</h4>
          <ul>
            {[
              { l: "Catalogue", p: "produits" },
              { l: "Made in Cameroun", nav: () => goPage("merchHub", { merchHub: "made-in-cameroun" }) },
              { l: "Services", p: "prestataires" },
              { l: "Offres", p: "bonsPlans" },
              { l: "Blog", p: "blog" },
            ].map((i) => (
              <li key={i.l}>
                <button type="button" onClick={() => (i.nav ? i.nav() : goPage(i.p))}>
                  {i.l}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Entreprise">
          <h4>Entreprise</h4>
          <ul>
            {[
              { l: "À propos", p: "aide" },
              { l: "Yorix Business", p: "business" },
              { l: "Carrières", p: "contact" },
              { l: "Vendre sur Yorix", p: "devenirVendeur" },
            ].map((i) => (
              <li key={i.l}>
                <button type="button" onClick={() => goPage(i.p)}>
                  {i.l}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Support">
          <h4>Support</h4>
          <ul>
            {[
              { l: "Centre d'aide", p: "aide" },
              { l: "WhatsApp", p: "contact" },
              { l: "FAQ", p: "faq" },
              { l: "Conditions d'utilisation", p: "cgv" },
              { l: "Politique de confidentialité", p: "confidentialite" },
            ].map((i) => (
              <li key={i.l}>
                <button type="button" onClick={() => goPage(i.p)}>
                  {i.l}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <form className="footer-newsletter" onSubmit={subscribe}>
        <label htmlFor="footer-nl-email" className="footer-newsletter__label">
          Newsletter — tendances &amp; guides marketplace
        </label>
        <div className="footer-newsletter__row">
          <input
            id="footer-nl-email"
            type="email"
            className="footer-newsletter__input"
            placeholder="Votre email…"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            disabled={sent || busy}
            autoComplete="email"
          />
          <button type="submit" className="footer-newsletter__btn" disabled={sent || busy}>
            {sent ? "Inscrit ✓" : busy ? "…" : "S'inscrire"}
          </button>
        </div>
      </form>

      <div className="footer-bottom footer-bottom--refonte">
        <span className="footer-copy">© 2026 Yorix. Tous droits réservés. RC : DOUALA/2026/B237</span>
        <span className="footer-made">Made with ❤️ in Cameroon</span>
      </div>
    </footer>
  );
}
