import { useEffect, useMemo, useState } from "react";
import { BadgeCheck, Package, Shield, Star, Truck } from "lucide-react";
import { ProdGrid } from "../components/ProdGrid";
import { supabase } from "../lib/supabase";
import { parseEntitySlug } from "../lib/seoRoutes";
import "./sellerStorefront.css";

/**
 * Vitrine fournisseur publique — style storefront Alibaba.
 */
export function SellerStorefrontPage({
  sellerSlug,
  locale = "fr",
  user,
  userData,
  wishlist,
  addToCart,
  toggleWish,
  openProductUrl,
  goPage,
}) {
  const isEn = locale === "en";
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const sellerId = useMemo(() => parseEntitySlug(sellerSlug || "").id, [sellerSlug]);

  useEffect(() => {
    if (!sellerId) {
      setProfile(null);
      setProducts([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    Promise.all([
      supabase.from("profiles").select("*").eq("id", sellerId).maybeSingle(),
      supabase
        .from("products")
        .select("*")
        .eq("vendeur_id", sellerId)
        .or("actif.eq.true,actif.is.null")
        .order("sponsorise", { ascending: false })
        .order("vente_total", { ascending: false, nullsFirst: false })
        .limit(80),
    ])
      .then(([profRes, prodRes]) => {
        if (cancelled) return;
        if (profRes.error) console.warn("seller profile:", profRes.error.message);
        if (prodRes.error) console.warn("seller products:", prodRes.error.message);
        setProfile(profRes.data || null);
        setProducts((prodRes.data || []).filter((p) => p.actif !== false && !p.is_archived));
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [sellerId]);

  const displayName =
    profile?.nom ||
    products[0]?.vendeur_nom ||
    (isEn ? "Yorix supplier" : "Fournisseur Yorix");

  const totalSales = products.reduce((s, p) => s + (Number(p.vente_total) || 0), 0);
  const verified = profile?.verifie === true;
  const avatarLetter = (displayName[0] || "Y").toUpperCase();

  if (!sellerId) {
    return (
      <section className="sec anim seller-store">
        <p>{isEn ? "Supplier not found." : "Fournisseur introuvable."}</p>
        <button type="button" className="form-submit" style={{ width: "auto" }} onClick={() => goPage("produits")}>
          {isEn ? "Browse catalog" : "Voir le catalogue"}
        </button>
      </section>
    );
  }

  return (
    <section className="seller-store sec anim yorix-page-flow">
      <button
        type="button"
        onClick={() => goPage("produits")}
        style={{
          background: "none",
          border: "none",
          color: "var(--gray)",
          cursor: "pointer",
          fontSize: "0.82rem",
          marginBottom: 12,
          padding: 0,
        }}
      >
        ← {isEn ? "Back to catalog" : "Retour au catalogue"}
      </button>

      <header className="seller-store-hero">
        <div className="seller-store-avatar" aria-hidden>
          {avatarLetter}
        </div>
        <div>
          <h1 className="seller-store-name">{displayName}</h1>
          <p className="seller-store-meta">
            {profile?.ville || products[0]?.ville || "Cameroun"}
            {profile?.created_at
              ? ` · ${isEn ? "Member since" : "Membre depuis"} ${new Date(profile.created_at).getFullYear()}`
              : ""}
          </p>
          <div className="seller-store-badges">
            {verified && (
              <span className="seller-store-badge seller-store-badge--verified">
                <BadgeCheck size={12} aria-hidden /> {isEn ? "Verified seller" : "Vendeur vérifié"}
              </span>
            )}
            <span className="seller-store-badge">
              <Shield size={12} aria-hidden /> Protect+
            </span>
            <span className="seller-store-badge">
              <Truck size={12} aria-hidden /> Yorix Ride
            </span>
            {totalSales >= 20 && (
              <span className="seller-store-badge">
                <Star size={12} aria-hidden /> {isEn ? "Top seller" : "Top vendeur"}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="seller-store-stats">
        <div className="seller-store-stat">
          <span className="seller-store-stat-val">{products.length}</span>
          <span className="seller-store-stat-lbl">{isEn ? "Listings" : "Annonces"}</span>
        </div>
        <div className="seller-store-stat">
          <span className="seller-store-stat-val">{totalSales}</span>
          <span className="seller-store-stat-lbl">{isEn ? "Sales" : "Ventes"}</span>
        </div>
        <div className="seller-store-stat">
          <span className="seller-store-stat-val">
            <Package size={18} style={{ verticalAlign: "middle" }} aria-hidden />
          </span>
          <span className="seller-store-stat-lbl">{isEn ? "B2B / wholesale" : "B2B / gros"}</span>
        </div>
      </div>

      <div className="seller-store-section">
        <h2>{isEn ? "Store catalog" : "Catalogue boutique"}</h2>
        {loading ? (
          <div className="loading" style={{ justifyContent: "center", padding: 32 }}>
            <div className="spinner" />
          </div>
        ) : products.length === 0 ? (
          <p style={{ color: "var(--gray)" }}>
            {isEn ? "No active products for this supplier." : "Aucun produit actif pour ce fournisseur."}
          </p>
        ) : (
          <ProdGrid
            prods={products}
            user={user}
            userData={userData}
            onAddToCart={addToCart}
            onWish={toggleWish}
            wishlist={wishlist}
            onOpenProductUrl={openProductUrl}
            onOpenSellerUrl={null}
            siteLocale={locale}
          />
        )}
      </div>
    </section>
  );
}
