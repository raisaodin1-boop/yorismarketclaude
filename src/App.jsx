// ══════════════════════════════════════════════════════════════
//  YORIX CM — VERSION PROFESSIONNELLE COMPLÈTE
//  ✅ WhatsApp Commander
//  ✅ Upload multiple Cloudinary
//  ✅ Commandes Supabase (orders)
//  ✅ Avis / Étoiles / Commentaires
//  ✅ Avis / Étoiles / Commentaires
//  ✅ Commission automatique 5%
//  ✅ Livraison avec statuts
//  ✅ Escrow simulé
//  ✅ Dashboard vendeur complet
//  ✅ Notifications temps réel
//  ✅ 4 rôles : buyer / seller / delivery / provider
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect, useRef, useCallback } from "react";
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet-async';
import {
  supabase,
  COMMISSION_RATE,
  YORIX_WA_NUMBER,
  MOMO_NUMBER,
  ORANGE_NUMBER,
  PAYMENT_WA_NUMBER,
  LIVRAISON_FEE,
  CLOUD_NAME,
  UPLOAD_PRESET,
} from "./lib/supabase";

import {
  CATS,
  CITIES,
  ROLE_LABELS,
  DELIVERY_STATUSES,
  ESCROW_STATUSES,
  PREST_DATA,
  BLOG_DATA,
  COURSES_DATA,
  REWARDS_DATA,
} from "./lib/constants";

import {
  uploadSingleImage,
  creerCommandeSupabase,
  getUserProfile,
  getUserRole,
  filtrerMsg,
  sendEmail,
  emailBienvenue,
  creerLivraisonAutomatique,
  updateLivraisonStatut,
  genererCodeSuivi,
} from "./utils/helpers";
import { makeCSS } from "./utils/styles";
import { Stars } from "./components/Stars";
import { FlashCountdown } from "./components/FlashCountdown";
import { PrestCard } from "./components/PrestCard";
import { FormulaireAvis } from "./components/FormulaireAvis";
import { ModalCommander } from "./components/ModalCommander";
import { BusinessForm } from "./components/BusinessForm";
import { PagesLegales } from "./components/PagesLegales";
import { LevelBadge } from "./components/LevelBadge";
import { PointsAnimation } from "./components/PointsAnimation";
import { ModalDemandeLivraison } from "./components/ModalDemandeLivraison";
import { AcademyDetail } from "./components/AcademyDetail";
import { AcademyContactForm } from "./components/AcademyContactForm";
import { OrderCardWithTracking } from "./components/OrderCardWithTracking";
import { DeliveryTracker } from "./components/DeliveryTracker";
import { FicheProduit } from "./components/FicheProduit";
import { BuyerDashboard } from "./components/BuyerDashboard";
import { ProviderDashboard } from "./components/ProviderDashboard";
import { FormulaireProduit } from "./components/FormulaireProduit";
import { DeliveryDashboard } from "./components/DeliveryDashboard";
import { ProdGrid } from "./components/ProdGrid";
import { LoyaltyPackModal } from "./components/LoyaltyPackModal";
import { LoyaltyRedeemModal } from "./components/LoyaltyRedeemModal";
import { LoyaltyPage } from "./components/LoyaltyPage";
import { LoyaltyAdminTab } from "./components/LoyaltyAdminTab";
import { SellerDashboard } from "./components/SellerDashboard";
import { ChatUsers } from "./components/ChatUsers";
import { AdminDashboard } from "./components/AdminDashboard";
import { OptimizedImage } from "./components/OptimizedImage";
import { PushManager } from "./components/PushManager";

// ═══════════════════════════════════════════════════════════════
// APP PRINCIPALE
// ═══════════════════════════════════════════════════════════════

export default function Yorix() {
  const [dark, setDark]           = useState(false);
  const [page, setPage]           = useState("home");
  const [user, setUser]           = useState(null);
  const [userData, setUserData]   = useState(null);
 const [userRole, setUserRole] = useState(null);
  const [loading, setLoading]     = useState(true);

  // Auth
  const [authOpen, setAuthOpen]         = useState(false);
  const [authTab, setAuthTab]           = useState("login");
  const [selectedRole, setSelectedRole] = useState("buyer");
  const [authForm, setAuthForm]         = useState({ nom:"", email:"", tel:"", password:"" });
  const [authError, setAuthError]       = useState("");
  const [authLoading, setAuthLoading]   = useState(false);

  // Produits
  const [produits, setProduits]                 = useState([]);
  const [produitsLoading, setProduitsLoading]   = useState(true);
  const [allServices, setAllServices] = useState([]);

useEffect(() => {
  const loadServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("actif", true)
      .eq("disponible", true)
      .order("created_at", { ascending: false });
    if (!error) setAllServices(data || []);
  };
  loadServices();
}, []);
  const [search, setSearch]                     = useState("");
  const [filterCat, setFilterCat]               = useState("");

  // Panier
  const [cartOpen, setCartOpen]   = useState(false);
 const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("yorix_cart");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Sauvegarde automatique du panier à chaque modification
  useEffect(() => {
    try {
      localStorage.setItem("yorix_cart", JSON.stringify(cartItems));
    } catch (e) { console.warn("Cart save failed:", e); }
  }, [cartItems]);

  // Notifs
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs]       = useState([]);

  // Dashboard
  const [dashTab, setDashTab] = useState("overview");

  // Divers
  const [waOpen, setWaOpen]                 = useState(false);
  const [nlEmail, setNlEmail]               = useState("");
  const [nlSent, setNlSent]                 = useState(false);
  const [wishlist, setWishlist]             = useState(new Set());
  const [loyaltyPts, setLoyaltyPts]         = useState(320); 
  const [blogFilter, setBlogFilter]         = useState("TOUT"); // ✅ Filtre blog par catégorie
  const [prestSearch, setPrestSearch]       = useState("");     // ✅ Recherche prestataires
  const [prestCatFilter, setPrestCatFilter] = useState("");     // ✅ Filtre catégorie prestataires
  const [prestVilleFilter, setPrestVilleFilter] = useState(""); // ✅ Filtre ville prestataires
 const [selectedPrest, setSelectedPrest]   = useState(null);   // ✅ Modal détail prestataire
  const [demandeLivraisonOpen, setDemandeLivraisonOpen] = useState(false); // ✅ Modal demande livraison
   // Academy
  const [academyCourses, setAcademyCourses] = useState([]);
  const [academyLoading, setAcademyLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      setAcademyLoading(true);
      const { data, error } = await supabase
        .from("academy_courses")
        .select("*")
        .eq("actif", true)
        .order("prix", { ascending: true });
      if (!error) setAcademyCourses(data || []);
      setAcademyLoading(false);
    };
    loadCourses();
  }, []);

  const goAcademyDetail = (course) => {
    setSelectedCourse(course);
    goPage("academyDetail");
  };
  const goAcademyContact = (course) => {
    setSelectedCourse(course);
    goPage("academyContact");
  };

  const [inscriptionSent, setInscriptionSent] = useState(false);
  const [inscriptionLoading, setInscriptionLoading] = useState(false);
  const [inscriptionError, setInscriptionError] = useState("");
  const [inscriptionForm, setInscriptionForm] = useState({ nom:"",prenom:"",tel:"",email:"",metier:"",ville:"",experience:"",tarif:"",bio:"" });

  // ─────────────────────────────────────────────────────────────
  // SOUMETTRE CANDIDATURE PRESTATAIRE (avec Supabase + email + WA)
  // ─────────────────────────────────────────────────────────────
  const soumettreCandidaturePrestataire = async () => {
    // Reset erreur
    setInscriptionError("");

    // Validation
    if (!inscriptionForm.nom.trim()) {
      setInscriptionError("Le nom est obligatoire");
      return;
    }
    if (!inscriptionForm.tel.trim()) {
      setInscriptionError("Le téléphone est obligatoire");
      return;
    }
    if (!inscriptionForm.metier) {
      setInscriptionError("Veuillez choisir un métier");
      return;
    }
    // Validation email si renseigné
    if (inscriptionForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inscriptionForm.email)) {
      setInscriptionError("Email invalide");
      return;
    }

    setInscriptionLoading(true);

    try {
      // 1️⃣ Enregistrement dans Supabase (table prestataires)
      const { data, error } = await supabase
        .from("prestataires")
        .insert({
          nom:        inscriptionForm.nom,
          prenom:     inscriptionForm.prenom || null,
          telephone:  inscriptionForm.tel,
          email:      inscriptionForm.email || null,
          metier:     inscriptionForm.metier,
          ville:      inscriptionForm.ville || null,
          experience: inscriptionForm.experience || null,
          tarif:      inscriptionForm.tarif || null,
          bio:        inscriptionForm.bio || null,
          status:     "pending",
          user_id:    user?.id || null,
        })
        .select()
        .single();

      // Si la table n'existe pas ou erreur Supabase, on continue quand même
      // (on enverra au moins l'email + WhatsApp à l'admin)
      if (error) {
        console.warn("Table prestataires Supabase:", error.message);
      }

      // 2️⃣ Préparer le message WhatsApp pour l'admin Yorix
      const wamsg = [
        "👷 *NOUVELLE CANDIDATURE PRESTATAIRE YORIX*",
        "",
        "👤 *Informations*",
        `Nom : ${inscriptionForm.nom}${inscriptionForm.prenom ? " " + inscriptionForm.prenom : ""}`,
        `Téléphone : ${inscriptionForm.tel}`,
        inscriptionForm.email ? `Email : ${inscriptionForm.email}` : "",
        "",
        "💼 *Profil professionnel*",
        `Métier : ${inscriptionForm.metier}`,
        inscriptionForm.ville ? `Ville : ${inscriptionForm.ville}` : "",
        inscriptionForm.experience ? `Expérience : ${inscriptionForm.experience}` : "",
        inscriptionForm.tarif ? `Tarif : ${inscriptionForm.tarif}` : "",
        "",
        inscriptionForm.bio ? `📝 *Présentation*\n${inscriptionForm.bio}` : "",
        "",
        "✅ *Actions à faire*",
        "1. Contacter le candidat sous 24h",
        "2. Vérifier les qualifications",
        "3. Valider ou refuser le profil",
        "",
        "Yorix CM 🇨🇲",
      ].filter(Boolean).join("\n");

      // 3️⃣ Ouvrir WhatsApp avec le message pré-rempli
      const waUrl = `https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(wamsg)}`;
      window.open(waUrl, "_blank");

      // 4️⃣ Envoyer email à l'admin (non bloquant)
      const sujet = `Nouvelle candidature prestataire — ${inscriptionForm.nom} (${inscriptionForm.metier})`;
      const corps = [
        "Bonjour,",
        "",
        "Nouvelle candidature prestataire sur Yorix CM :",
        "",
        `👤 Nom : ${inscriptionForm.nom}${inscriptionForm.prenom ? " " + inscriptionForm.prenom : ""}`,
        `📞 Téléphone : ${inscriptionForm.tel}`,
        inscriptionForm.email ? `📧 Email : ${inscriptionForm.email}` : "",
        `💼 Métier : ${inscriptionForm.metier}`,
        inscriptionForm.ville ? `📍 Ville : ${inscriptionForm.ville}` : "",
        inscriptionForm.experience ? `⏱ Expérience : ${inscriptionForm.experience}` : "",
        inscriptionForm.tarif ? `💰 Tarif : ${inscriptionForm.tarif}` : "",
        "",
        inscriptionForm.bio ? `📝 Présentation :\n${inscriptionForm.bio}` : "",
        "",
        "---",
        "Envoyé depuis yorix.cm",
      ].filter(Boolean).join("\n");

      const mailtoUrl = `mailto:raisaodin1@gmail.com?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
      // Ouvrir dans un nouvel onglet pour ne pas casser le flux
      setTimeout(() => window.open(mailtoUrl, "_blank"), 500);

      // 5️⃣ Succès
      setInscriptionSent(true);

    } catch (err) {
      console.error("soumettreCandidaturePrestataire:", err);
      setInscriptionError("Erreur : " + (err.message || "Impossible d'envoyer la candidature. Réessayez."));
    }

    setInscriptionLoading(false);
  };

  const [chatMessages, setChatMessages] = useState([{ text:"Bonjour ! Comment puis-je vous aider ?", me:false, time:"10:02" }]);
  const [chatMsg, setChatMsg]       = useState("");
  const [chatBlocked, setChatBlocked] = useState(false);
  const chatEndRef = useRef(null);

  // ── NAVIGATION ──
  const goPage = useCallback((p) => {
    setPage(p);
    window.scrollTo(0, 0);
    setCartOpen(false);
    setNotifOpen(false);
  }, []);

  // ── SUPABASE AUTH ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) { setUser(session.user); chargerProfil(session.user.id); }
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) { setUser(session.user); chargerProfil(session.user.id); }
     else { setUser(null); setUserData(null); setUserRole(null); setNotifs([]); }
    });
    return () => subscription.unsubscribe();
  }, []);

  const chargerProfil = async (uid) => {
    const profile = await getUserProfile(uid);
    const role    = getUserRole(profile);
    setUserData(profile);
    setUserRole(role);
    // Notifs
    const { data } = await supabase.from("notifications").select("*").eq("user_id", uid).order("created_at", { ascending:false }).limit(10);
    setNotifs(data || []);
  };

  // ── PRODUITS TEMPS RÉEL ──
  useEffect(() => {
    setProduitsLoading(true);
    const load = async () => {
      let q = supabase.from("products").select("*").or("actif.eq.true,actif.is.null").order("sponsorise", { ascending:false }).order("created_at", { ascending:false }).limit(60);
      if (filterCat) q = q.eq("categorie", filterCat);
      const { data } = await q;
      setProduits(data || []);
      setProduitsLoading(false);
    };
    load();
    const channel = supabase.channel("prod_rt").on("postgres_changes", { event:"*", schema:"public", table:"products" }, load).subscribe();
    return () => supabase.removeChannel(channel);
  }, [filterCat]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [chatMessages]);

  // ── AUTH ──
  const doLogin = async () => {
    setAuthError(""); setAuthLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email:authForm.email, password:authForm.password });
      if (error) throw error;
      setUser(data.user);
      await chargerProfil(data.user.id);
      setAuthOpen(false);
      // Email de bienvenue automatique (non bloquant)
      sendEmail({
        to:      authForm.email,
        subject: `Bienvenue sur Yorix, ${authForm.nom} ! 🎉`,
        html:    emailBienvenue(authForm.nom, selectedRole),
      }).catch(e => console.warn("Email bienvenue:", e));
    } catch (err) { setAuthError("Email ou mot de passe incorrect."); }
    setAuthLoading(false);
  };

  const doRegister = async () => {
    setAuthError(""); setAuthLoading(true);
    try {
      if (!authForm.nom||!authForm.email||!authForm.password||!authForm.tel) throw new Error("Tous les champs sont obligatoires.");
      if (!selectedRole) throw new Error("Veuillez choisir un profil (Acheteur, Vendeur, Livreur ou Prestataire).");

      const { data, error } = await supabase.auth.signUp({
        email: authForm.email,
        password: authForm.password,
        options: { 
  data: { 
    display_name: authForm.nom,
    nom: authForm.nom,
    telephone: authForm.tel,
    role: selectedRole
  } 
},
      });
      if (error) throw error;

      const uid = data.user?.id;
      if (!uid) throw new Error("Erreur création compte.");

      const { error: profileError } = await supabase.from("profiles").upsert({
  id:         uid,
  nom:        authForm.nom,
  email:      authForm.email,
  telephone:  authForm.tel,
  role:       selectedRole,
  langue:     "fr",
  actif:      true,
  verifie:    false,
  note:       0,
  nombre_avis: 0,
  total_commandes: 0,
});
      if (profileError) console.error("Profile insert error:", profileError);

      await supabase.from("wallets").insert({ user_id:uid, solde:0, total_gagne:0, devise:"FCFA" }).then(r => r.error && console.error(r.error));
      await chargerProfil(uid);
      setAuthOpen(false);
      setAuthForm({ nom:"", email:"", tel:"", password:"" });
    } catch (err) {
      console.error("Register error:", err);
      setAuthError(err.message.includes("already") ? "Cet email est déjà utilisé." : err.message);
    }
    setAuthLoading(false);
  };

  const doGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider:"google", options:{ redirectTo:window.location.origin } });
    if (error) setAuthError(error.message);
  };

  const doLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); setUserData(null); setUserRole(null);
    setDashTab("overview");
    goPage("home");
  };

  // ── PANIER ──
 const addToCart = useCallback((p) => {
    if (!p?.id) {
      console.warn("⚠️ Produit sans ID, ignoré:", p);
      return;
    }

    // Parser image_urls proprement (peut être string JSON ou array)
    let imgArr = [];
    if (Array.isArray(p.image_urls)) {
      imgArr = p.image_urls;
    } else if (typeof p.image_urls === "string") {
      try { imgArr = JSON.parse(p.image_urls); } catch { imgArr = []; }
    }

    // Image finale : image principale d'abord, puis première du tableau
    const img = (p.image && p.image.startsWith("http"))
      ? p.image
      : (imgArr[0] && imgArr[0].startsWith("http") ? imgArr[0] : null);

    setCartItems(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, {
        id:          p.id,
        name:        p.name_fr || p.name || "Produit",
        image:       img,
        prix:        p.prix || 0,
        qty:         1,
        vendeur_id:  p.vendeur_id || null,
        vendeur_nom: p.vendeur_nom || "",
        categorie:   p.categorie || "",
        ville:       p.ville || "",
        stock:       p.stock || null,
      }];
    });
    setCartOpen(true);
  }, []);
  const changeQty = (id, d) => setCartItems(prev => prev.map(i => i.id===id ? {...i, qty:Math.max(1,i.qty+d)} : i));
  const removeItem = (id) => setCartItems(prev => prev.filter(i => i.id!==id));
  const totalQty   = cartItems.reduce((a,i) => a+i.qty, 0);
  const totalPrice = cartItems.reduce((a,i) => a+(i.prix*i.qty), 0);

  const passerCommande = async () => {
    if (!user) { setAuthOpen(true); setCartOpen(false); return; }
    try {
      // 1️⃣ Créer les commandes
      const orderPromises = cartItems.map(item =>
        supabase.from("orders").insert({
          product_id: item.id,
          vendeur_id: item.vendeur_id,
          client_id: user.id,
          client_nom: userData?.nom || user.email,
          telephone: userData?.telephone || "",
          montant: item.prix * item.qty,
          commission: Math.round(item.prix * item.qty * COMMISSION_RATE),
          montant_vendeur: Math.round(item.prix * item.qty * (1 - COMMISSION_RATE)),
          status: "pending",
          livraison_status: "pending",
          escrow_status: "pending",
        }).select().single()
      );
      const orderResults = await Promise.all(orderPromises);
      const createdOrders = orderResults.map(r => r.data).filter(Boolean);

      // 2️⃣ Créer automatiquement les livraisons pour chaque commande
      const codesSuivis = [];
      for (const order of createdOrders) {
        const item = cartItems.find(i => i.id === order.product_id);
        try {
          const { code } = await creerLivraisonAutomatique({
            supabase,
            orderId:           order.id,
            clientNom:         userData?.nom || user.email,
            clientTel:         userData?.telephone || "",
            adresseLivraison:  userData?.ville || "Cameroun",
            adresseCollecte:   item?.ville ? `Boutique ${item.vendeur_nom || "vendeur"}, ${item.ville}` : "Boutique Yorix",
            distanceKm:        3.5,
            tempsEstimeMin:    25,
          });
          codesSuivis.push(code);
        } catch (errLiv) {
          console.warn("Livraison non créée pour commande", order.id, errLiv);
        }
      }

      // 3️⃣ Vider le panier
      setCartItems([]);
      setCartOpen(false);

      // 4️⃣ Afficher un message avec les codes de suivi
      if (codesSuivis.length > 0) {
        const codesStr = codesSuivis.join(", ");
        const msg = `✅ Commande créée avec succès !\n\n📦 Code${codesSuivis.length > 1 ? "s" : ""} de suivi : ${codesStr}\n\nVous serez contacté(e) pour le paiement. Vous pouvez suivre votre livraison sur la page Livraison.`;
        alert(msg);
      } else {
        alert("✅ Commande créée ! Vous serez contacté(e) pour le paiement.");
      }

      goPage("dashboard");
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  };

  // ── CHAT ──
  const sendChat = async () => {
    if (!chatMsg.trim()) return;
    const filtre = filtrerMsg(chatMsg);
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")}`;
    if (filtre.bloque) {
      setChatBlocked(true); setTimeout(() => setChatBlocked(false), 4000);
      if (user) await supabase.from("fraud_logs").insert({ type:"tentative_contournement", user_id:user.id, message:chatMsg }).catch(e => console.warn(e?.message));
      setChatMsg(""); return;
    }
    if (user) await supabase.from("messages").insert({ expediteur_id:user.id, destinataire_id:"support", texte:chatMsg, conversation_id:`${user.id}_support`, lu:false }).catch(e => console.warn(e?.message));
    setChatMessages(prev => [...prev, { text:chatMsg, me:true, time }]);
    setChatMsg("");
    setTimeout(() => setChatMessages(prev => [...prev, { text:"Merci ! Un conseiller Yorix vous répond dans quelques minutes. ⚡", me:false, time }]), 1200);
  };

  const toggleWish = useCallback((id) => setWishlist(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; }), []);

 const marquerNotifLue = async (notif) => {
    // Accepter soit un objet notif complet, soit juste un ID (pour compatibilité)
    const id = typeof notif === "object" ? notif.id : notif;
    const notification = typeof notif === "object" ? notif : notifs.find(n => n.id === id);
    
    // 1. Marquer comme lu dans la base (avec try/catch propre)
    try {
      const { error } = await supabase.from("notifications").update({ lu: true }).eq("id", id);
      if (error) console.warn("marquerNotifLue:", error.message);
    } catch (e) {
      console.warn("marquerNotifLue exception:", e?.message);
    }
    
    // 2. Mise à jour locale immédiate (UI réactive)
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, lu: true } : n));
    
    // 3. Fermer le drawer
    setNotifOpen(false);
    
    // 4. Rediriger selon le type de notification
    if (notification) {
      if (notification.type === "new_product" || notification.link?.includes("/products/")) {
        goPage("produits");
      } else if (notification.type === "new_message") {
        goPage("dashboard");
        setDashTab("messages");
      }
    }
  };
  const marquerToutesLues = async () => {
    const ids = notifs.filter(n => !n.lu).map(n => n.id);
    if (ids.length === 0) return;
    
    try {
      const { error } = await supabase.from("notifications").update({ lu: true }).in("id", ids);
      if (error) console.warn("marquerToutesLues:", error.message);
    } catch (e) {
      console.warn("marquerToutesLues exception:", e?.message);
    }
    
    setNotifs(prev => prev.map(n => ({ ...n, lu: true })));
  };

  const unread = notifs.filter(n => !n.lu).length;
  const produitsFiltres = produits.filter(p => !search || p.name_fr?.toLowerCase().includes(search.toLowerCase()) || p.description_fr?.toLowerCase().includes(search.toLowerCase()));

  const roleChipClass = () => ({ buyer:"chip-buyer", seller:"chip-seller", delivery:"chip-delivery", provider:"chip-provider" }[userRole] || "chip-buyer");

  const getDashNav = () => {
    if (userRole === "seller")   return [{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"🏪",id:"mesProduits",label:"Mes produits"},{icon:"➕",id:"ajouterProduit",label:"Ajouter produit"},{icon:"📦",id:"commandes",label:"Commandes"},{icon:"💰",id:"wallet",label:"Wallet"}];
    if (userRole === "delivery") return [{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"🟡",id:"disponibles",label:"Disponibles"},{icon:"🚚",id:"enCours",label:"En cours"},{icon:"✅",id:"historique",label:"Historique"},{icon:"💰",id:"wallet",label:"Gains"}];
    if (userRole === "provider") return [{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"📋",id:"demandes",label:"Demandes"},{icon:"🛠️",id:"mesServices",label:"Mes services"},{icon:"+",id:"ajouterService",label:"Ajouter service"}];
    return [{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"📦",id:"commandes",label:"Mes commandes"},{icon:"❤️",id:"favoris",label:"Favoris"},{icon:"🌟",id:"loyalty",label:"Fidélité"}];
  };

  const TABS = [
  {l:"🏠 Accueil",p:"home"},{l:"🛍️ Produits",p:"produits"},{l:"🚚 Livraison",p:"livraison"},
  {l:"🔐 Escrow",p:"escrow"},{l:"👷 Prestataires",p:"prestataires"},{l:"💼 Business",p:"business"},
  {l:"🎓 Academy",p:"academy"},{l:"📰 Blog",p:"blog"},{l:"🌟 Fidélité",p:"loyalty"},
  {l:"📞 Contact",p:"contact"},{l:"🆘 Aide",p:"aide"},
  ...(user && (userData?.role==="admin" || userData?.role==="superadmin")
    ? [{l:"⚙️ Admin",p:"admin"}]
    : []),
];

  if (loading) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", fontFamily:"'DM Sans',sans-serif", color:"#1a6b3a", gap:12 }}>
      <div style={{ width:40, height:40, border:"4px solid #e2ddd6", borderTopColor:"#1a6b3a", borderRadius:"50%", animation:"spin .7s linear infinite" }}/>
      Chargement de Yorix...
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );

  return (
    <>
      <style>{makeCSS(dark)}</style>

      {/* ── AUTH MODAL ── */}
      {/* ── MODAL DEMANDE LIVRAISON ── */}
      {demandeLivraisonOpen && (
        <ModalDemandeLivraison
          user={user}
          userData={userData}
          onClose={() => setDemandeLivraisonOpen(false)}
          onSuccess={(code) => {
            console.log("Livraison créée avec code:", code);
          }}
        />
      )}
      {authOpen && (
        <div className="modal-overlay" onClick={e => e.target===e.currentTarget && setAuthOpen(false)}>
          <div className="modal" style={{width:"100%",maxWidth:480,margin:"0 auto"}}>
            <button className="modal-close" onClick={() => setAuthOpen(false)}>✕</button>
            <div className="modal-title">{authTab==="login" ? "Bon retour ! 👋" : "Rejoindre Yorix 🇨🇲"}</div>
            <p className="modal-sub">Votre marketplace camerounaise de confiance</p>
            <div className="auth-tabs">
              <button className={`auth-tab${authTab==="login"?" active":""}`} onClick={() => { setAuthTab("login"); setAuthError(""); }}>🔑 Connexion</button>
              <button className={`auth-tab${authTab==="register"?" active":""}`} onClick={() => { setAuthTab("register"); setAuthError(""); }}>🚀 Inscription</button>
            </div>
            {authError && <div className="error-msg">⚠️ {authError}</div>}

            {authTab === "register" && (
              <>
                <div style={{background:"var(--green-pale)",border:"1px solid var(--green-light)",borderRadius:9,padding:"10px 12px",marginBottom:12,fontSize:".78rem",color:"var(--green)",fontWeight:600}}>
                  👇 Choisissez votre profil pour commencer
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
                  {[
                    {id:"buyer",   icon:"🛍️", label:"Acheteur",    desc:"J'achète des produits"},
                    {id:"seller",  icon:"🏪", label:"Vendeur",     desc:"Je vends mes produits"},
                    {id:"delivery",icon:"🚚", label:"Livreur",     desc:"J'effectue des livraisons"},
                    {id:"provider",icon:"👷", label:"Prestataire", desc:"Je propose des services"},
                  ].map(r => (
                    <div
                      key={r.id}
                      onClick={() => setSelectedRole(r.id)}
                      style={{
                        border:`2px solid ${selectedRole===r.id?"var(--green)":"var(--border)"}`,
                        borderRadius:10,padding:"12px 10px",cursor:"pointer",
                        background:selectedRole===r.id?"var(--green-pale)":"var(--surface)",
                        textAlign:"center",transition:"all .2s",
                      }}
                    >
                      <div style={{fontSize:"1.8rem",marginBottom:4}}>{r.icon}</div>
                      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--ink)"}}>{r.label}</div>
                      <div style={{fontSize:".67rem",color:"var(--gray)",marginTop:2}}>{r.desc}</div>
                      {selectedRole===r.id && <div style={{marginTop:5,fontSize:".62rem",fontWeight:700,color:"var(--green)"}}>✅ Sélectionné</div>}
                    </div>
                  ))}
                </div>
                <div className="form-group">
                  <label className="form-label">Nom complet <span>*</span></label>
                  <input className="form-input" placeholder="Ex: Amina Bello" value={authForm.nom} onChange={e => setAuthForm(f=>({...f,nom:e.target.value}))}/>
                </div>
                <div className="form-group">
                  <label className="form-label">Téléphone <span>*</span></label>
                  <input className="form-input" type="tel" placeholder="+237 6XX XXX XXX" value={authForm.tel} onChange={e => setAuthForm(f=>({...f,tel:e.target.value}))}/>
                </div>
              </>
            )}
            <div className="form-group">
              <label className="form-label">Email <span>*</span></label>
              <input className="form-input" type="email" placeholder="votre@email.com" value={authForm.email} onChange={e => setAuthForm(f=>({...f,email:e.target.value}))}/>
            </div>
            <div className="form-group">
              <label className="form-label">Mot de passe <span>*</span></label>
              <input className="form-input" type="password" placeholder="••••••••" value={authForm.password} onChange={e => setAuthForm(f=>({...f,password:e.target.value}))}/>
            </div>
            <button className="form-submit" onClick={authTab==="login" ? doLogin : doRegister} disabled={authLoading} style={{fontSize:".9rem",padding:"13px"}}>
              {authLoading
                ? <><div className="spinner" style={{width:16,height:16,borderWidth:2}}/>Chargement...</>
                : authTab==="login"
                  ? "🔑 Se connecter"
                  : `🚀 Créer mon compte ${selectedRole==="buyer"?"Acheteur":selectedRole==="seller"?"Vendeur":selectedRole==="delivery"?"Livreur":"Prestataire"}`
              }
            </button>
            {authTab==="register" && (
              <p style={{fontSize:".68rem",color:"var(--gray)",textAlign:"center",marginTop:8}}>
                En vous inscrivant, vous acceptez nos conditions d'utilisation
              </p>
            )}
            <div className="divider">ou</div>
            <button className="social-btn" onClick={doGoogle}><span>🇬</span> Continuer avec Google</button>
          </div>
        </div>
      )}
      {/* ── TOPBAR ── */}
      <div className="topbar">
        <div className="topbar-l">
          <div className="flag-wrap">
            <span className="flag"><span className="fg"/><span className="fr"/><span className="fy"/></span>
            <span>Cameroun 🇨🇲</span>
          </div>
          <span>FR / EN</span>
          <span>📞 +237 696 56 56 54</span>
        </div>
        <div className="topbar-r">
          <span onClick={()=>goPage("aide")}>🆘 Aide</span>
          <span onClick={()=>goPage("contact")}>📞 Contact</span>
          {user
            ? <span style={{color:"#b7e4c7"}}>👤 {userData?.nom || user.email?.split("@")[0]}</span>
            : <span onClick={()=>{ setAuthTab("login"); setAuthOpen(true); }}>🔑 Se connecter</span>
          }
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="logo-wrap" onClick={()=>goPage("home")}>
          <div className="logo-txt">Yo<span>rix</span><sup>CM</sup></div>
        </div>

        <div className="nav-search" style={{position:"relative"}}>
          <select value={filterCat} onChange={e=>setFilterCat(e.target.value)}>
            <option value="">Tout</option>
            {CATS.map(c=><option key={c}>{c}</option>)}
          </select>
          <input
            placeholder="Rechercher un produit..."
            value={search}
            onChange={e=>setSearch(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&goPage("produits")}
            autoComplete="off"
          />
         {search.trim().length >= 2 && (
  <div style={{
    position: "absolute", top: "100%", left: 0, right: 0,
    background: "var(--bg)", border: "1px solid var(--border)",
    borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
    zIndex: 9999, maxHeight: 320, overflowY: "auto", marginTop: 4
  }}>
    {produits
      .filter(p =>
        (p.name_fr || "").toLowerCase().includes(search.toLowerCase()) ||
        (p.description_fr || "").toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 8)
      .map(p => (
        <div
          key={p.id}
          onClick={() => {
            setSearch("");
            goPage("produits");
          }}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 14px", cursor: "pointer",
            borderBottom: "1px solid var(--border)", fontSize: 13
          }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--bg2)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          {p.image && (
            <img
              src={p.image}
              style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 6 }}
              alt=""
              onError={e => e.currentTarget.style.display = "none"}
            />
          )}
          <div>
            <div style={{ fontWeight: 500 }}>{p.name_fr}</div>
            <div style={{ color: "var(--gray)", fontSize: 12 }}>
              {p.prix?.toLocaleString()} FCFA
            </div>
          </div>
        </div>
      ))
    }
    {produits.filter(p =>
      (p.name_fr || "").toLowerCase().includes(search.toLowerCase())
    ).length === 0 && (
      <div style={{ padding: 14, color: "var(--gray)", fontSize: 13, textAlign: "center" }}>
        Aucun résultat pour "{search}"
      </div>
    )}
  </div>
)}
          <button onClick={()=>goPage("produits")}>🔍</button>
        </div>

        <div className="nav-actions">
          {/* Dark mode */}
          <button
            className="dark-toggle"
            onClick={()=>setDark(d=>!d)}
            title={dark?"Mode clair":"Mode sombre"}
          >
            {dark?"☀️":"🌙"}
          </button>

          {/* Notifs (si connecté) */}
          {user && (
            <button className="icon-btn" onClick={()=>setNotifOpen(o=>!o)} title="Notifications">
              🔔{unread>0 && <span className="ibadge">{unread}</span>}
            </button>
          )}

          {/* Panier */}
          <button className="icon-btn" onClick={()=>setCartOpen(true)} title="Mon panier">
            🛒{totalQty>0 && <span className="ibadge">{totalQty}</span>}
          </button>

          {/* Boutons Auth */}
          {!user ? (
            <>
              <button
                className="btn-ghost"
                onClick={()=>{ setAuthTab("login"); setAuthOpen(true); }}
              >
                🔑 Connexion
              </button>
              <button
                className="btn-green"
                onClick={()=>{ setAuthTab("register"); setSelectedRole("buyer"); setAuthOpen(true); }}
              >
                🚀 S'inscrire
              </button>
            </>
          ) : (
            <>
              <span className={`role-chip ${roleChipClass()}`}>
                {ROLE_LABELS[userRole||"buyer"]}
              </span>
              <div
                className="user-av"
                onClick={()=>goPage("dashboard")}
                title="Mon espace"
              >
                {(userData?.nom||user.email||"?")[0].toUpperCase()}
              </div>
              <button className="btn-red" onClick={doLogout} title="Déconnexion">
                🚪 Déconnexion
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ── NOTIFICATIONS DRAWER ── */}
      {notifOpen && user && (
        <div className="notif-drawer">
          <div className="notif-header">
            <span className="notif-title">🔔 Notifications</span>
            {unread>0 && <span className="notif-clear" onClick={marquerToutesLues}>Tout marquer lu</span>}
          </div>
          <div className="notif-list">
            {notifs.length===0
              ? <div style={{padding:"24px 14px",textAlign:"center",color:"var(--gray)",fontSize:".78rem"}}>Aucune notification</div>
              : notifs.map(n=>(
                  <div
                    key={n.id}
                    className={`notif-item${!n.lu?" unread":""}`}
                    onClick={()=>marquerNotifLue(n)}
                  >
                    <div className="notif-icon">{n.icon||"🔔"}</div>
                    <div className="notif-body">
                      <h4>{n.titre||"Notification"}</h4>
                      <PushManager user={user} />
                      <p>{n.message||""}</p>
                      <div className="notif-time">{n.created_at ? new Date(n.created_at).toLocaleString("fr-FR") : ""}</div>
                    </div>
                  </div>
                ))
            }
          </div>
        </div>
      )}

     {/* — CART — */}
      {/* ═══ CART DRAWER AMAZON STYLE ═══ */}
<div className={`cart-overlay${cartOpen?" open":""}`} onClick={()=>setCartOpen(false)}/>
<div className={`cart-drawer${cartOpen?" open":""}`}>
  {/* Header */}
  <div className="cart-header">
    <div className="cart-header-left">
      <div className="cart-header-icon">🛒</div>
      <div>
        <div className="cart-title">Mon panier</div>
        <div className="cart-subtitle">
          {totalQty === 0 ? "Vide" : `${totalQty} article${totalQty > 1 ? "s" : ""}`}
        </div>
      </div>
    </div>
    <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
  </div>

  {/* Trust bar */}
  {cartItems.length > 0 && (
    <div className="cart-trust-bar">
      <span>🔒 Paiement sécurisé</span>
      <span>🚚 Livraison rapide</span>
      <span>✅ Garantie Yorix</span>
    </div>
  )}

  {/* Empty state */}
  {cartItems.length === 0 ? (
    <div className="cart-empty">
      <div className="cart-empty-icon">🛒</div>
      <div className="cart-empty-title">Votre panier est vide</div>
      <div className="cart-empty-sub">
        Parcourez notre catalogue et ajoutez vos produits préférés pour commander.
      </div>
      <button className="cart-empty-btn" onClick={() => { setCartOpen(false); goPage("produits"); }}>
        🛍️ Explorer les produits
      </button>
    </div>
  ) : (
    <>
      {/* Items list */}
      <div className="cart-items">
        {cartItems.map(item => {
          const sousTotal = item.prix * item.qty;
          const stockBadge =
            item.stock == null ? null :
            item.stock === 0 ? { cls: "ci-tag-stock-out", txt: "❌ Rupture" } :
            item.stock <= 5 ? { cls: "ci-tag-stock-low", txt: `⚠️ ${item.stock} restants` } :
            { cls: "ci-tag-stock-ok", txt: "✅ En stock" };

          return (
            <div key={item.id} className="cart-item">
              <div className="ci-img">
  <OptimizedImage
    src={item.image}
    alt={item.name}
    width={120}
    fallbackEmoji="📦"
    style={{ width: "100%", height: "100%" }}
  />
</div>
              <div className="ci-info">
                <div className="ci-name">{item.name}</div>
                {item.vendeur_nom && (
                  <div className="ci-vendeur">🏪 Vendeur : <strong>{item.vendeur_nom}</strong></div>
                )}
                <div className="ci-meta">
                  {item.categorie && <span className="ci-tag">{item.categorie}</span>}
                  {item.ville && <span className="ci-tag">📍 {item.ville}</span>}
                  {stockBadge && <span className={`ci-tag ${stockBadge.cls}`}>{stockBadge.txt}</span>}
                </div>
                <div className="ci-bottom">
                  <div className="ci-price-block">
                    <span className="ci-unit-price">{item.prix?.toLocaleString()} FCFA / unité</span>
                    <span className="ci-total-price">{sousTotal.toLocaleString()} FCFA</span>
                  </div>
                  <div className="ci-qty">
                    <button className="qty-btn" onClick={() => changeQty(item.id, -1)}>−</button>
                    <span className="qty-val">{item.qty}</span>
                    <button className="qty-btn" onClick={() => changeQty(item.id, 1)}>+</button>
                  </div>
                </div>
              </div>
              <button className="ci-del" onClick={() => removeItem(item.id)} title="Retirer">🗑</button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="cart-footer">
        <div className="cart-promo-row">
          🎁 <strong>Plus que {Math.max(0, 50000 - totalPrice).toLocaleString()} FCFA</strong> pour la livraison offerte !
        </div>

        <div className="cart-summary">
          <div className="cart-total-row">
            <span>Sous-total ({totalQty} article{totalQty > 1 ? "s" : ""})</span>
            <strong>{totalPrice.toLocaleString()} FCFA</strong>
          </div>
          <div className="cart-total-row">
            <span>🚚 Livraison estimée</span>
            <strong>{totalPrice >= 50000 ? "Offerte ✨" : `${LIVRAISON_FEE.toLocaleString()} FCFA`}</strong>
          </div>
          <div className="cart-total-row discount">
            <span>🔐 Protection Escrow</span>
            <strong>Incluse</strong>
          </div>
          <div className="cart-divider" />
          <div className="cart-total-row grand">
            <span>TOTAL À PAYER</span>
            <strong>{(totalPrice + (totalPrice >= 50000 ? 0 : LIVRAISON_FEE)).toLocaleString()} FCFA</strong>
          </div>
        </div>

        {/* Payment methods */}
        <div className="cart-payment-section">
          <div className="cart-payment-title">💳 Choisir un mode de paiement</div>
          <div className="cart-payment-grid">
            <button
              className="cart-pay-btn momo"
              onClick={() => {
                const total = totalPrice + (totalPrice >= 50000 ? 0 : LIVRAISON_FEE);
                const lignes = cartItems.map(i => `• ${i.name} (x${i.qty}) = ${(i.prix*i.qty).toLocaleString()} FCFA`).join("\n");
                const msg = [
                  "🛒 *NOUVELLE COMMANDE YORIX*",
                  "",
                  "💳 *Mode de paiement :* MTN Mobile Money",
                  `📱 *Numéro MoMo :* ${MOMO_NUMBER}`,
                  "",
                  "📦 *Produits commandés :*",
                  lignes,
                  "",
                  `💰 Sous-total : ${totalPrice.toLocaleString()} FCFA`,
                  `🚚 Livraison : ${totalPrice >= 50000 ? "Gratuite" : LIVRAISON_FEE.toLocaleString() + " FCFA"}`,
                  `💵 *TOTAL : ${total.toLocaleString()} FCFA*`,
                  "",
                  "👤 *Client :*",
                  `Nom : ${userData?.nom || "____"}`,
                  `Téléphone : ${userData?.telephone || "____"}`,
                  `Adresse : ____`,
                  "",
                  "✅ *Instructions :*",
                  `1. J'effectue le paiement MoMo au ${MOMO_NUMBER}`,
                  "2. J'envoie la capture du paiement sur ce WhatsApp",
                  "3. Je confirme mon adresse de livraison",
                  "",
                  "Merci Yorix ! 🇨🇲",
                ].join("\n");
                window.open(`https://wa.me/${PAYMENT_WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
              }}
            >
              <div className="cart-pay-icon">📱</div>
              <div className="cart-pay-label">MTN MoMo</div>
              <div className="cart-pay-number">{MOMO_NUMBER}</div>
            </button>

            <button
              className="cart-pay-btn orange"
              onClick={() => {
                const total = totalPrice + (totalPrice >= 50000 ? 0 : LIVRAISON_FEE);
                const lignes = cartItems.map(i => `• ${i.name} (x${i.qty}) = ${(i.prix*i.qty).toLocaleString()} FCFA`).join("\n");
                const msg = [
                  "🛒 *NOUVELLE COMMANDE YORIX*",
                  "",
                  "💳 *Mode de paiement :* Orange Money",
                  `📱 *Numéro Orange Money :* ${ORANGE_NUMBER}`,
                  "",
                  "📦 *Produits commandés :*",
                  lignes,
                  "",
                  `💰 Sous-total : ${totalPrice.toLocaleString()} FCFA`,
                  `🚚 Livraison : ${totalPrice >= 50000 ? "Gratuite" : LIVRAISON_FEE.toLocaleString() + " FCFA"}`,
                  `💵 *TOTAL : ${total.toLocaleString()} FCFA*`,
                  "",
                  "👤 *Client :*",
                  `Nom : ${userData?.nom || "____"}`,
                  `Téléphone : ${userData?.telephone || "____"}`,
                  `Adresse : ____`,
                  "",
                  "✅ *Instructions :*",
                  `1. J'effectue le paiement Orange Money au ${ORANGE_NUMBER}`,
                  "2. J'envoie la capture du paiement sur ce WhatsApp",
                  "3. Je confirme mon adresse de livraison",
                  "",
                  "Merci Yorix ! 🇨🇲",
                ].join("\n");
                window.open(`https://wa.me/${PAYMENT_WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
              }}
            >
              <div className="cart-pay-icon">🔶</div>
              <div className="cart-pay-label">Orange Money</div>
              <div className="cart-pay-number">{ORANGE_NUMBER}</div>
            </button>
          </div>

          <button
            className="cart-wa-confirm"
            onClick={() => {
              const total = totalPrice + (totalPrice >= 50000 ? 0 : LIVRAISON_FEE);
              const lignes = cartItems.map(i => `• ${i.name} (x${i.qty}) = ${(i.prix*i.qty).toLocaleString()} FCFA`).join("\n");
              const msg = [
                "🛒 *NOUVELLE COMMANDE YORIX*",
                "",
                "📦 *Produits commandés :*",
                lignes,
                "",
                `💰 Sous-total : ${totalPrice.toLocaleString()} FCFA`,
                `🚚 Livraison : ${totalPrice >= 50000 ? "Gratuite" : LIVRAISON_FEE.toLocaleString() + " FCFA"}`,
                `💵 *TOTAL : ${total.toLocaleString()} FCFA*`,
                "",
                "👤 *Client :*",
                `Nom : ${userData?.nom || "____"}`,
                `Téléphone : ${userData?.telephone || "____"}`,
                `Adresse : ____`,
                "",
                "💳 *Modes de paiement disponibles :*",
                `📱 MTN MoMo : ${MOMO_NUMBER}`,
                `🔶 Orange Money : ${ORANGE_NUMBER}`,
                "",
                "👉 Après paiement, j'envoie la capture sur ce WhatsApp.",
                "",
                "Merci Yorix ! 🇨🇲",
              ].join("\n");
              window.open(`https://wa.me/${PAYMENT_WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
            }}
          >
            💬 Commander via WhatsApp
          </button>

          <div className="cart-info-text">
            Après paiement, envoyez la capture au <strong>+237 {PAYMENT_WA_NUMBER.slice(3)}</strong><br/>
            pour valider votre commande.
          </div>
        </div>
      </div>
    </>
  )}
</div>
      {/* ── TABS ── */}
      <div className="nav-tabs">{TABS.map(t=><div key={t.p} className={`tab${page===t.p?" active":""}`} onClick={()=>goPage(t.p)}>{t.l}</div>)}</div>

      {/* ── PAY STRIP ── */}
      <div className="pay-strip">
        <b style={{color:"var(--ink)"}}>Paiement :</b>
        <div className="pay-methods"><span className="pm mtn-b">📱 MTN MoMo</span><span className="pm ora-b">🔶 Orange Money</span><span className="pm">💳 Carte</span><span className="pm">💵 Cash</span></div>
        <div className="strip-right"><span>🚚 J+1 Douala & Yaoundé</span><span>🔐 Escrow sécurisé</span>{user&&<span style={{color:"var(--gold)"}}>👤 {userData?.nom||user.email}</span>}</div>
      </div>

      {/* ════════ PAGE : ACCUEIL ════════ */}
      {page==="home"&&(
        <div className="anim">
          <Helmet>
  <title>Yorix CM — Marketplace #1 au Cameroun</title>
  <meta name="description" content="Achetez et vendez en ligne au Cameroun. 
    Paiement MTN MoMo et Orange Money. Livraison rapide à Yaoundé et Douala." />
  <meta property="og:title" content="Yorix CM — Marketplace #1 au Cameroun" />
  <meta property="og:description" content="La marketplace camerounaise 
    avec paiement mobile." />
  <meta property="og:image" content="https://yorix.cm/icons/icon-512.png" />
  <meta property="og:url" content="https://yorix.cm" />
  <meta property="og:type" content="website" />
</Helmet>

          {/* ── TRUST BANNER ── */}
          <div className="trust-banner">
            <div className="tb-item">🚚 Livraison rapide à Yaoundé &amp; Douala</div>
            <div className="tb-item">🔒 Paiement 100% sécurisé</div>
            <div className="tb-item">✅ Produits vérifiés</div>
            <div className="tb-item">📱 Support WhatsApp 7j/7</div>
          </div>

          {/* ── HERO ── */}
          <section className="hero">
            <div className="hero-inner">
              <div>
                <div className="hero-tag">🇨🇲 Marketplace #1 au Cameroun</div>
                <h1>Achetez et faites-vous<br/>livrer à <em>Yaoundé</em></h1>
                <p className="hero-sub">Produits locaux & importés · Prestataires vérifiés · Livraison express · MTN MoMo & Orange Money</p>

                {/* Badges confiance */}
                <div className="hero-badges">
                  <span className="hbadge hbadge-yellow">⭐ +2 000 avis clients</span>
                  <span className="hbadge hbadge-green">📦 +100 produits vendus</span>
                  <span className="hbadge">🔒 Paiement sécurisé</span>
                  <span className="hbadge">🚚 Livraison rapide</span>
                </div>

                <div className="hero-ctas">
                  <button className="cta-y" onClick={()=>goPage("produits")}>🛍️ Voir les produits</button>
                  <button
                    className="cta-w"
                    onClick={()=>{setCartOpen(true);}}
                  >🛒 Mon panier</button>
                </div>

                <div className="hero-stats">
                  {[["85K+","Produits"],["12K","Vendeurs"],["3K","Prestataires"],["10","Régions"]].map(([n,l])=>(
                    <div key={l}><div className="stat-num">{n}</div><div className="stat-lbl">{l}</div></div>
                  ))}
                </div>
              </div>

              <div className="hero-card">
                <div className="hc-title">🔍 Recherche rapide</div>
                <div className="sf">
                  <select value={filterCat} onChange={e=>setFilterCat(e.target.value)}>
                    <option value="">Tout</option>{CATS.map(c=><option key={c}>{c}</option>)}
                  </select>
                  <input placeholder="Produit, marque..." value={search} onChange={e=>setSearch(e.target.value)}/>
                </div>
                <div className="sf">
                  <select>{CITIES.map(c=><option key={c}>{c}</option>)}</select>
                  <input placeholder="Budget max (FCFA)"/>
                </div>
                <button className="sbtn" onClick={()=>goPage("produits")}>🔍 Rechercher</button>
                <div className="pop-row">
                  <span className="pop-lbl">Tendances :</span>
                  {["Pagne wax","iPhone","Karité","BTP"].map(s=>(
                    <span key={s} className="pop-tag" onClick={()=>{setSearch(s);goPage("produits");}}>{s}</span>
                  ))}
                </div>
                {/* Mini trust dans hero card */}
                <div style={{marginTop:12,paddingTop:10,borderTop:"1px solid rgba(255,255,255,.1)",display:"flex",flexDirection:"column",gap:4}}>
                  {["✅ Paiement sécurisé MTN MoMo","🚚 Livraison Yaoundé & Douala","🔐 Remboursement garanti Escrow"].map(t=>(
                    <div key={t} style={{fontSize:".68rem",color:"rgba(255,255,255,.65)",display:"flex",alignItems:"center",gap:5}}>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── SOCIAL PROOF BAR ── */}
          <div className="proof-bar">
            <div className="proof-item"><span className="proof-num">2 400+</span> commandes passées</div>
            <div className="proof-item"><span className="proof-num">850+</span> vendeurs actifs</div>
            <div className="proof-item"><span className="proof-num">98%</span> satisfaction client</div>
            <div className="proof-item"><span className="proof-num">J+1</span> livraison Yaoundé</div>
          </div>

          {/* ── OFFRES FLASH DU JOUR ── */}
          <section className="sec" style={{paddingBottom:0}}>
            <div className="sec-head">
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <h2 className="sec-title">⚡ Offres Flash</h2>
                <span style={{background:"#ff4444",color:"#fff",padding:"3px 10px",borderRadius:50,fontSize:".68rem",fontWeight:800,animation:"flashPulse 1.5s infinite"}}>AUJOURD'HUI SEULEMENT</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:".75rem",color:"var(--gray)"}}>Se termine dans :</span>
                <FlashCountdown/>
              </div>
            </div>
            {/* Bandeau promo */}
            <div style={{background:"linear-gradient(135deg,#ff4444,#ff6b35)",borderRadius:12,padding:"14px 18px",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"#fff",marginBottom:3}}>🔥 Promo du jour — jusqu'à -30% sur tous les téléphones !</div>
                <div style={{fontSize:".78rem",color:"rgba(255,255,255,.75)"}}>Offre valable uniquement aujourd'hui · Paiement MTN MoMo accepté</div>
              </div>
              <button
                style={{background:"#fff",color:"#ff4444",border:"none",padding:"9px 18px",borderRadius:8,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".82rem",cursor:"pointer",whiteSpace:"nowrap"}}
                onClick={()=>{ setFilterCat("Téléphones"); goPage("produits"); }}
              >🛍️ Voir les promos</button>
            </div>
            {/* Grille flash : les 4 premiers produits avec badge flash simulé */}
            {!produitsLoading && produits.length > 0 && (
              <ProdGrid
                prods={produits.slice(0,4).map((p,i) => ({
                  ...p,
                  flash: i < 2,
                  promo: i >= 2 && i < 4,
                  promo_pct: i === 2 ? 20 : i === 3 ? 15 : 0,
                }))}
                user={user} userData={userData} onAddToCart={addToCart} onWish={toggleWish} wishlist={wishlist}
              />
            )}
          </section>

          {/* ── PRODUITS RÉCENTS ── */}
          <section className="sec">
            <div className="sec-head">
              <h2 className="sec-title">🔥 Produits populaires</h2>
              <span className="sec-link" onClick={()=>goPage("produits")}>Voir tout →</span>
            </div>
            {produitsLoading
              ? <div className="loading"><div className="spinner"/>Chargement...</div>
              : produits.length===0
                ? <div className="empty-state"><div className="empty-icon">🛍️</div><p>Aucun produit pour l'instant</p></div>
                : <ProdGrid prods={produits.slice(0,10)} user={user} userData={userData} onAddToCart={addToCart} onWish={toggleWish} wishlist={wishlist}/>
            }
          </section>

          {/* ── TRUST BAND ── */}
          <div className="trust">
            <div className="trust-inner">
              {[
                {icon:"📱",t:"MTN MoMo & Orange",p:"Paiement mobile sécurisé"},
                {icon:"🔐",t:"Escrow Yorix",p:"Fonds protégés jusqu'à livraison"},
                {icon:"🚚",t:"Livraison J+1",p:"Yaoundé & Douala"},
                {icon:"🌟",t:"Vendeurs vérifiés",p:"Boutiques certifiées"},
              ].map(t=>(
                <div key={t.t} className="ti"><div className="ti-icon">{t.icon}</div><div><h4>{t.t}</h4><p>{t.p}</p></div></div>
              ))}
            </div>
          </div>

          {/* ── POURQUOI CHOISIR YORIX ── */}
          <div className="why-section">
            <div className="why-inner">
              <div style={{textAlign:"center",marginBottom:4}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"var(--green-pale)",color:"var(--green)",padding:"4px 12px",borderRadius:50,fontSize:".72rem",fontWeight:700,marginBottom:8}}>🏆 Pourquoi nous choisissons Yorix ?</div>
                <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.3rem",fontWeight:800,color:"var(--ink)",letterSpacing:"-.5px"}}>La marketplace la plus fiable du Cameroun</h2>
              </div>
              <div className="why-grid">
                {[
                  {icon:"🚚",title:"Livraison rapide",desc:"Livraison le jour même ou J+1 sur Yaoundé et Douala. Suivi GPS en temps réel."},
                  {icon:"✅",title:"Produits vérifiés",desc:"Chaque vendeur est contrôlé. Produits authentiques garantis ou remboursés."},
                  {icon:"🔒",title:"Paiement sécurisé",desc:"MTN MoMo, Orange Money, Escrow Yorix. Votre argent libéré à la réception."},
                  {icon:"📱",title:"Support WhatsApp",desc:"Notre équipe répond 7j/7 sur WhatsApp pour vous aider à chaque étape."},
                ].map(w=>(
                  <div key={w.title} className="why-card">
                    <div className="why-icon">{w.icon}</div>
                    <div className="why-title">{w.title}</div>
                    <div className="why-desc">{w.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

         {/* — PRESTATAIRES — */}
<section className="sec">
  <div className="sec-head">
    <h2 className="sec-title">🧑‍💼 Prestataires de confiance</h2>
    <span className="sec-link" onClick={() => goPage("prestataires")}>Voir tous →</span>
  </div>
  <div className="prest-grid">
    {allServices.length === 0 ? (
      <div style={{gridColumn:"1/-1", textAlign:"center", padding:30, color:"var(--gray)"}}>
        Aucun prestataire pour le moment.
      </div>
    ) : (
      allServices.slice(0, 3).map(s => (
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
              <div style={{fontSize:".69rem",color:"var(--gray)"}}>
                ⭐ {s.note || 0} · {s.nombre_avis || 0} avis
              </div>
            </div>
            <button 
              className="btn-hire"
              onClick={() => window.open(
                `https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(`Bonjour, je cherche un prestataire pour : ${s.nom} (${s.provider_nom})`)}`,
                '_blank'
              )}
            >
              Contacter
            </button>
          </div>
        </div>
      ))
    )}
  </div>
</section>

          {/* ── NEWSLETTER ── */}
          <div className="newsletter">
            <div className="nl-title">📬 Restez informé(e)</div>
            <p className="nl-sub">Les meilleures offres Yorix directement dans votre boîte mail.</p>
            {nlSent
              ? <div style={{background:"rgba(255,255,255,.2)",borderRadius:8,padding:"9px 18px",color:"#fff",fontWeight:600}}>✅ Vous êtes abonné(e) !</div>
              : <div className="nl-form">
                  <input className="nl-input" placeholder="Votre email..." value={nlEmail} onChange={e=>setNlEmail(e.target.value)}/>
                  <button className="nl-btn" onClick={async()=>{if(nlEmail){await supabase.from("newsletter").insert({email:nlEmail}).catch(e => console.warn(e?.message));setNlSent(true);}}}>S'abonner 🚀</button>
                </div>
            }
          </div>

          {/* ── WA STICKY MOBILE ── */}
          <div className="wa-sticky">
            <span className="wa-sticky-text">📱 Commander maintenant</span>
            <button
              className="wa-sticky-btn"
              onClick={()=>window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent("Bonjour Yorix ! Je veux commander 🛍️")}`, "_blank")}
            >
              Commander via WhatsApp
            </button>
          </div>

        </div>
      )}

      {/* ════════ PAGE : PRODUITS ════════ */}
      {page==="produits"&&(
        <section className="sec anim">
          <div className="sec-head">
            <h2 className="sec-title">🛍️ Tous les produits</h2>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{fontSize:".8rem",color:"var(--gray)"}}>{produitsFiltres.length} résultat(s)</span>
              {filterCat && <button className="btn-ghost" style={{fontSize:".72rem",padding:"4px 10px"}} onClick={()=>setFilterCat("")}>✕ {filterCat}</button>}
            </div>
          </div>
          {/* Filtres catégories */}
          <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:18}}>
            <button onClick={()=>setFilterCat("")} style={{padding:"5px 12px",borderRadius:50,border:"1.5px solid var(--border)",background:!filterCat?"var(--green)":"var(--surface)",color:!filterCat?"#fff":"var(--ink)",font:"600 .72rem 'DM Sans',sans-serif",cursor:"pointer"}}>Tout</button>
            {CATS.map(c=><button key={c} onClick={()=>setFilterCat(c)} style={{padding:"5px 12px",borderRadius:50,border:"1.5px solid var(--border)",background:filterCat===c?"var(--green)":"var(--surface)",color:filterCat===c?"#fff":"var(--ink)",font:"600 .72rem 'DM Sans',sans-serif",cursor:"pointer"}}>{c}</button>)}
          </div>
          {produitsLoading?<div className="loading"><div className="spinner"/>Chargement...</div>
            :produitsFiltres.length===0?<div className="empty-state"><div className="empty-icon">🔍</div><p>Aucun produit{search?` pour "${search}"`:""}.</p></div>
            :<ProdGrid prods={produitsFiltres} user={user} userData={userData} onAddToCart={addToCart} onWish={toggleWish} wishlist={wishlist}/>}
        </section>
      )}

     {/* ════════ PAGE : LIVRAISON ════════ */}
      {page==="livraison"&&(
        <div className="anim">
          <section className="sec">

            {/* ═══ SUIVI TEMPS RÉEL ═══ */}
            <DeliveryTracker />

            {/* ── HERO LIVRAISON ── */}
            <div style={{background:"linear-gradient(135deg,#0a1410,#1a3a24,#0d3320)",borderRadius:16,padding:28,color:"#fff",marginBottom:20,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-20,right:-20,width:160,height:160,background:"rgba(79,209,125,.06)",borderRadius:"50%"}}/>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(252,209,22,.14)",color:"var(--yellow)",border:"1px solid rgba(252,209,22,.28)",padding:"4px 12px",borderRadius:50,fontSize:".72rem",fontWeight:700,marginBottom:14}}>
                🛵 Yorix Ride — Livraison Express Cameroun
              </div>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.5rem",fontWeight:800,marginBottom:8,lineHeight:1.2}}>
                Livraison à domicile<br/><span style={{color:"#4fd17d"}}>comme Uber, partout au Cameroun</span>
              </h2>
              <p style={{color:"rgba(255,255,255,.6)",fontSize:".85rem",lineHeight:1.75,marginBottom:20,maxWidth:480}}>
                Commandez un produit, un livreur proche de vous accepte la mission en quelques secondes. Suivi GPS en temps réel, paiement à la livraison.
              </p>

              {/* Stats livraison */}
              <div style={{display:"flex",gap:20,flexWrap:"wrap",marginBottom:20}}>
                {[["🏍️","850+","Livreurs actifs"],["⏱️","~25 min","Temps moyen"],["⭐","4.8/5","Note moyenne"],["📦","12K+","Livraisons/mois"]].map(([ic,val,lbl])=>(
                  <div key={lbl}>
                    <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                      <span style={{fontSize:"1rem"}}>{ic}</span>
                      <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"var(--yellow)"}}>{val}</span>
                    </div>
                    <div style={{fontSize:".62rem",color:"rgba(255,255,255,.35)"}}>{lbl}</div>
                  </div>
                ))}
              </div>

              {/* CTA commander livraison */}
              <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
                <button
                  style={{background:"var(--yellow)",color:"#0d1f14",border:"none",padding:"11px 20px",borderRadius:9,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",cursor:"pointer"}}
                  onClick={() => setDemandeLivraisonOpen(true)}
                >📦 Demander une livraison</button>
                <button
                  style={{background:"rgba(255,255,255,.09)",color:"#fff",border:"1px solid rgba(255,255,255,.2)",padding:"11px 20px",borderRadius:9,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".85rem",cursor:"pointer"}}
                  onClick={()=>{ setAuthTab("register"); setSelectedRole("delivery"); setAuthOpen(true); }}
                >🏍️ Devenir livreur Yorix</button>
              </div>
            </div>

            {/* ── COMMENT ÇA MARCHE ── */}
            <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:22,marginBottom:20}}>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"var(--ink)",marginBottom:16,letterSpacing:"-.3px"}}>🗺️ Comment fonctionne Yorix Ride ?</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
                {[
                  {n:1,icon:"🛍️",t:"Vous commandez",d:"Passez commande sur Yorix ou via WhatsApp"},
                  {n:2,icon:"🏍️",t:"Livreur assigné",d:"Un livreur proche accepte votre mission en quelques secondes"},
                  {n:3,icon:"📍",t:"Suivi en direct",d:"Suivez votre livreur sur la carte en temps réel"},
                  {n:4,icon:"✅",t:"Livraison confirmée",d:"Réceptionnez et confirmez. Paiement libéré au livreur."},
                ].map(s=>(
                  <div key={s.n} style={{textAlign:"center",padding:"14px 10px",background:"var(--surface2)",borderRadius:10}}>
                    <div style={{width:28,height:28,background:"var(--green)",color:"#fff",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".78rem",margin:"0 auto 8px"}}>{s.n}</div>
                    <div style={{fontSize:"1.4rem",marginBottom:5}}>{s.icon}</div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",color:"var(--ink)",marginBottom:3}}>{s.t}</div>
                    <div style={{fontSize:".68rem",color:"var(--gray)",lineHeight:1.5}}>{s.d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── TARIFS ── */}
            <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:22,marginBottom:20}}>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"var(--ink)",marginBottom:14}}>💰 Tarifs de livraison</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
                {[
                  {zone:"🏙️ Intra-ville",prix:"500 – 1 500 FCFA",delai:"20 – 45 min",dispo:"Douala, Yaoundé"},
                  {zone:"🌆 Inter-quartiers",prix:"1 500 – 3 000 FCFA",delai:"1h – 2h",dispo:"Bafoussam, Bamenda"},
                  {zone:"🗺️ Inter-villes",prix:"3 000 – 8 000 FCFA",delai:"J+1",dispo:"Tout le Cameroun"},
                ].map(t=>(
                  <div key={t.zone} style={{background:"var(--surface2)",borderRadius:10,padding:14,border:"1px solid var(--border)"}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".84rem",color:"var(--ink)",marginBottom:5}}>{t.zone}</div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1rem",fontWeight:800,color:"var(--green)",marginBottom:3}}>{t.prix}</div>
                    <div style={{fontSize:".69rem",color:"var(--gray)",marginBottom:2}}>⏱ {t.delai}</div>
                    <div style={{fontSize:".65rem",color:"var(--gray)"}}>{t.dispo}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── LIVREURS DISPONIBLES ── */}
            <div>
              <div className="sec-head"><h3 className="sec-title">🏍️ Livreurs disponibles maintenant</h3></div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                {[
                  {emoji:"🏍️",name:"Jean-Pierre M.",sub:"Moto · Douala · Akwa",livraisons:342,note:4.9,dispo:true,temps:"~15 min",vehicule:"Moto"},
                  {emoji:"🚐",name:"Augustin N.",sub:"Minibus · Yaoundé · Bastos",livraisons:218,note:4.8,dispo:true,temps:"~20 min",vehicule:"Minibus"},
                  {emoji:"🚗",name:"Grace T.",sub:"Voiture · Douala · Bonanjo",livraisons:156,note:5.0,dispo:true,temps:"~10 min",vehicule:"Voiture"},
                  {emoji:"🚚",name:"Fabrice K.",sub:"Camionnette · Bafoussam",livraisons:189,note:4.7,dispo:false,temps:null,vehicule:"Camionnette"},
                  {emoji:"🏍️",name:"Bertrand A.",sub:"Moto · Yaoundé · Mvan",livraisons:271,note:4.8,dispo:true,temps:"~18 min",vehicule:"Moto"},
                  {emoji:"🚐",name:"Carine M.",sub:"Minibus · Douala · Bonapriso",livraisons:98,note:4.9,dispo:false,temps:null,vehicule:"Minibus"},
                ].map(d=>(
                  <div key={d.name} style={{background:d.dispo?"var(--surface)":"var(--surface2)",border:`1.5px solid ${d.dispo?"var(--green-light)":"var(--border)"}`,borderRadius:12,padding:15,opacity:d.dispo?1:.7,transition:"all .2s"}}>
                    <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}>
                      <div style={{width:44,height:44,borderRadius:"50%",background:d.dispo?"var(--green)":"var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",flexShrink:0}}>{d.emoji}</div>
                      <div style={{flex:1}}>
                        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".86rem",color:"var(--ink)"}}>{d.name}</div>
                        <div style={{fontSize:".65rem",color:"var(--gray)",lineHeight:1.4}}>{d.sub}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",gap:8,marginBottom:8}}>
                      <div style={{background:"var(--surface2)",borderRadius:7,padding:"4px 8px",fontSize:".67rem",fontWeight:600,color:"var(--ink)"}}>⭐ {d.note}</div>
                      <div style={{background:"var(--surface2)",borderRadius:7,padding:"4px 8px",fontSize:".67rem",fontWeight:600,color:"var(--ink)"}}>📦 {d.livraisons} livraisons</div>
                    </div>
                    <div style={{fontSize:".67rem",marginBottom:10,fontWeight:600,color:d.dispo?"#27a85a":"var(--gray)"}}>
                      {d.dispo
                        ? <><span style={{width:6,height:6,background:"#4fd17d",borderRadius:"50%",display:"inline-block",marginRight:4}}/>Disponible · {d.temps}</>
                        : "⏸️ Non disponible pour le moment"
                      }
                    </div>
                   <button
                      style={{width:"100%",background:d.dispo?"var(--green)":"var(--border)",color:d.dispo?"#fff":"var(--gray)",border:"none",padding:"8px",borderRadius:8,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".75rem",cursor:d.dispo?"pointer":"default"}}
                      onClick={() => d.dispo && setDemandeLivraisonOpen(true)}
                    >{d.dispo?"📦 Demander livraison":"⏳ Voir plus tard"}</button>
                  </div>
                ))}
              </div>
            </div>

            {/* ── REJOINDRE COMME LIVREUR ── */}
            <div style={{background:"linear-gradient(135deg,#1a3a24,#0d3320)",borderRadius:14,padding:24,marginTop:20,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color:"#fff",marginBottom:5}}>🏍️ Devenez livreur Yorix</div>
                <div style={{color:"rgba(255,255,255,.6)",fontSize:".82rem",lineHeight:1.6,maxWidth:360}}>Gagnez 15 000 – 80 000 FCFA/mois selon votre activité. Horaires libres, votre propre véhicule, paiement quotidien.</div>
                <div style={{display:"flex",gap:10,marginTop:10,flexWrap:"wrap"}}>
                  {["✅ Paiement quotidien","🕐 Horaires libres","🏍️ Votre véhicule"].map(t=><span key={t} style={{background:"rgba(255,255,255,.1)",color:"rgba(255,255,255,.8)",padding:"3px 9px",borderRadius:50,fontSize:".67rem"}}>{t}</span>)}
                </div>
              </div>
              <button
                style={{background:"var(--yellow)",color:"#0d1f14",border:"none",padding:"12px 22px",borderRadius:10,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",cursor:"pointer",whiteSpace:"nowrap"}}
                onClick={()=>{ setAuthTab("register"); setSelectedRole("delivery"); setAuthOpen(true); }}
              >🚀 S'inscrire comme livreur</button>
            </div>

          </section>
        </div>
      )}

      {/* ════════ PAGE : ESCROW ════════ */}
      {page==="escrow"&&(
        <section className="sec anim">
          <div style={{background:dark?"#152118":"#f0faf4",border:`1.5px solid ${dark?"#2a4030":"#c0ecd0"}`,borderRadius:14,padding:28,marginBottom:20}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"var(--green)",color:"#fff",padding:"4px 12px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:12}}>🔐 Escrow Yorix</div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.4rem",fontWeight:800,color:"var(--ink)",marginBottom:10,letterSpacing:"-.5px"}}>Votre argent protégé jusqu'à la livraison</h2>
            <p style={{color:"var(--gray)",fontSize:".86rem",lineHeight:1.75,marginBottom:20}}>Votre argent reste bloqué chez Yorix jusqu'à ce que vous confirmiez la réception. En cas de litige, nous vous remboursons.</p>
            <div className="escrow-steps">
              {[{n:1,t:"Vous commandez",d:"Votre paiement est bloqué · statut : pending"},{n:2,t:"Vendeur expédie",d:"Les fonds passent au statut : sécurisé 🔐"},{n:3,t:"Vous confirmez",d:"Fonds libérés au vendeur · statut : libéré ✅"},{n:4,t:"Litige ? Yorix arbitre",d:"Remboursement sous 48h · statut : remboursé ↩️"}].map(s=>(
                <div key={s.n} className="estep"><div className="estep-num">{s.n}</div><div className="estep-text"><h4>{s.t}</h4><p>{s.d}</p></div></div>
              ))}
            </div>
          </div>
          <div className="sec-head"><h2 className="sec-title">Produits avec protection Escrow</h2></div>
          {produitsLoading?<div className="loading"><div className="spinner"/>Chargement...</div>
            :<ProdGrid prods={produits.filter(p=>p.escrow).slice(0,10)} user={user} userData={userData} onAddToCart={addToCart} onWish={toggleWish} wishlist={wishlist}/>}
        </section>
      )}

     {/* ════════ PAGE : PRESTATAIRES — VERSION PREMIUM ════════ */}
      {page==="prestataires"&&(
        <section className="sec anim">

          {/* ── HERO PRESTATAIRES ── */}
          <div style={{
            background: "linear-gradient(135deg, #0a1410 0%, #1a3a24 50%, #0d3320 100%)",
            borderRadius: 16,
            padding: "32px 28px",
            color: "#fff",
            marginBottom: 24,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -40, right: -40, width: 200, height: 200,
              background: "rgba(252,209,22,.08)", borderRadius: "50%",
            }}/>
            <div style={{
              position: "absolute", bottom: -60, left: -50, width: 180, height: 180,
              background: "rgba(79,209,125,.06)", borderRadius: "50%",
            }}/>

            <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 24, alignItems: "center" }}>
              <div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "rgba(252,209,22,.14)", color: "var(--yellow)",
                  border: "1px solid rgba(252,209,22,.28)",
                  padding: "5px 14px", borderRadius: 50,
                  fontSize: ".72rem", fontWeight: 700, marginBottom: 14,
                }}>
                  👷 Prestataires Yorix
                </div>
                <h1 style={{
                  fontFamily: "'Syne',sans-serif", fontSize: "1.9rem", fontWeight: 800,
                  marginBottom: 10, letterSpacing: "-.5px", lineHeight: 1.15,
                }}>
                  Trouve le <span style={{ color: "var(--yellow)" }}>professionnel idéal</span> près de chez toi
                </h1>
                <p style={{
                  color: "rgba(255,255,255,.65)", fontSize: ".88rem",
                  maxWidth: 460, lineHeight: 1.7, marginBottom: 18,
                }}>
                  Plombiers, électriciens, photographes, coiffeuses, traiteurs... Tous vérifiés, notés et disponibles partout au Cameroun.
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button
                    onClick={() => goPage("inscription")}
                    style={{
                      background: "var(--yellow)", color: "#0d1f14", border: "none",
                      padding: "11px 20px", borderRadius: 10,
                      fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".85rem",
                      cursor: "pointer", boxShadow: "0 4px 12px rgba(252,209,22,.25)",
                    }}
                  >
                    🚀 Devenir prestataire
                  </button>
                  <button
                    onClick={() => window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent("Bonjour Yorix ! Je cherche un prestataire.")}`, "_blank")}
                    style={{
                      background: "rgba(255,255,255,.1)", color: "#fff",
                      border: "1px solid rgba(255,255,255,.2)",
                      padding: "11px 20px", borderRadius: 10,
                      fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".85rem",
                      cursor: "pointer",
                    }}
                  >
                    💬 Besoin d'aide ?
                  </button>
                </div>
              </div>

              <div style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
                borderRadius: 12, padding: 18, backdropFilter: "blur(10px)",
              }}>
                <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.5)", fontWeight: 600, marginBottom: 12 }}>
                  📊 LA MARKETPLACE DE SERVICES
                </div>
                {[
                  { icon: "👷", val: "850+", lbl: "Prestataires actifs" },
                  { icon: "✅", val: "100%", lbl: "Profils vérifiés" },
                  { icon: "⭐", val: "4.8/5", lbl: "Note moyenne" },
                  { icon: "📍", val: "10+", lbl: "Villes couvertes" },
                ].map(s => (
                  <div key={s.lbl} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "6px 0",
                  }}>
                    <span style={{ fontSize: "1.1rem" }}>{s.icon}</span>
                    <span style={{
                      fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1rem",
                      color: "var(--yellow)", minWidth: 50,
                    }}>{s.val}</span>
                    <span style={{ fontSize: ".72rem", color: "rgba(255,255,255,.6)" }}>{s.lbl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── BARRE DE RECHERCHE + FILTRES ── */}
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 12, padding: 16, marginBottom: 20,
            display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center",
          }}>
            <input
              placeholder="🔍 Rechercher un prestataire, métier..."
              value={prestSearch}
              onChange={e => setPrestSearch(e.target.value)}
              style={{
                flex: "2 1 220px", minWidth: 200,
                padding: "10px 14px", borderRadius: 9,
                border: "1.5px solid var(--border)",
                background: "var(--surface2)", color: "var(--ink)",
                fontFamily: "'DM Sans',sans-serif", fontSize: ".85rem",
                outline: "none",
              }}
            />
            <select
              value={prestCatFilter}
              onChange={e => setPrestCatFilter(e.target.value)}
              style={{
                flex: "1 1 160px", padding: "10px 14px", borderRadius: 9,
                border: "1.5px solid var(--border)",
                background: "var(--surface2)", color: "var(--ink)",
                fontFamily: "'DM Sans',sans-serif", fontSize: ".85rem",
                outline: "none", cursor: "pointer",
              }}
            >
              <option value="">Toutes catégories</option>
              {Array.from(new Set(PREST_DATA.map(p => p.categorie))).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={prestVilleFilter}
              onChange={e => setPrestVilleFilter(e.target.value)}
              style={{
                flex: "1 1 140px", padding: "10px 14px", borderRadius: 9,
                border: "1.5px solid var(--border)",
                background: "var(--surface2)", color: "var(--ink)",
                fontFamily: "'DM Sans',sans-serif", fontSize: ".85rem",
                outline: "none", cursor: "pointer",
              }}
            >
              <option value="">Toutes villes</option>
              {CITIES.filter(c => c !== "Toutes les villes").map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {(prestSearch || prestCatFilter || prestVilleFilter) && (
              <button
                onClick={() => { setPrestSearch(""); setPrestCatFilter(""); setPrestVilleFilter(""); }}
                style={{
                  background: "var(--surface2)", color: "var(--ink)",
                  border: "1.5px solid var(--border)", borderRadius: 9,
                  padding: "10px 14px", cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".78rem",
                }}
              >
                ✕ Effacer
              </button>
            )}
          </div>

          {/* ── CATÉGORIES RAPIDES ── */}
          <div style={{
            display: "flex", gap: 10, flexWrap: "wrap",
            marginBottom: 24, overflowX: "auto", paddingBottom: 4,
          }}>
            {[
              { cat: "", label: "🌟 Tous", color: "var(--green)" },
              { cat: "Plomberie", label: "🔧 Plomberie", color: "#3b82f6" },
              { cat: "Électricité", label: "⚡ Électricité", color: "#f59e0b" },
              { cat: "Photographie", label: "📸 Photo", color: "#8b5cf6" },
              { cat: "Graphisme", label: "🎨 Design", color: "#ec4899" },
              { cat: "Nettoyage", label: "🧹 Nettoyage", color: "#10b981" },
              { cat: "Informatique", label: "💻 Tech", color: "#06b6d4" },
              { cat: "Menuiserie", label: "🪚 Menuiserie", color: "#f97316" },
              { cat: "Cuisine", label: "👩‍🍳 Traiteur", color: "#ef4444" },
              { cat: "Beauté", label: "💇‍♀️ Beauté", color: "#d946ef" },
            ].map(c => (
              <button
                key={c.label}
                onClick={() => setPrestCatFilter(c.cat)}
                style={{
                  background: prestCatFilter === c.cat ? c.color : "var(--surface)",
                  color: prestCatFilter === c.cat ? "#fff" : "var(--ink)",
                  border: `1.5px solid ${prestCatFilter === c.cat ? c.color : "var(--border)"}`,
                  borderRadius: 50, padding: "7px 16px",
                  fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".76rem",
                  cursor: "pointer", whiteSpace: "nowrap",
                  transition: "all .2s",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* ── SECTION PRESTATAIRES VEDETTES ── */}
          {(() => {
            // Combiner prestataires factices + réels Supabase
            const realPrests = (allServices || []).map(s => ({
              id: `real-${s.id}`,
              name: s.provider_nom || "Prestataire Yorix",
              metier: s.nom || "Service",
              categorie: s.categorie || "Autre",
              ville: s.ville || "Cameroun",
              quartier: "",
              emoji: "🛠️",
              photo: null,
              color_bg: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
              tags: [s.categorie || "Service"].filter(Boolean),
              note: s.note || 5.0,
              avis: s.nombre_avis || 0,
              prix: `${Number(s.prix || 0).toLocaleString("fr-FR")} FCFA`,
              experience: "Nouveau",
              verifie: false,
              top: false,
              dispo: s.disponible !== false,
              bio: s.description || "Service de qualité sur Yorix.",
              telephone: "",
              realisations: 0,
              isReal: true,
            }));

            const allPrests = [...PREST_DATA, ...realPrests];

            // Filtrage
            const filtered = allPrests.filter(p => {
              if (prestSearch) {
                const s = prestSearch.toLowerCase();
                if (!p.name.toLowerCase().includes(s)
                  && !p.metier.toLowerCase().includes(s)
                  && !p.categorie.toLowerCase().includes(s)
                  && !(p.tags || []).some(t => t.toLowerCase().includes(s)))
                  return false;
              }
              if (prestCatFilter && p.categorie !== prestCatFilter) return false;
              if (prestVilleFilter && p.ville !== prestVilleFilter) return false;
              return true;
            });

            const topPrests = filtered.filter(p => p.top);
            const otherPrests = filtered.filter(p => !p.top);

            return (
              <>
                {/* Résultat count */}
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  marginBottom: 16,
                }}>
                  <div style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".95rem",
                    color: "var(--ink)",
                  }}>
                    {filtered.length} prestataire{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
                  </div>
                </div>

                {/* ── TOP PRESTATAIRES ── */}
                {topPrests.length > 0 && (
                  <>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8,
                      marginBottom: 14,
                    }}>
                      <span style={{ fontSize: "1.2rem" }}>⭐</span>
                      <h3 style={{
                        fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.05rem",
                        color: "var(--ink)", margin: 0,
                      }}>
                        Top prestataires
                      </h3>
                      <span style={{
                        background: "var(--yellow)", color: "#0d1f14",
                        fontSize: ".62rem", fontWeight: 800,
                        padding: "2px 8px", borderRadius: 50,
                      }}>
                        RECOMMANDÉS
                      </span>
                    </div>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
                      gap: 16, marginBottom: 28,
                    }}>
                      {topPrests.map(p => (
                        <PrestCard key={p.id} p={p} onClick={() => setSelectedPrest(p)} />
                      ))}
                    </div>
                  </>
                )}

                {/* ── AUTRES PRESTATAIRES ── */}
                {otherPrests.length > 0 && (
                  <>
                    {topPrests.length > 0 && (
                      <h3 style={{
                        fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.05rem",
                        color: "var(--ink)", marginBottom: 14,
                      }}>
                        👷 Tous les prestataires
                      </h3>
                    )}
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
                      gap: 16,
                    }}>
                      {otherPrests.map(p => (
                        <PrestCard key={p.id} p={p} onClick={() => setSelectedPrest(p)} />
                      ))}
                    </div>
                  </>
                )}

                {/* ── AUCUN RÉSULTAT ── */}
                {filtered.length === 0 && (
                  <div className="empty-state" style={{ padding: "60px 20px" }}>
                    <div className="empty-icon">🔍</div>
                    <p>Aucun prestataire ne correspond à ta recherche.</p>
                    <button
                      onClick={() => { setPrestSearch(""); setPrestCatFilter(""); setPrestVilleFilter(""); }}
                      style={{
                        background: "var(--green)", color: "#fff", border: "none",
                        padding: "10px 22px", borderRadius: 9, marginTop: 14,
                        fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem",
                        cursor: "pointer",
                      }}
                    >
                      🔄 Voir tous les prestataires
                    </button>
                  </div>
                )}
              </>
            );
          })()}

          {/* ── COMMENT ÇA MARCHE ── */}
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 14, padding: 24, marginTop: 32,
          }}>
            <h3 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem",
              color: "var(--ink)", marginBottom: 18, textAlign: "center",
              letterSpacing: "-.3px",
            }}>
              🗺️ Comment ça fonctionne ?
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 14,
            }}>
              {[
                { n: 1, icon: "🔍", t: "Cherche", d: "Filtre par métier, ville ou note" },
                { n: 2, icon: "💬", t: "Contacte", d: "WhatsApp direct avec le prestataire" },
                { n: 3, icon: "🤝", t: "Négocie", d: "Discute du tarif et des détails" },
                { n: 4, icon: "⭐", t: "Évalue", d: "Laisse un avis après la prestation" },
              ].map(s => (
                <div key={s.n} style={{
                  textAlign: "center", padding: "14px 10px",
                  background: "var(--surface2)", borderRadius: 10,
                  border: "1px solid var(--border)",
                }}>
                  <div style={{
                    width: 32, height: 32, background: "var(--green)", color: "#fff",
                    borderRadius: "50%", display: "flex", alignItems: "center",
                    justifyContent: "center", fontFamily: "'Syne',sans-serif",
                    fontWeight: 800, fontSize: ".82rem", margin: "0 auto 10px",
                  }}>{s.n}</div>
                  <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>{s.icon}</div>
                  <div style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".85rem",
                    color: "var(--ink)", marginBottom: 4,
                  }}>{s.t}</div>
                  <div style={{ fontSize: ".72rem", color: "var(--gray)", lineHeight: 1.5 }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA DEVENIR PRESTATAIRE ── */}
          <div style={{
            background: "linear-gradient(135deg, var(--green-pale), #fef9e0)",
            border: "2px solid var(--green-light)", borderRadius: 14,
            padding: "28px 24px", marginTop: 24,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 16,
          }}>
            <div style={{ flex: "1 1 300px" }}>
              <h3 style={{
                fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.15rem",
                color: "var(--ink)", marginBottom: 8, letterSpacing: "-.3px",
              }}>
                🚀 Tu es un professionnel ?
              </h3>
              <p style={{
                fontSize: ".86rem", color: "var(--gray)", lineHeight: 1.6, marginBottom: 12,
              }}>
                Rejoins les 850+ prestataires Yorix. Obtiens de nouveaux clients chaque semaine, gère tes prestations et bâtis ta réputation.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["✅ Inscription gratuite", "📱 Clients via WhatsApp", "⭐ Système de notation"].map(t => (
                  <span key={t} style={{
                    background: "var(--surface)", color: "var(--ink)",
                    padding: "4px 11px", borderRadius: 50, fontSize: ".7rem",
                    fontWeight: 600, border: "1px solid var(--border)",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => goPage("inscription")}
              style={{
                background: "var(--green)", color: "#fff", border: "none",
                padding: "13px 26px", borderRadius: 10,
                fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".9rem",
                cursor: "pointer", whiteSpace: "nowrap",
                boxShadow: "0 4px 12px rgba(26,107,58,.25)",
              }}
            >
              🎯 Devenir prestataire
            </button>
          </div>

          {/* ── MODAL DÉTAIL PRESTATAIRE ── */}
          {selectedPrest && (
            <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setSelectedPrest(null)}>
              <div className="modal" style={{ maxWidth: 540 }}>
                <button className="modal-close" onClick={() => setSelectedPrest(null)}>✕</button>

                {/* Photo/Avatar */}
                <div style={{
                  background: selectedPrest.color_bg || "var(--green-pale)",
                  borderRadius: 12, padding: 24, marginBottom: 16,
                  textAlign: "center", position: "relative", overflow: "hidden",
                }}>
                  {selectedPrest.photo ? (
                    <img
                      src={selectedPrest.photo}
                      alt={selectedPrest.name}
                      style={{
                        width: 100, height: 100, borderRadius: "50%",
                        objectFit: "cover", border: "4px solid #fff",
                        boxShadow: "0 6px 20px rgba(0,0,0,.15)",
                      }}
                      onError={e => { e.currentTarget.style.display = "none"; }}
                    />
                  ) : (
                    <div style={{
                      width: 100, height: 100, borderRadius: "50%",
                      background: "var(--green)", color: "#fff", fontSize: "3rem",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      border: "4px solid #fff", boxShadow: "0 6px 20px rgba(0,0,0,.15)",
                    }}>
                      {selectedPrest.emoji}
                    </div>
                  )}

                  <div style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.25rem",
                    color: "var(--ink)", marginTop: 12,
                  }}>
                    {selectedPrest.name}
                    {selectedPrest.verifie && (
                      <span style={{ marginLeft: 6, fontSize: ".82rem", color: "var(--green)" }}>✅</span>
                    )}
                  </div>
                  <div style={{ fontSize: ".82rem", color: "var(--gray)", marginTop: 3 }}>
                    {selectedPrest.metier} · 📍 {selectedPrest.ville}
                    {selectedPrest.quartier && `, ${selectedPrest.quartier}`}
                  </div>
                  {selectedPrest.top && (
                    <span style={{
                      display: "inline-block", marginTop: 8,
                      background: "var(--yellow)", color: "#0d1f14",
                      padding: "3px 10px", borderRadius: 50,
                      fontSize: ".65rem", fontWeight: 800,
                      fontFamily: "'Syne',sans-serif",
                    }}>
                      ⭐ TOP PRESTATAIRE
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8,
                  marginBottom: 16,
                }}>
                  {[
                    { icon: "⭐", val: selectedPrest.note, lbl: `${selectedPrest.avis} avis` },
                    { icon: "📦", val: selectedPrest.realisations, lbl: "réalisations" },
                    { icon: "💼", val: selectedPrest.experience, lbl: "expérience" },
                  ].map(s => (
                    <div key={s.lbl} style={{
                      background: "var(--surface2)", borderRadius: 9, padding: 10,
                      textAlign: "center", border: "1px solid var(--border)",
                    }}>
                      <div style={{ fontSize: "1rem", marginBottom: 2 }}>{s.icon}</div>
                      <div style={{
                        fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".88rem",
                        color: "var(--ink)",
                      }}>
                        {s.val}
                      </div>
                      <div style={{ fontSize: ".62rem", color: "var(--gray)" }}>{s.lbl}</div>
                    </div>
                  ))}
                </div>

                {/* Bio */}
                {selectedPrest.bio && (
                  <div style={{
                    background: "var(--surface2)", borderRadius: 10, padding: 14,
                    marginBottom: 14,
                  }}>
                    <div style={{
                      fontSize: ".7rem", fontWeight: 700, color: "var(--gray)",
                      marginBottom: 6,
                    }}>
                      📝 À PROPOS
                    </div>
                    <p style={{ fontSize: ".84rem", color: "var(--ink)", lineHeight: 1.6 }}>
                      {selectedPrest.bio}
                    </p>
                  </div>
                )}

                {/* Tags */}
                {selectedPrest.tags && selectedPrest.tags.length > 0 && (
                  <div style={{ marginBottom: 14 }}>
                    <div style={{
                      fontSize: ".7rem", fontWeight: 700, color: "var(--gray)",
                      marginBottom: 8,
                    }}>
                      🏷️ SPÉCIALITÉS
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {selectedPrest.tags.map(t => (
                        <span key={t} style={{
                          background: "var(--green-pale)", color: "var(--green)",
                          border: "1px solid var(--green-light)",
                          padding: "4px 12px", borderRadius: 50,
                          fontSize: ".72rem", fontWeight: 600,
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prix */}
                <div style={{
                  background: "var(--green-pale)", border: "1px solid var(--green-light)",
                  borderRadius: 10, padding: 14, marginBottom: 16,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div>
                    <div style={{ fontSize: ".7rem", color: "var(--gray)", fontWeight: 700 }}>TARIF</div>
                    <div style={{
                      fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.2rem",
                      color: "var(--green)",
                    }}>
                      {selectedPrest.prix}
                    </div>
                  </div>
                  {selectedPrest.dispo && (
                    <span style={{
                      background: "#e6fff0", color: "#1a6b3a",
                      padding: "5px 12px", borderRadius: 50,
                      fontSize: ".72rem", fontWeight: 700,
                      border: "1px solid #86efac",
                    }}>
                      🟢 Disponible
                    </span>
                  )}
                </div>

                {/* Boutons action */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <button
                    onClick={() => window.open(`https://wa.me/${(selectedPrest.telephone || YORIX_WA_NUMBER).replace(/\D/g, "")}?text=${encodeURIComponent(`Bonjour ${selectedPrest.name} ! Je vous contacte via Yorix pour une prestation de ${selectedPrest.categorie}. Pouvez-vous m'aider ?`)}`, "_blank")}
                    style={{
                      background: "#25D366", color: "#fff", border: "none",
                      padding: "12px", borderRadius: 9,
                      fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem",
                      cursor: "pointer",
                    }}
                  >
                    📱 WhatsApp direct
                  </button>
                  <button
                    onClick={() => window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(`Bonjour Yorix ! Je souhaite réserver une prestation avec ${selectedPrest.name} (${selectedPrest.metier}).`)}`, "_blank")}
                    style={{
                      background: "var(--green)", color: "#fff", border: "none",
                      padding: "12px", borderRadius: 9,
                      fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem",
                      cursor: "pointer",
                    }}
                  >
                    📅 Réserver via Yorix
                  </button>
                </div>
              </div>
            </div>
          )}

        </section>
      )}

      {/* ════════ PAGE : INSCRIPTION PRESTATAIRE ════════ */}
      {page==="inscription"&&(
        <section className="sec anim">
          <div style={{maxWidth:600,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:24}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.6rem",fontWeight:800,color:"var(--ink)",marginBottom:7,letterSpacing:"-.5px"}}>👷 Devenir prestataire Yorix</h2>
              <p style={{color:"var(--gray)",fontSize:".86rem",lineHeight:1.7}}>Développez votre activité et accédez à des milliers de clients au Cameroun.</p>
            </div>
            {inscriptionSent?(
              <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,padding:40,textAlign:"center"}}>
                <div style={{fontSize:"3.5rem",marginBottom:14}}>🎉</div>
                <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.2rem",color:"var(--green)",marginBottom:10}}>Candidature envoyée avec succès !</h3>
                <p style={{fontSize:".88rem",color:"var(--gray)",lineHeight:1.7,maxWidth:420,margin:"0 auto 20px"}}>
                  Merci pour votre intérêt ! L'équipe Yorix vous contactera sous <strong>24h</strong> pour valider votre profil de prestataire.
                </p>
                <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
                  <button
                    onClick={()=>{setInscriptionSent(false);setInscriptionForm({nom:"",prenom:"",tel:"",email:"",metier:"",ville:"",experience:"",tarif:"",bio:""});}}
                    style={{background:"var(--surface2)",color:"var(--ink)",border:"1.5px solid var(--border)",borderRadius:8,padding:"9px 20px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".82rem"}}
                  >
                    Soumettre une autre candidature
                  </button>
                  <button
                    onClick={()=>goPage("home")}
                    style={{background:"var(--green)",color:"#fff",border:"none",borderRadius:8,padding:"9px 20px",cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem"}}
                  >
                    ← Retour à l'accueil
                  </button>
                </div>
              </div>
            ):(
              <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:24}}>
                {inscriptionError && (
                  <div style={{background:"#fff0f0",border:"1px solid #fecaca",color:"#ce1126",borderRadius:8,padding:"10px 14px",marginBottom:14,fontSize:".82rem"}}>
                    ⚠️ {inscriptionError}
                  </div>
                )}
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Nom <span>*</span></label><input className="form-input" value={inscriptionForm.nom} onChange={e=>setInscriptionForm(f=>({...f,nom:e.target.value}))} placeholder="Votre nom"/></div>
                  <div className="form-group"><label className="form-label">Prénom</label><input className="form-input" value={inscriptionForm.prenom} onChange={e=>setInscriptionForm(f=>({...f,prenom:e.target.value}))} placeholder="Votre prénom"/></div>
                  <div className="form-group"><label className="form-label">Téléphone <span>*</span></label><input className="form-input" value={inscriptionForm.tel} onChange={e=>setInscriptionForm(f=>({...f,tel:e.target.value}))} placeholder="+237 696 56 56 54"/></div>
                  <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={inscriptionForm.email} onChange={e=>setInscriptionForm(f=>({...f,email:e.target.value}))} placeholder="email@mail.com"/></div>
                  <div className="form-group"><label className="form-label">Métier <span>*</span></label><select className="form-select" value={inscriptionForm.metier} onChange={e=>setInscriptionForm(f=>({...f,metier:e.target.value}))}><option value="">Choisir...</option>{["Plomberie","Électricité","Maçonnerie","Peinture","Menuiserie","Informatique","Graphisme","Photographie","Nettoyage","Transport","Cuisine","Autre"].map(m=><option key={m}>{m}</option>)}</select></div>
                  <div className="form-group"><label className="form-label">Ville</label><select className="form-select" value={inscriptionForm.ville} onChange={e=>setInscriptionForm(f=>({...f,ville:e.target.value}))}><option value="">Choisir...</option>{CITIES.filter(c=>c!=="Toutes les villes").map(c=><option key={c}>{c}</option>)}</select></div>
                  <div className="form-group"><label className="form-label">Expérience</label><input className="form-input" value={inscriptionForm.experience} onChange={e=>setInscriptionForm(f=>({...f,experience:e.target.value}))} placeholder="Ex: 5 ans"/></div>
                  <div className="form-group"><label className="form-label">Tarif (FCFA)</label><input className="form-input" value={inscriptionForm.tarif} onChange={e=>setInscriptionForm(f=>({...f,tarif:e.target.value}))} placeholder="Ex: 15 000/h"/></div>
                  <div className="form-group full"><label className="form-label">Présentation</label><textarea className="form-textarea" value={inscriptionForm.bio} onChange={e=>setInscriptionForm(f=>({...f,bio:e.target.value}))} placeholder="Décrivez vos compétences..."/></div>
                </div>
                <button 
                  className="form-submit" 
                  disabled={inscriptionLoading}
                  onClick={soumettreCandidaturePrestataire}
                >
                  {inscriptionLoading 
                    ? <><div className="spinner" style={{width:16,height:16,borderWidth:2}}/>Envoi en cours...</>
                    : "🚀 Soumettre ma candidature"
                  }
                </button>
                <p style={{fontSize:".7rem",color:"var(--gray)",textAlign:"center",marginTop:10,lineHeight:1.5}}>
                  🔒 Vos informations sont sécurisées · Réponse sous 24h
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ════════ PAGE : BUSINESS ════════ */}
      {page==="business"&&(
        <section className="sec anim">
          <div className="biz-hero">
            <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(252,209,22,.14)",color:"var(--yellow)",border:"1px solid rgba(252,209,22,.24)",padding:"4px 11px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:12}}>💼 Yorix Business</div>
            <div className="biz-title">La solution B2B pour les entreprises camerounaises</div>
            <p className="biz-sub">Achetez en gros, gérez vos fournisseurs et accédez à des tarifs professionnels exclusifs.</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><button className="cta-y">Démarrer gratuitement</button><button className="cta-w">Voir une démo</button></div>
            <div className="biz-feats">{[{icon:"📦",t:"Achats en gros",p:"Tarifs dégressifs dès 10 unités"},{icon:"🤝",t:"Fournisseurs vérifiés",p:"500+ fournisseurs certifiés"},{icon:"📊",t:"Tableaux de bord",p:"Suivi en temps réel"},{icon:"🔐",t:"Facturation pro",p:"Factures automatiques"}].map(f=><div key={f.t} className="biz-feat"><div style={{fontSize:"1.25rem",marginBottom:4}}>{f.icon}</div><h4>{f.t}</h4><p>{f.p}</p></div>)}</div>
          </div>
          <BusinessForm />
        </section>
      )}

            {/* ═══════════════ PAGE : ACADEMY (dynamique Supabase) ═══════════════ */}
      {page==="academy"&&(
        <section className="sec anim">
          <div style={{background:"linear-gradient(135deg,#1a3a24,#0a1410)",borderRadius:14,padding:28,marginBottom:20,textAlign:"center"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(252,209,22,.14)",color:"var(--yellow)",border:"1px solid rgba(252,209,22,.24)",padding:"4px 11px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:12}}>🎓 Yorix Academy</div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.45rem",fontWeight:800,color:"#fff",marginBottom:6,letterSpacing:"-.5px"}}>Formez-vous pour vendre mieux</h2>
            <p style={{color:"rgba(255,255,255,.5)",fontSize:".85rem",marginBottom:18}}>Des cours créés par des experts camerounais.</p>
            <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
              <button className="cta-y" onClick={()=>{const first=academyCourses.find(c=>c.prix===0);if(first)goAcademyDetail(first);}}>Commencer gratuitement</button>
              <button className="cta-w" onClick={()=>window.scrollTo({top:400,behavior:"smooth"})}>Voir le catalogue</button>
            </div>
          </div>

          {academyLoading
            ? <div className="loading"><div className="spinner"/>Chargement des formations...</div>
            : academyCourses.length===0
              ? <div className="empty-state"><div className="empty-icon">🎓</div><p>Aucune formation pour l'instant</p></div>
              : <div className="courses-grid">
                  {academyCourses.map(c=>(
                    <div key={c.id} className="course-card" onClick={()=>goAcademyDetail(c)} style={{cursor:"pointer"}}>
                      <div className="course-img" style={{background:c.color_bg||"#E8F5E9"}}>{c.emoji||"🎓"}</div>
                      <div className="course-body">
                        <div className={`course-level ${c.category==="DÉBUTANT"?"lc-debutant":c.category==="INTERMÉDIAIRE"?"lc-intermediaire":"lc-avance"}`}>{c.category}</div>
                        <div className="course-title">{c.title}</div>
                        <div className="course-meta">⏱ {c.duration} · 👥 {c.students_count||0}</div>
                        <div className="course-footer">
                          <div className="course-price">{c.prix===0?"Gratuit":`${c.prix.toLocaleString("fr-FR")} FCFA`}</div>
                          <button className="course-btn" onClick={e=>{e.stopPropagation();goAcademyDetail(c);}}>Démarrer →</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
          }
        </section>
      )}

      {/* ═══════════════ PAGE : ACADEMY DETAIL (article teaser) ═══════════════ */}
      {page==="academyDetail"&&(
        <AcademyDetail
          course={selectedCourse}
          goPage={goPage}
          goContact={goAcademyContact}
        />
      )}

      {/* ═══════════════ PAGE : ACADEMY CONTACT (formulaire) ═══════════════ */}
      {page==="academyContact"&&(
        <AcademyContactForm
          course={selectedCourse}
          user={user}
          userData={userData}
          goPage={goPage}
        />
      )}


      {/* ════════ PAGE : BLOG — VERSION PRO ════════ */}
      {page==="blog"&&(
        <section className="sec anim">

          {/* ── HERO BLOG ── */}
          <div style={{
            background: "linear-gradient(135deg, #0a1410 0%, #1a3a24 50%, #0d3320 100%)",
            borderRadius: 16,
            padding: "36px 28px",
            color: "#fff",
            marginBottom: 28,
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}>
            <div style={{
              position: "absolute", top: -40, right: -40, width: 200, height: 200,
              background: "rgba(252,209,22,.08)", borderRadius: "50%",
            }}/>
            <div style={{
              position: "absolute", bottom: -60, left: -50, width: 180, height: 180,
              background: "rgba(79,209,125,.06)", borderRadius: "50%",
            }}/>

            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(252,209,22,.14)", color: "var(--yellow)",
                border: "1px solid rgba(252,209,22,.28)",
                padding: "5px 14px", borderRadius: 50,
                fontSize: ".72rem", fontWeight: 700, marginBottom: 14,
              }}>
                📰 Yorix Journal
              </div>
              <h1 style={{
                fontFamily: "'Syne',sans-serif", fontSize: "2rem", fontWeight: 800,
                marginBottom: 10, letterSpacing: "-.5px", lineHeight: 1.15,
              }}>
                Tout l'actu du <span style={{ color: "var(--yellow)" }}>commerce camerounais</span>
              </h1>
              <p style={{
                color: "rgba(255,255,255,.65)", fontSize: ".9rem",
                maxWidth: 560, margin: "0 auto", lineHeight: 1.7,
              }}>
                Guides pratiques, analyses de marché, conseils business et tendances locales.
                Écrit par notre équipe et des experts camerounais.
              </p>
            </div>
          </div>

          {/* ── FILTRES CATÉGORIES ── */}
          <div style={{
            display: "flex", gap: 8, flexWrap: "wrap",
            marginBottom: 24, justifyContent: "center",
          }}>
            {(() => {
              const cats = ["TOUT", ...Array.from(new Set(BLOG_DATA.map(p => p.cat)))];
              return cats.map(c => (
                <button
                  key={c}
                  onClick={() => setBlogFilter(c)}
                  style={{
                    padding: "7px 16px", borderRadius: 50,
                    border: `1.5px solid ${blogFilter === c ? "var(--green)" : "var(--border)"}`,
                    background: blogFilter === c ? "var(--green)" : "var(--surface)",
                    color: blogFilter === c ? "#fff" : "var(--ink)",
                    fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
                    fontSize: ".76rem", cursor: "pointer",
                    transition: "all .2s",
                  }}
                >
                  {c}
                </button>
              ));
            })()}
          </div>

          {/* ── ARTICLE FEATURED (le premier avec featured: true) ── */}
          {(() => {
            const featured = BLOG_DATA.find(p => p.featured && (blogFilter === "TOUT" || p.cat === blogFilter));
            if (!featured) return null;
            return (
              <div
                onClick={() => window.open(featured.external_url, "_blank", "noopener,noreferrer")}
                style={{
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: 16, overflow: "hidden", marginBottom: 28,
                  cursor: "pointer", transition: "transform .2s, box-shadow .2s",
                  display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 0,
                }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,.1)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  background: featured.color_bg || "var(--green-pale)",
                  minHeight: 280, position: "relative",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden",
                }}>
                  {featured.image ? (
                    <img
                      src={featured.image}
                      alt={featured.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                      onError={e => { e.currentTarget.style.display = "none"; }}
                    />
                  ) : (
                    <div style={{ fontSize: "6rem", opacity: .5 }}>{featured.emoji}</div>
                  )}
                  <span style={{
                    position: "absolute", top: 16, left: 16,
                    background: "var(--yellow)", color: "#0d1f14",
                    padding: "5px 12px", borderRadius: 50,
                    fontSize: ".68rem", fontWeight: 800,
                    fontFamily: "'Syne',sans-serif",
                    boxShadow: "0 4px 12px rgba(0,0,0,.15)",
                  }}>
                    ⭐ À LA UNE
                  </span>
                </div>
                <div style={{ padding: "28px 26px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{
                    fontSize: ".68rem", fontWeight: 800, color: "var(--green)",
                    letterSpacing: ".08em", marginBottom: 10,
                  }}>
                    {featured.emoji} {featured.cat}
                  </div>
                  <h2 style={{
                    fontFamily: "'Syne',sans-serif", fontSize: "1.4rem", fontWeight: 800,
                    color: "var(--ink)", marginBottom: 10, letterSpacing: "-.3px",
                    lineHeight: 1.25,
                  }}>
                    {featured.title}
                  </h2>
                  <p style={{
                    fontSize: ".86rem", color: "var(--gray)",
                    lineHeight: 1.7, marginBottom: 16,
                  }}>
                    {featured.excerpt}
                  </p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                    {featured.tags?.map(t => (
                      <span key={t} style={{
                        background: "var(--surface2)", color: "var(--gray)",
                        padding: "3px 10px", borderRadius: 50,
                        fontSize: ".67rem", fontWeight: 600,
                      }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    paddingTop: 14, borderTop: "1px solid var(--border)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: "50%",
                        background: "var(--green)", color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".82rem",
                      }}>
                        {featured.author_avatar || "Y"}
                      </div>
                      <div>
                        <div style={{ fontSize: ".76rem", fontWeight: 700, color: "var(--ink)" }}>
                          {featured.author}
                        </div>
                        <div style={{ fontSize: ".66rem", color: "var(--gray)" }}>
                          {featured.date} · ⏱ {featured.read}
                        </div>
                      </div>
                    </div>
                    <button style={{
                      background: "var(--green)", color: "#fff", border: "none",
                      padding: "8px 16px", borderRadius: 9,
                      fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".78rem",
                      cursor: "pointer",
                    }}>
                      Lire l'article →
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ── GRILLE ARTICLES ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 18,
          }}>
            {BLOG_DATA
              .filter(p => !p.featured || blogFilter !== "TOUT")
              .filter(p => blogFilter === "TOUT" || p.cat === blogFilter)
              .map(p => (
                <article
                  key={p.id}
                  onClick={() => window.open(p.external_url, "_blank", "noopener,noreferrer")}
                  style={{
                    background: "var(--surface)", border: "1px solid var(--border)",
                    borderRadius: 14, overflow: "hidden",
                    cursor: "pointer", transition: "transform .2s, box-shadow .2s, border-color .2s",
                    display: "flex", flexDirection: "column",
                  }}
                  onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 14px 28px rgba(0,0,0,.1)"; e.currentTarget.style.borderColor = "var(--green-light)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}
                >
                  {/* Image / visuel */}
                  <div style={{
                    height: 180, position: "relative",
                    background: p.color_bg || "var(--green-pale)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    overflow: "hidden",
                  }}>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={e => { e.currentTarget.style.display = "none"; }}
                      />
                    ) : (
                      <div style={{ fontSize: "4rem", opacity: .6 }}>{p.emoji}</div>
                    )}
                    <span style={{
                      position: "absolute", top: 12, left: 12,
                      background: "rgba(255,255,255,.95)", backdropFilter: "blur(10px)",
                      color: "var(--ink)", padding: "4px 11px", borderRadius: 50,
                      fontSize: ".64rem", fontWeight: 800, letterSpacing: ".05em",
                      fontFamily: "'Syne',sans-serif",
                    }}>
                      {p.emoji} {p.cat}
                    </span>
                    <span style={{
                      position: "absolute", top: 12, right: 12,
                      background: "rgba(0,0,0,.6)", backdropFilter: "blur(10px)",
                      color: "#fff", padding: "4px 10px", borderRadius: 50,
                      fontSize: ".62rem", fontWeight: 700,
                      display: "flex", alignItems: "center", gap: 3,
                    }}>
                      ⏱ {p.read}
                    </span>
                  </div>

                  {/* Contenu */}
                  <div style={{ padding: "16px 16px 14px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{
                      fontFamily: "'Syne',sans-serif", fontSize: ".98rem", fontWeight: 800,
                      color: "var(--ink)", marginBottom: 8,
                      letterSpacing: "-.2px", lineHeight: 1.3,
                      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {p.title}
                    </h3>
                    <p style={{
                      fontSize: ".78rem", color: "var(--gray)",
                      lineHeight: 1.6, marginBottom: 12, flex: 1,
                      display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {p.excerpt}
                    </p>

                    {/* Tags */}
                    {p.tags && p.tags.length > 0 && (
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
                        {p.tags.slice(0, 2).map(t => (
                          <span key={t} style={{
                            background: "var(--surface2)", color: "var(--gray)",
                            padding: "2px 8px", borderRadius: 50,
                            fontSize: ".6rem", fontWeight: 600,
                          }}>
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer auteur */}
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      paddingTop: 11, borderTop: "1px solid var(--border)",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <div style={{
                          width: 26, height: 26, borderRadius: "50%",
                          background: "var(--green)", color: "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".68rem",
                        }}>
                          {p.author_avatar || "Y"}
                        </div>
                        <div>
                          <div style={{ fontSize: ".68rem", fontWeight: 700, color: "var(--ink)" }}>
                            {p.author}
                          </div>
                          <div style={{ fontSize: ".6rem", color: "var(--gray)" }}>
                            {p.date}
                          </div>
                        </div>
                      </div>
                      <span style={{
                        fontSize: ".68rem", fontWeight: 700, color: "var(--green)",
                        display: "flex", alignItems: "center", gap: 3,
                      }}>
                        Lire →
                      </span>
                    </div>
                  </div>
                </article>
              ))}
          </div>

          {/* ── Message si aucun article ── */}
          {BLOG_DATA.filter(p => blogFilter === "TOUT" || p.cat === blogFilter).length === 0 && (
            <div className="empty-state" style={{ padding: "60px 0" }}>
              <div className="empty-icon">📰</div>
              <p>Aucun article dans cette catégorie pour l'instant.</p>
              <button
                className="form-submit"
                style={{ width: "auto", padding: "10px 24px", marginTop: 16 }}
                onClick={() => setBlogFilter("TOUT")}
              >
                Voir tous les articles
              </button>
            </div>
          )}

          {/* ── CTA NEWSLETTER BLOG ── */}
          <div style={{
            background: "linear-gradient(135deg, var(--green-pale), #fef9e0)",
            border: "2px solid var(--green-light)",
            borderRadius: 14, padding: "26px 28px",
            marginTop: 32, textAlign: "center",
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>📬</div>
            <h3 style={{
              fontFamily: "'Syne',sans-serif", fontSize: "1.2rem", fontWeight: 800,
              color: "var(--ink)", marginBottom: 8, letterSpacing: "-.3px",
            }}>
              Ne rate aucun article
            </h3>
            <p style={{
              fontSize: ".84rem", color: "var(--gray)",
              marginBottom: 16, maxWidth: 460, margin: "0 auto 16px",
              lineHeight: 1.6,
            }}>
              Reçois chaque semaine nos meilleurs guides et analyses directement dans ta boîte mail.
            </p>
            <div style={{
              display: "flex", gap: 8, maxWidth: 400, margin: "0 auto",
              flexWrap: "wrap", justifyContent: "center",
            }}>
              <input
                type="email"
                placeholder="ton@email.cm"
                value={nlEmail}
                onChange={e => setNlEmail(e.target.value)}
                style={{
                  flex: 1, minWidth: 200,
                  padding: "11px 14px", borderRadius: 9,
                  border: "1.5px solid var(--border)",
                  background: "var(--surface)", color: "var(--ink)",
                  fontFamily: "'DM Sans',sans-serif", fontSize: ".85rem",
                  outline: "none",
                }}
              />
              <button
                onClick={async () => {
                  if (nlEmail) {
                    await supabase.from("newsletter").insert({ email: nlEmail }).catch(e => console.warn(e?.message));
                    setNlSent(true);
                  }
                }}
                style={{
                  background: "var(--green)", color: "#fff", border: "none",
                  padding: "11px 22px", borderRadius: 9,
                  fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem",
                  cursor: "pointer", whiteSpace: "nowrap",
                }}
              >
                {nlSent ? "✅ Abonné(e) !" : "S'abonner 🚀"}
              </button>
            </div>
          </div>

        </section>
      )}
      
            {/* ═══════════════ PAGE : FIDÉLITÉ (système complet) ═══════════════ */}
      {page==="loyalty"&&(
        <LoyaltyPage
          user={user}
          userData={userData}
          goPage={goPage}
          setAuthOpen={setAuthOpen}
          setAuthTab={setAuthTab}
        />
      )}


      {/* ════════ PAGE : DASHBOARD ════════ */}
      {page==="dashboard"&&(
        user?(
          <div className="dash-layout anim">
            <div className="dash-sidebar">
              <div className="dash-avatar">{userData?.nom?.[0]||"U"}</div>
              <div className="dash-name" title={userData?.nom || user.email}>
  {userData?.nom || user.email?.split("@")[0] || "Utilisateur"}
</div>
              <div className="dash-role-badge"><span className={`role-chip ${roleChipClass()}`}>{ROLE_LABELS[userRole||"buyer"]}</span></div>
              <div className="dash-nav">
                {getDashNav().map(item=>(
                  <div key={item.id} className={`dash-nav-item${dashTab===item.id?" active":""}`} onClick={()=>setDashTab(item.id)}>{item.icon} {item.label}</div>
                ))}
                <div className="dash-nav-divider"/>
                <div className={`dash-nav-item${dashTab==="messages"?" active":""}`} onClick={()=>setDashTab("messages")}>💬 Messages</div>
                <div className="dash-nav-item" onClick={doLogout} style={{color:"var(--red)"}}>🚪 Déconnexion</div>
              </div>
            </div>

            <div className="dash-content">
              {/* Messages commun à tous */}
              {dashTab==="messages"&&(
  <>
    <div className="dash-page-title">💬 Messagerie Yorix</div>
    <div className="info-msg">🔐 Messagerie sécurisée entre acheteurs et vendeurs. Tes discussions sont privées et protégées.</div>
    <ChatUsers 
      user={user} 
      userData={userData}
    />
  </>
)}
              {/* Dashboards par rôle */}
              {dashTab!=="messages"&&userRole==="seller"&&<SellerDashboard user={user} userData={userData} dashTab={dashTab} setDashTab={setDashTab}/>}
              {dashTab!=="messages"&&userRole==="delivery"&&<DeliveryDashboard user={user} userData={userData} dashTab={dashTab} setDashTab={setDashTab}/>}
              {dashTab!=="messages"&&userRole==="provider"&&<ProviderDashboard user={user} userData={userData} dashTab={dashTab} setDashTab={setDashTab}/>}
              {dashTab!=="messages"&&(userRole==="buyer"||!userRole)&&<BuyerDashboard user={user} userData={userData} wishlist={wishlist} totalQty={totalQty} loyaltyPts={loyaltyPts} setLoyaltyPts={setLoyaltyPts} dashTab={dashTab} goPage={goPage}/>}
            </div>
          </div>
        ):(
          <div className="empty-state anim" style={{padding:"60px 0"}}>
            <div className="empty-icon">🔐</div>
            <p>Connectez-vous pour accéder à votre espace</p>
            <button className="form-submit" style={{width:"auto",padding:"11px 28px",marginTop:16}} onClick={()=>setAuthOpen(true)}>Se connecter</button>
          </div>
        )
      )}

      {/* Newsletter hors home */}
      {page!=="home"&&(
        <div className="newsletter">
          <div className="nl-title">📬 Restez informé(e)</div>
          <p className="nl-sub">Les meilleures offres Yorix dans votre boîte mail.</p>
          {nlSent?<div style={{background:"rgba(255,255,255,.2)",borderRadius:8,padding:"9px 18px",color:"#fff",fontWeight:600}}>✅ Abonné(e) !</div>
            :<div className="nl-form"><input className="nl-input" placeholder="Votre email..." value={nlEmail} onChange={e=>setNlEmail(e.target.value)}/><button className="nl-btn" onClick={async()=>{if(nlEmail){await supabase.from("newsletter").insert({email:nlEmail}).catch(e => console.warn(e?.message));setNlSent(true);}}}>S'abonner 🚀</button></div>}
        </div>
      )}

      {/* WA FLOAT */}
      <div className="wa-float">
        {waOpen&&<div className="wa-card">
          <div className="wa-card-title">💬 Contacter Yorix</div>
          <div className="wa-card-sub">Support 7j/7 · Réponse rapide</div>
          <a href={`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent("Bonjour Yorix ! J'ai besoin d'aide.")}`} target="_blank" rel="noreferrer" className="wa-link wa-link-green">📱 WhatsApp +237 696 56 56 54</a>
          <a href="tel:+237696565654" className="wa-link wa-link-ghost">📞 Appeler</a>
          <a href="mailto:support@yorix.cm" className="wa-link wa-link-ghost">✉️ support@yorix.cm</a>
        </div>}
        <div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div className="wa-pulse"/>
          <button className="wa-btn" onClick={()=>setWaOpen(o=>!o)}>{waOpen?"✕":"💬"}</button>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div className="mobile-nav">
        <div className="mn-inner">
          {[
            {icon:"🏠",label:"Accueil",p:"home"},
            {icon:"🛍️",label:"Produits",p:"produits"},
            {icon:"🚚",label:"Livraison",p:"livraison"},
            {icon:"📊",label:"Mon espace",p:"dashboard"},
            {icon:"💬",label:"WhatsApp",p:"wa"},
          ].map(item => (
            <div
              key={item.label}
              className={`mn-item${page===item.p?" active":""}`}
              onClick={() => {
                if (item.p === "wa") {
                  window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent("Bonjour Yorix ! J'ai besoin d'aide.")}`, "_blank");
                } else if (item.p === "dashboard" && !user) {
                  setAuthTab("register");
                  setAuthOpen(true);
                } else {
                  goPage(item.p);
                }
              }}
            >
              <div className="mn-icon">{item.icon}</div>
              <div className="mn-label">{item.label}</div>
              {item.p==="dashboard" && !user && (
                <div style={{position:"absolute",top:0,right:2,background:"var(--green)",color:"#fff",fontSize:".45rem",fontWeight:700,padding:"1px 3px",borderRadius:3}}>S'inscrire</div>
              )}
              {item.p==="dashboard" && unread>0 && user && <div className="mn-badge">{unread}</div>}
            </div>
          ))}
        </div>
        {/* Barre inscription rapide mobile si non connecté */}
        {!user && (
          <div style={{borderTop:"1px solid var(--border)",padding:"8px 16px",display:"flex",gap:8}}>
            <button
              onClick={() => { setAuthTab("login"); setAuthOpen(true); }}
              style={{flex:1,padding:"9px",borderRadius:8,border:"1.5px solid var(--border)",background:"var(--surface)",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".78rem",cursor:"pointer",color:"var(--ink)"}}
            >🔑 Connexion</button>
            <button
              onClick={() => { setAuthTab("register"); setSelectedRole("buyer"); setAuthOpen(true); }}
              style={{flex:2,padding:"9px",borderRadius:8,border:"none",background:"var(--green)",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",cursor:"pointer",color:"#fff"}}
            >🚀 S'inscrire gratuitement</button>
          </div>
        )}
      </div>


      {/* ════════ PAGE : ADMIN ════════ */}
      {page==="admin"&&(
        <AdminDashboard user={user} userData={userData} goPage={goPage}/>
      )}

      {/* ════════ PAGE : CONTACT ════════ */}
      {page==="cgv"&&<PagesLegales type="cgv" goPage={goPage}/>}
      {page==="mentions"&&<PagesLegales type="mentions" goPage={goPage}/>}
      {page==="confidentialite"&&<PagesLegales type="confidentialite" goPage={goPage}/>}
      {page==="contact"&&(
        <section className="sec anim">
          <div style={{maxWidth:700,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:24}}>
              <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.5rem",color:"var(--ink)",marginBottom:8}}>📞 Nous contacter</h1>
              <p style={{color:"var(--gray)",fontSize:".86rem"}}>Notre équipe répond en moins de 2h · 7j/7</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:24}}>
              {[
                {icon:"📱",label:"WhatsApp",val:"+237 696 56 56 54",action:()=>window.open(`https://wa.me/237696565654?text=${encodeURIComponent("Bonjour Yorix !")}`)},
                {icon:"📞",label:"Téléphone",val:"+237 696 56 56 54",action:()=>window.open("tel:+237696565654")},
                {icon:"✉️",label:"Email",val:"support@yorix.cm",action:()=>window.open("mailto:support@yorix.cm")},
              ].map(c=>(
                <div key={c.label} onClick={c.action} style={{background:"var(--surface)",border:"1.5px solid var(--border)",borderRadius:12,padding:18,textAlign:"center",cursor:"pointer",transition:"border-color .2s"}}
                  onMouseOver={e=>e.currentTarget.style.borderColor="var(--green)"}
                  onMouseOut={e=>e.currentTarget.style.borderColor="var(--border)"}
                >
                  <div style={{fontSize:"2rem",marginBottom:8}}>{c.icon}</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".85rem",color:"var(--ink)",marginBottom:4}}>{c.label}</div>
                  <div style={{fontSize:".78rem",color:"var(--green)",fontWeight:600}}>{c.val}</div>
                </div>
              ))}
            </div>
            <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:24,marginBottom:16}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1rem",color:"var(--ink)",marginBottom:16}}>💬 Envoyer un message</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:11}}>
                <div className="form-group" style={{marginBottom:0}}><label className="form-label">Nom *</label><input className="form-input" placeholder="Votre nom"/></div>
                <div className="form-group" style={{marginBottom:0}}><label className="form-label">Email *</label><input className="form-input" type="email" placeholder="email@exemple.cm"/></div>
              </div>
              <div className="form-group">
                <label className="form-label">Sujet *</label>
                <select className="form-select">
                  <option value="">Choisir un sujet...</option>
                  {["Problème avec une commande","Signaler un vendeur","Remboursement","Problème de paiement","Devenir vendeur","Devenir livreur","Autre"].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">Message *</label><textarea className="form-textarea" style={{minHeight:90}} placeholder="Décrivez votre demande..."/></div>
              <button className="form-submit" onClick={()=>window.open(`https://wa.me/237696565654?text=${encodeURIComponent("Bonjour Yorix ! Je vous contacte pour : ")}`)}>📱 Envoyer via WhatsApp</button>
            </div>
            <div style={{background:"var(--green-pale)",border:"1px solid var(--green-light)",borderRadius:11,padding:16,display:"flex",gap:14,flexWrap:"wrap"}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--green)",marginBottom:6}}>⏰ Horaires</div>
                {[["Lun – Ven","8h – 20h"],["Samedi","9h – 18h"],["Dimanche","10h – 16h"]].map(([j,h])=>(
                  <div key={j} style={{display:"flex",justifyContent:"space-between",fontSize:".75rem",padding:"3px 0",borderBottom:"1px solid var(--border)"}}>
                    <span style={{color:"var(--gray)"}}>{j}</span><span style={{fontWeight:600,color:"var(--ink)"}}>{h}</span>
                  </div>
                ))}
              </div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--green)",marginBottom:6}}>📍 Bureaux</div>
                <div style={{fontSize:".75rem",color:"var(--gray)",lineHeight:1.7}}>Douala — Akwa<br/>Yaoundé — Bastos<br/>📞 +237 696 56 56 54</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ════════ PAGE : CENTRE D'AIDE ════════ */}
      {page==="aide"&&(
        <section className="sec anim">
          <div style={{maxWidth:800,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:24}}>
              <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.5rem",color:"var(--ink)",marginBottom:8}}>🆘 Centre d'aide</h1>
              <p style={{color:"var(--gray)",fontSize:".86rem"}}>Trouvez les réponses à vos questions</p>
            </div>
            {[
              {cat:"🛍️ Acheter sur Yorix",faq:[
                {q:"Comment passer une commande ?",r:"Cliquez sur un produit → Ajoutez au panier → Commander via WhatsApp. Le vendeur vous contacte sous 1h."},
                {q:"Quels modes de paiement ?",r:"MTN Mobile Money, Orange Money, et paiement à la livraison dans certaines villes."},
                {q:"Comment fonctionne l'Escrow ?",r:"Votre paiement est bloqué jusqu'à réception. Si problème, vous êtes remboursé sous 48h."},
              ]},
              {cat:"🏪 Vendre sur Yorix",faq:[
                {q:"Comment créer ma boutique ?",r:"Inscrivez-vous Vendeur → Dashboard → Ajouter produit. Votre produit est visible immédiatement."},
                {q:"Quelle est la commission Yorix ?",r:"5% sur chaque vente. Exemple : 10 000 FCFA vendus → vous recevez 9 500 FCFA."},
                {q:"Comment obtenir le badge Top Vendeur ?",r:"Automatique dès 5 produits actifs, ou achetez-le 15 000 FCFA/mois."},
              ]},
              {cat:"🚚 Livraison",faq:[
                {q:"Délais de livraison ?",r:"Intra-ville : 20–60 min. Inter-villes : 1–3 jours."},
                {q:"Colis non reçu ?",r:"Contactez immédiatement : support@yorix.cm ou WhatsApp +237 696 56 56 54."},
              ]},
              {cat:"💰 Points & Fidélité",faq:[
                {q:"Comment gagner des points ?",r:"5 points par achat, vente, livraison ou prestation. 10 points à l'inscription. 1 pt = 1 FCFA."},
                {q:"Échange minimum ?",r:"500 points = 500 FCFA. Utilisables en bons d'achat ou livraisons offertes."},
              ]},
            ].map(section=>(
              <div key={section.cat} style={{marginBottom:20}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".95rem",color:"var(--ink)",padding:"8px 0",borderBottom:"2px solid var(--green-light)",marginBottom:10}}>{section.cat}</div>
                {section.faq.map(({q,r},i)=>(
                  <details key={i} style={{marginBottom:8,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:9,overflow:"hidden"}}>
                    <summary style={{padding:"11px 14px",cursor:"pointer",fontWeight:600,fontSize:".83rem",color:"var(--ink)",userSelect:"none",listStyle:"none",display:"flex",justifyContent:"space-between"}}>
                      {q}<span style={{color:"var(--green)"}}>▾</span>
                    </summary>
                    <div style={{padding:"10px 14px 14px",fontSize:".8rem",color:"var(--gray)",lineHeight:1.75,borderTop:"1px solid var(--border)"}}>{r}</div>
                  </details>
                ))}
              </div>
            ))}
            <div style={{textAlign:"center",marginTop:20}}>
              <button className="btn-wa" style={{display:"inline-flex"}} onClick={()=>goPage("contact")}>📞 Contacter le support</button>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">Yo<span>rix</span> CM</div>
            <p className="footer-desc">La marketplace camerounaise complète — produits, prestataires, livraison, paiement MoMo sécurisé Escrow.</p>
            <div className="footer-contact"><span>📞 +237 696 56 56 54</span><span>✉️ support@yorix.cm</span><span>🇨🇲 Douala · Yaoundé · Bafoussam · et partout</span></div>
          </div>
          <div className="footer-col"><h4>Marketplace</h4><ul>{[{l:"Tous les produits",p:"produits"},{l:"Offres du jour",p:"produits"},{l:"Devenir vendeur",p:"inscription"}].map(i=><li key={i.l} onClick={()=>goPage(i.p)}>{i.l}</li>)}</ul></div>
          <div className="footer-col"><h4>Services</h4><ul>{[{l:"Escrow 🔐",p:"escrow"},{l:"Livraison 🚚",p:"livraison"},{l:"Prestataires 👷",p:"prestataires"},{l:"Business 💼",p:"business"},{l:"Academy 🎓",p:"academy"}].map(i=><li key={i.l} onClick={()=>goPage(i.p)}>{i.l}</li>)}</ul></div>
          <div className="footer-col"><h4>Aide</h4><ul>{[{l:"Centre d'aide",p:"aide"},{l:"Nous contacter",p:"contact"},{l:"📜 CGV",p:"cgv"},{l:"📋 Mentions légales",p:"mentions"},{l:"🔒 Confidentialité",p:"confidentialite"}].map(i=><li key={i.l} onClick={()=>goPage(i.p)}>{i.l}</li>)}</ul></div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Yorix Cameroun — RC: DOUALA/2026/B237</span>
          <div className="fb-badges"><span className="fbb">📱 MTN MoMo</span><span className="fbb">🔶 Orange Money</span><span className="fbb">🔐 Escrow</span><span className="fbb">🇨🇲 Made in CM</span></div>
        </div>
      </footer>
    </>
  );
}
