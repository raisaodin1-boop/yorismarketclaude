import { BusinessForm } from "../components/BusinessForm";
import { PagesLegales } from "../components/PagesLegales";
import { MarketingBreadcrumb } from "../components/layout/MarketingBreadcrumb";
import { CITIES } from "../lib/constants";
import { BlogPage } from "./BlogPage";
import { HelpCentrePage } from "./HelpCentrePage";

export function SiteMarketingPages({
  page,
  goPage,
  setAuthOpen,
  setAuthTab,
  setSelectedRole,
  inscriptionSent,
  setInscriptionSent,
  inscriptionForm,
  setInscriptionForm,
  inscriptionError,
  inscriptionLoading,
  submitInscriptionPrestataire,
  academyCourses,
  academyLoading,
  goAcademyDetail,
  blogFilter,
  setBlogFilter,
  nlEmail,
  setNlEmail,
  nlSent,
  setNlSent,
}) {
  switch (page) {
    case "faq":
      return (
        <section className="sec anim">
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <header style={{ textAlign: "center", marginBottom: 22 }}>
              <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.45rem", color: "var(--ink)" }}>FAQ — Yorix marketplace Cameroun</h1>
              <p style={{ color: "var(--gray)", fontSize: ".86rem" }}>Livraison, escrow, paiement MoMo et prestataires.</p>
            </header>
            {[
              { q: "Comment acheter sur Yorix ?", a: "Choisissez un produit, ajoutez au panier, puis validez via WhatsApp ou votre espace. Paiement MTN MoMo, Orange Money ou selon options affichées." },
              { q: "La livraison fonctionne comment ?", a: "Yorix Ride met en relation clients et livreurs. Suivi, tarifs affichés avant validation — grandes villes en priorité." },
              { q: "C’est quoi l’escrow ?", a: "Votre paiement est protégé jusqu’à ce que vous confirmiez la réception. Idéal pour marketplace et achats entre particuliers." },
              { q: "Comment devenir vendeur ou livreur ?", a: "Créez un compte vendeur ou livreur, acceptez la charte pro, puis accédez à votre tableau de bord." },
            ].map((item, i) => (
              <details key={i} style={{ marginBottom: 10, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10 }}>
                <summary style={{ padding: "12px 14px", cursor: "pointer", fontWeight: 700, fontSize: ".86rem" }}>{item.q}</summary>
                <div style={{ padding: "0 14px 14px", fontSize: ".82rem", color: "var(--gray)", lineHeight: 1.7 }}>{item.a}</div>
              </details>
            ))}
            <div style={{ textAlign: "center", marginTop: 18 }}>
              <button type="button" className="cta-w" onClick={() => goPage("aide")}>Centre d&apos;aide complet →</button>
            </div>
          </div>
        </section>
      );

    case "devenirVendeur":
      return (
        <section className="sec anim">
          <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.45rem", color: "var(--ink)", marginBottom: 10 }}>Vendre sur Yorix — marketplace Cameroun</h1>
            <p style={{ color: "var(--gray)", fontSize: ".88rem", lineHeight: 1.75, marginBottom: 20 }}>
              Développez votre activité : boutique en ligne, visibilité nationale, paiements MoMo et outils vendeur.
            </p>
            <button type="button" className="cta-y" onClick={() => { setAuthTab("register"); setSelectedRole("seller"); setAuthOpen(true); }}>
              Créer ma boutique vendeur
            </button>
          </div>
        </section>
      );

    case "devenirLivreur":
      return (
        <section className="sec anim">
          <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.45rem", color: "var(--ink)", marginBottom: 10 }}>Devenir livreur Yorix Ride — Cameroun</h1>
            <p style={{ color: "var(--gray)", fontSize: ".88rem", lineHeight: 1.75, marginBottom: 20 }}>
              Rejoignez le réseau de livraison : missions flexibles, paiement rapide, couverture villes et inter-villes.
            </p>
            <button type="button" className="cta-y" onClick={() => { setAuthTab("register"); setSelectedRole("delivery"); setAuthOpen(true); }}>
              S&apos;inscrire comme livreur
            </button>
          </div>
        </section>
      );

    case "inscription":
      return (
        <section className="sec anim">
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "var(--ink)", marginBottom: 7, letterSpacing: "-.5px" }}>👷 Devenir prestataire Yorix</h2>
              <p style={{ color: "var(--gray)", fontSize: ".86rem", lineHeight: 1.7 }}>Développez votre activité et accédez à des milliers de clients au Cameroun.</p>
            </div>
            {inscriptionSent ? (
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 40, textAlign: "center" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: 14 }}>🎉</div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "var(--green)", marginBottom: 10 }}>Candidature envoyée avec succès !</h3>
                <p style={{ fontSize: ".88rem", color: "var(--gray)", lineHeight: 1.7, maxWidth: 420, margin: "0 auto 20px" }}>
                  Merci pour votre intérêt ! L'équipe Yorix vous contactera sous <strong>24h</strong> pour valider votre profil de prestataire.
                </p>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                  <button
                    onClick={() => { setInscriptionSent(false); setInscriptionForm({ nom: "", prenom: "", tel: "", email: "", metier: "", ville: "", experience: "", tarif: "", bio: "" }); }}
                    style={{ background: "var(--surface2)", color: "var(--ink)", border: "1.5px solid var(--border)", borderRadius: 8, padding: "9px 20px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".82rem" }}
                  >
                    Soumettre une autre candidature
                  </button>
                  <button onClick={() => goPage("home")} style={{ background: "var(--green)", color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", cursor: "pointer", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem" }}>
                    ← Retour à l'accueil
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 24 }}>
                {inscriptionError && (
                  <div style={{ background: "#fff0f0", border: "1px solid #fecaca", color: "#ce1126", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: ".82rem" }}>⚠️ {inscriptionError}</div>
                )}
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Nom <span>*</span></label><input className="form-input" value={inscriptionForm.nom} onChange={(e) => setInscriptionForm((f) => ({ ...f, nom: e.target.value }))} placeholder="Votre nom" /></div>
                  <div className="form-group"><label className="form-label">Prénom</label><input className="form-input" value={inscriptionForm.prenom} onChange={(e) => setInscriptionForm((f) => ({ ...f, prenom: e.target.value }))} placeholder="Votre prénom" /></div>
                  <div className="form-group"><label className="form-label">Téléphone <span>*</span></label><input className="form-input" value={inscriptionForm.tel} onChange={(e) => setInscriptionForm((f) => ({ ...f, tel: e.target.value }))} placeholder="+237 696 56 56 54" /></div>
                  <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={inscriptionForm.email} onChange={(e) => setInscriptionForm((f) => ({ ...f, email: e.target.value }))} placeholder="email@mail.com" /></div>
                  <div className="form-group"><label className="form-label">Métier <span>*</span></label><select className="form-select" value={inscriptionForm.metier} onChange={(e) => setInscriptionForm((f) => ({ ...f, metier: e.target.value }))}><option value="">Choisir...</option>{["Plomberie", "Électricité", "Maçonnerie", "Peinture", "Menuiserie", "Informatique", "Graphisme", "Photographie", "Nettoyage", "Transport", "Cuisine", "Autre"].map((m) => (<option key={m}>{m}</option>))}</select></div>
                  <div className="form-group"><label className="form-label">Ville</label><select className="form-select" value={inscriptionForm.ville} onChange={(e) => setInscriptionForm((f) => ({ ...f, ville: e.target.value }))}><option value="">Choisir...</option>{CITIES.filter((c) => c !== "Toutes les villes").map((c) => (<option key={c}>{c}</option>))}</select></div>
                  <div className="form-group"><label className="form-label">Expérience</label><input className="form-input" value={inscriptionForm.experience} onChange={(e) => setInscriptionForm((f) => ({ ...f, experience: e.target.value }))} placeholder="Ex: 5 ans" /></div>
                  <div className="form-group"><label className="form-label">Tarif (FCFA)</label><input className="form-input" value={inscriptionForm.tarif} onChange={(e) => setInscriptionForm((f) => ({ ...f, tarif: e.target.value }))} placeholder="Ex: 15 000/h" /></div>
                  <div className="form-group full"><label className="form-label">Présentation</label><textarea className="form-textarea" value={inscriptionForm.bio} onChange={(e) => setInscriptionForm((f) => ({ ...f, bio: e.target.value }))} placeholder="Décrivez vos compétences..." /></div>
                </div>
                <button className="form-submit" disabled={inscriptionLoading} onClick={submitInscriptionPrestataire}>
                  {inscriptionLoading ? (<><div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />Envoi en cours...</>) : "🚀 Soumettre ma candidature"}
                </button>
                <p style={{ fontSize: ".7rem", color: "var(--gray)", textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>🔒 Vos informations sont sécurisées · Réponse sous 24h</p>
              </div>
            )}
          </div>
        </section>
      );

    case "business":
      return (
        <div className="yorix-pro-page anim">
          <section className="yorix-bus-hero">
            <MarketingBreadcrumb items={[{ label: "Accueil", onClick: () => goPage("home") }, { label: "Business" }]} />
            <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(252,209,22,.14)", color: "var(--yellow)", border: "1px solid rgba(252,209,22,.28)", padding: "5px 14px", borderRadius: 50, fontSize: ".72rem", fontWeight: 700, marginBottom: 14 }}>
              💼 Yorix · Business Growth Hub CM
            </div>
            <h1 className="yorix-bus-h1">
              Une couche commerce pour <span>entreprises ambitieuses</span> au Cameroun
            </h1>
            <p className="yorix-bus-lead">
              Achats groupe B2B, logistique, visibilité produit national, paiements traçables (MoMo · Orange Money · Escrow) et accompagnement humain WhatsApp — le tout sur une même plateforme.
            </p>
            <div className="yorix-bus-cta">
              <button type="button" className="cta-y" onClick={() => window.scrollTo({ behavior: "smooth", top: 520 })}>
                Lancer une demande
              </button>
              <button type="button" className="cta-w" onClick={() => goPage("academy")}>
                Formez vos équipes
              </button>
            </div>
            <div className="yorix-bus-metrics">
              {[
                ["4 rôles pro", "Acheteur · Vendeur · Livreur · Prestataire"],
                ["Nationwide CM", "Douala · Yaoundé · villes satellites"],
                ["Stack confiance", "Escrow • support humain • suivi livraisons"],
              ].map(([t, d]) => (
                <div key={t} className="yorix-bus-metric">
                  <strong>{t}</strong>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="sec">
            <h2 className="yorix-sec-heading">Piliers de la transformation business</h2>
            <div className="yorix-bus-pillars">
              {[
                { icon: "🏬", title: "Achat groupe & sourcing", txt: "Regroupements d’offres marketplace, meilleurs prix catalogue vérifié." },
                { icon: "📣", title: "Visibilité & campagnes", txt: "Mise en avant produits-services, boosts dans les grandes villes." },
                { icon: "🧠", title: "Formation continue", txt: "Yorix Academy pour digitaliser vos commerciaux & magasiniers." },
                { icon: "🏦", title: "Financement & sécurité", txt: "Paiements tracés, escrow et litiges médiation locale." },
              ].map((b) => (
                <article key={b.title} className="yorix-bus-pillar">
                  <div className="yorix-bus-pillar-ico">{b.icon}</div>
                  <h3>{b.title}</h3>
                  <p>{b.txt}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="sec">
            <BusinessForm />
          </section>
        </div>
      );

    case "academy":
      return (
        <section className="sec anim yorix-pro-page">
          <div style={{ marginBottom: 18 }}>
            <MarketingBreadcrumb items={[{ label: "Accueil", onClick: () => goPage("home") }, { label: "Academy" }]} />
          </div>
          <div className="yorix-acad-hero">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(252,209,22,.14)", color: "var(--yellow)", border: "1px solid rgba(252,209,22,.26)", padding: "5px 14px", borderRadius: 50, fontSize: ".72rem", fontWeight: 700, marginBottom: 14 }}>
              🎓 Centre d&apos;apprentissage Yorix
            </div>
            <h1 className="yorix-acad-h1">
              Upskill vos équipes : <span>e-commerce terrain</span> · vente WhatsApp · logistique
            </h1>
            <p className="yorix-acad-sub">
              Parcours courts, ludiques et actionnables — pensés pour les vendeurs boutiques, équipes marketing terrain et entrepreneurs diaspora retour au pays.
            </p>
            <div className="yorix-acad-tracks">
              {["Retail & Marketplace", "Livraison & expérience client", "Growth business local", "Paiements & conformité"].map((t) => (
                <span key={t} className="yorix-chip">
                  {t}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 22 }}>
              <button type="button" className="cta-y" onClick={() => { const first = academyCourses.find((c) => c.prix === 0); if (first) goAcademyDetail(first); }}>Commencer gratuitement</button>
              <button type="button" className="cta-w" onClick={() => window.scrollTo({ top: 560, behavior: "smooth" })}>Voir le catalogue</button>
              <button type="button" className="cta-w" onClick={() => goPage("blog")}>Lire nos guides</button>
            </div>
          </div>
          {academyLoading ? (
            <div className="loading"><div className="spinner" />Chargement des formations...</div>
          ) : academyCourses.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">🎓</div><p>Aucune formation pour l'instant</p></div>
          ) : (
            <div className="courses-grid">
              {academyCourses.map((c) => (
                <div key={c.id} className="course-card" onClick={() => goAcademyDetail(c)} style={{ cursor: "pointer" }}>
                  <div className="course-img" style={{ background: c.color_bg || "#E8F5E9" }}>{c.emoji || "🎓"}</div>
                  <div className="course-body">
                    <div className={`course-level ${c.category === "DÉBUTANT" ? "lc-debutant" : c.category === "INTERMÉDIAIRE" ? "lc-intermediaire" : "lc-avance"}`}>{c.category}</div>
                    <div className="course-title">{c.title}</div>
                    <div className="course-meta">⏱ {c.duration} · 👥 {c.students_count || 0}</div>
                    <div className="course-footer">
                      <div className="course-price">{c.prix === 0 ? "Gratuit" : `${c.prix.toLocaleString("fr-FR")} FCFA`}</div>
                      <button type="button" className="course-btn" onClick={(e) => { e.stopPropagation(); goAcademyDetail(c); }}>Démarrer →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      );

    case "blog":
      return (
        <BlogPage
          blogFilter={blogFilter}
          setBlogFilter={setBlogFilter}
          nlEmail={nlEmail}
          setNlEmail={setNlEmail}
          nlSent={nlSent}
          setNlSent={setNlSent}
          goPage={goPage}
        />
      );

    case "contact":
      return (
        <section className="sec anim yorix-pro-page">
          <div className="yorix-contact-shell">
            <div className="yorix-bc-row">
              <MarketingBreadcrumb items={[{ label: "Accueil", onClick: () => goPage("home") }, { label: "Contact" }]} />
            </div>
            <div className="yorix-contact-intro">
              <h1 className="yorix-contact-h1">📞 Relation client premium</h1>
              <p className="yorix-contact-lead">
                Priorité WhatsApp sous ~120&nbsp;minutes · téléphone vocal · email pièces jointes — équipes Douala&nbsp;&amp;&nbsp;Yaoundé.
              </p>
            </div>
            <div className="yorix-contact-chips">
              {[
                { icon: "📱", label: "WhatsApp", val: "+237 696 56 56 54", action: () => window.open(`https://wa.me/237696565654?text=${encodeURIComponent("Bonjour Yorix !")}`) },
                { icon: "📞", label: "Téléphone", val: "+237 696 56 56 54", action: () => window.open("tel:+237696565654") },
                { icon: "✉️", label: "Email", val: "support@yorix.cm", action: () => window.open("mailto:support@yorix.cm") },
              ].map((c) => (
                <div
                  key={c.label}
                  role="button"
                  tabIndex={0}
                  className="yorix-contact-chip"
                  onClick={c.action}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      c.action();
                    }
                  }}
                >
                  <span className="yorix-contact-chip-ico">{c.icon}</span>
                  <span className="yorix-contact-chip-lbl">{c.label}</span>
                  <span className="yorix-contact-chip-val">{c.val}</span>
                </div>
              ))}
            </div>
            <div className="yorix-contact-form-card">
              <div className="yorix-contact-form-title">💬 Envoyer un message</div>
              <div className="form-row">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Nom <span>*</span></label>
                  <input className="form-input" placeholder="Votre nom" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Email <span>*</span></label>
                  <input className="form-input" type="email" placeholder="email@exemple.cm" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Sujet <span>*</span></label>
                <select className="form-select">
                  <option value="">Choisir un sujet...</option>
                  {["Problème avec une commande", "Signaler un vendeur", "Remboursement", "Problème de paiement", "Devenir vendeur", "Devenir livreur", "Autre"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Message <span>*</span></label>
                <textarea className="form-textarea" style={{ minHeight: 90 }} placeholder="Décrivez votre demande..." />
              </div>
              <button
                type="button"
                className="form-submit"
                onClick={() => window.open(`https://wa.me/237696565654?text=${encodeURIComponent("Bonjour Yorix ! Je vous contacte pour : ")}`)}
              >
                📱 Continuer via WhatsApp
              </button>
            </div>
            <div className="yorix-contact-info-strip">
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem", color: "var(--green)", marginBottom: 6 }}>⏰ Horaires</div>
                {[
                  ["Lun – Ven", "8h – 20h"],
                  ["Samedi", "9h – 18h"],
                  ["Dimanche", "10h – 16h"],
                ].map(([j, h]) => (
                  <div key={j} style={{ display: "flex", justifyContent: "space-between", fontSize: ".75rem", padding: "3px 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ color: "var(--gray)" }}>{j}</span>
                    <span style={{ fontWeight: 600, color: "var(--ink)" }}>{h}</span>
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem", color: "var(--green)", marginBottom: 6 }}>📍 Bureaux</div>
                <div style={{ fontSize: ".75rem", color: "var(--gray)", lineHeight: 1.7 }}>
                  Douala — Akwa
                  <br />
                  Yaoundé — Bastos
                  <br />
                  📞 +237 696 56 56 54
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case "aide":
      return <HelpCentrePage goPage={goPage} />;

    case "cgv":
      return <PagesLegales type="cgv" goPage={goPage} />;
    case "mentions":
      return <PagesLegales type="mentions" goPage={goPage} />;
    case "confidentialite":
      return <PagesLegales type="confidentialite" goPage={goPage} />;

    default:
      return null;
  }
}
