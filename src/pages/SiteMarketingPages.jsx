import { BusinessForm } from "../components/BusinessForm";
import { PagesLegales } from "../components/PagesLegales";
import { CITIES } from "../lib/constants";
import { BlogPage } from "./BlogPage";

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
        <section className="sec anim">
          <div className="biz-hero">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(252,209,22,.14)", color: "var(--yellow)", border: "1px solid rgba(252,209,22,.24)", padding: "4px 11px", borderRadius: 50, fontSize: ".7rem", fontWeight: 700, marginBottom: 12 }}>
              💼 Yorix Business
            </div>
            <div className="biz-title">La solution B2B pour les entreprises camerounaises</div>
            <p className="biz-sub">Achetez en gros, gérez vos fournisseurs et accédez à des tarifs professionnels exclusifs.</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><button className="cta-y">Démarrer gratuitement</button><button className="cta-w">Voir une démo</button></div>
            <div className="biz-feats">{[{ icon: "📦", t: "Achats en gros", p: "Tarifs dégressifs dès 10 unités" }, { icon: "🤝", t: "Fournisseurs vérifiés", p: "500+ fournisseurs certifiés" }, { icon: "📊", t: "Tableaux de bord", p: "Suivi en temps réel" }, { icon: "🔐", t: "Facturation pro", p: "Factures automatiques" }].map((f) => (<div key={f.t} className="biz-feat"><div style={{ fontSize: "1.25rem", marginBottom: 4 }}>{f.icon}</div><h4>{f.t}</h4><p>{f.p}</p></div>))}</div>
          </div>
          <BusinessForm />
        </section>
      );

    case "academy":
      return (
        <section className="sec anim">
          <div style={{ background: "linear-gradient(135deg,#1a3a24,#0a1410)", borderRadius: 14, padding: 28, marginBottom: 20, textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(252,209,22,.14)", color: "var(--yellow)", border: "1px solid rgba(252,209,22,.24)", padding: "4px 11px", borderRadius: 50, fontSize: ".7rem", fontWeight: 700, marginBottom: 12 }}>
              🎓 Yorix Academy
            </div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.45rem", fontWeight: 800, color: "#fff", marginBottom: 6, letterSpacing: "-.5px" }}>Formez-vous pour vendre mieux</h2>
            <p style={{ color: "rgba(255,255,255,.5)", fontSize: ".85rem", marginBottom: 18 }}>Des cours créés par des experts camerounais.</p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              <button type="button" className="cta-y" onClick={() => { const first = academyCourses.find((c) => c.prix === 0); if (first) goAcademyDetail(first); }}>Commencer gratuitement</button>
              <button type="button" className="cta-w" onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })}>Voir le catalogue</button>
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
        />
      );

    case "contact":
      return (
        <section className="sec anim">
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "var(--ink)", marginBottom: 8 }}>📞 Nous contacter</h1>
              <p style={{ color: "var(--gray)", fontSize: ".86rem" }}>Notre équipe répond en moins de 2h · 7j/7</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
              {[
                { icon: "📱", label: "WhatsApp", val: "+237 696 56 56 54", action: () => window.open(`https://wa.me/237696565654?text=${encodeURIComponent("Bonjour Yorix !")}`) },
                { icon: "📞", label: "Téléphone", val: "+237 696 56 56 54", action: () => window.open("tel:+237696565654") },
                { icon: "✉️", label: "Email", val: "support@yorix.cm", action: () => window.open("mailto:support@yorix.cm") },
              ].map((c) => (
                <div key={c.label} onClick={c.action} style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 12, padding: 18, textAlign: "center", cursor: "pointer", transition: "border-color .2s" }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--green)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: 8 }}>{c.icon}</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".85rem", color: "var(--ink)", marginBottom: 4 }}>{c.label}</div>
                  <div style={{ fontSize: ".78rem", color: "var(--green)", fontWeight: 600 }}>{c.val}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 24, marginBottom: 16 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--ink)", marginBottom: 16 }}>💬 Envoyer un message</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11, marginBottom: 11 }}>
                <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Nom *</label><input className="form-input" placeholder="Votre nom" /></div>
                <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Email *</label><input className="form-input" type="email" placeholder="email@exemple.cm" /></div>
              </div>
              <div className="form-group">
                <label className="form-label">Sujet *</label>
                <select className="form-select">
                  <option value="">Choisir un sujet...</option>
                  {["Problème avec une commande", "Signaler un vendeur", "Remboursement", "Problème de paiement", "Devenir vendeur", "Devenir livreur", "Autre"].map((s) => (<option key={s}>{s}</option>))}
                </select>
              </div>
              <div className="form-group"><label className="form-label">Message *</label><textarea className="form-textarea" style={{ minHeight: 90 }} placeholder="Décrivez votre demande..." /></div>
              <button type="button" className="form-submit" onClick={() => window.open(`https://wa.me/237696565654?text=${encodeURIComponent("Bonjour Yorix ! Je vous contacte pour : ")}`)}>📱 Envoyer via WhatsApp</button>
            </div>
            <div style={{ background: "var(--green-pale)", border: "1px solid var(--green-light)", borderRadius: 11, padding: 16, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem", color: "var(--green)", marginBottom: 6 }}>⏰ Horaires</div>
                {[
                  ["Lun – Ven", "8h – 20h"],
                  ["Samedi", "9h – 18h"],
                  ["Dimanche", "10h – 16h"],
                ].map(([j, h]) => (
                  <div key={j} style={{ display: "flex", justifyContent: "space-between", fontSize: ".75rem", padding: "3px 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ color: "var(--gray)" }}>{j}</span><span style={{ fontWeight: 600, color: "var(--ink)" }}>{h}</span>
                  </div>
                ))}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem", color: "var(--green)", marginBottom: 6 }}>📍 Bureaux</div>
                <div style={{ fontSize: ".75rem", color: "var(--gray)", lineHeight: 1.7 }}>Douala — Akwa<br />Yaoundé — Bastos<br />📞 +237 696 56 56 54</div>
              </div>
            </div>
          </div>
        </section>
      );

    case "aide":
      return (
        <section className="sec anim">
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "var(--ink)", marginBottom: 8 }}>🆘 Centre d'aide</h1>
              <p style={{ color: "var(--gray)", fontSize: ".86rem" }}>Trouvez les réponses à vos questions</p>
            </div>
            {[
              { cat: "🛍️ Acheter sur Yorix", faq: [{ q: "Comment passer une commande ?", r: "Cliquez sur un produit → Ajoutez au panier → Commander via WhatsApp. Le vendeur vous contacte sous 1h." }, { q: "Quels modes de paiement ?", r: "MTN Mobile Money, Orange Money, et paiement à la livraison dans certaines villes." }, { q: "Comment fonctionne l'Escrow ?", r: "Votre paiement est bloqué jusqu'à réception. Si problème, vous êtes remboursé sous 48h." }] },
              { cat: "🏪 Vendre sur Yorix", faq: [{ q: "Comment créer ma boutique ?", r: "Inscrivez-vous Vendeur → Dashboard → Ajouter produit. Votre produit est visible immédiatement." }, { q: "Quelle est la commission Yorix ?", r: "5% sur chaque vente. Exemple : 10 000 FCFA vendus → vous recevez 9 500 FCFA." }, { q: "Comment obtenir le badge Top Vendeur ?", r: "Automatique dès 5 produits actifs, ou achetez-le 15 000 FCFA/mois." }] },
              { cat: "🚚 Livraison", faq: [{ q: "Délais de livraison ?", r: "Intra-ville : 20–60 min. Inter-villes : 1–3 jours." }, { q: "Colis non reçu ?", r: "Contactez immédiatement : support@yorix.cm ou WhatsApp +237 696 56 56 54." }] },
              { cat: "💰 Points & Fidélité", faq: [{ q: "Comment gagner des points ?", r: "5 points par achat, vente, livraison ou prestation. 10 points à l'inscription. 1 pt = 1 FCFA." }, { q: "Échange minimum ?", r: "500 points = 500 FCFA. Utilisables en bons d'achat ou livraisons offertes." }] },
            ].map((section) => (
              <div key={section.cat} style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".95rem", color: "var(--ink)", padding: "8px 0", borderBottom: "2px solid var(--green-light)", marginBottom: 10 }}>{section.cat}</div>
                {section.faq.map(({ q, r }, i) => (
                  <details key={i} style={{ marginBottom: 8, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 9, overflow: "hidden" }}>
                    <summary style={{ padding: "11px 14px", cursor: "pointer", fontWeight: 600, fontSize: ".83rem", color: "var(--ink)", userSelect: "none", listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                      {q}<span style={{ color: "var(--green)" }}>▾</span>
                    </summary>
                    <div style={{ padding: "10px 14px 14px", fontSize: ".8rem", color: "var(--gray)", lineHeight: 1.75, borderTop: "1px solid var(--border)" }}>{r}</div>
                  </details>
                ))}
              </div>
            ))}
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <button type="button" className="btn-wa" style={{ display: "inline-flex" }} onClick={() => goPage("contact")}>📞 Contacter le support</button>
            </div>
          </div>
        </section>
      );

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
