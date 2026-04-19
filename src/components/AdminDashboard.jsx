import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { ROLE_LABELS } from "../lib/constants";
import { LoyaltyAdminTab } from "./LoyaltyAdminTab";

// ─────────────────────────────────────────────────────────────
// COMPOSANT : ADMIN DASHBOARD — Yorix CM (version pro complète)
// ─────────────────────────────────────────────────────────────
export function AdminDashboard({ user, userData, goPage }) {
  // ═══════════ ÉTATS PRINCIPAUX ═══════════
  const [adminTab, setAdminTab]     = useState("overview");
  const [loading, setLoading]       = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [toast, setToast]           = useState(null);
  const [loadError, setLoadError]   = useState(null);

  // ═══════════ DONNÉES ═══════════
  const [stats, setStats] = useState({
    users: 0, products: 0, orders: 0, deliveries: 0,
    revenue: 0, revenueToday: 0, revenueWeek: 0, commissionTotal: 0,
    vendeurs: 0, livreurs: 0, buyers: 0, providers: 0,
    ruptures: 0, enAttente: 0, livrees: 0,
  });
  const [produits, setProduits]                 = useState([]);
  const [utilisateurs, setUtilisateurs]         = useState([]);
  const [commandes, setCommandes]               = useState([]);
  const [adminDeliveries, setAdminDeliveries]   = useState([]);
  const [adminLivreurs, setAdminLivreurs]       = useState([]);
  const [prestatairesList, setPrestatairesList] = useState([]);
  const [chartVentes, setChartVentes]           = useState([]);
  const [chartInscrits, setChartInscrits]       = useState([]);
  const [topProduits, setTopProduits]           = useState([]);

  // ═══════════ FILTRES ═══════════
  const [searchProd, setSearchProd]             = useState("");
  const [filterProdCat, setFilterProdCat]       = useState("");
  const [filterProdStatut, setFilterProdStatut] = useState("");
  const [searchUser, setSearchUser]             = useState("");
  const [filterRole, setFilterRole]             = useState("");
  const [filterOrder, setFilterOrder]           = useState("");
  const [sortOrder, setSortOrder]               = useState("desc");
  const [adminDelivFilter, setAdminDelivFilter] = useState("all");
  const [prestFilter, setPrestFilter]           = useState("pending");

  // ═══════════ MODALS ═══════════
  const [selectedProd, setSelectedProd]       = useState(null);
  const [selectedOrder, setSelectedOrder]     = useState(null);
  const [selectedUser, setSelectedUser]       = useState(null);
  const [selectedPrest, setSelectedPrest]     = useState(null);
  const [assignModalOpen, setAssignModalOpen] = useState(null);

  // ═══════════ SÉCURITÉ ADMIN ═══════════
  if (!user || (userData?.role !== "admin" && userData?.role !== "superadmin")) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 16, padding: 40 }}>
        <div style={{ fontSize: "4rem" }}>🔒</div>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "var(--ink)" }}>Accès refusé</div>
        <p style={{ color: "var(--gray)", textAlign: "center", maxWidth: 400, lineHeight: 1.7 }}>
          Cette page est réservée aux administrateurs Yorix.<br />
          Connectez-vous avec un compte admin pour y accéder.
        </p>
        <button className="form-submit" style={{ width: "auto", padding: "10px 24px" }} onClick={() => goPage("home")}>
          ← Retour à l'accueil
        </button>
      </div>
    );
  }

  // ═══════════ TOAST ═══════════
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ═══════════ CHARGEMENT DES DONNÉES ═══════════
  useEffect(() => { loadAll(); /* eslint-disable-next-line */ }, [refreshKey]);

  const loadAll = async () => {
    setLoading(true);
    setLoadError(null);

    try {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);

      const results = await Promise.allSettled([
        supabase.from("users").select("*").order("created_at", { ascending: false }).limit(1000),
        supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(1000),
        supabase.from("products").select("*").order("created_at", { ascending: false }).limit(1000),
        supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(1000),
        supabase.from("deliveries").select("*").order("commande_at", { ascending: false }).limit(500),
        supabase.from("prestataires").select("*").order("created_at", { ascending: false }).limit(500),
      ]);

      const [usersR, profilesR, prodsR, ordersR, delivsR, prestsR] = results;

      const rawUsers    = usersR.status    === "fulfilled" ? (usersR.value.data    || []) : [];
      const rawProfiles = profilesR.status === "fulfilled" ? (profilesR.value.data || []) : [];
      const prodsData   = prodsR.status    === "fulfilled" ? (prodsR.value.data    || []) : [];
      const ordersData  = ordersR.status   === "fulfilled" ? (ordersR.value.data   || []) : [];
      const delivsData  = delivsR.status   === "fulfilled" ? (delivsR.value.data   || []) : [];
      const prestsData  = prestsR.status   === "fulfilled" ? (prestsR.value.data   || []) : [];

      // Fusionner users + profiles (dédupliqué par id/uid)
      const mergedMap = new Map();
      [...rawUsers, ...rawProfiles].forEach(u => {
        const key = u.uid || u.id;
        if (!key) return;
        const existing = mergedMap.get(key) || {};
        mergedMap.set(key, { ...existing, ...u, uid: key });
      });
      const usersData = Array.from(mergedMap.values());

      const livreursData = usersData.filter(u => u.role === "delivery");

      const commissionTotal = ordersData.reduce((s, o) => s + (o.commission || 0), 0);
      const revenueTotal    = ordersData.reduce((s, o) => s + (o.montant || 0), 0);
      const revenueToday    = ordersData.filter(o => new Date(o.created_at) >= today).reduce((s, o) => s + (o.commission || 0), 0);
      const revenueWeek     = ordersData.filter(o => new Date(o.created_at) >= weekAgo).reduce((s, o) => s + (o.commission || 0), 0);

      const chartV = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(); d.setDate(d.getDate() - 6 + i); d.setHours(0, 0, 0, 0);
        const next = new Date(d); next.setDate(next.getDate() + 1);
        const orders = ordersData.filter(o => { const t = new Date(o.created_at); return t >= d && t < next; });
        return {
          label:   d.toLocaleDateString("fr-FR", { weekday: "short" }),
          orders:  orders.length,
          revenue: orders.reduce((s, o) => s + (o.commission || 0), 0),
        };
      });

      const chartI = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(); d.setDate(d.getDate() - 6 + i); d.setHours(0, 0, 0, 0);
        const next = new Date(d); next.setDate(next.getDate() + 1);
        const cnt = usersData.filter(u => { const t = new Date(u.created_at); return t >= d && t < next; }).length;
        return { label: d.toLocaleDateString("fr-FR", { weekday: "short" }), val: cnt };
      });

      const topP = prodsData
        .filter(p => (p.vente_total || 0) > 0)
        .sort((a, b) => (b.vente_total || 0) - (a.vente_total || 0))
        .slice(0, 5);

      setStats({
        users:          usersData.length,
        products:       prodsData.length,
        orders:         ordersData.length,
        deliveries:     delivsData.length,
        revenue:        revenueTotal,
        commissionTotal,
        revenueToday,
        revenueWeek,
        vendeurs:       usersData.filter(u => u.role === "seller").length,
        livreurs:       livreursData.length,
        buyers:         usersData.filter(u => u.role === "buyer" || !u.role).length,
        providers:      usersData.filter(u => u.role === "provider").length,
        ruptures:       prodsData.filter(p => (p.stock || 0) === 0).length,
        enAttente:      ordersData.filter(o => o.status === "pending").length,
        livrees:        ordersData.filter(o => o.status === "livre").length,
      });
      setUtilisateurs(usersData);
      setProduits(prodsData);
      setCommandes(ordersData);
      setAdminDeliveries(delivsData);
      setAdminLivreurs(livreursData);
      setPrestatairesList(prestsData);
      setChartVentes(chartV);
      setChartInscrits(chartI);
      setTopProduits(topP);

      if (usersData.length === 0 && prodsData.length === 0 && ordersData.length === 0) {
        setLoadError("⚠️ Aucune donnée chargée. Vérifiez les politiques RLS Supabase (tables users, products, orders).");
      }
    } catch (e) {
      console.error("[Admin] ❌ Erreur critique:", e);
      setLoadError("Erreur : " + e.message);
      showToast("Erreur de chargement", "error");
    }
    setLoading(false);
  };

  // ═══════════ REALTIME DELIVERIES ═══════════
  useEffect(() => {
    const channel = supabase
      .channel("admin-deliveries-rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "deliveries" }, () => {
        supabase.from("deliveries").select("*").order("commande_at", { ascending: false }).limit(500)
          .then(({ data }) => { if (data) setAdminDeliveries(data); });
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  // ═══════════ ACTIONS LIVRAISONS ═══════════
  const assignerLivreur = async (delivery, livreur) => {
    try {
      const { error } = await supabase.from("deliveries").update({
        livreur_id:       livreur.id || livreur.uid,
        livreur_nom:      livreur.nom,
        livreur_tel:      livreur.telephone,
        livreur_vehicule: livreur.vehicule || "Moto",
        statut:           "preparation",
        preparation_at:   new Date().toISOString(),
      }).eq("id", delivery.id);
      if (error) throw error;

      const msgLivreur = [
        "🚚 *NOUVELLE MISSION YORIX*",
        "",
        "📦 *Code :* " + delivery.code_suivi,
        "",
        "👤 *CLIENT*",
        "Nom : " + (delivery.client_nom || "N/A"),
        "Tél : " + (delivery.client_tel || "N/A"),
        "",
        "📍 *TRAJET*",
        "🔴 Collecte : " + (delivery.adresse_collecte || "N/A"),
        "🟢 Livraison : " + (delivery.adresse_livraison || "N/A"),
        "",
        "⏱️ Temps estimé : " + (delivery.temps_estime_min || 25) + " min",
        "📏 Distance : " + (delivery.distance_km || 3.5) + " km",
        "",
        "✅ Connecte-toi sur yorix.cm pour accepter",
        "",
        "Bon courage ! 💪",
      ].join("\n");

      const phoneClean = (livreur.telephone || "").replace(/[^0-9]/g, "");
      if (phoneClean) {
        window.open("https://wa.me/" + phoneClean + "?text=" + encodeURIComponent(msgLivreur), "_blank");
      }

      showToast("✅ Livreur " + livreur.nom + " assigné !");
      setAssignModalOpen(null);
      setRefreshKey(k => k + 1);
    } catch (err) {
      showToast("Erreur : " + err.message, "error");
    }
  };

  const assignerLivreurManuel = async (delivery) => {
    const nom = window.prompt("Nom du livreur :");
    if (!nom || !nom.trim()) return;
    const tel = window.prompt("Téléphone du livreur (+237...) :");
    if (!tel || !tel.trim()) return;

    try {
      const { error } = await supabase.from("deliveries").update({
        livreur_nom:      nom.trim(),
        livreur_tel:      tel.trim(),
        livreur_vehicule: "Moto",
        statut:           "preparation",
        preparation_at:   new Date().toISOString(),
      }).eq("id", delivery.id);
      if (error) throw error;

      const phoneClean = tel.replace(/[^0-9]/g, "");
      const msg = [
        "🚚 NOUVELLE MISSION YORIX",
        "",
        "Code : " + delivery.code_suivi,
        "Client : " + delivery.client_nom + " (" + delivery.client_tel + ")",
        "Collecte : " + delivery.adresse_collecte,
        "Livraison : " + delivery.adresse_livraison,
      ].join("\n");
      window.open("https://wa.me/" + phoneClean + "?text=" + encodeURIComponent(msg), "_blank");

      showToast("✅ Livreur " + nom + " assigné manuellement !");
      setRefreshKey(k => k + 1);
    } catch (err) {
      showToast("Erreur : " + err.message, "error");
    }
  };

  const changerStatutLivraison = async (delivery, newStatut) => {
    const updates = { statut: newStatut };
    const now = new Date().toISOString();
    if (newStatut === "preparation") updates.preparation_at = now;
    if (newStatut === "collecte")    updates.collecte_at    = now;
    if (newStatut === "en_route")    updates.en_route_at    = now;
    if (newStatut === "livre")       updates.livre_at       = now;

    const { error } = await supabase.from("deliveries").update(updates).eq("id", delivery.id);
    if (error) { showToast("Erreur : " + error.message, "error"); return; }
    showToast("✅ Statut mis à jour → " + newStatut);
    setRefreshKey(k => k + 1);
  };

  // ═══════════ ACTIONS PRODUITS ═══════════
  const supprimerProduit = async (id, nom) => {
    if (!window.confirm(`Supprimer le produit "${nom}" ?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { showToast("Erreur : " + error.message, "error"); return; }
    setProduits(p => p.filter(x => x.id !== id));
    showToast(`Produit "${nom}" supprimé`);
  };

  const toggleActifProduit = async (id, actif) => {
    const { error } = await supabase.from("products").update({ actif: !actif }).eq("id", id);
    if (error) { showToast("Erreur : " + error.message, "error"); return; }
    setProduits(p => p.map(x => x.id === id ? { ...x, actif: !actif } : x));
    showToast(actif ? "Produit désactivé" : "Produit activé");
  };

  // ═══════════ ACTIONS UTILISATEURS ═══════════
  const changerRole = async (uid, newRole) => {
    const [r1, r2] = await Promise.all([
      supabase.from("users").update({ role: newRole }).eq("uid", uid),
      supabase.from("profiles").update({ role: newRole }).eq("id", uid),
    ]);
    if (r1.error && r2.error) { showToast("Erreur changement rôle", "error"); return; }
    setUtilisateurs(u => u.map(x => (x.uid || x.id) === uid ? { ...x, role: newRole } : x));
    showToast(`Rôle changé → ${newRole}`);
  };

  const supprimerUser = async (uid, email) => {
    if (!window.confirm(`Supprimer "${email}" ?`)) return;
    const { error } = await supabase.from("users").delete().eq("uid", uid);
    if (error) { showToast("Erreur : " + error.message, "error"); return; }
    setUtilisateurs(u => u.filter(x => (x.uid || x.id) !== uid));
    showToast(`Utilisateur supprimé`);
  };

  const toggleVendeur = async (uid, actif) => {
    const { error } = await supabase.from("users").update({ actif: !actif }).eq("uid", uid);
    if (error) { showToast("Erreur : " + error.message, "error"); return; }
    setUtilisateurs(u => u.map(x => (x.uid || x.id) === uid ? { ...x, actif: !actif } : x));
    showToast(actif ? "Vendeur suspendu" : "Vendeur réactivé");
  };

  const verifierUser = async (uid, verifie) => {
    await supabase.from("users").update({ verifie: !verifie }).eq("uid", uid).catch(() => {});
    setUtilisateurs(u => u.map(x => (x.uid || x.id) === uid ? { ...x, verifie: !verifie } : x));
    showToast(verifie ? "Vérification retirée" : "Utilisateur vérifié ✅");
  };

  // ═══════════ ACTIONS COMMANDES ═══════════
  const validerCommande = async (id) => {
    const { error } = await supabase.from("orders").update({ status: "validee" }).eq("id", id);
    if (error) { showToast("Erreur : " + error.message, "error"); return; }
    setCommandes(c => c.map(x => x.id === id ? { ...x, status: "validee" } : x));
    showToast("Commande validée ✅");
  };

  const marquerLivre = async (id) => {
    const { error } = await supabase.from("orders").update({ status: "livre", livraison_status: "livre", escrow_status: "libere" }).eq("id", id);
    if (error) { showToast("Erreur : " + error.message, "error"); return; }
    setCommandes(c => c.map(x => x.id === id ? { ...x, status: "livre", livraison_status: "livre", escrow_status: "libere" } : x));
    showToast("Commande marquée livrée 📦");
  };

  const annulerCommande = async (id) => {
    if (!window.confirm("Annuler cette commande ?")) return;
    const { error } = await supabase.from("orders").update({ status: "annulee" }).eq("id", id);
    if (error) { showToast("Erreur : " + error.message, "error"); return; }
    setCommandes(c => c.map(x => x.id === id ? { ...x, status: "annulee" } : x));
    showToast("Commande annulée");
  };

  // ═══════════ EXPORT CSV ═══════════
  const exportCSV = (data, filename) => {
    if (!data.length) { showToast("Aucune donnée à exporter", "error"); return; }
    const keys = Object.keys(data[0]);
    const csv = [keys.join(","), ...data.map(row => keys.map(k => `"${(row[k] || "").toString().replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
    showToast(`Export ${filename} téléchargé`);
  };

  // ═══════════ FILTRES CALCULÉS ═══════════
  const produitsFiltres = produits
    .filter(p => !searchProd || (p.name_fr || "").toLowerCase().includes(searchProd.toLowerCase()) || (p.vendeur_nom || "").toLowerCase().includes(searchProd.toLowerCase()))
    .filter(p => !filterProdCat || p.categorie === filterProdCat)
    .filter(p => filterProdStatut === "" ? true : filterProdStatut === "actif" ? p.actif : !p.actif);

  const usersFiltres = utilisateurs
    .filter(u => !searchUser || (u.email || "").toLowerCase().includes(searchUser.toLowerCase()) || (u.nom || "").toLowerCase().includes(searchUser.toLowerCase()))
    .filter(u => !filterRole || u.role === filterRole);

  const commandesFiltrees = [...commandes]
    .filter(o => !filterOrder || o.status === filterOrder)
    .sort((a, b) => sortOrder === "desc" ? new Date(b.created_at) - new Date(a.created_at) : new Date(a.created_at) - new Date(b.created_at));

  const sellers       = utilisateurs.filter(u => u.role === "seller");
  const livreursDispo = utilisateurs.filter(u => u.role === "delivery");

  const alertes = [
    ...produits.filter(p => (p.stock || 0) === 0).map(p => ({ type: "red", label: "Stock 0", msg: `📦 ${p.name_fr || "Produit"} — ${p.vendeur_nom || "?"}` })),
    ...commandes.filter(o => o.status === "pending").map(o => ({ type: "yellow", label: "Commande", msg: `⏳ ${o.client_nom || "Client"} — ${(o.montant || 0).toLocaleString()} FCFA` })),
    ...adminDeliveries.filter(d => d.statut === "commande_recue" && !d.livreur_id).map(d => ({ type: "yellow", label: "Livraison", msg: `🚚 ${d.code_suivi} attend un livreur` })),
    ...utilisateurs.filter(u => new Date() - new Date(u.created_at) < 86400000).map(u => ({ type: "green", label: "Nouveau", msg: `🆕 ${u.nom || u.email || "User"} — ${u.role || "buyer"}` })),
  ];

  const maxChartV   = Math.max(...chartVentes.map(d => d.orders), 1);
  const maxChartRev = Math.max(...chartVentes.map(d => d.revenue), 1);
  const maxChartI   = Math.max(...chartInscrits.map(d => d.val), 1);

  const CATS_LIST = ["Téléphones & HighTech", "Mode & Accesoires", "Alimentation", "Maison & Decoration", "Agricole", "Beauté & Soins", "BTP", "Automobile", "Éducation", "Services"];

  // ═══════════ NAVIGATION ═══════════
  const deliveriesEnAttente = adminDeliveries.filter(d => d.statut === "commande_recue" && !d.livreur_id).length;
  const prestPending = prestatairesList.filter(p => p.status === "pending").length;

  const NAV = [
    { id: "overview",     icon: "📊", label: "Vue d'ensemble" },
    { id: "deliveries",   icon: "🚚", label: "Livraisons",   badge: deliveriesEnAttente || null },
    { id: "produits",     icon: "📦", label: "Produits",     badge: produits.filter(p => (p.stock || 0) === 0).length || null },
    { id: "commandes",    icon: "🛍️", label: "Commandes",    badge: commandes.filter(o => o.status === "pending").length || null },
    { id: "utilisateurs", icon: "👥", label: "Utilisateurs" },
    { id: "vendeurs",     icon: "🏪", label: "Vendeurs" },
    { id: "livreurs",     icon: "🏍️", label: "Livreurs" },
    { id: "prestataires", icon: "👷", label: "Prestataires", badge: prestPending || null },
    { id: "revenus",      icon: "💰", label: "Revenus" },
    { id: "loyalty",      icon: "🌟", label: "Yorix Points" },
    { id: "alertes",      icon: "🔔", label: "Alertes",      badge: alertes.length || null },
  ];

  // ═══════════ HELPERS UI ═══════════
  const StatCard = ({ icon, val, lbl, trend, col, ic, onClick }) => (
    <div
      className="stat-card"
      style={{ cursor: onClick ? "pointer" : "default", transition: "transform .15s,box-shadow .15s" }}
      onClick={onClick}
      onMouseOver={e => { if (onClick) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,.1)"; } }}
      onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div className="stat-card-icon" style={{ background: col || "var(--surface2)" }}><span>{icon}</span></div>
      <div className="stat-card-val">{val}</div>
      <div className="stat-card-lbl">{lbl}</div>
      {trend && <div className="stat-card-trend" style={{ color: ic || "var(--green)" }}>{trend}</div>}
    </div>
  );

  const BadgeStatut = ({ statut }) => {
    const map = {
      livre: "green", validee: "blue", pending: "yellow", annulee: "red",
      libere: "green", securise: "blue", rembourse: "gray",
      en_cours: "yellow", echec: "red",
    };
    return <span className={`admin-badge admin-badge-${map[statut] || "gray"}`}>{statut || "—"}</span>;
  };

  const StatutLivraison = ({ statut }) => {
    const cfg = {
      commande_recue: { label: "⏳ En attente",  color: "#f59e0b", bg: "#fef3c7" },
      preparation:    { label: "📦 Préparation", color: "#3b82f6", bg: "#dbeafe" },
      collecte:       { label: "🏪 Collecté",    color: "#8b5cf6", bg: "#ede9fe" },
      en_route:       { label: "🏍️ En route",    color: "#10b981", bg: "#d1fae5" },
      livre:          { label: "✅ Livré",       color: "#22c55e", bg: "#dcfce7" },
      annule:         { label: "❌ Annulé",      color: "#ef4444", bg: "#fee2e2" },
    }[statut] || { label: statut, color: "#64748b", bg: "#f1f5f9" };

    return (
      <span style={{
        padding: "3px 10px", borderRadius: 20,
        background: cfg.bg, color: cfg.color,
        fontSize: ".72rem", fontWeight: 700,
        border: "1px solid " + cfg.color,
        display: "inline-block",
      }}>
        {cfg.label}
      </span>
    );
  };

  // ═══════════ LOADING ═══════════
  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 14, color: "var(--green)", flexDirection: "column" }}>
        <div style={{ width: 46, height: 46, border: "4px solid var(--border)", borderTopColor: "var(--green)", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem" }}>Chargement du Yorix Admin...</div>
        <div style={{ fontSize: ".8rem", color: "var(--gray)" }}>Récupération des données Supabase</div>
      </div>
    );
  }

  // ═══════════ RENDU PRINCIPAL ═══════════
  return (
    <div className="admin-layout" style={{ minHeight: "calc(100vh - 130px)" }}>

      {/* ── TOAST ── */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 9999,
          background: toast.type === "error" ? "#ce1126" : "var(--green)",
          color: "#fff", padding: "12px 20px", borderRadius: 10,
          fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".85rem",
          boxShadow: "0 4px 20px rgba(0,0,0,.2)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          {toast.type === "error" ? "❌" : "✅"} {toast.msg}
        </div>
      )}

      {/* ── MODAL ASSIGNATION LIVREUR ── */}
      {assignModalOpen && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setAssignModalOpen(null)}>
          <div className="modal" style={{ maxWidth: 600 }}>
            <button className="modal-close" onClick={() => setAssignModalOpen(null)}>✕</button>

            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.3rem", fontWeight: 800, color: "var(--ink)", marginBottom: 4 }}>
              🏍️ Assigner un livreur
            </h2>
            <p style={{ fontSize: ".82rem", color: "var(--gray)", marginBottom: 16 }}>
              Livraison <strong style={{ color: "var(--green)" }}>{assignModalOpen.code_suivi}</strong> · {assignModalOpen.client_nom}
            </p>

            <div style={{ background: "var(--surface2)", borderRadius: 10, padding: 12, marginBottom: 14, fontSize: ".78rem", lineHeight: 1.7 }}>
              <div>🔴 <strong>Collecte :</strong> {assignModalOpen.adresse_collecte}</div>
              <div>🟢 <strong>Livraison :</strong> {assignModalOpen.adresse_livraison}</div>
              <div>📞 <strong>Client :</strong> {assignModalOpen.client_tel}</div>
            </div>

            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".92rem", color: "var(--green)", marginBottom: 10 }}>
              Livreurs disponibles ({adminLivreurs.length})
            </div>

            {adminLivreurs.length === 0 ? (
              <div style={{ textAlign: "center", padding: 30, background: "var(--surface2)", borderRadius: 10, color: "var(--gray)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 6 }}>😕</div>
                <p style={{ fontSize: ".85rem", marginBottom: 10 }}>Aucun livreur inscrit.</p>
                <button
                  onClick={() => { setAssignModalOpen(null); assignerLivreurManuel(assignModalOpen); }}
                  style={{
                    background: "var(--green)", color: "#fff", border: "none",
                    padding: "10px 18px", borderRadius: 8, cursor: "pointer",
                    fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem",
                  }}
                >
                  ➕ Assigner manuellement
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gap: 8, maxHeight: 360, overflowY: "auto" }}>
                {adminLivreurs.map(liv => (
                  <div key={liv.uid || liv.id} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    background: "var(--surface)", border: "1.5px solid var(--border)",
                    borderRadius: 10, padding: 10,
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: "var(--green-pale)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.3rem",
                    }}>🏍️</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".88rem" }}>
                        {liv.nom || "Livreur"}
                        {liv.verifie && <span style={{ marginLeft: 6, color: "var(--green)" }}>✓</span>}
                      </div>
                      <div style={{ fontSize: ".7rem", color: "var(--gray)" }}>
                        {liv.telephone || "N/A"}
                        {liv.note ? " · ⭐ " + liv.note : ""}
                      </div>
                    </div>
                    <button
                      onClick={() => assignerLivreur(assignModalOpen, liv)}
                      style={{
                        background: "var(--green)", color: "#fff", border: "none",
                        padding: "8px 14px", borderRadius: 8, cursor: "pointer",
                        fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".75rem",
                      }}
                    >
                      Assigner
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
              <button
                onClick={() => { setAssignModalOpen(null); assignerLivreurManuel(assignModalOpen); }}
                style={{
                  width: "100%", background: "var(--surface2)", color: "var(--ink)",
                  border: "1.5px solid var(--border)",
                  padding: "10px", borderRadius: 8, cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".82rem",
                }}
              >
                ➕ Assigner un livreur externe (saisie manuelle)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SIDEBAR ── */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 32, height: 32, background: "var(--green)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>⚙️</div>
            <div>
              <div className="admin-sidebar-logo-txt">Yorix Admin</div>
              <div className="admin-sidebar-logo-sub">Panneau de contrôle</div>
            </div>
          </div>
          <div style={{ fontSize: ".67rem", color: "rgba(255,255,255,.4)", marginTop: 6, padding: "6px 8px", background: "rgba(255,255,255,.04)", borderRadius: 6 }}>
            👤 {userData?.nom || user?.email?.split("@")[0] || "Admin"}
          </div>
        </div>

        {NAV.map(n => (
          <div key={n.id} className={`admin-nav-item${adminTab === n.id ? " active" : ""}`} onClick={() => setAdminTab(n.id)}>
            <span style={{ fontSize: "1rem" }}>{n.icon}</span>
            <span style={{ flex: 1 }}>{n.label}</span>
            {n.badge ? <span style={{ background: "#ce1126", color: "#fff", fontSize: ".6rem", fontWeight: 800, padding: "1px 6px", borderRadius: 50, minWidth: 18, textAlign: "center" }}>{n.badge}</span> : null}
          </div>
        ))}

        <div style={{ padding: "14px 16px 0", borderTop: "1px solid rgba(255,255,255,.07)", marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
          <button onClick={() => setRefreshKey(k => k + 1)} style={{ width: "100%", background: "rgba(79,209,125,.12)", color: "#4fd17d", border: "1px solid rgba(79,209,125,.2)", borderRadius: 7, padding: "8px", fontSize: ".75rem", cursor: "pointer" }}>
            🔄 Actualiser les données
          </button>
          <button onClick={() => goPage("home")} style={{ width: "100%", background: "rgba(255,255,255,.05)", color: "rgba(255,255,255,.5)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 7, padding: "8px", fontSize: ".75rem", cursor: "pointer" }}>
            ← Retour au site
          </button>
        </div>

        {/* Mini stats */}
        <div style={{ padding: "14px 16px", marginTop: 12, borderTop: "1px solid rgba(255,255,255,.07)" }}>
          <div style={{ fontSize: ".62rem", color: "rgba(255,255,255,.3)", fontWeight: 700, letterSpacing: ".1em", marginBottom: 6 }}>
            STATS RAPIDES
          </div>
          {[
            { l: "👥 Utilisateurs", v: stats.users,    c: "#4fd17d" },
            { l: "🏪 Vendeurs",    v: stats.vendeurs, c: "#60a5fa" },
            { l: "🏍️ Livreurs",   v: stats.livreurs, c: "#fbbf24" },
            { l: "🚚 Livraisons",  v: stats.deliveries, c: "#a78bfa" },
            { l: "📦 Produits",    v: stats.products, c: "#fb7185" },
            { l: "🛍️ Commandes",  v: stats.orders,   c: "#34d399" },
          ].map(s => (
            <div key={s.l} style={{ display: "flex", justifyContent: "space-between", fontSize: ".72rem", padding: "4px 0" }}>
              <span style={{ color: "rgba(255,255,255,.55)" }}>{s.l}</span>
              <span style={{ color: s.c, fontWeight: 700 }}>{s.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTENU PRINCIPAL ── */}
      <div className="admin-content">

        {/* Banner erreur */}
        {loadError && (
          <div style={{
            background: "#fff0f0", border: "1px solid #fecaca", color: "#ce1126",
            borderRadius: 10, padding: "12px 16px", marginBottom: 16,
            display: "flex", alignItems: "center", gap: 10, fontSize: ".85rem",
          }}>
            <span style={{ fontSize: "1.3rem" }}>⚠️</span>
            <div style={{ flex: 1 }}>{loadError}</div>
            <button onClick={() => setRefreshKey(k => k + 1)} style={{ background: "#ce1126", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: ".78rem", fontWeight: 700 }}>
              🔄 Réessayer
            </button>
          </div>
        )}

        {/* ════════ VUE D'ENSEMBLE ════════ */}
        {adminTab === "overview" && (
          <>
            <div className="admin-page-title">
              📊 Vue d'ensemble
              <span style={{ fontSize: ".72rem", color: "var(--gray)", fontWeight: 400, marginLeft: "auto" }}>
                {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>

            <div className="stat-cards-grid">
              <StatCard icon="👥" val={stats.users.toLocaleString()} lbl="Utilisateurs total" trend={`${stats.buyers} acheteurs · ${stats.vendeurs} vendeurs`} col="#e6f0ff" ic="#1a4a9a" onClick={() => setAdminTab("utilisateurs")} />
              <StatCard icon="🏍️" val={stats.livreurs} lbl="Livreurs inscrits" trend={`${adminDeliveries.filter(d => !d.livreur_id).length} en attente d'assignation`} col="#fff9e6" ic="#b8860b" onClick={() => setAdminTab("livreurs")} />
              <StatCard icon="📦" val={stats.products.toLocaleString()} lbl="Produits" trend={`${produits.filter(p => p.actif).length} actifs · ${stats.ruptures} en rupture`} col="#e6fff0" ic="#1a6b3a" onClick={() => setAdminTab("produits")} />
              <StatCard icon="🚚" val={stats.deliveries.toLocaleString()} lbl="Livraisons" trend={`${adminDeliveries.filter(d => d.statut === "livre").length} livrées`} col="#f3e8ff" ic="#7c3aed" onClick={() => setAdminTab("deliveries")} />
              <StatCard icon="🛍️" val={stats.orders.toLocaleString()} lbl="Commandes" trend={`${stats.enAttente} en attente · ${stats.livrees} livrées`} col="#ecfdf5" ic="#059669" onClick={() => setAdminTab("commandes")} />
              <StatCard icon="💰" val={`${stats.commissionTotal.toLocaleString()} F`} lbl="Commissions Yorix" trend="5% par transaction" col="#fff0f6" ic="#a0105a" onClick={() => setAdminTab("revenus")} />
              <StatCard icon="📅" val={`${stats.revenueToday.toLocaleString()} F`} lbl="Revenus aujourd'hui" trend="Commissions du jour" col="#f0fff4" ic="#276749" />
              <StatCard icon="📈" val={`${stats.revenueWeek.toLocaleString()} F`} lbl="Revenus 7 jours" trend="Cette semaine" col="#fef9f0" ic="#7b5a10" />
            </div>

            {deliveriesEnAttente > 0 && (
              <div style={{
                background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                border: "2px solid #f59e0b", borderRadius: 12,
                padding: 16, marginBottom: 18,
                display: "flex", alignItems: "center", gap: 14,
              }}>
                <div style={{ fontSize: "2.2rem" }}>🚚</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1rem", color: "#92400e" }}>
                    {deliveriesEnAttente} livraison{deliveriesEnAttente > 1 ? "s" : ""} en attente d'assignation !
                  </div>
                  <div style={{ fontSize: ".8rem", color: "#78350f", marginTop: 3 }}>
                    Assigne un livreur rapidement pour satisfaire tes clients.
                  </div>
                </div>
                <button onClick={() => setAdminTab("deliveries")} style={{
                  background: "#f59e0b", color: "#fff", border: "none",
                  padding: "10px 20px", borderRadius: 9, cursor: "pointer",
                  fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".85rem",
                }}>
                  🏍️ Assigner maintenant →
                </button>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div className="admin-section">
                <div className="admin-section-title">
                  📈 Commandes / jour
                  <span style={{ fontSize: ".69rem", color: "var(--gray)", fontWeight: 400 }}>7 derniers jours</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 100, marginBottom: 6 }}>
                  {chartVentes.map((d, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                      <div style={{ fontSize: ".6rem", color: "var(--gray)" }}>{d.orders || ""}</div>
                      <div style={{
                        width: "100%", borderRadius: "3px 3px 0 0",
                        height: `${Math.max((d.orders / maxChartV) * 80, d.orders > 0 ? 8 : 3)}px`,
                        background: i === chartVentes.length - 1 ? "var(--green)" : "var(--green-mid, #4fd17d)",
                        opacity: .85, transition: "height .5s",
                      }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  {chartVentes.map((d, i) => <div key={i} style={{ flex: 1, textAlign: "center", fontSize: ".6rem", color: "var(--gray)" }}>{d.label}</div>)}
                </div>
              </div>

              <div className="admin-section">
                <div className="admin-section-title">
                  👥 Inscriptions / jour
                  <span style={{ fontSize: ".69rem", color: "var(--gray)", fontWeight: 400 }}>7 derniers jours</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 100, marginBottom: 6 }}>
                  {chartInscrits.map((d, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                      <div style={{ fontSize: ".6rem", color: "var(--gray)" }}>{d.val || ""}</div>
                      <div style={{
                        width: "100%", borderRadius: "3px 3px 0 0",
                        height: `${Math.max((d.val / maxChartI) * 80, d.val > 0 ? 8 : 3)}px`,
                        background: "#818cf8", opacity: .85, transition: "height .5s",
                      }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  {chartInscrits.map((d, i) => <div key={i} style={{ flex: 1, textAlign: "center", fontSize: ".6rem", color: "var(--gray)" }}>{d.label}</div>)}
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div className="admin-section">
                <div className="admin-section-title">
                  🚚 Dernières livraisons
                  <button className="admin-action-btn" style={{ background: "var(--green)", color: "#fff", fontSize: ".65rem" }} onClick={() => setAdminTab("deliveries")}>
                    Voir tout →
                  </button>
                </div>
                {adminDeliveries.length === 0 ? (
                  <div style={{ fontSize: ".78rem", color: "var(--gray)", padding: "12px 0", textAlign: "center" }}>Aucune livraison</div>
                ) : (
                  adminDeliveries.slice(0, 4).map(d => (
                    <div key={d.id} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 0", borderBottom: "1px solid var(--border)",
                    }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 8,
                        background: "var(--green-pale)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1rem", flexShrink: 0,
                      }}>🚚</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".78rem", color: "var(--green)" }}>
                          {d.code_suivi}
                        </div>
                        <div style={{ fontSize: ".68rem", color: "var(--gray)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {d.client_nom} → {d.adresse_livraison}
                        </div>
                      </div>
                      <StatutLivraison statut={d.statut} />
                    </div>
                  ))
                )}
              </div>

              <div className="admin-section">
                <div className="admin-section-title">
                  🔔 Alertes actives
                  <button className="admin-action-btn" style={{ background: "var(--red)", color: "#fff", fontSize: ".65rem" }} onClick={() => setAdminTab("alertes")}>
                    {alertes.length} →
                  </button>
                </div>
                {alertes.length === 0
                  ? <div className="admin-alert admin-alert-green">✅ Aucune alerte — tout va bien !</div>
                  : alertes.slice(0, 4).map((a, i) => (
                    <div key={i} className={`admin-alert admin-alert-${a.type}`} style={{ marginBottom: 6 }}>
                      <span style={{ fontSize: ".65rem", fontWeight: 700, background: "rgba(0,0,0,.1)", padding: "1px 5px", borderRadius: 4, marginRight: 6 }}>{a.label}</span>
                      <span style={{ flex: 1, fontSize: ".75rem" }}>{a.msg}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </>
        )}

        {/* ════════ LIVRAISONS ════════ */}
        {adminTab === "deliveries" && (
          <>
            <div className="admin-page-title">
              🚚 Gestion des livraisons
              <span style={{ fontSize: ".75rem", background: "var(--green)", color: "#fff", padding: "3px 10px", borderRadius: 50, fontWeight: 600, marginLeft: 8 }}>
                {adminDeliveries.length}
              </span>
            </div>

            <div className="stat-cards-grid" style={{ marginBottom: 18 }}>
              <StatCard icon="⏳" val={adminDeliveries.filter(d => d.statut === "commande_recue").length} lbl="En attente" col="#fef3c7" ic="#f59e0b" />
              <StatCard icon="📦" val={adminDeliveries.filter(d => d.statut === "preparation").length} lbl="Préparation" col="#dbeafe" ic="#3b82f6" />
              <StatCard icon="🏍️" val={adminDeliveries.filter(d => ["collecte", "en_route"].includes(d.statut)).length} lbl="En route" col="#d1fae5" ic="#10b981" />
              <StatCard icon="✅" val={adminDeliveries.filter(d => d.statut === "livre").length} lbl="Livrées" col="#dcfce7" ic="#22c55e" />
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18, background: "var(--surface)", padding: 10, borderRadius: 10, border: "1px solid var(--border)" }}>
              {[
                { id: "all",            label: "📋 Toutes",      color: "#64748b" },
                { id: "commande_recue", label: "⏳ En attente",  color: "#f59e0b" },
                { id: "preparation",    label: "📦 Préparation", color: "#3b82f6" },
                { id: "collecte",       label: "🏪 Collecté",    color: "#8b5cf6" },
                { id: "en_route",       label: "🏍️ En route",   color: "#10b981" },
                { id: "livre",          label: "✅ Livrées",     color: "#22c55e" },
              ].map(f => {
                const count = f.id === "all" ? adminDeliveries.length : adminDeliveries.filter(d => d.statut === f.id).length;
                const active = adminDelivFilter === f.id;
                return (
                  <button key={f.id} onClick={() => setAdminDelivFilter(f.id)} style={{
                    padding: "7px 13px", borderRadius: 20,
                    border: "2px solid " + (active ? f.color : "var(--border)"),
                    background: active ? f.color : "var(--surface2)",
                    color: active ? "#fff" : "var(--ink)",
                    fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".78rem",
                    cursor: "pointer", transition: "all .2s",
                  }}>
                    {f.label} ({count})
                  </button>
                );
              })}
            </div>

            {adminDeliveries.filter(d => adminDelivFilter === "all" || d.statut === adminDelivFilter).length === 0 ? (
              <div style={{ textAlign: "center", padding: 50, background: "var(--surface)", borderRadius: 12, color: "var(--gray)", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: 10 }}>📭</div>
                <p style={{ fontSize: ".9rem" }}>Aucune livraison dans cette catégorie</p>
              </div>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {adminDeliveries
                  .filter(d => adminDelivFilter === "all" || d.statut === adminDelivFilter)
                  .map(d => (
                    <div key={d.id} style={{
                      background: "var(--surface)", border: "1px solid var(--border)",
                      borderRadius: 12, padding: 14,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.05rem", color: "var(--green)", letterSpacing: ".05em" }}>
                            {d.code_suivi}
                          </div>
                          <StatutLivraison statut={d.statut} />
                        </div>
                        <div style={{ fontSize: ".72rem", color: "var(--gray)" }}>
                          {d.commande_at ? new Date(d.commande_at).toLocaleString("fr-FR") : "-"}
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 12, fontSize: ".78rem" }}>
                        <div>
                          <div style={{ fontSize: ".65rem", color: "var(--gray)", fontWeight: 700, marginBottom: 3 }}>👤 CLIENT</div>
                          <div style={{ fontWeight: 600, color: "var(--ink)" }}>{d.client_nom || "—"}</div>
                          <div style={{ color: "var(--gray)" }}>{d.client_tel || "—"}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: ".65rem", color: "var(--gray)", fontWeight: 700, marginBottom: 3 }}>🔴 COLLECTE</div>
                          <div style={{ color: "var(--ink)" }}>{d.adresse_collecte || "—"}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: ".65rem", color: "var(--gray)", fontWeight: 700, marginBottom: 3 }}>🟢 LIVRAISON</div>
                          <div style={{ color: "var(--ink)" }}>{d.adresse_livraison || "—"}</div>
                        </div>
                      </div>

                      {d.livreur_nom ? (
                        <div style={{ background: "var(--green-pale)", borderRadius: 8, padding: "9px 12px", marginBottom: 10, fontSize: ".82rem", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                          <span style={{ fontSize: "1.2rem" }}>🏍️</span>
                          <div style={{ flex: 1 }}>
                            <strong>Livreur :</strong> {d.livreur_nom}
                            <span style={{ color: "var(--gray)", marginLeft: 8 }}>· {d.livreur_tel}</span>
                          </div>
                          {d.livreur_tel && (
                            <a href={`https://wa.me/${d.livreur_tel.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"
                              style={{ background: "#25D366", color: "#fff", padding: "4px 10px", borderRadius: 6, fontSize: ".7rem", fontWeight: 700, textDecoration: "none" }}>
                              💬 WhatsApp
                            </a>
                          )}
                        </div>
                      ) : (
                        <div style={{ background: "#fef3c7", border: "1px dashed #f59e0b", borderRadius: 8, padding: "9px 12px", marginBottom: 10, fontSize: ".82rem", color: "#92400e" }}>
                          ⚠️ Aucun livreur assigné
                        </div>
                      )}

                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {!d.livreur_id && !d.livreur_nom && (
                          <button onClick={() => setAssignModalOpen(d)} style={{
                            flex: 1, minWidth: 150, background: "var(--green)", color: "#fff", border: "none",
                            padding: "9px 14px", borderRadius: 8,
                            fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".8rem", cursor: "pointer",
                          }}>
                            🏍️ Assigner un livreur
                          </button>
                        )}

                        {d.livreur_nom && d.statut === "preparation" && (
                          <button onClick={() => changerStatutLivraison(d, "collecte")}
                            style={{ background: "#8b5cf6", color: "#fff", border: "none", padding: "7px 12px", borderRadius: 8, fontSize: ".75rem", fontWeight: 700, cursor: "pointer" }}>
                            🏪 Marquer Collecté
                          </button>
                        )}
                        {d.livreur_nom && d.statut === "collecte" && (
                          <button onClick={() => changerStatutLivraison(d, "en_route")}
                            style={{ background: "#10b981", color: "#fff", border: "none", padding: "7px 12px", borderRadius: 8, fontSize: ".75rem", fontWeight: 700, cursor: "pointer" }}>
                            🏍️ Marquer En route
                          </button>
                        )}
                        {d.livreur_nom && d.statut === "en_route" && (
                          <button onClick={() => changerStatutLivraison(d, "livre")}
                            style={{ background: "#22c55e", color: "#fff", border: "none", padding: "7px 12px", borderRadius: 8, fontSize: ".75rem", fontWeight: 700, cursor: "pointer" }}>
                            ✅ Marquer Livré
                          </button>
                        )}

                        <button onClick={() => window.open("/?page=livraison&code=" + d.code_suivi, "_blank")}
                          style={{ background: "var(--surface2)", color: "var(--ink)", border: "1px solid var(--border)", padding: "7px 12px", borderRadius: 8, fontSize: ".75rem", fontWeight: 600, cursor: "pointer" }}>
                          👁️ Tracker client
                        </button>

                        <button onClick={() => { navigator.clipboard?.writeText(d.code_suivi); showToast("Code copié : " + d.code_suivi); }}
                          style={{ background: "var(--surface2)", color: "var(--ink)", border: "1px solid var(--border)", padding: "7px 12px", borderRadius: 8, fontSize: ".75rem", fontWeight: 600, cursor: "pointer" }}>
                          📋 Copier
                        </button>

                        {d.client_tel && (
                          <a href={`https://wa.me/${d.client_tel.replace(/\D/g, "")}?text=${encodeURIComponent(`Bonjour ${d.client_nom || ""} ! Concernant votre livraison ${d.code_suivi}...`)}`}
                            target="_blank" rel="noreferrer"
                            style={{ background: "#25D366", color: "#fff", padding: "7px 12px", borderRadius: 8, fontSize: ".75rem", fontWeight: 700, textDecoration: "none" }}>
                            📱 Contacter
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}

        {/* ════════ LIVREURS ════════ */}
        {adminTab === "livreurs" && (
          <>
            <div className="admin-page-title">
              🏍️ Gestion des livreurs
              <span style={{ fontSize: ".75rem", background: "var(--green)", color: "#fff", padding: "3px 10px", borderRadius: 50, fontWeight: 600, marginLeft: 8 }}>
                {livreursDispo.length}
              </span>
            </div>

            <div className="stat-cards-grid" style={{ marginBottom: 18 }}>
              <StatCard icon="🏍️" val={livreursDispo.length} lbl="Livreurs inscrits" col="#fff9e6" ic="#b8860b" />
              <StatCard icon="✅" val={livreursDispo.filter(l => l.actif !== false).length} lbl="Actifs" col="#e6fff0" ic="#1a6b3a" />
              <StatCard icon="✔️" val={livreursDispo.filter(l => l.verifie).length} lbl="Vérifiés" col="#e6f0ff" ic="#1a4a9a" />
              <StatCard icon="📦" val={adminDeliveries.filter(d => d.livreur_id).length} lbl="Livraisons assignées" col="#f3e8ff" ic="#7c3aed" />
            </div>

            {livreursDispo.length === 0 ? (
              <div style={{ textAlign: "center", padding: 60, background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "4rem", marginBottom: 14 }}>🏍️</div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "var(--ink)", marginBottom: 8 }}>
                  Aucun livreur inscrit
                </h3>
                <p style={{ color: "var(--gray)", fontSize: ".88rem", marginBottom: 16, maxWidth: 420, margin: "0 auto 16px" }}>
                  Tu peux encore assigner des livreurs manuellement sur chaque livraison. Ou invite des livreurs à s'inscrire via le lien :
                </p>
                <div style={{ background: "var(--green-pale)", padding: "8px 14px", borderRadius: 8, display: "inline-block", fontSize: ".82rem" }}>
                  🔗 <a href="https://yorix.cm/?authTab=register&role=delivery" style={{ color: "var(--green)", fontWeight: 700 }}>yorix.cm/inscription-livreur</a>
                </div>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Livreur</th><th>Contact</th><th>Ville</th><th>Livraisons</th><th>Statut</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {livreursDispo.map(l => {
                      const uid = l.uid || l.id;
                      const mesLivraisons = adminDeliveries.filter(d => d.livreur_id === uid);
                      const livresCount = mesLivraisons.filter(d => d.statut === "livre").length;
                      return (
                        <tr key={uid}>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--green-pale)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>
                                🏍️
                              </div>
                              <div>
                                <strong style={{ fontSize: ".85rem" }}>{l.nom || "—"}</strong>
                                {l.verifie && <span style={{ marginLeft: 4, fontSize: ".6rem", background: "#e6fff0", color: "#1a6b3a", padding: "1px 4px", borderRadius: 3 }}>✅</span>}
                                <div style={{ fontSize: ".66rem", color: "var(--gray)" }}>{l.email || "—"}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ fontSize: ".78rem" }}>{l.telephone || "—"}</td>
                          <td style={{ fontSize: ".78rem" }}>{l.ville || "—"}</td>
                          <td>
                            <span className="admin-badge admin-badge-blue">{mesLivraisons.length}</span>
                            {livresCount > 0 && <span style={{ fontSize: ".63rem", color: "var(--green)", marginLeft: 4 }}>{livresCount} livrées</span>}
                          </td>
                          <td>
                            <span className={`admin-badge admin-badge-${l.actif !== false ? "green" : "red"}`}>
                              {l.actif !== false ? "🟢 Actif" : "⛔ Suspendu"}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: 3 }}>
                              {l.telephone && (
                                <a href={`https://wa.me/${l.telephone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"
                                  className="admin-action-btn" style={{ background: "#dcfce7", color: "#166534", textDecoration: "none" }}>
                                  📱
                                </a>
                              )}
                              <button onClick={() => verifierUser(uid, l.verifie)} className="admin-action-btn"
                                style={{ background: l.verifie ? "#fff9e6" : "#e6fff0", color: l.verifie ? "#b8860b" : "#1a6b3a" }}>
                                {l.verifie ? "❌" : "✅"}
                              </button>
                              <button onClick={() => toggleVendeur(uid, l.actif !== false)} className="admin-action-btn"
                                style={{ background: l.actif !== false ? "#fff0f0" : "#e6fff0", color: l.actif !== false ? "#ce1126" : "#1a6b3a" }}>
                                {l.actif !== false ? "⛔" : "✅"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ════════ PRODUITS ════════ */}
        {adminTab === "produits" && (
          <>
            <div className="admin-page-title">
              📦 Gestion des produits
              <span style={{ fontSize: ".75rem", background: "var(--green)", color: "#fff", padding: "3px 10px", borderRadius: 50, fontWeight: 600, marginLeft: 8 }}>
                {produitsFiltres.length} / {produits.length}
              </span>
            </div>

            <div className="admin-filter-row" style={{ flexWrap: "wrap", gap: 8 }}>
              <input className="admin-search" style={{ maxWidth: 240 }} placeholder="🔍 Nom ou vendeur..." value={searchProd} onChange={e => setSearchProd(e.target.value)} />
              <select className="admin-search" style={{ maxWidth: 160 }} value={filterProdCat} onChange={e => setFilterProdCat(e.target.value)}>
                <option value="">Toutes catégories</option>
                {CATS_LIST.map(c => <option key={c}>{c}</option>)}
              </select>
              <select className="admin-search" style={{ maxWidth: 140 }} value={filterProdStatut} onChange={e => setFilterProdStatut(e.target.value)}>
                <option value="">Tous statuts</option>
                <option value="actif">✅ Actif</option>
                <option value="inactif">⛔ Inactif</option>
              </select>
              <button className="admin-action-btn" style={{ background: "var(--surface2)", color: "var(--ink)", padding: "7px 12px", borderRadius: 8, border: "1px solid var(--border)" }} onClick={() => { setSearchProd(""); setFilterProdCat(""); setFilterProdStatut(""); }}>✕ Reset</button>
              <button className="admin-action-btn" style={{ background: "#e6f0ff", color: "#1a4a9a", padding: "7px 12px", borderRadius: 8, marginLeft: "auto" }}
                onClick={() => exportCSV(produitsFiltres.map(p => ({ id: p.id, nom: p.name_fr, prix: p.prix, vendeur: p.vendeur_nom, ville: p.ville, stock: p.stock, categorie: p.categorie, actif: p.actif })), "produits-yorix.csv")}>
                📤 Export CSV
              </button>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Produit</th><th>Prix</th><th>Vendeur</th><th>Cat.</th><th>Ville</th><th>Stock</th><th>Statut</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {produitsFiltres.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          {(p.image || p.image_urls?.[0]) && (
                            <img src={p.image || p.image_urls?.[0]} alt="" style={{ width: 38, height: 38, borderRadius: 7, objectFit: "cover", flexShrink: 0 }} onError={e => e.target.style.display = "none"} />
                          )}
                          <strong style={{ fontSize: ".79rem" }}>{p.name_fr || "—"}</strong>
                        </div>
                      </td>
                      <td><strong style={{ color: "var(--green)" }}>{(p.prix || 0).toLocaleString()} F</strong></td>
                      <td style={{ fontSize: ".75rem" }}>{p.vendeur_nom || "—"}</td>
                      <td><span className="admin-badge admin-badge-gray">{p.categorie || "—"}</span></td>
                      <td style={{ fontSize: ".72rem" }}>{p.ville || "—"}</td>
                      <td>
                        <span className={`admin-badge admin-badge-${(p.stock || 0) === 0 ? "red" : (p.stock || 0) <= 5 ? "yellow" : "green"}`}>
                          {p.stock || 0}
                        </span>
                      </td>
                      <td><span className={`admin-badge admin-badge-${p.actif ? "green" : "gray"}`}>{p.actif ? "Actif" : "Inactif"}</span></td>
                      <td>
                        <div style={{ display: "flex", gap: 3 }}>
                          <button className="admin-action-btn" style={{ background: p.actif ? "#fff9e6" : "#e6fff0", color: p.actif ? "#b8860b" : "#1a6b3a" }} onClick={() => toggleActifProduit(p.id, p.actif)}>
                            {p.actif ? "⛔" : "✅"}
                          </button>
                          <button className="admin-action-btn" style={{ background: "#fff0f0", color: "#ce1126" }} onClick={() => supprimerProduit(p.id, p.name_fr)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {produitsFiltres.length === 0 && (
                    <tr><td colSpan={8} style={{ textAlign: "center", padding: 28, color: "var(--gray)" }}>Aucun produit trouvé</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ════════ COMMANDES ════════ */}
        {adminTab === "commandes" && (
          <>
            <div className="admin-page-title">
              🛍️ Gestion des commandes
              <span style={{ fontSize: ".75rem", background: "var(--green)", color: "#fff", padding: "3px 10px", borderRadius: 50, fontWeight: 600, marginLeft: 8 }}>
                {commandesFiltrees.length}
              </span>
            </div>

            <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
              {[
                { l: "⏳ En attente", v: commandes.filter(o => o.status === "pending").length,   c: "#b8860b", bg: "#fff9e6", f: "pending" },
                { l: "✅ Validées",   v: commandes.filter(o => o.status === "validee").length,   c: "#1a4a9a", bg: "#e6f0ff", f: "validee" },
                { l: "📦 Livrées",    v: commandes.filter(o => o.status === "livre").length,     c: "#1a6b3a", bg: "#e6fff0", f: "livre" },
                { l: "❌ Annulées",   v: commandes.filter(o => o.status === "annulee").length,   c: "#ce1126", bg: "#fff0f0", f: "annulee" },
              ].map(s => (
                <div key={s.l} onClick={() => setFilterOrder(s.f === filterOrder ? "" : s.f)} style={{
                  background: s.bg, border: `1.5px solid ${filterOrder === s.f ? s.c : s.c + "30"}`,
                  borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: ".75rem",
                }}>
                  <span style={{ color: "var(--gray)" }}>{s.l} : </span>
                  <strong style={{ color: s.c }}>{s.v}</strong>
                </div>
              ))}
            </div>

            {commandesFiltrees.length === 0 ? (
              <div style={{ textAlign: "center", padding: 50, background: "var(--surface)", borderRadius: 12, color: "var(--gray)", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "3rem", marginBottom: 10 }}>📭</div>
                <p>Aucune commande {filterOrder ? `"${filterOrder}"` : ""}</p>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Client</th><th>Montant</th><th>Commission</th><th>Statut</th><th>Date</th><th>Actions</th></tr></thead>
                  <tbody>
                    {commandesFiltrees.map(o => (
                      <tr key={o.id}>
                        <td>
                          <strong style={{ fontSize: ".8rem" }}>{o.client_nom || "—"}</strong>
                          {o.telephone && <div style={{ fontSize: ".65rem", color: "var(--gray)" }}>{o.telephone}</div>}
                        </td>
                        <td><strong>{(o.montant || 0).toLocaleString()} F</strong></td>
                        <td style={{ color: "var(--green)", fontWeight: 700 }}>{(o.commission || 0).toLocaleString()} F</td>
                        <td><BadgeStatut statut={o.status} /></td>
                        <td style={{ fontSize: ".7rem", color: "var(--gray)", whiteSpace: "nowrap" }}>{o.created_at ? new Date(o.created_at).toLocaleDateString("fr-FR") : "-"}</td>
                        <td>
                          <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                            {o.status === "pending" && <button className="admin-action-btn" style={{ background: "#e6f0ff", color: "#1a4a9a" }} onClick={() => validerCommande(o.id)}>✅</button>}
                            {o.status === "validee" && <button className="admin-action-btn" style={{ background: "#e6fff0", color: "#1a6b3a" }} onClick={() => marquerLivre(o.id)}>📦</button>}
                            {!["livre", "annulee"].includes(o.status) && <button className="admin-action-btn" style={{ background: "#fff0f0", color: "#ce1126" }} onClick={() => annulerCommande(o.id)}>❌</button>}
                            {o.telephone && <a href={`https://wa.me/${o.telephone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="admin-action-btn" style={{ background: "#dcfce7", color: "#166534", textDecoration: "none" }}>📱</a>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ════════ UTILISATEURS ════════ */}
        {adminTab === "utilisateurs" && (
          <>
            <div className="admin-page-title">
              👥 Gestion des utilisateurs
              <span style={{ fontSize: ".75rem", background: "var(--green)", color: "#fff", padding: "3px 10px", borderRadius: 50, fontWeight: 600, marginLeft: 8 }}>
                {usersFiltres.length} / {utilisateurs.length}
              </span>
            </div>

            <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
              {["buyer", "seller", "delivery", "provider", "admin"].map(r => {
                const cnt = utilisateurs.filter(u => u.role === r).length;
                const colors = { buyer: "#1a4a9a", seller: "#1a6b3a", delivery: "#b8860b", provider: "#6a1b9a", admin: "#ce1126" };
                return (
                  <div key={r} onClick={() => setFilterRole(r === filterRole ? "" : r)} style={{
                    background: "var(--surface)", border: `1.5px solid ${filterRole === r ? colors[r] : "var(--border)"}`,
                    borderRadius: 8, padding: "7px 12px", cursor: "pointer", fontSize: ".73rem",
                  }}>
                    <span style={{ color: colors[r] || "var(--gray)", fontWeight: 700 }}>{ROLE_LABELS[r] || r}</span>
                    <span style={{ color: "var(--gray)", marginLeft: 6 }}>{cnt}</span>
                  </div>
                );
              })}
            </div>

            <div className="admin-filter-row">
              <input className="admin-search" style={{ maxWidth: 260 }} placeholder="🔍 Nom ou email..." value={searchUser} onChange={e => setSearchUser(e.target.value)} />
              <button className="admin-action-btn" style={{ background: "var(--surface2)", color: "var(--ink)", padding: "7px 12px", borderRadius: 8, border: "1px solid var(--border)" }} onClick={() => { setSearchUser(""); setFilterRole(""); }}>✕ Reset</button>
              <button className="admin-action-btn" style={{ background: "#e6f0ff", color: "#1a4a9a", padding: "7px 12px", borderRadius: 8, marginLeft: "auto" }}
                onClick={() => exportCSV(usersFiltres.map(u => ({ uid: u.uid, nom: u.nom, email: u.email, role: u.role, ville: u.ville, telephone: u.telephone })), "utilisateurs-yorix.csv")}>
                📤 Export CSV
              </button>
            </div>

            {usersFiltres.length === 0 ? (
              <div style={{ textAlign: "center", padding: 50, background: "var(--surface)", borderRadius: 12, color: "var(--gray)", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "3rem", marginBottom: 10 }}>👥</div>
                <p>Aucun utilisateur trouvé</p>
                {utilisateurs.length === 0 && (
                  <p style={{ fontSize: ".78rem", marginTop: 10, color: "#ce1126" }}>
                    💡 Si la table users/profiles existe, vérifie les politiques RLS
                  </p>
                )}
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Utilisateur</th><th>Email</th><th>Rôle</th><th>Ville</th><th>Téléphone</th><th>Actions</th></tr></thead>
                  <tbody>
                    {usersFiltres.map(u => {
                      const uid = u.uid || u.id;
                      return (
                        <tr key={uid}>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ width: 32, height: 32, borderRadius: "50%", background: `hsl(${(uid || "").toString().charCodeAt(0) * 7 % 360},50%,50%)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: ".8rem" }}>
                                {(u.nom || u.email || "?")[0].toUpperCase()}
                              </div>
                              <div>
                                <strong style={{ fontSize: ".8rem" }}>{u.nom || "—"}</strong>
                                {u.verifie && <span style={{ marginLeft: 4, fontSize: ".6rem", background: "#e6fff0", color: "#1a6b3a", padding: "1px 4px", borderRadius: 3 }}>✅</span>}
                              </div>
                            </div>
                          </td>
                          <td style={{ fontSize: ".75rem", color: "var(--gray)" }}>{u.email || "—"}</td>
                          <td>
                            <select value={u.role || "buyer"} style={{ border: "1px solid var(--border)", background: "var(--surface)", borderRadius: 6, padding: "3px 8px", fontSize: ".72rem", cursor: "pointer", color: "var(--ink)" }} onChange={e => changerRole(uid, e.target.value)}>
                              {["buyer", "seller", "delivery", "provider", "admin"].map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                          </td>
                          <td style={{ fontSize: ".73rem" }}>{u.ville || "—"}</td>
                          <td style={{ fontSize: ".73rem" }}>{u.telephone || "—"}</td>
                          <td>
                            <div style={{ display: "flex", gap: 3 }}>
                              {u.telephone && <a href={`https://wa.me/${u.telephone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="admin-action-btn" style={{ background: "#dcfce7", color: "#166534", textDecoration: "none" }}>📱</a>}
                              <button className="admin-action-btn" style={{ background: "#fff0f0", color: "#ce1126" }} onClick={() => supprimerUser(uid, u.email)}>🗑️</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ════════ VENDEURS ════════ */}
        {adminTab === "vendeurs" && (
          <>
            <div className="admin-page-title">
              🏪 Gestion des vendeurs
              <span style={{ fontSize: ".75rem", background: "var(--green)", color: "#fff", padding: "3px 10px", borderRadius: 50, fontWeight: 600, marginLeft: 8 }}>{sellers.length}</span>
            </div>

            <div className="stat-cards-grid" style={{ marginBottom: 16 }}>
              <StatCard icon="🏪" val={sellers.length} lbl="Vendeurs total" col="#e6fff0" ic="#1a6b3a" />
              <StatCard icon="✅" val={sellers.filter(s => s.actif !== false).length} lbl="Actifs" col="#e6f0ff" ic="#1a4a9a" />
              <StatCard icon="⛔" val={sellers.filter(s => s.actif === false).length} lbl="Suspendus" col="#fff0f0" ic="#ce1126" />
              <StatCard icon="✔️" val={sellers.filter(s => s.verifie).length} lbl="Vérifiés" col="#fff9e6" ic="#b8860b" />
            </div>

            {sellers.length === 0 ? (
              <div style={{ textAlign: "center", padding: 50, background: "var(--surface)", borderRadius: 12, color: "var(--gray)" }}>
                <div style={{ fontSize: "3rem", marginBottom: 10 }}>🏪</div>
                <p>Aucun vendeur inscrit</p>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Vendeur</th><th>Email</th><th>Produits</th><th>Ventes</th><th>Statut</th><th>Actions</th></tr></thead>
                  <tbody>
                    {sellers.map(u => {
                      const uid = u.uid || u.id;
                      const mesProds  = produits.filter(p => p.vendeur_id === uid);
                      const mesVentes = commandes.filter(o => o.vendeur_id === uid);
                      return (
                        <tr key={uid}>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: ".8rem" }}>
                                {(u.nom || "?")[0].toUpperCase()}
                              </div>
                              <strong style={{ fontSize: ".8rem" }}>{u.nom || "—"}</strong>
                            </div>
                          </td>
                          <td style={{ fontSize: ".72rem", color: "var(--gray)" }}>{u.email || "—"}</td>
                          <td><span className="admin-badge admin-badge-blue">{mesProds.length}</span></td>
                          <td><span className="admin-badge admin-badge-green">{mesVentes.length}</span></td>
                          <td><span className={`admin-badge admin-badge-${u.actif !== false ? "green" : "red"}`}>{u.actif !== false ? "Actif" : "Suspendu"}</span></td>
                          <td>
                            <div style={{ display: "flex", gap: 3 }}>
                              <button className="admin-action-btn" style={{ background: u.actif !== false ? "#fff0f0" : "#e6fff0", color: u.actif !== false ? "#ce1126" : "#1a6b3a" }} onClick={() => toggleVendeur(uid, u.actif !== false)}>
                                {u.actif !== false ? "⛔" : "✅"}
                              </button>
                              {u.telephone && <a href={`https://wa.me/${u.telephone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="admin-action-btn" style={{ background: "#dcfce7", color: "#166534", textDecoration: "none" }}>📱</a>}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ════════ PRESTATAIRES ════════ */}
        {adminTab === "prestataires" && (
          <>
            <div className="admin-page-title">
              👷 Candidatures prestataires
              <span style={{ fontSize: ".75rem", background: prestPending > 0 ? "#ce1126" : "var(--green)", color: "#fff", padding: "3px 10px", borderRadius: 50, fontWeight: 600, marginLeft: 8 }}>
                {prestPending} en attente
              </span>
            </div>

            <div className="stat-cards-grid" style={{ marginBottom: 18 }}>
              <StatCard icon="⏳" val={prestatairesList.filter(p => p.status === "pending").length} lbl="En attente" col="#fff9e6" ic="#b8860b" />
              <StatCard icon="✅" val={prestatairesList.filter(p => p.status === "approved").length} lbl="Approuvés" col="#e6fff0" ic="#1a6b3a" />
              <StatCard icon="❌" val={prestatairesList.filter(p => p.status === "rejected").length} lbl="Refusés" col="#fff0f0" ic="#ce1126" />
              <StatCard icon="📋" val={prestatairesList.length} lbl="Total" col="#e6f0ff" ic="#1a4a9a" />
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
              {[
                { id: "pending",  label: "⏳ En attente" },
                { id: "approved", label: "✅ Approuvés" },
                { id: "rejected", label: "❌ Refusés" },
                { id: "all",      label: "📋 Tous" },
              ].map(f => (
                <button key={f.id} onClick={() => setPrestFilter(f.id)} style={{
                  background: prestFilter === f.id ? "var(--green)" : "var(--surface)",
                  color: prestFilter === f.id ? "#fff" : "var(--ink)",
                  border: `1.5px solid ${prestFilter === f.id ? "var(--green)" : "var(--border)"}`,
                  borderRadius: 8, padding: "7px 14px", cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".78rem",
                }}>
                  {f.label} ({f.id === "all" ? prestatairesList.length : prestatairesList.filter(p => p.status === f.id).length})
                </button>
              ))}
            </div>

            {prestatairesList.filter(p => prestFilter === "all" || p.status === prestFilter).length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: "var(--gray)", background: "var(--surface)", borderRadius: 12 }}>
                <div style={{ fontSize: "3rem", marginBottom: 10 }}>👷</div>
                <p>Aucune candidature {prestFilter !== "all" ? prestFilter : ""}</p>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Candidat</th><th>Métier</th><th>Ville</th><th>Téléphone</th><th>Statut</th><th>Actions</th></tr></thead>
                  <tbody>
                    {prestatairesList
                      .filter(p => prestFilter === "all" || p.status === prestFilter)
                      .map(p => (
                        <tr key={p.id}>
                          <td><strong style={{ fontSize: ".82rem" }}>{p.nom}{p.prenom ? " " + p.prenom : ""}</strong></td>
                          <td><span className="admin-badge admin-badge-blue">{p.metier}</span></td>
                          <td style={{ fontSize: ".75rem" }}>{p.ville || "—"}</td>
                          <td style={{ fontSize: ".75rem", color: "var(--gray)" }}>{p.telephone}</td>
                          <td>
                            <span className={`admin-badge admin-badge-${p.status === "approved" ? "green" : p.status === "rejected" ? "red" : "yellow"}`}>
                              {p.status === "approved" ? "✅ Approuvé" : p.status === "rejected" ? "❌ Refusé" : "⏳ En attente"}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                              {p.status === "pending" && (
                                <>
                                  <button className="admin-action-btn" style={{ background: "#e6fff0", color: "#1a6b3a" }} onClick={async () => {
                                    if (!window.confirm(`Approuver ${p.nom} ?`)) return;
                                    await supabase.from("prestataires").update({ status: "approved", verifie: true }).eq("id", p.id);
                                    setPrestatairesList(prev => prev.map(x => x.id === p.id ? { ...x, status: "approved" } : x));
                                    showToast(`✅ ${p.nom} approuvé`);
                                  }}>✅</button>
                                  <button className="admin-action-btn" style={{ background: "#fff0f0", color: "#ce1126" }} onClick={async () => {
                                    if (!window.confirm(`Refuser ${p.nom} ?`)) return;
                                    await supabase.from("prestataires").update({ status: "rejected" }).eq("id", p.id);
                                    setPrestatairesList(prev => prev.map(x => x.id === p.id ? { ...x, status: "rejected" } : x));
                                    showToast(`❌ Refusé`);
                                  }}>❌</button>
                                </>
                              )}
                              {p.telephone && <a href={`https://wa.me/${p.telephone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="admin-action-btn" style={{ background: "#dcfce7", color: "#166534", textDecoration: "none" }}>📱</a>}
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ════════ REVENUS ════════ */}
        {adminTab === "revenus" && (
          <>
            <div className="admin-page-title">💰 Revenus & Finances</div>
            <div className="stat-cards-grid" style={{ marginBottom: 20 }}>
              <StatCard icon="💵" val={`${stats.commissionTotal.toLocaleString()} F`} lbl="Commissions totales (5%)" col="#e6fff0" ic="#1a6b3a" />
              <StatCard icon="💰" val={`${stats.revenue.toLocaleString()} F`} lbl="Volume total" col="#fff9e6" ic="#b8860b" />
              <StatCard icon="📅" val={`${stats.revenueToday.toLocaleString()} F`} lbl="Aujourd'hui" col="#f0fff4" ic="#276749" />
              <StatCard icon="📈" val={`${stats.revenueWeek.toLocaleString()} F`} lbl="7 jours" col="#fef9f0" ic="#7b5a10" />
            </div>

            <div className="admin-section">
              <div className="admin-section-title">📈 Commissions journalières (7 derniers jours)</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120, marginBottom: 8 }}>
                {chartVentes.map((d, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    {d.revenue > 0 && <div style={{ fontSize: ".6rem", color: "var(--gray)" }}>{d.revenue.toLocaleString()}</div>}
                    <div style={{
                      width: "100%", borderRadius: "4px 4px 0 0",
                      height: `${Math.max((d.revenue / maxChartRev) * 90, d.revenue > 0 ? 8 : 3)}px`,
                      background: i === chartVentes.length - 1 ? "var(--yellow, #fcd116)" : "var(--green)",
                      opacity: .85,
                    }} />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {chartVentes.map((d, i) => <div key={i} style={{ flex: 1, textAlign: "center", fontSize: ".63rem", color: "var(--gray)" }}>{d.label}</div>)}
              </div>
            </div>
          </>
        )}

        {/* ════════ YORIX POINTS ════════ */}
        {adminTab === "loyalty" && (
          <LoyaltyAdminTab user={user} userData={userData} showToast={showToast} />
        )}

        {/* ════════ ALERTES ════════ */}
        {adminTab === "alertes" && (
          <>
            <div className="admin-page-title">
              🔔 Alertes & Notifications
              <span style={{ fontSize: ".75rem", background: alertes.length > 0 ? "var(--red)" : "var(--green)", color: "#fff", padding: "3px 10px", borderRadius: 50, fontWeight: 600, marginLeft: 8 }}>
                {alertes.length}
              </span>
            </div>

            {alertes.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 0", color: "var(--gray)" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: 12 }}>✅</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: 6, color: "var(--ink)" }}>Tout va bien !</div>
                <p>Aucune alerte sur Yorix.</p>
              </div>
            ) : (
              <>
                <div className="admin-section">
                  <div className="admin-section-title">
                    🚚 Livraisons à assigner
                    <span className="admin-badge admin-badge-yellow">{adminDeliveries.filter(d => d.statut === "commande_recue" && !d.livreur_id).length}</span>
                  </div>
                  {adminDeliveries.filter(d => d.statut === "commande_recue" && !d.livreur_id).length === 0
                    ? <div className="admin-alert admin-alert-green">✅ Toutes les livraisons ont un livreur</div>
                    : adminDeliveries.filter(d => d.statut === "commande_recue" && !d.livreur_id).map(d => (
                      <div key={d.id} className="admin-alert admin-alert-yellow" style={{ flexWrap: "wrap", gap: 8 }}>
                        <div>
                          <strong>{d.code_suivi}</strong>
                          <div style={{ fontSize: ".7rem", marginTop: 2 }}>{d.client_nom} → {d.adresse_livraison}</div>
                        </div>
                        <button onClick={() => { setAdminTab("deliveries"); setAssignModalOpen(d); }} style={{ marginLeft: "auto", background: "var(--green)", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: ".72rem", fontWeight: 700 }}>
                          🏍️ Assigner
                        </button>
                      </div>
                    ))
                  }
                </div>

                <div className="admin-section">
                  <div className="admin-section-title">
                    📦 Ruptures de stock
                    <span className="admin-badge admin-badge-red">{produits.filter(p => (p.stock || 0) === 0).length}</span>
                  </div>
                  {produits.filter(p => (p.stock || 0) === 0).length === 0
                    ? <div className="admin-alert admin-alert-green">✅ Aucun produit en rupture</div>
                    : produits.filter(p => (p.stock || 0) === 0).slice(0, 8).map(p => (
                      <div key={p.id} className="admin-alert admin-alert-red">
                        <div>
                          <strong>{p.name_fr || "Produit"}</strong>
                          <div style={{ fontSize: ".7rem", marginTop: 2 }}>Vendeur : {p.vendeur_nom || "—"}</div>
                        </div>
                      </div>
                    ))
                  }
                </div>

                <div className="admin-section">
                  <div className="admin-section-title">
                    ⏳ Commandes en attente
                    <span className="admin-badge admin-badge-yellow">{commandes.filter(o => o.status === "pending").length}</span>
                  </div>
                  {commandes.filter(o => o.status === "pending").length === 0
                    ? <div className="admin-alert admin-alert-green">✅ Aucune commande en attente</div>
                    : commandes.filter(o => o.status === "pending").slice(0, 6).map(o => (
                      <div key={o.id} className="admin-alert admin-alert-yellow" style={{ flexWrap: "wrap", gap: 8 }}>
                        <div>
                          <strong>{o.client_nom || "Client"}</strong>
                          <div style={{ fontSize: ".7rem", marginTop: 2 }}>{(o.montant || 0).toLocaleString()} FCFA</div>
                        </div>
                        <button onClick={() => validerCommande(o.id)} style={{ marginLeft: "auto", background: "var(--green)", color: "#fff", border: "none", padding: "5px 10px", borderRadius: 6, cursor: "pointer", fontSize: ".7rem", fontWeight: 700 }}>
                          ✅ Valider
                        </button>
                      </div>
                    ))
                  }
                </div>
              </>
            )}
          </>
        )}

      </div>
    </div>
  );
}
