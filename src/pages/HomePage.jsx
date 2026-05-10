import { FlashCountdown } from "../components/FlashCountdown";
import { ProdGrid } from "../components/ProdGrid";
import { CATS, CITIES } from "../lib/constants";
import { supabase, YORIX_WA_NUMBER } from "../lib/supabase";

export function HomePage({
  filterCat,
  setFilterCat,
  search,
  setSearch,
  produitsLoading,
  produits,
  user,
  userData,
  wishlist,
  addToCart,
  toggleWish,
  openProductUrl,
  setOnboardingOpen,
  goPage,
  allServices,
  nlEmail,
  setNlEmail,
  nlSent,
  setNlSent,
}) {
  return (
    <div className="anim">
      <div className="trust-banner">
        <div className="tb-item">🚚 Livraison rapide à Yaoundé &amp; Douala</div>
        <div className="tb-item">🔒 Paiement 100% sécurisé</div>
        <div className="tb-item">✅ Produits vérifiés</div>
        <div className="tb-item">📱 Support WhatsApp 7j/7</div>
      </div>

      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-tag">🇨🇲 Marketplace #1 au Cameroun</div>
            <h1>Achetez et faites-vous<br/>livré à <em>Yaoundé</em></h1>
            <p className="hero-sub">Produits locaux & importés · Prestataires vérifiés · Livraison express · MTN MoMo & Orange Money</p>
            <p style={{ fontSize: ".84rem", color: "rgba(255,255,255,.78)", lineHeight: 1.65, maxWidth: 520, marginTop: 10 }}>
              Yorix est une marketplace camerounaise pour acheter et vendre en ligne partout au Cameroun francophone : escrow sécurisé, livraison locale et prestataires de confiance.
            </p>

            <div className="hero-badges">
              <span className="hbadge hbadge-yellow">⭐ +2 000 avis clients</span>
              <span className="hbadge hbadge-green">📦 +100 produits vendus</span>
              <span className="hbadge">🔒 Paiement sécurisé</span>
              <span className="hbadge">🚚 Livraison rapide</span>
            </div>

            <div className="hero-ctas">
              <button className="cta-y" onClick={() => setOnboardingOpen(true)}>🚀 Commencer maintenant</button>
              <button className="cta-w" onClick={() => goPage("produits")}>🛍️ Voir les produits</button>
            </div>

            <div className="hero-stats">
              {[
                ["85K+", "Produits"],
                ["12K", "Vendeurs"],
                ["3K", "Prestataires"],
                ["10", "Régions"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="stat-num">{n}</div>
                  <div className="stat-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-card">
            <div className="hc-title">🔍 Recherche rapide</div>
            <div className="sf">
              <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}>
                <option value="">Tout</option>
                {CATS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <input placeholder="Produit, marque..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="sf">
              <select>
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <input placeholder="Budget max (FCFA)" />
            </div>
            <button className="sbtn" onClick={() => goPage("produits")}>
              🔍 Rechercher
            </button>
            <div className="pop-row">
              <span className="pop-lbl">Tendances :</span>
              {["Pagne wax", "iPhone", "Karité", "BTP"].map((s) => (
                <span
                  key={s}
                  className="pop-tag"
                  onClick={() => {
                    setSearch(s);
                    goPage("produits");
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,.1)", display: "flex", flexDirection: "column", gap: 4 }}>
              {["✅ Paiement sécurisé MTN MoMo", "🚚 Livraison Yaoundé & Douala", "🔐 Remboursement garanti Escrow"].map((t) => (
                <div key={t} style={{ fontSize: ".68rem", color: "rgba(255,255,255,.65)", display: "flex", alignItems: "center", gap: 5 }}>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="proof-bar">
        <div className="proof-item"><span className="proof-num">2 400+</span> commandes passées</div>
        <div className="proof-item"><span className="proof-num">850+</span> vendeurs actifs</div>
        <div className="proof-item"><span className="proof-num">98%</span> satisfaction client</div>
        <div className="proof-item"><span className="proof-num">J+1</span> livraison Yaoundé</div>
      </div>

      <section className="sec" style={{ paddingBottom: 0 }}>
        <div className="sec-head">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h2 className="sec-title">⚡ Offres Flash</h2>
            <span style={{ background: "#ff4444", color: "#fff", padding: "3px 10px", borderRadius: 50, fontSize: ".68rem", fontWeight: 800, animation: "flashPulse 1.5s infinite" }}>
              AUJOURD'HUI SEULEMENT
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: ".75rem", color: "var(--gray)" }}>Se termine dans :</span>
            <FlashCountdown />
          </div>
        </div>
        <div style={{ background: "linear-gradient(135deg,#ff4444,#ff6b35)", borderRadius: 12, padding: "14px 18px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1rem", color: "#fff", marginBottom: 3 }}>
              🔥 Promo du jour — jusqu'à -30% sur tous les téléphones !
            </div>
            <div style={{ fontSize: ".78rem", color: "rgba(255,255,255,.75)" }}>Offre valable uniquement aujourd'hui · Paiement MTN MoMo accepté</div>
          </div>
          <button
            style={{ background: "#fff", color: "#ff4444", border: "none", padding: "9px 18px", borderRadius: 8, fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".82rem", cursor: "pointer", whiteSpace: "nowrap" }}
            onClick={() => {
              setFilterCat("Téléphones");
              goPage("produits");
            }}
          >
            🛍️ Voir les promos
          </button>
        </div>
        {!produitsLoading && produits.length > 0 && (
          <ProdGrid
            prods={produits.slice(0, 4).map((p, i) => ({
              ...p,
              flash: i < 2,
              promo: i >= 2 && i < 4,
              promo_pct: i === 2 ? 20 : i === 3 ? 15 : 0,
            }))}
            user={user}
            userData={userData}
            onAddToCart={addToCart}
            onWish={toggleWish}
            wishlist={wishlist}
            onOpenProductUrl={openProductUrl}
          />
        )}
      </section>

      <section className="sec">
        <div className="sec-head">
          <h2 className="sec-title">🔥 Produits populaires</h2>
          <span className="sec-link" onClick={() => goPage("produits")}>Voir tout →</span>
        </div>
        {produitsLoading ? (
          <div className="loading">
            <div className="spinner" /> Chargement...
          </div>
        ) : produits.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛍️</div>
            <p>Aucun produit pour l'instant</p>
          </div>
        ) : (
          <ProdGrid
            prods={produits.slice(0, 10)}
            user={user}
            userData={userData}
            onAddToCart={addToCart}
            onWish={toggleWish}
            wishlist={wishlist}
            onOpenProductUrl={openProductUrl}
          />
        )}
      </section>

      <div className="trust">
        <div className="trust-inner">
          {[
            { icon: "📱", t: "MTN MoMo & Orange", p: "Paiement mobile sécurisé" },
            { icon: "🔐", t: "Escrow Yorix", p: "Fonds protégés jusqu'à livraison" },
            { icon: "🚚", t: "Livraison J+1", p: "Yaoundé & Douala" },
            { icon: "🌟", t: "Vendeurs vérifiés", p: "Boutiques certifiées" },
          ].map((item) => (
            <div key={item.t} className="ti">
              <div className="ti-icon">{item.icon}</div>
              <div>
                <h4>{item.t}</h4>
                <p>{item.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="why-section">
        <div className="why-inner">
          <div style={{ textAlign: "center", marginBottom: 4 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--green-pale)", color: "var(--green)", padding: "4px 12px", borderRadius: 50, fontSize: ".72rem", fontWeight: 700, marginBottom: 8 }}>
              🏆 Pourquoi nous choisissons Yorix ?
            </div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.3rem", fontWeight: 800, color: "var(--ink)", letterSpacing: "-.5px" }}>
              La marketplace la plus fiable du Cameroun
            </h2>
          </div>
          <div className="why-grid">
            {[
              { icon: "🚚", title: "Livraison rapide", desc: "Livraison le jour même ou J+1 sur Yaoundé et Douala. Suivi GPS en temps réel." },
              { icon: "✅", title: "Produits vérifiés", desc: "Chaque vendeur est contrôlé. Produits authentiques garantis ou remboursés." },
              { icon: "🔒", title: "Paiement sécurisé", desc: "MTN MoMo, Orange Money, Escrow Yorix. Votre argent libéré à la réception." },
              { icon: "📱", title: "Support WhatsApp", desc: "Notre équipe répond 7j/7 sur WhatsApp pour vous aider à chaque étape." },
            ].map((w) => (
              <div key={w.title} className="why-card">
                <div className="why-icon">{w.icon}</div>
                <div className="why-title">{w.title}</div>
                <div className="why-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="sec">
        <div className="sec-head">
          <h2 className="sec-title">🧑‍💼 Prestataires de confiance</h2>
          <span className="sec-link" onClick={() => goPage("prestataires")}>Voir tous →</span>
        </div>
        <div className="prest-grid">
          {allServices.length === 0 ? (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 30, color: "var(--gray)" }}>
              Aucun prestataire pour le moment.
            </div>
          ) : (
            allServices.slice(0, 3).map((s) => (
              <div key={s.id} className="prest-card">
                <div className="prest-top">
                  <div className="prest-av">🧑‍💼</div>
                  <div>
                    <div className="prest-name">{s.provider_nom || "Prestataire"}</div>
                    <div className="prest-meta">{s.nom}</div>
                  </div>
                </div>
                <div className="prest-tags">
                  {s.categorie && <span className="ptag">{s.categorie}</span>}
                  {s.ville && <span className="ptag">📍 {s.ville}</span>}
                </div>
                <div className="prest-footer">
                  <div>
                    <div className="prest-price">{Number(s.prix).toLocaleString()} F</div>
                    <div style={{ fontSize: ".69rem", color: "var(--gray)" }}>
                      ⭐ {s.note || 0} · {s.nombre_avis || 0} avis
                    </div>
                  </div>
                  <button
                    className="btn-hire"
                    onClick={() =>
                      window.open(
                        `https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(`Bonjour, je cherche un prestataire pour : ${s.nom} (${s.provider_nom})`)}`,
                        "_blank"
                      )
                    }
                  >
                    Contacter
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <div className="newsletter">
        <div className="nl-title">📬 Restez informé(e)</div>
        <p className="nl-sub">Les meilleures offres Yorix directement dans votre boîte mail.</p>
        {nlSent ? (
          <div style={{ background: "rgba(255,255,255,.2)", borderRadius: 8, padding: "9px 18px", color: "#fff", fontWeight: 600 }}>✅ Vous êtes abonné(e) !</div>
        ) : (
          <div className="nl-form">
            <input className="nl-input" placeholder="Votre email..." value={nlEmail} onChange={(e) => setNlEmail(e.target.value)} />
            <button
              className="nl-btn"
              onClick={async () => {
                if (nlEmail) {
                  await supabase.from("newsletter").insert({ email: nlEmail }).catch((e) => console.warn(e?.message));
                  setNlSent(true);
                }
              }}
            >
              S'abonner 🚀
            </button>
          </div>
        )}
      </div>

      <div className="wa-sticky">
        <span className="wa-sticky-text">📱 Commander maintenant</span>
        <button
          className="wa-sticky-btn"
          onClick={() => window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent("Bonjour Yorix ! Je veux commander 🛍️")}`, "_blank")}
        >
          Commander via WhatsApp
        </button>
      </div>
    </div>
  );
}
