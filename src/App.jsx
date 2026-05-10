// ══════════════════════════════════════════════════════════════
//  YORIX CM — VERSION PROFESSIONNELLE COMPLÈTE
//  ✅ WhatsApp Commander
//  ✅ Upload multiple Cloudinary
//  ✅ Commandes Supabase (orders)
//  ✅ Avis / Étoiles / Commentaires
//  ✅ Commission automatique 5%
//  ✅ Livraison avec statuts
//  ✅ Escrow simulé
//  ✅ Dashboard vendeur complet
//  ✅ Notifications temps réel
//  ✅ 4 rôles : buyer / seller / delivery / provider
//  ✅ Contrat d'acceptation obligatoire pour pros
//  ✅ Password input premium avec œil
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect, useRef, useCallback, useMemo, Suspense } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  parsePathname,
  pathForPage,
  buildEntitySlug,
  parseEntitySlug,
  slugToCategoryName,
  CITY_BY_SLUG,
  METIER_SLUG_TO_CATEGORY,
  SEO_CITIES,
  SITE_URL,
  getSearchActionUrl,
  PAGE_PATH,
} from "./lib/seoRoutes";
import { SeoHead } from "./components/seo/SeoHead";
import { SeoLocalIntro } from "./components/seo/SeoLocalIntro";
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
  ROLE_LABELS,
  DELIVERY_STATUSES,
  ESCROW_STATUSES,
  PREST_DATA,
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
import { ModalCommander } from "./components/ModalCommander";
import { LevelBadge } from "./components/LevelBadge";
import { PointsAnimation } from "./components/PointsAnimation";
import { ModalDemandeLivraison } from "./components/ModalDemandeLivraison";
import { ChatUsers } from "./components/ChatUsers";
import {
  RouteSuspenseFallback,
  LazyHomePage,
  LazyProductRouteSections,
  LazyLivraisonPage,
  LazySiteMarketingPages,
  LazyFicheProduit,
  LazyPrestPage,
  LazyAcademyDetail,
  LazyAcademyContactForm,
  LazyLoyaltyPage,
  LazySellerDashboard,
  LazyBuyerDashboard,
  LazyDeliveryDashboard,
  LazyProviderDashboard,
  LazyAdminDashboard,
} from "./lazyRoutes";
import { OptimizedImage } from "./components/OptimizedImage";
import { PushManager } from "./components/PushManager";
import { OnboardingModal } from "./components/OnboardingModal";
import { ContractAcceptance, CONTRACT_VERSION } from "./components/ContractAcceptance";
import { PasswordInput } from "./components/PasswordInput";

// ═══════════════════════════════════════════════════════════════
// APP PRINCIPALE
// ═══════════════════════════════════════════════════════════════

export default function Yorix() {
  const navigate                  = useNavigate();
  const location                  = useLocation();
  const route                     = useMemo(() => parsePathname(location.pathname), [location.pathname]);
  const page                      = route.page;

  const [dark, setDark]           = useState(false);
  const [user, setUser]           = useState(null);
  const [userData, setUserData]   = useState(null);
  const [userRole, setUserRole]   = useState(null);
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
  const [allServices, setAllServices]           = useState([]);

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
  const [waOpen, setWaOpen]                     = useState(false);
  const [nlEmail, setNlEmail]                   = useState("");
  const [nlSent, setNlSent]                     = useState(false);
  const [wishlist, setWishlist]                 = useState(new Set());
  const [loyaltyPts, setLoyaltyPts]             = useState(320);
  const [blogFilter, setBlogFilter]             = useState("TOUT");
  const [selectedPrest, setSelectedPrest]       = useState(null);
  const [demandeLivraisonOpen, setDemandeLivraisonOpen] = useState(false);

  // ═══ CONTRACT ACCEPTANCE ═══
  const [contractOpen, setContractOpen]               = useState(false);
  const [contractAccepted, setContractAccepted]       = useState(false);
  const [pendingRegistration, setPendingRegistration] = useState(null);

  // ═══ ONBOARDING ═══
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [pendingAction, setPendingAction]   = useState(null);

  // Academy
  const [academyCourses, setAcademyCourses] = useState([]);
  const [academyLoading, setAcademyLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [detailProduct, setDetailProduct] = useState(null);
  const [detailProductLoading, setDetailProductLoading] = useState(false);

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

  const goAcademyDetail = useCallback((course) => {
    if (!course?.id) return;
    setSelectedCourse(course);
    navigate(pathForPage("academyDetail", { courseId: course.id }));
  }, [navigate]);
  const goAcademyContact = useCallback((course) => {
    if (!course?.id) return;
    setSelectedCourse(course);
    navigate(pathForPage("academyContact", { courseId: course.id }));
  }, [navigate]);

  const [inscriptionSent, setInscriptionSent]       = useState(false);
  const [inscriptionLoading, setInscriptionLoading] = useState(false);
  const [inscriptionError, setInscriptionError]     = useState("");
  const [inscriptionForm, setInscriptionForm] = useState({ nom:"",prenom:"",tel:"",email:"",metier:"",ville:"",experience:"",tarif:"",bio:"" });

  // ─────────────────────────────────────────────────────────────
  // SOUMETTRE CANDIDATURE PRESTATAIRE (avec Supabase + email + WA)
  // ─────────────────────────────────────────────────────────────
  const soumettreCandidaturePrestataire = async () => {
    setInscriptionError("");

    if (!inscriptionForm.nom.trim()) { setInscriptionError("Le nom est obligatoire"); return; }
    if (!inscriptionForm.tel.trim()) { setInscriptionError("Le téléphone est obligatoire"); return; }
    if (!inscriptionForm.metier)     { setInscriptionError("Veuillez choisir un métier"); return; }
    if (inscriptionForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inscriptionForm.email)) {
      setInscriptionError("Email invalide"); return;
    }

    setInscriptionLoading(true);

    try {
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

      if (error) console.warn("Table prestataires Supabase:", error.message);

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

      const waUrl = `https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(wamsg)}`;
      window.open(waUrl, "_blank");

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
      setTimeout(() => window.open(mailtoUrl, "_blank"), 500);

      setInscriptionSent(true);

    } catch (err) {
      console.error("soumettreCandidaturePrestataire:", err);
      setInscriptionError("Erreur : " + (err.message || "Impossible d'envoyer la candidature. Réessayez."));
    }

    setInscriptionLoading(false);
  };

  const [chatMessages, setChatMessages] = useState([{ text:"Bonjour ! Comment puis-je vous aider ?", me:false, time:"10:02" }]);
  const [chatMsg, setChatMsg]           = useState("");
  const [chatBlocked, setChatBlocked]   = useState(false);
  const chatEndRef = useRef(null);

  // ── ONBOARDING : afficher au 1er chargement si jamais vu ──
  useEffect(() => {
    const seen = localStorage.getItem("yorix_onboarding_seen");
    if (!seen) {
      const t = setTimeout(() => setOnboardingOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  // ── HANDLER : choix d'une action onboarding ──
  const handleOnboardingAction = useCallback((actionId) => {
    localStorage.setItem("yorix_onboarding_seen", "1");
    setOnboardingOpen(false);

    const routes = {
      buy:      { needAuth: false, page: "produits" },
      sell:     { needAuth: true,  role: "seller",   page: "dashboard" },
      service:  { needAuth: false, page: "prestataires" },
      delivery: { needAuth: true,  role: "buyer",    action: "openDelivery" },
    };

    const target = routes[actionId];
    if (!target) return;

    if (target.needAuth && !user) {
      setPendingAction(actionId);
      setSelectedRole(target.role || "buyer");
      setAuthTab("register");
      setAuthOpen(true);
      return;
    }

    executePendingAction(actionId);
  }, [user]);

  // ── EXÉCUTION de l'action après connexion réussie ──
  const executePendingAction = useCallback((actionId) => {
    const id = actionId || pendingAction;
    if (!id) return;

    if (id === "buy")        goPage("produits");
    else if (id === "sell")  goPage("dashboard");
    else if (id === "service") goPage("prestataires");
    else if (id === "delivery") {
      goPage("livraison");
      setTimeout(() => setDemandeLivraisonOpen(true), 300);
    }

    setPendingAction(null);
  }, [pendingAction]);

  // ── Marquer onboarding comme vu lors de la fermeture manuelle ──
  const handleCloseOnboarding = useCallback(() => {
    localStorage.setItem("yorix_onboarding_seen", "1");
    setOnboardingOpen(false);
  }, []);

  // ── NAVIGATION (URLs indexables — source de vérité : React Router)
  const goPage = useCallback((p, opts = {}) => {
    navigate(pathForPage(p, opts));
    window.scrollTo(0, 0);
    setCartOpen(false);
    setNotifOpen(false);
  }, [navigate]);

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

  const routePath = location.pathname;

  // ── SEO / Router : synchroniser filtres et fiches depuis l’URL indexable
  useEffect(() => {
    if (route.categorySlug) {
      const name = slugToCategoryName(route.categorySlug, CATS);
      if (name) setFilterCat(name);
    } else if (route.page === "produits" && routePath === "/produits") {
      setFilterCat("");
    }
  }, [route.categorySlug, route.page, routePath]);

  const seoCityName = useMemo(
    () => (route.citySlug ? CITY_BY_SLUG[route.citySlug]?.name : null),
    [route.citySlug]
  );

  const prestSyncFilters = useMemo(() => {
    if (route.page === "prestataires" && route.metierSlug && route.villeSlug) {
      return {
        cat: METIER_SLUG_TO_CATEGORY[route.metierSlug] || "",
        ville: CITY_BY_SLUG[route.villeSlug]?.name || "",
      };
    }
    if (route.page === "seoCity" && route.cityMode === "prestataires" && seoCityName) {
      return { cat: "", ville: seoCityName };
    }
    if (route.page === "prestataires" && routePath === "/prestataires") {
      return { cat: "", ville: "" };
    }
    return null;
  }, [route.page, route.metierSlug, route.villeSlug, route.cityMode, seoCityName, routePath]);

  useEffect(() => {
    if (route.page !== "academyDetail" && route.page !== "academyContact") return;
    const id = route.courseId;
    if (!id || !academyCourses.length) return;
    const c = academyCourses.find((x) => String(x.id) === String(id));
    if (c) setSelectedCourse(c);
  }, [route.page, route.courseId, academyCourses]);

  useEffect(() => {
    if (route.page !== "productDetail" || !route.productSlug) {
      setDetailProduct(null);
      return;
    }
    const { id } = parseEntitySlug(route.productSlug);
    if (!id) return;
    let cancelled = false;
    setDetailProductLoading(true);
    supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) {
          setDetailProduct(data || null);
          setDetailProductLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [route.page, route.productSlug]);

  useEffect(() => {
    if (route.page !== "prestDetail" || !route.prestSlug) return;
    const { id } = parseEntitySlug(route.prestSlug);
    if (!id) return;
    const demo = PREST_DATA.find((p) => p.id === id);
    if (demo) {
      setSelectedPrest(demo);
      return;
    }
    const matchReal = allServices.find((s) => `real-${s.id}` === id || String(s.id) === id);
    if (matchReal) {
      setSelectedPrest({
        id: `real-${matchReal.id}`,
        name: matchReal.provider_nom || "Prestataire Yorix",
        metier: matchReal.nom || "Service",
        categorie: matchReal.categorie || "Autre",
        ville: matchReal.ville || "Cameroun",
        quartier: "",
        emoji: "🛠️",
        photo: null,
        color_bg: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
        tags: [matchReal.categorie || "Service"].filter(Boolean),
        note: matchReal.note || 5,
        avis: matchReal.nombre_avis || 0,
        prix: matchReal.prix ? `${Number(matchReal.prix).toLocaleString("fr-FR")} FCFA` : "",
        verifie: true,
        dispo: matchReal.disponible !== false,
        bio: matchReal.description || "",
        telephone: "",
        realisations: 0,
        isReal: true,
      });
    }
  }, [route.page, route.prestSlug, allServices]);

  // ── AUTH ──
  const doLogin = async () => {
    setAuthError(""); setAuthLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email:authForm.email, password:authForm.password });
      if (error) throw error;
      setUser(data.user);
      await chargerProfil(data.user.id);
      setAuthOpen(false);
      if (pendingAction) {
        setTimeout(() => executePendingAction(pendingAction), 300);
      }
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

      // ═══ CONTRAT OBLIGATOIRE pour les rôles professionnels ═══
      const PRO_ROLES = ["seller", "provider", "delivery"];
      if (PRO_ROLES.includes(selectedRole) && !contractAccepted) {
        setPendingRegistration({
          nom: authForm.nom,
          email: authForm.email,
          tel: authForm.tel,
          password: authForm.password,
          role: selectedRole,
        });
        setAuthLoading(false);
        setContractOpen(true);
        return;
      }

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
      // Reset pour la prochaine inscription
      setContractAccepted(false);
      setPendingRegistration(null);
      if (pendingAction) {
        setTimeout(() => executePendingAction(pendingAction), 500);
      }
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

  // ═══ HANDLER : Contrat accepté → reprendre l'inscription ═══
  const handleContractAccepted = async (acceptanceData) => {
    setContractOpen(false);
    setContractAccepted(true);
    // Re-déclencher l'inscription maintenant que le contrat est accepté
    setTimeout(() => {
      doRegister();
    }, 200);
  };

  // ── PANIER ──
  const addToCart = useCallback((p) => {
    if (!p?.id) {
      console.warn("⚠️ Produit sans ID, ignoré:", p);
      return;
    }

    let imgArr = [];
    if (Array.isArray(p.image_urls)) {
      imgArr = p.image_urls;
    } else if (typeof p.image_urls === "string") {
      try { imgArr = JSON.parse(p.image_urls); } catch { imgArr = []; }
    }

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

  const changeQty   = (id, d) => setCartItems(prev => prev.map(i => i.id===id ? {...i, qty:Math.max(1,i.qty+d)} : i));
  const removeItem  = (id) => setCartItems(prev => prev.filter(i => i.id!==id));
  const totalQty    = cartItems.reduce((a,i) => a+i.qty, 0);
  const totalPrice  = cartItems.reduce((a,i) => a+(i.prix*i.qty), 0);

  const passerCommande = async () => {
    if (!user) { setAuthOpen(true); setCartOpen(false); return; }
    try {
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

      setCartItems([]);
      setCartOpen(false);

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
    const id = typeof notif === "object" ? notif.id : notif;
    const notification = typeof notif === "object" ? notif : notifs.find(n => n.id === id);

    try {
      const { error } = await supabase.from("notifications").update({ lu: true }).eq("id", id);
      if (error) console.warn("marquerNotifLue:", error.message);
    } catch (e) {
      console.warn("marquerNotifLue exception:", e?.message);
    }

    setNotifs(prev => prev.map(n => n.id === id ? { ...n, lu: true } : n));
    setNotifOpen(false);

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

  const produitsFiltres = useMemo(() => {
    let list = produits.filter(
      (p) =>
        !search ||
        p.name_fr?.toLowerCase().includes(search.toLowerCase()) ||
        p.description_fr?.toLowerCase().includes(search.toLowerCase())
    );
    if (page === "seoCity" && route.cityMode === "acheter" && seoCityName) {
      const sl = seoCityName.toLowerCase();
      list = list.filter((p) => {
        const v = (p.ville || "").toLowerCase();
        return !v || v.includes(sl) || sl.includes(v);
      });
    }
    return list;
  }, [produits, search, page, route.cityMode, seoCityName]);

  const showSeoLocal =
    page === "seoCity" || (page === "livraison" && !!route.citySlug);
  const showProduits = page === "produits" || (page === "seoCity" && route.cityMode === "acheter");
  const showLivraison =
    page === "livraison" || (page === "seoCity" && route.cityMode === "livraison");
  const showPrestataires =
    page === "prestataires" ||
    page === "prestDetail" ||
    (page === "seoCity" && route.cityMode === "prestataires");

  const needsProductListingChunk = showProduits || page === "escrow";
  const isSiteMarketingPage = useMemo(
    () =>
      [
        "faq",
        "devenirVendeur",
        "devenirLivreur",
        "inscription",
        "business",
        "academy",
        "blog",
        "contact",
        "aide",
        "cgv",
        "mentions",
        "confidentialite",
      ].includes(page),
    [page]
  );

  const tabActive = useCallback(
    (tabPage) => {
      if (tabPage === "produits") {
        return page === "produits" || (page === "seoCity" && route.cityMode === "acheter");
      }
      if (tabPage === "livraison") {
        return page === "livraison" || (page === "seoCity" && route.cityMode === "livraison");
      }
      if (tabPage === "prestataires") {
        return (
          page === "prestataires" ||
          page === "prestDetail" ||
          (page === "seoCity" && route.cityMode === "prestataires")
        );
      }
      return page === tabPage;
    },
    [page, route.cityMode]
  );

  const openProductUrl = useCallback(
    (p) => {
      goPage("productDetail", {
        productSlug: buildEntitySlug(p.name_fr || p.name, p.id),
      });
    },
    [goPage]
  );

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

  const seoBundle = useMemo(() => {
    const canon = route.canonicalPath || location.pathname;
    const orgLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Yorix CM",
      alternateName: "Yorix Cameroun",
      url: SITE_URL,
      logo: `${SITE_URL}/icons/icon-512.png`,
      areaServed: { "@type": "Country", name: "Cameroun" },
      sameAs: [
        "https://www.facebook.com/yorixcm",
        "https://www.instagram.com/yorixcm",
        "https://wa.me/237696565654",
      ],
    };
    const webLd = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Yorix CM",
      url: SITE_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: `${getSearchActionUrl()}?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };

    if (page === "dashboard" || page === "admin") {
      return {
        title: "Espace membre — Yorix CM",
        description: "Tableau de bord Yorix.",
        canonicalPath: canon,
        noindex: true,
        jsonLd: [],
      };
    }

    if (page === "home") {
      return {
        title: "Yorix.cm — Marketplace Cameroun | Achat en ligne, livraison, escrow, prestataires",
        description:
          "Yorix est une marketplace camerounaise : achat en ligne, vendre en ligne, livreur & livraison Douala, Yaoundé, Bafoussam, escrow MTN MoMo & Orange Money, prestataires vérifiés.",
        canonicalPath: "/",
        keywords:
          "marketplace Cameroun, achat en ligne Cameroun, vendre en ligne Cameroun, livraison Cameroun, livreur Cameroun, escrow Cameroun, prestataires Cameroun, Douala, Yaoundé, Bafoussam",
        jsonLd: [orgLd, webLd],
      };
    }

    if (page === "productDetail" && detailProduct) {
      const p = detailProduct;
      const img =
        p.image && String(p.image).startsWith("http")
          ? p.image
          : Array.isArray(p.image_urls) && p.image_urls[0]
            ? p.image_urls[0]
            : `${SITE_URL}/icons/icon-512.png`;
      const desc =
        (p.description_fr && String(p.description_fr).slice(0, 158)) ||
        `Acheter ${p.name_fr || "ce produit"} sur Yorix — marketplace & livraison Cameroun.`;
      const productLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: p.name_fr || "Produit Yorix",
        image: img,
        description: desc,
        brand: { "@type": "Brand", name: "Yorix CM" },
        offers: {
          "@type": "Offer",
          url: `${SITE_URL}${canon}`,
          priceCurrency: "XAF",
          price: p.prix,
          availability: "https://schema.org/InStock",
        },
      };
      return {
        title: `${p.name_fr || "Produit"} — achat en ligne Cameroun | Yorix.cm`,
        description: desc,
        canonicalPath: canon,
        ogType: "product",
        jsonLd: [productLd, orgLd],
      };
    }

    if (page === "faq") {
      const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Comment acheter sur Yorix au Cameroun ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Parcourez les produits, ajoutez au panier et finalisez via WhatsApp ou paiement mobile (MTN MoMo, Orange Money).",
            },
          },
          {
            "@type": "Question",
            name: "La livraison couvre quelles villes ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Douala, Yaoundé, Bafoussam, Bamenda, Kribi et un réseau national en expansion. Délais J+1 sur les grandes villes.",
            },
          },
          {
            "@type": "Question",
            name: "Comment fonctionne l’escrow Yorix ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Les fonds sont sécurisés jusqu’à confirmation de réception par l’acheteur, puis libérés au vendeur.",
            },
          },
        ],
      };
      return {
        title: "FAQ Yorix — marketplace, livraison, escrow Cameroun",
        description:
          "Réponses sur l’achat en ligne, la livraison, les prestataires, MTN MoMo, Orange Money et l’escrow sur Yorix.cm.",
        canonicalPath: "/faq",
        jsonLd: [faqLd, orgLd],
      };
    }

    if (page === "seoCity" && route.citySlug && CITY_BY_SLUG[route.citySlug]) {
      const cn = CITY_BY_SLUG[route.citySlug].name;
      const modes = {
        hub: {
          title: `Yorix ${cn} — marketplace, livraison & prestataires | Cameroun`,
          desc: `Marketplace à ${cn} : acheter en ligne, livraison, services et escrow. MTN MoMo, Orange Money — Yorix.cm.`,
        },
        acheter: {
          title: `Acheter en ligne à ${cn} — marketplace Yorix Cameroun`,
          desc: `Achat en ligne à ${cn} : produits vérifiés, paiement mobile, livraison. La marketplace camerounaise Yorix.`,
        },
        livraison: {
          title: `Livraison à ${cn} — livreur & colis | Yorix Ride Cameroun`,
          desc: `Service de livraison rapide à ${cn} et partout au Cameroun. Suivi, tarifs clairs — Yorix Ride.`,
        },
        prestataires: {
          title: `Prestataires à ${cn} — services à domicile | Yorix.cm`,
          desc: `Trouvez des prestataires vérifiés à ${cn} : plomberie, électricité, ménage, beauté, informatique…`,
        },
      };
      const m = modes[route.cityMode] || modes.hub;
      const localLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `Yorix — ${cn}`,
        url: `${SITE_URL}${canon}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: cn,
          addressCountry: "CM",
        },
        areaServed: { "@type": "City", name: cn },
        parentOrganization: { "@type": "Organization", name: "Yorix CM" },
      };
      return {
        title: m.title,
        description: m.desc,
        canonicalPath: canon,
        jsonLd: [localLd, orgLd],
      };
    }

    const fallbackTitle = {
      produits: "Produits — marketplace en ligne Cameroun | Yorix.cm",
      livraison: "Livraison Cameroun — livreurs Yorix Ride | Douala, Yaoundé",
      escrow: "Escrow Cameroun — paiement sécurisé marketplace | Yorix.cm",
      prestataires: "Prestataires Cameroun — services à domicile vérifiés | Yorix.cm",
      business: "Yorix Business — solutions B2B marketplace Cameroun",
      blog: "Blog Yorix — actualités marketplace Cameroun",
      academy: "Yorix Academy — formations e-commerce Cameroun",
      loyalty: "Fidélité Yorix — points & récompenses",
      contact: "Contact Yorix — support marketplace Cameroun",
      aide: "Centre d'aide Yorix — marketplace & livraison Cameroun",
      faq: "FAQ Yorix — achat, livraison, escrow, vendeurs | Cameroun",
      cgv: "CGV Yorix.cm — conditions générales de vente",
      confidentialite: "Politique de confidentialité — Yorix.cm",
      mentions: "Mentions légales — Yorix.cm",
      devenirVendeur: "Devenir vendeur sur Yorix — marketplace Cameroun",
      devenirLivreur: "Devenir livreur Yorix Ride — livraison Cameroun",
      inscription: "Devenir prestataire Yorix — services Cameroun",
    };
    const ft = fallbackTitle[page];
    if (ft) {
      return {
        title: ft,
        description:
          "Yorix.cm — marketplace & super-app pour acheter, vendre, se faire livrer et trouver des prestataires au Cameroun. MTN MoMo, Orange Money, escrow.",
        canonicalPath: PAGE_PATH[page] || canon,
        jsonLd: [orgLd],
      };
    }

    return {
      title: "Yorix CM — Marketplace #1 au Cameroun",
      description:
        "Marketplace camerounaise : produits, livraison, prestataires, escrow MTN MoMo & Orange Money.",
      canonicalPath: canon,
      jsonLd: [orgLd],
    };
  }, [page, route.canonicalPath, route.citySlug, route.cityMode, location.pathname, detailProduct]);

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
      <SeoHead
        title={seoBundle.title}
        description={seoBundle.description}
        canonicalPath={seoBundle.canonicalPath}
        keywords={seoBundle.keywords}
        ogType={seoBundle.ogType || "website"}
        jsonLd={seoBundle.jsonLd}
        noindex={seoBundle.noindex}
      />

      {/* ── CONTRACT ACCEPTANCE MODAL ── */}
      <ContractAcceptance
        open={contractOpen}
        onClose={() => {
          setContractOpen(false);
          setAuthLoading(false);
          setAuthError("Vous devez accepter le contrat pour finaliser votre inscription.");
        }}
        onAccepted={handleContractAccepted}
        user={user}
        userData={userData}
        role={selectedRole}
        authForm={authForm}
      />

      {/* ── ONBOARDING MODAL ── */}
      <OnboardingModal
        open={onboardingOpen}
        onClose={handleCloseOnboarding}
        onSelectAction={handleOnboardingAction}
        user={user}
      />

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

      {/* ── AUTH MODAL ── */}
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
              <PasswordInput
                value={authForm.password}
                onChange={(val) => setAuthForm(f => ({ ...f, password: val }))}
                placeholder={authTab === "login" ? "Entrez votre mot de passe" : "Choisissez un mot de passe"}
                autoComplete={authTab === "login" ? "current-password" : "new-password"}
                showStrength={authTab === "register"}
                showRules={authTab === "register"}
                ariaLabel="Mot de passe"
                id="auth-password"
              />
              {authTab === "login" && (
                <div style={{
                  fontSize: ".7rem",
                  color: "var(--gray)",
                  marginTop: 5,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}>
                  💡 Cliquez sur l'œil pour afficher ou masquer votre mot de passe
                </div>
              )}
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
          <button
            onClick={() => setOnboardingOpen(true)}
            title="Que cherchez-vous ?"
            style={{
              background: "linear-gradient(135deg, var(--green, #1a6b3a), #0d4d28)",
              color: "#fff",
              border: "none",
              padding: "7px 14px",
              borderRadius: 8,
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: ".75rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(26,107,58,.25)",
            }}
          >
            🚀 Démarrer
          </button>

          <button
            className="dark-toggle"
            onClick={()=>setDark(d=>!d)}
            title={dark?"Mode clair":"Mode sombre"}
          >
            {dark?"☀️":"🌙"}
          </button>

          {user && (
            <button className="icon-btn" onClick={()=>setNotifOpen(o=>!o)} title="Notifications">
              🔔{unread>0 && <span className="ibadge">{unread}</span>}
            </button>
          )}

          <button className="icon-btn" onClick={()=>setCartOpen(true)} title="Mon panier">
            🛒{totalQty>0 && <span className="ibadge">{totalQty}</span>}
          </button>

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

      {/* ═══ CART DRAWER AMAZON STYLE ═══ */}
      <div className={`cart-overlay${cartOpen?" open":""}`} onClick={()=>setCartOpen(false)}/>
      <div className={`cart-drawer${cartOpen?" open":""}`}>
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

        {cartItems.length > 0 && (
          <div className="cart-trust-bar">
            <span>🔒 Paiement sécurisé</span>
            <span>🚚 Livraison rapide</span>
            <span>✅ Garantie Yorix</span>
          </div>
        )}

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
      <div className="nav-tabs">{TABS.map(t=><div key={t.p} className={`tab${tabActive(t.p)?" active":""}`} onClick={()=>goPage(t.p)}>{t.l}</div>)}</div>

      {/* ── PAY STRIP ── */}
      <div className="pay-strip">
        <b style={{color:"var(--ink)"}}>Paiement :</b>
        <div className="pay-methods"><span className="pm mtn-b">📱 MTN MoMo</span><span className="pm ora-b">🔶 Orange Money</span><span className="pm">💳 Carte</span><span className="pm">💵 Cash</span></div>
        <div className="strip-right"><span>🚚 J+1 Douala & Yaoundé</span><span>🔐 Escrow sécurisé</span>{user&&<span style={{color:"var(--gold)"}}>👤 {userData?.nom||user.email}</span>}</div>
      </div>

      {/* ════════ PAGE : ACCUEIL ════════ */}
      {page==="home"&&(
        <Suspense fallback={<RouteSuspenseFallback minHeight={280} label="Chargement de l'accueil..." />}>
          <LazyHomePage
            filterCat={filterCat}
            setFilterCat={setFilterCat}
            search={search}
            setSearch={setSearch}
            produitsLoading={produitsLoading}
            produits={produits}
            user={user}
            userData={userData}
            wishlist={wishlist}
            addToCart={addToCart}
            toggleWish={toggleWish}
            openProductUrl={openProductUrl}
            setOnboardingOpen={setOnboardingOpen}
            goPage={goPage}
            allServices={allServices}
            nlEmail={nlEmail}
            setNlEmail={setNlEmail}
            nlSent={nlSent}
            setNlSent={setNlSent}
          />
        </Suspense>
      )}

      {/* ════════ PAGE : PRODUITS ════════ */}
      {showSeoLocal && page === "livraison" && route.citySlug && CITY_BY_SLUG[route.citySlug] && (
        <SeoLocalIntro
          city={CITY_BY_SLUG[route.citySlug]}
          mode="livraison"
          goPage={goPage}
        />
      )}
      {showSeoLocal && page === "seoCity" && route.citySlug && CITY_BY_SLUG[route.citySlug] && (
        <SeoLocalIntro
          city={CITY_BY_SLUG[route.citySlug]}
          mode={route.cityMode || "hub"}
          goPage={goPage}
        />
      )}

      {page === "productDetail" && (
        <div className="anim">
          {detailProductLoading ? (
            <div className="loading" style={{ minHeight: 320, justifyContent: "center" }}>
              <div className="spinner" /> Chargement du produit...
            </div>
          ) : detailProduct ? (
            <Suspense fallback={<RouteSuspenseFallback minHeight={320} label="Chargement du produit..." />}>
              <LazyFicheProduit
                product={detailProduct}
                user={user}
                userData={userData}
                onClose={() => goPage("produits")}
                onAddToCart={addToCart}
              />
            </Suspense>
          ) : (
            <section className="sec anim">
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <p>Produit introuvable.</p>
                <button className="form-submit" style={{ width: "auto", marginTop: 16 }} type="button" onClick={() => goPage("produits")}>
                  ← Retour aux produits
                </button>
              </div>
            </section>
          )}
        </div>
      )}

      {needsProductListingChunk && (
        <Suspense fallback={<RouteSuspenseFallback label="Chargement catalogue..." />}>
          <LazyProductRouteSections
            showProduits={showProduits}
            page={page}
            seoCityName={seoCityName}
            produitsFiltres={produitsFiltres}
            produitsLoading={produitsLoading}
            produits={produits}
            filterCat={filterCat}
            setFilterCat={setFilterCat}
            search={search}
            user={user}
            userData={userData}
            wishlist={wishlist}
            addToCart={addToCart}
            toggleWish={toggleWish}
            openProductUrl={openProductUrl}
            dark={dark}
          />
        </Suspense>
      )}

      {showLivraison && (
        <Suspense fallback={<RouteSuspenseFallback label="Chargement livraison..." />}>
          <LazyLivraisonPage
            route={route}
            user={user}
            userData={userData}
            setDemandeLivraisonOpen={setDemandeLivraisonOpen}
            setAuthTab={setAuthTab}
            setSelectedRole={setSelectedRole}
            setAuthOpen={setAuthOpen}
          />
        </Suspense>
      )}

      {/* ════════ PAGE : PRESTATAIRES ════════ */}
      {showPrestataires&&(
        <Suspense fallback={<RouteSuspenseFallback label="Chargement prestataires..." />}>
          <LazyPrestPage
            user={user}
            userData={userData}
            allServices={allServices}
            goPage={goPage}
            setSelectedPrest={setSelectedPrest}
            selectedPrest={selectedPrest}
            onOpenPrestDetail={(p) =>
              goPage("prestDetail", { prestSlug: buildEntitySlug(p.name, p.id) })
            }
            onClosePrestDetail={() => {
              if (route.metierSlug && route.villeSlug) {
                goPage("prestataires", {
                  metierSlug: route.metierSlug,
                  villeSlug: route.villeSlug,
                });
              } else if (page === "seoCity" && route.cityMode === "prestataires" && route.citySlug) {
                goPage("seoCity", { citySlug: route.citySlug, mode: "prestataires" });
              } else {
                goPage("prestataires");
              }
            }}
            syncFilters={prestSyncFilters}
          />
        </Suspense>
      )}

      {isSiteMarketingPage && (
        <Suspense fallback={<RouteSuspenseFallback label="Chargement page..." />}>
          <LazySiteMarketingPages
            page={page}
            goPage={goPage}
            setAuthOpen={setAuthOpen}
            setAuthTab={setAuthTab}
            setSelectedRole={setSelectedRole}
            inscriptionSent={inscriptionSent}
            setInscriptionSent={setInscriptionSent}
            inscriptionForm={inscriptionForm}
            setInscriptionForm={setInscriptionForm}
            inscriptionError={inscriptionError}
            inscriptionLoading={inscriptionLoading}
            submitInscriptionPrestataire={soumettreCandidaturePrestataire}
            academyCourses={academyCourses}
            academyLoading={academyLoading}
            goAcademyDetail={goAcademyDetail}
            blogFilter={blogFilter}
            setBlogFilter={setBlogFilter}
            nlEmail={nlEmail}
            setNlEmail={setNlEmail}
            nlSent={nlSent}
            setNlSent={setNlSent}
          />
        </Suspense>
      )}

      {page==="academyDetail"&&(
        <Suspense fallback={<RouteSuspenseFallback label="Chargement formation..." />}>
          <LazyAcademyDetail
            course={selectedCourse}
            goPage={goPage}
            goContact={goAcademyContact}
          />
        </Suspense>
      )}

      {page==="academyContact"&&(
        <Suspense fallback={<RouteSuspenseFallback label="Chargement formulaire..." />}>
          <LazyAcademyContactForm
            course={selectedCourse}
            user={user}
            userData={userData}
            goPage={goPage}
          />
        </Suspense>
      )}

      {/* ═══════════════ PAGE : FIDÉLITÉ ═══════════════ */}
      {page==="loyalty"&&(
        <Suspense fallback={<RouteSuspenseFallback label="Chargement fidélité..." />}>
          <LazyLoyaltyPage
            user={user}
            userData={userData}
            goPage={goPage}
            setAuthOpen={setAuthOpen}
            setAuthTab={setAuthTab}
          />
        </Suspense>
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
              {dashTab!=="messages"&&userRole==="seller"&&(
                <Suspense fallback={<RouteSuspenseFallback label="Chargement espace vendeur..." />}>
                  <LazySellerDashboard user={user} userData={userData} dashTab={dashTab} setDashTab={setDashTab}/>
                </Suspense>
              )}
              {dashTab!=="messages"&&userRole==="delivery"&&(
                <Suspense fallback={<RouteSuspenseFallback label="Chargement espace livreur..." />}>
                  <LazyDeliveryDashboard user={user} userData={userData} dashTab={dashTab} setDashTab={setDashTab}/>
                </Suspense>
              )}
              {dashTab!=="messages"&&userRole==="provider"&&(
                <Suspense fallback={<RouteSuspenseFallback label="Chargement espace prestataire..." />}>
                  <LazyProviderDashboard user={user} userData={userData} dashTab={dashTab} setDashTab={setDashTab}/>
                </Suspense>
              )}
              {dashTab!=="messages"&&(userRole==="buyer"||!userRole)&&(
                <Suspense fallback={<RouteSuspenseFallback label="Chargement tableau de bord..." />}>
                  <LazyBuyerDashboard user={user} userData={userData} wishlist={wishlist} totalQty={totalQty} loyaltyPts={loyaltyPts} setLoyaltyPts={setLoyaltyPts} dashTab={dashTab} goPage={goPage}/>
                </Suspense>
              )}
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
              className={`mn-item${tabActive(item.p)?" active":""}`}
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
        <Suspense fallback={<RouteSuspenseFallback label="Chargement admin..." />}>
          <LazyAdminDashboard user={user} userData={userData} goPage={goPage}/>
        </Suspense>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">Yo<span>rix</span> CM</div>
            <p className="footer-desc">La marketplace camerounaise complète — produits, prestataires, livraison, paiement MoMo sécurisé Escrow.</p>
            <div className="footer-contact"><span>📞 +237 696 56 56 54</span><span>✉️ support@yorix.cm</span><span>🇨🇲 Douala · Yaoundé · Bafoussam · et partout</span></div>
          </div>
          <div className="footer-col">
            <h4>Marketplace</h4>
            <ul>
              {[
                { l: "Tous les produits", p: "produits" },
                { l: "Acheter à Douala", nav: () => goPage("seoCity", { citySlug: "douala", mode: "acheter" }) },
                { l: "Acheter à Yaoundé", nav: () => goPage("seoCity", { citySlug: "yaounde", mode: "acheter" }) },
                { l: "Vendre sur Yorix", p: "devenirVendeur" },
              ].map((i) => (
                <li key={i.l} onClick={() => (i.nav ? i.nav() : goPage(i.p))}>{i.l}</li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Services &amp; villes</h4>
            <ul>
              {[
                { l: "Livraison Cameroun", p: "livraison" },
                { l: "Livraison à Douala", nav: () => goPage("livraison", { citySlug: "douala" }) },
                { l: "Prestataires Cameroun", p: "prestataires" },
                { l: "Prestataires à Yaoundé", nav: () => goPage("seoCity", { citySlug: "yaounde", mode: "prestataires" }) },
                { l: "Escrow 🔐", p: "escrow" },
                { l: "Business 💼", p: "business" },
                { l: "Academy 🎓", p: "academy" },
              ].map((i) => (
                <li key={i.l} onClick={() => (i.nav ? i.nav() : goPage(i.p))}>{i.l}</li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Rejoindre Yorix</h4>
            <ul>
              {[
                { l: "Devenir livreur", p: "devenirLivreur" },
                { l: "Devenir prestataire", p: "inscription" },
                { l: "FAQ", p: "faq" },
                { l: "Centre d'aide", p: "aide" },
                { l: "Nous contacter", p: "contact" },
                { l: "📜 CGV", p: "cgv" },
                { l: "🔒 Confidentialité", p: "confidentialite" },
              ].map((i) => (
                <li key={i.l} onClick={() => goPage(i.p)}>{i.l}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Yorix Cameroun — RC: DOUALA/2026/B237</span>
          <div className="fb-badges"><span className="fbb">📱 MTN MoMo</span><span className="fbb">🔶 Orange Money</span><span className="fbb">🔐 Escrow</span><span className="fbb">🇨🇲 Made in CM</span></div>
        </div>
      </footer>
    </>
  );
}
