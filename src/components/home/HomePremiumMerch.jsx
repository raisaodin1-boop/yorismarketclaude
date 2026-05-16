import { HOMEPAGE_MERCH_TILES, MERCH_HUBS } from "../../lib/merchHubs";
import { productMatchesMadeInFilter } from "../../lib/madeInCameroon";
import { MadeInCameroonBadge } from "../MadeInCameroonBadge";
import { buildEntitySlug } from "../../lib/seoRoutes";
import "./homePremiumMerch.css";

/**
 * Blocs merchandising premium homepage — Made in CM, Top, Tendances, etc.
 */
export function HomePremiumMerch({ goPage, produits = [], locale = "fr" }) {
  const isEn = locale === "en";
  const madeIn = produits.filter(productMatchesMadeInFilter).slice(0, 8);

  return (
    <section className="hpm-root" aria-labelledby="hpm-title">
      <div className="hpm-head">
        <h2 id="hpm-title" className="hpm-title">
          {isEn ? "Discover · Trust · Buy local" : "Découvrir · Confiance · Acheter local"}
        </h2>
        <p className="hpm-lead">
          {isEn
            ? "Yorix is more than categories — it's national pride, trends and business opportunities."
            : "Yorix, c'est plus que des rayons : fierté nationale, tendances et opportunités business."}
        </p>
      </div>

      <div className="hpm-tiles">
        {HOMEPAGE_MERCH_TILES.map(({ hub, accent }) => {
          const h = MERCH_HUBS[hub];
          if (!h) return null;
          const shortTitle = (isEn ? h.titleEn : h.titleFr).split("—")[0].trim();
          return (
            <button
              key={hub}
              type="button"
              className="hpm-tile"
              style={{ "--hpm-accent": accent }}
              onClick={() => goPage("merchHub", { merchHub: hub })}
            >
              <span className="hpm-tile-emoji" aria-hidden>
                {h.emoji}
              </span>
              <span className="hpm-tile-label">{shortTitle}</span>
              <span className="hpm-tile-cta">{isEn ? "Explore →" : "Explorer →"}</span>
            </button>
          );
        })}
      </div>

      {madeIn.length > 0 && (
        <div className="hpm-mic-block">
          <div className="hpm-mic-head">
            <div>
              <h3 className="hpm-mic-title">Made in Cameroun 🇨🇲</h3>
              <p className="hpm-mic-sub">
                {isEn
                  ? "Local products — auto-detected or seller-declared, admin-verified when marked ✔"
                  : "Produits locaux — détection auto ou déclaration vendeur, validation admin si ✔"}
              </p>
            </div>
            <button
              type="button"
              className="hpm-mic-all"
              onClick={() => goPage("merchHub", { merchHub: "made-in-cameroun" })}
            >
              {isEn ? "View all" : "Tout voir"} →
            </button>
          </div>
          <div className="hpm-mic-scroll">
            {madeIn.map((p) => (
              <article
                key={p.id}
                className="hpm-mic-card"
                role="button"
                tabIndex={0}
                onClick={() => goPage("productDetail", { productSlug: buildEntitySlug(p.name_fr, p.id) })}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  goPage("productDetail", { productSlug: buildEntitySlug(p.name_fr, p.id) })
                }
              >
                <div className="hpm-mic-card-img">
                  {p.image ? <img src={p.image} alt="" loading="lazy" /> : <span>📦</span>}
                  <MadeInCameroonBadge product={p} size="sm" />
                </div>
                <div className="hpm-mic-card-name">{p.name_fr}</div>
                <div className="hpm-mic-card-price">{Number(p.prix || 0).toLocaleString()} FCFA</div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
