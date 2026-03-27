// ═══════════════════════════════════════════════════════════════
//  YORIX CM — BACKEND FIREBASE COMPLET
//  Fichier : firebase-backend.js
//  Description : Backend complet pour la marketplace Yorix CM
//  Technologie : Firebase (Auth + Firestore + Storage + Rules)
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────
// 1. CONFIGURATION FIREBASE
// ─────────────────────────────────────────
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  increment,
  runTransaction,
  writeBatch
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8OoAoT7u0qbQWkWbISJ6vId9W2TV8PXE",
  authDomain: "yorix-74030.firebaseapp.com",
  projectId: "yorix-74030",
  storageBucket: "yorix-74030.firebasestorage.app",
  messagingSenderId: "942631804989",
  appId: "1:942631804989:web:b068e95deed0d5a927ca54"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ─────────────────────────────────────────
// 2. CONSTANTES
// ─────────────────────────────────────────
const ROLES = {
  ADMIN: "admin",
  VENDEUR: "vendeur",
  CLIENT: "client",
  LIVREUR: "livreur"
};

const ORDER_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  DISPUTE: "dispute",
  CANCELLED: "cancelled",
  REFUNDED: "refunded"
};

const DELIVERY_STATUS = {
  WAITING: "en_attente",
  ACCEPTED: "accepte",
  IN_PROGRESS: "en_cours",
  DELIVERED: "livre",
  FAILED: "echoue"
};

const COMMISSION_RATE = 0.10; // 10% commission Yorix

// Regex anti-contournement
const FORBIDDEN_PATTERNS = [
  /(\+?237[\s\-]?[0-9]{8,9})/g,           // Numéros camerounais
  /(\+?[0-9]{1,3}[\s\-]?[0-9]{9,10})/g,   // Numéros internationaux
  /(whatsapp|wa\.me|t\.me|telegram)/gi,     // WhatsApp/Telegram
  /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, // Emails
  /(facebook\.com|instagram\.com|twitter\.com)/gi, // Réseaux sociaux
  /(0[67][0-9]{7,8})/g,                    // Numéros locaux
];

// ═══════════════════════════════════════════════════════════════
// 3. AUTHENTIFICATION
// ═══════════════════════════════════════════════════════════════

/**
 * Inscription d'un nouvel utilisateur
 * @param {string} email
 * @param {string} password
 * @param {string} nom
 * @param {string} telephone
 * @param {string} role - client, vendeur, livreur
 * @param {string} langue - fr ou en
 */
export async function inscrireUtilisateur(email, password, nom, telephone, role = "client", langue = "fr") {
  try {
    // Vérifier si le téléphone existe déjà (anti-multicomptes)
    const telQuery = query(collection(db, "users"), where("telephone", "==", telephone));
    const telSnap = await getDocs(telQuery);
    if (!telSnap.empty) {
      throw new Error("Ce numéro de téléphone est déjà utilisé.");
    }

    // Créer le compte Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Mettre à jour le profil
    await updateProfile(user, { displayName: nom });

    // Créer le document utilisateur dans Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      nom,
      email,
      telephone,
      role,
      langue,
      actif: true,
      verifie: false,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      avatar: null,
      note: 0,
      nombreAvis: 0,
      wallet: 0,
      totalCommandes: 0,
      totalDepenses: 0,
    });

    // Créer le wallet de l'utilisateur
    await setDoc(doc(db, "wallets", user.uid), {
      userId: user.uid,
      solde: 0,
      soldeBloque: 0,
      totalGagne: 0,
      totalRetire: 0,
      devise: "FCFA",
      createdAt: serverTimestamp(),
      transactions: []
    });

    // Log d'inscription
    await addDoc(collection(db, "logs"), {
      type: "inscription",
      userId: user.uid,
      email,
      role,
      timestamp: serverTimestamp(),
      ip: null
    });

    return { success: true, user, uid: user.uid };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Connexion utilisateur
 */
export async function connecterUtilisateur(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Mettre à jour lastLogin
    await updateDoc(doc(db, "users", user.uid), {
      lastLogin: serverTimestamp()
    });

    // Récupérer les données utilisateur
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();

    if (!userData.actif) {
      await signOut(auth);
      throw new Error("Votre compte a été suspendu. Contactez support@yorix.cm");
    }

    return { success: true, user, userData };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Connexion avec Google
 */
export async function connexionGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Vérifier si l'utilisateur existe déjà
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      // Nouveau compte Google
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        nom: user.displayName,
        email: user.email,
        telephone: null,
        role: "client",
        langue: "fr",
        actif: true,
        verifie: true,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        avatar: user.photoURL,
        note: 0,
        nombreAvis: 0,
        wallet: 0,
        totalCommandes: 0,
      });

      await setDoc(doc(db, "wallets", user.uid), {
        userId: user.uid,
        solde: 0,
        soldeBloque: 0,
        totalGagne: 0,
        devise: "FCFA",
        createdAt: serverTimestamp(),
      });
    } else {
      await updateDoc(doc(db, "users", user.uid), {
        lastLogin: serverTimestamp()
      });
    }

    const userData = (await getDoc(doc(db, "users", user.uid))).data();
    return { success: true, user, userData };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Déconnexion
 */
export async function deconnexion() {
  await signOut(auth);
  return { success: true };
}

/**
 * Observer l'état de connexion
 */
export function observerConnexion(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      callback(user, userDoc.exists() ? userDoc.data() : null);
    } else {
      callback(null, null);
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// 4. GESTION DES PRODUITS (VENDEURS)
// ═══════════════════════════════════════════════════════════════

/**
 * Ajouter un produit (vendeur uniquement)
 */
export async function ajouterProduit(vendeurId, produitData, imageFile) {
  try {
    let imageUrl = null;

    // Upload image si fournie
    if (imageFile) {
      const imageRef = ref(storage, `produits/${vendeurId}/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    // Créer le produit
    const produit = {
      name_fr: produitData.name_fr,
      name_en: produitData.name_en || produitData.name_fr,
      description_fr: produitData.description_fr,
      description_en: produitData.description_en || produitData.description_fr,
      prix: Number(produitData.prix),
      stock: Number(produitData.stock || 0),
      categorie: produitData.categorie,
      ville: produitData.ville,
      image: imageUrl,
      images: imageUrl ? [imageUrl] : [],
      vendeurId,
      actif: true,
      sponsorise: false,
      vues: 0,
      clics: 0,
      venteTotal: 0,
      note: 0,
      nombreAvis: 0,
      local: produitData.local || false,
      escrow: produitData.escrow !== false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "products"), produit);

    // Log tracking
    await enregistrerTracking(vendeurId, "produit_ajoute", docRef.id);

    return { success: true, produitId: docRef.id, produit };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Modifier un produit
 */
export async function modifierProduit(produitId, vendeurId, modifications, nouvelleImage) {
  try {
    const produitRef = doc(db, "products", produitId);
    const produitDoc = await getDoc(produitRef);

    if (!produitDoc.exists()) throw new Error("Produit introuvable");
    if (produitDoc.data().vendeurId !== vendeurId) throw new Error("Non autorisé");

    let imageUrl = produitDoc.data().image;
    if (nouvelleImage) {
      const imageRef = ref(storage, `produits/${vendeurId}/${Date.now()}_${nouvelleImage.name}`);
      const snapshot = await uploadBytes(imageRef, nouvelleImage);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    await updateDoc(produitRef, {
      ...modifications,
      image: imageUrl,
      updatedAt: serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Supprimer un produit
 */
export async function supprimerProduit(produitId, vendeurId) {
  try {
    const produitRef = doc(db, "products", produitId);
    const produitDoc = await getDoc(produitRef);

    if (!produitDoc.exists()) throw new Error("Produit introuvable");
    if (produitDoc.data().vendeurId !== vendeurId) throw new Error("Non autorisé");

    await deleteDoc(produitRef);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Récupérer tous les produits actifs
 */
export async function getProduits(filtres = {}) {
  try {
    let q = query(
      collection(db, "products"),
      where("actif", "==", true),
      orderBy("sponsorise", "desc"),
      orderBy("createdAt", "desc")
    );

    if (filtres.categorie) {
      q = query(q, where("categorie", "==", filtres.categorie));
    }
    if (filtres.ville) {
      q = query(q, where("ville", "==", filtres.ville));
    }
    if (filtres.vendeurId) {
      q = query(q, where("vendeurId", "==", filtres.vendeurId));
    }
    if (filtres.limite) {
      q = query(q, limit(filtres.limite));
    }

    const snap = await getDocs(q);
    const produits = [];
    snap.forEach(doc => produits.push({ id: doc.id, ...doc.data() }));

    return { success: true, produits };
  } catch (error) {
    return { success: false, error: error.message, produits: [] };
  }
}

/**
 * Récupérer les produits d'un vendeur
 */
export async function getProduitsVendeur(vendeurId) {
  try {
    const q = query(
      collection(db, "products"),
      where("vendeurId", "==", vendeurId),
      orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    const produits = [];
    snap.forEach(doc => produits.push({ id: doc.id, ...doc.data() }));
    return { success: true, produits };
  } catch (error) {
    return { success: false, error: error.message, produits: [] };
  }
}

/**
 * Observer les produits en temps réel
 */
export function observerProduits(callback, filtres = {}) {
  let q = query(
    collection(db, "products"),
    where("actif", "==", true),
    orderBy("sponsorise", "desc"),
    orderBy("createdAt", "desc"),
    limit(50)
  );

  return onSnapshot(q, (snap) => {
    const produits = [];
    snap.forEach(doc => produits.push({ id: doc.id, ...doc.data() }));
    callback(produits);
  });
}

// ═══════════════════════════════════════════════════════════════
// 5. COMMANDES
// ═══════════════════════════════════════════════════════════════

/**
 * Créer une commande
 */
export async function creerCommande(clientId, produits, adresseLivraison, modePaiement) {
  try {
    const total = produits.reduce((sum, p) => sum + (p.prix * p.quantite), 0);
    const commission = total * COMMISSION_RATE;
    const totalVendeur = total - commission;

    const commande = {
      clientId,
      produits,
      total,
      commission,
      totalVendeur,
      adresseLivraison,
      modePaiement,
      status: ORDER_STATUS.PENDING,
      paiementStatus: "en_attente",
      escrowActif: true,
      escrowMontant: total,
      livreurId: null,
      livraisonStatus: null,
      litigeOuvert: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      notes: []
    };

    const docRef = await addDoc(collection(db, "orders"), commande);

    // Notifier le vendeur
    for (const produit of produits) {
      await creerNotification(
        produit.vendeurId,
        "nouvelle_commande",
        `Nouvelle commande #${docRef.id.slice(-6)} reçue !`,
        { commandeId: docRef.id }
      );
    }

    return { success: true, commandeId: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Payer une commande (Escrow)
 */
export async function payerCommande(commandeId, clientId, montant, operateur) {
  try {
    const commandeRef = doc(db, "orders", commandeId);
    const commandeDoc = await getDoc(commandeRef);
    if (!commandeDoc.exists()) throw new Error("Commande introuvable");

    const commande = commandeDoc.data();
    if (commande.clientId !== clientId) throw new Error("Non autorisé");

    // Simuler paiement Mobile Money
    const paiementResult = await simulerPaiementMoMo(montant, operateur);
    if (!paiementResult.success) throw new Error("Paiement échoué");

    // Enregistrer le paiement
    const paiementRef = await addDoc(collection(db, "payments"), {
      commandeId,
      clientId,
      montant,
      operateur,
      reference: paiementResult.reference,
      status: "succes",
      escrowBloque: true,
      createdAt: serverTimestamp()
    });

    // Bloquer les fonds dans le wallet Yorix (escrow)
    await updateDoc(commandeRef, {
      status: ORDER_STATUS.PAID,
      paiementStatus: "paye",
      paiementId: paiementRef.id,
      paiementRef: paiementResult.reference,
      updatedAt: serverTimestamp()
    });

    // Notifier le vendeur
    for (const produit of commande.produits) {
      await updateDoc(doc(db, "products", produit.produitId), {
        stock: increment(-produit.quantite),
        venteTotal: increment(produit.quantite)
      });
      await creerNotification(
        produit.vendeurId,
        "paiement_recu",
        `Paiement reçu pour la commande #${commandeId.slice(-6)} — Fonds en Escrow`,
        { commandeId }
      );
    }

    return { success: true, paiementId: paiementRef.id, reference: paiementResult.reference };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Confirmer la réception (libère l'Escrow)
 */
export async function confirmerReception(commandeId, clientId) {
  try {
    await runTransaction(db, async (transaction) => {
      const commandeRef = doc(db, "orders", commandeId);
      const commandeDoc = await transaction.get(commandeRef);
      if (!commandeDoc.exists()) throw new Error("Commande introuvable");

      const commande = commandeDoc.data();
      if (commande.clientId !== clientId) throw new Error("Non autorisé");
      if (commande.status !== ORDER_STATUS.SHIPPED) throw new Error("Commande pas encore expédiée");

      // Libérer les fonds vers le vendeur
      for (const produit of commande.produits) {
        const walletVendeurRef = doc(db, "wallets", produit.vendeurId);
        const montantVendeur = (produit.prix * produit.quantite) * (1 - COMMISSION_RATE);

        transaction.update(walletVendeurRef, {
          solde: increment(montantVendeur),
          totalGagne: increment(montantVendeur)
        });

        // Notifier le vendeur
        await creerNotification(
          produit.vendeurId,
          "fonds_liberes",
          `Fonds libérés ! +${montantVendeur.toLocaleString()} FCFA sur votre wallet`,
          { commandeId }
        );
      }

      // Libérer les fonds du livreur si applicable
      if (commande.livreurId) {
        const fraisLivraison = 2500;
        transaction.update(doc(db, "wallets", commande.livreurId), {
          solde: increment(fraisLivraison),
          totalGagne: increment(fraisLivraison)
        });
      }

      // Mettre à jour la commande
      transaction.update(commandeRef, {
        status: ORDER_STATUS.DELIVERED,
        escrowActif: false,
        escrowMontant: 0,
        dateReception: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Récupérer les commandes d'un utilisateur
 */
export async function getCommandes(userId, role = "client") {
  try {
    const field = role === "vendeur" ? "produits" : "clientId";
    let q;

    if (role === "client") {
      q = query(
        collection(db, "orders"),
        where("clientId", "==", userId),
        orderBy("createdAt", "desc")
      );
    } else {
      // Pour vendeur, on récupère toutes les commandes et on filtre
      q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    }

    const snap = await getDocs(q);
    let commandes = [];
    snap.forEach(doc => {
      const data = { id: doc.id, ...doc.data() };
      if (role === "vendeur") {
        if (data.produits?.some(p => p.vendeurId === userId)) {
          commandes.push(data);
        }
      } else {
        commandes.push(data);
      }
    });

    return { success: true, commandes };
  } catch (error) {
    return { success: false, error: error.message, commandes: [] };
  }
}

// ═══════════════════════════════════════════════════════════════
// 6. PAIEMENT MOBILE MONEY (SIMULÉ)
// ═══════════════════════════════════════════════════════════════

/**
 * Simuler un paiement MTN MoMo / Orange Money
 * À remplacer par l'API réelle plus tard
 */
async function simulerPaiementMoMo(montant, operateur) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reference = `YX${Date.now()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
      resolve({
        success: true,
        reference,
        montant,
        operateur,
        timestamp: new Date().toISOString()
      });
    }, 2000);
  });
}

// ═══════════════════════════════════════════════════════════════
// 7. WALLET INTERNE
// ═══════════════════════════════════════════════════════════════

/**
 * Récupérer le wallet d'un utilisateur
 */
export async function getWallet(userId) {
  try {
    const walletDoc = await getDoc(doc(db, "wallets", userId));
    if (!walletDoc.exists()) return { success: false, error: "Wallet introuvable" };
    return { success: true, wallet: walletDoc.data() };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Retirer des fonds du wallet
 */
export async function retirerFonds(userId, montant, telephone, operateur) {
  try {
    const walletRef = doc(db, "wallets", userId);
    const walletDoc = await getDoc(walletRef);
    const wallet = walletDoc.data();

    if (wallet.solde < montant) throw new Error("Solde insuffisant");

    // Simuler le virement
    const virementResult = await simulerPaiementMoMo(montant, operateur);

    await updateDoc(walletRef, {
      solde: increment(-montant),
      totalRetire: increment(montant)
    });

    await addDoc(collection(db, "transactions"), {
      userId,
      type: "retrait",
      montant,
      telephone,
      operateur,
      reference: virementResult.reference,
      status: "succes",
      createdAt: serverTimestamp()
    });

    return { success: true, reference: virementResult.reference };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════════
// 8. LIVRAISON (TYPE UBER RIDE)
// ═══════════════════════════════════════════════════════════════

/**
 * Assigner un livreur à une commande
 */
export async function assignerLivreur(commandeId, livreurId) {
  try {
    await updateDoc(doc(db, "orders", commandeId), {
      livreurId,
      livraisonStatus: DELIVERY_STATUS.ACCEPTED,
      updatedAt: serverTimestamp()
    });

    // Créer l'entrée de livraison
    await addDoc(collection(db, "deliveries"), {
      commandeId,
      livreurId,
      status: DELIVERY_STATUS.ACCEPTED,
      position: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    await creerNotification(livreurId, "nouvelle_livraison",
      `Nouvelle livraison assignée #${commandeId.slice(-6)}`, { commandeId }
    );

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Mettre à jour la position du livreur (GPS)
 */
export async function mettreAjourPosition(livreurId, commandeId, latitude, longitude) {
  try {
    const q = query(
      collection(db, "deliveries"),
      where("commandeId", "==", commandeId),
      where("livreurId", "==", livreurId)
    );
    const snap = await getDocs(q);

    if (!snap.empty) {
      await updateDoc(snap.docs[0].ref, {
        position: { latitude, longitude, timestamp: serverTimestamp() },
        updatedAt: serverTimestamp()
      });
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Marquer une commande comme expédiée
 */
export async function marquerExpediee(commandeId, vendeurId) {
  try {
    const commandeDoc = await getDoc(doc(db, "orders", commandeId));
    const commande = commandeDoc.data();

    const estVendeur = commande.produits?.some(p => p.vendeurId === vendeurId);
    if (!estVendeur) throw new Error("Non autorisé");

    await updateDoc(doc(db, "orders", commandeId), {
      status: ORDER_STATUS.SHIPPED,
      livraisonStatus: DELIVERY_STATUS.IN_PROGRESS,
      dateExpedition: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    await creerNotification(
      commande.clientId,
      "commande_expediee",
      `Votre commande #${commandeId.slice(-6)} est en route ! 🚚`,
      { commandeId }
    );

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════════
// 9. MESSAGERIE INTERNE (ANTI-CONTOURNEMENT)
// ═══════════════════════════════════════════════════════════════

/**
 * Filtrer un message pour détecter les tentatives de contournement
 */
function filtrerMessage(texte) {
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(texte)) {
      return {
        bloque: true,
        raison: "Contact externe détecté",
        texteNettoye: texte.replace(pattern, "***")
      };
    }
  }
  return { bloque: false, texteNettoye: texte };
}

/**
 * Envoyer un message interne
 */
export async function envoyerMessage(expediteurId, destinataireId, texte, commandeId = null) {
  try {
    const filtre = filtrerMessage(texte);

    // Logger si tentative de contournement
    if (filtre.bloque) {
      await addDoc(collection(db, "fraud_logs"), {
        type: "tentative_contournement",
        userId: expediteurId,
        message: texte,
        raison: filtre.raison,
        timestamp: serverTimestamp()
      });

      // Avertir l'utilisateur
      await creerNotification(
        expediteurId,
        "avertissement",
        "⚠️ Message bloqué : les contacts externes sont interdits sur Yorix. Utilisez uniquement la messagerie interne.",
        {}
      );

      return {
        success: false,
        bloque: true,
        message: "Message bloqué : partage de contacts externes interdit sur Yorix."
      };
    }

    // Créer une conversation si elle n'existe pas
    const conversationId = [expediteurId, destinataireId].sort().join("_") +
      (commandeId ? `_${commandeId}` : "");

    const message = {
      conversationId,
      expediteurId,
      destinataireId,
      texte: filtre.texteNettoye,
      commandeId,
      lu: false,
      createdAt: serverTimestamp()
    };

    await addDoc(collection(db, "messages"), message);

    // Notifier le destinataire
    await creerNotification(
      destinataireId,
      "nouveau_message",
      "Vous avez un nouveau message sur Yorix",
      { expediteurId, conversationId }
    );

    return { success: true, conversationId };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Récupérer les messages d'une conversation
 */
export async function getMessages(conversationId, callback) {
  const q = query(
    collection(db, "messages"),
    where("conversationId", "==", conversationId),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snap) => {
    const messages = [];
    snap.forEach(doc => messages.push({ id: doc.id, ...doc.data() }));
    callback(messages);
  });
}

/**
 * Marquer les messages comme lus
 */
export async function marquerMessagesLus(conversationId, userId) {
  try {
    const q = query(
      collection(db, "messages"),
      where("conversationId", "==", conversationId),
      where("destinataireId", "==", userId),
      where("lu", "==", false)
    );
    const snap = await getDocs(q);
    const batch = writeBatch(db);
    snap.forEach(doc => batch.update(doc.ref, { lu: true }));
    await batch.commit();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════════
// 10. SYSTÈME DE LITIGES
// ═══════════════════════════════════════════════════════════════

/**
 * Ouvrir un litige
 */
export async function ouvrirLitige(commandeId, clientId, raison, description) {
  try {
    const commandeRef = doc(db, "orders", commandeId);
    const commandeDoc = await getDoc(commandeRef);
    const commande = commandeDoc.data();

    if (commande.clientId !== clientId) throw new Error("Non autorisé");
    if (commande.litigeOuvert) throw new Error("Un litige est déjà ouvert");

    await updateDoc(commandeRef, {
      status: ORDER_STATUS.DISPUTE,
      litigeOuvert: true,
      updatedAt: serverTimestamp()
    });

    const litigeRef = await addDoc(collection(db, "disputes"), {
      commandeId,
      clientId,
      vendeurId: commande.produits[0]?.vendeurId,
      raison,
      description,
      status: "ouvert",
      decisionAdmin: null,
      montantBloque: commande.total,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // Notifier l'admin
    await creerNotificationAdmin(
      "nouveau_litige",
      `Nouveau litige ouvert pour la commande #${commandeId.slice(-6)}`,
      { commandeId, litigeId: litigeRef.id }
    );

    // Notifier le vendeur
    for (const produit of commande.produits) {
      await creerNotification(
        produit.vendeurId,
        "litige_ouvert",
        `Un litige a été ouvert pour la commande #${commandeId.slice(-6)}`,
        { commandeId }
      );
    }

    return { success: true, litigeId: litigeRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Résoudre un litige (Admin uniquement)
 */
export async function resoudreLitige(litigeId, adminId, decision, commentaire) {
  try {
    // Vérifier que c'est bien un admin
    const adminDoc = await getDoc(doc(db, "users", adminId));
    if (adminDoc.data()?.role !== ROLES.ADMIN) throw new Error("Non autorisé");

    const litigeRef = doc(db, "disputes", litigeId);
    const litigeDoc = await getDoc(litigeRef);
    const litige = litigeDoc.data();

    await runTransaction(db, async (transaction) => {
      // Décision : "client" = remboursement, "vendeur" = libérer fonds
      if (decision === "client") {
        // Rembourser le client
        transaction.update(doc(db, "wallets", litige.clientId), {
          solde: increment(litige.montantBloque),
        });
        await creerNotification(litige.clientId, "remboursement",
          `Litige résolu en votre faveur. +${litige.montantBloque.toLocaleString()} FCFA remboursé`, {});
      } else if (decision === "vendeur") {
        // Libérer les fonds au vendeur
        const montantVendeur = litige.montantBloque * (1 - COMMISSION_RATE);
        transaction.update(doc(db, "wallets", litige.vendeurId), {
          solde: increment(montantVendeur),
          totalGagne: increment(montantVendeur)
        });
        await creerNotification(litige.vendeurId, "fonds_liberes",
          `Litige résolu en votre faveur. +${montantVendeur.toLocaleString()} FCFA`, {});
      }

      // Mettre à jour le litige
      transaction.update(litigeRef, {
        status: "resolu",
        decisionAdmin: decision,
        commentaireAdmin: commentaire,
        adminId,
        dateResolution: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Mettre à jour la commande
      transaction.update(doc(db, "orders", litige.commandeId), {
        status: decision === "client" ? ORDER_STATUS.REFUNDED : ORDER_STATUS.DELIVERED,
        litigeOuvert: false,
        updatedAt: serverTimestamp()
      });
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════════
// 11. SYSTÈME DE RÉPUTATION / AVIS
// ═══════════════════════════════════════════════════════════════

/**
 * Laisser un avis (après livraison uniquement)
 */
export async function laisserAvis(commandeId, clientId, cibleId, cibleType, note, commentaire) {
  try {
    const commandeDoc = await getDoc(doc(db, "orders", commandeId));
    const commande = commandeDoc.data();

    if (commande.clientId !== clientId) throw new Error("Non autorisé");
    if (commande.status !== ORDER_STATUS.DELIVERED) throw new Error("La commande doit être livrée");

    // Vérifier qu'il n'a pas déjà mis un avis
    const avisExist = query(
      collection(db, "reviews"),
      where("commandeId", "==", commandeId),
      where("clientId", "==", clientId),
      where("cibleId", "==", cibleId)
    );
    const existSnap = await getDocs(avisExist);
    if (!existSnap.empty) throw new Error("Vous avez déjà laissé un avis");

    // Créer l'avis
    await addDoc(collection(db, "reviews"), {
      commandeId,
      clientId,
      cibleId,
      cibleType, // "vendeur", "produit", "livreur"
      note: Number(note),
      commentaire,
      verifie: true, // Avis vérifié car lié à une vraie commande
      createdAt: serverTimestamp()
    });

    // Recalculer la note de la cible
    const collection_name = cibleType === "produit" ? "products" : "users";
    const avisQuery = query(
      collection(db, "reviews"),
      where("cibleId", "==", cibleId),
      where("cibleType", "==", cibleType)
    );
    const avisSnap = await getDocs(avisQuery);
    let totalNote = 0;
    let nbAvis = 0;
    avisSnap.forEach(d => { totalNote += d.data().note; nbAvis++; });

    await updateDoc(doc(db, collection_name, cibleId), {
      note: totalNote / nbAvis,
      nombreAvis: nbAvis
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════════
// 12. PROMOTIONS VENDEUR
// ═══════════════════════════════════════════════════════════════

/**
 * Sponsoriser un produit
 */
export async function sponsoriserProduit(produitId, vendeurId, dureeJours, montant) {
  try {
    const walletDoc = await getDoc(doc(db, "wallets", vendeurId));
    const wallet = walletDoc.data();

    if (wallet.solde < montant) throw new Error("Solde wallet insuffisant");

    const dateExpiration = new Date();
    dateExpiration.setDate(dateExpiration.getDate() + dureeJours);

    await updateDoc(doc(db, "products", produitId), {
      sponsorise: true,
      sponsoriseJusqu: dateExpiration,
      updatedAt: serverTimestamp()
    });

    await updateDoc(doc(db, "wallets", vendeurId), {
      solde: increment(-montant)
    });

    await addDoc(collection(db, "promotions"), {
      produitId,
      vendeurId,
      dureeJours,
      montant,
      dateDebut: serverTimestamp(),
      dateFin: dateExpiration,
      actif: true
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════════
// 13. TRACKING & RECOMMANDATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Enregistrer une action utilisateur
 */
export async function enregistrerTracking(userId, action, cibleId, meta = {}) {
  try {
    await addDoc(collection(db, "tracking"), {
      userId,
      action, // "vue_produit", "clic_produit", "achat", "recherche"
      cibleId,
      meta,
      timestamp: serverTimestamp()
    });

    // Incrémenter les compteurs sur le produit
    if (action === "vue_produit") {
      await updateDoc(doc(db, "products", cibleId), { vues: increment(1) });
    } else if (action === "clic_produit") {
      await updateDoc(doc(db, "products", cibleId), { clics: increment(1) });
    }
  } catch (error) {
    // Silencieux pour le tracking
    console.log("Tracking error:", error.message);
  }
}

/**
 * Obtenir les produits recommandés
 */
export async function getRecommandations(userId, limite = 10) {
  try {
    // Récupérer les produits les plus vus/vendus
    const q = query(
      collection(db, "products"),
      where("actif", "==", true),
      orderBy("vues", "desc"),
      limit(limite)
    );

    const snap = await getDocs(q);
    const produits = [];
    snap.forEach(doc => produits.push({ id: doc.id, ...doc.data() }));

    return { success: true, produits };
  } catch (error) {
    return { success: false, produits: [] };
  }
}

// ═══════════════════════════════════════════════════════════════
// 14. NOTIFICATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Créer une notification
 */
async function creerNotification(userId, type, message, data = {}) {
  try {
    await addDoc(collection(db, "notifications"), {
      userId,
      type,
      message,
      data,
      lu: false,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.log("Notification error:", error.message);
  }
}

/**
 * Créer une notification admin
 */
async function creerNotificationAdmin(type, message, data = {}) {
  try {
    // Récupérer tous les admins
    const adminsQuery = query(
      collection(db, "users"),
      where("role", "==", ROLES.ADMIN)
    );
    const adminsSnap = await getDocs(adminsQuery);

    const batch = writeBatch(db);
    adminsSnap.forEach(adminDoc => {
      const notifRef = doc(collection(db, "notifications"));
      batch.set(notifRef, {
        userId: adminDoc.id,
        type,
        message,
        data,
        lu: false,
        createdAt: serverTimestamp()
      });
    });
    await batch.commit();
  } catch (error) {
    console.log("Admin notification error:", error.message);
  }
}

/**
 * Observer les notifications en temps réel
 */
export function observerNotifications(userId, callback) {
  const q = query(
    collection(db, "notifications"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(20)
  );

  return onSnapshot(q, (snap) => {
    const notifs = [];
    snap.forEach(doc => notifs.push({ id: doc.id, ...doc.data() }));
    callback(notifs);
  });
}

/**
 * Marquer une notification comme lue
 */
export async function marquerNotifLue(notifId) {
  await updateDoc(doc(db, "notifications", notifId), { lu: true });
}

// ═══════════════════════════════════════════════════════════════
// 15. DASHBOARD ADMIN
// ═══════════════════════════════════════════════════════════════

/**
 * Récupérer les statistiques globales (admin)
 */
export async function getStatsAdmin(adminId) {
  try {
    const adminDoc = await getDoc(doc(db, "users", adminId));
    if (adminDoc.data()?.role !== ROLES.ADMIN) throw new Error("Non autorisé");

    const [usersSnap, produitsSnap, commandesSnap, litigesSnap, fraudSnap] = await Promise.all([
      getDocs(collection(db, "users")),
      getDocs(query(collection(db, "products"), where("actif", "==", true))),
      getDocs(collection(db, "orders")),
      getDocs(query(collection(db, "disputes"), where("status", "==", "ouvert"))),
      getDocs(collection(db, "fraud_logs"))
    ]);

    let totalRevenu = 0;
    let commandesLivrees = 0;
    commandesSnap.forEach(doc => {
      const data = doc.data();
      if (data.status === ORDER_STATUS.DELIVERED) {
        totalRevenu += data.commission || 0;
        commandesLivrees++;
      }
    });

    const stats = {
      totalUtilisateurs: usersSnap.size,
      totalProduits: produitsSnap.size,
      totalCommandes: commandesSnap.size,
      commandesLivrees,
      litigesOuverts: litigesSnap.size,
      alertesFraude: fraudSnap.size,
      revenuYorix: totalRevenu,
      vendeurs: 0,
      clients: 0,
      livreurs: 0
    };

    usersSnap.forEach(doc => {
      const role = doc.data().role;
      if (role === "vendeur") stats.vendeurs++;
      else if (role === "client") stats.clients++;
      else if (role === "livreur") stats.livreurs++;
    });

    return { success: true, stats };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Bloquer / débloquer un utilisateur (admin)
 */
export async function bloquerUtilisateur(adminId, userId, bloquer = true, raison = "") {
  try {
    const adminDoc = await getDoc(doc(db, "users", adminId));
    if (adminDoc.data()?.role !== ROLES.ADMIN) throw new Error("Non autorisé");

    await updateDoc(doc(db, "users", userId), {
      actif: !bloquer,
      raisonBlocage: bloquer ? raison : null,
      dateBlocage: bloquer ? serverTimestamp() : null,
      bloqueParAdmin: bloquer ? adminId : null
    });

    await addDoc(collection(db, "logs"), {
      type: bloquer ? "utilisateur_bloque" : "utilisateur_debloque",
      adminId,
      userId,
      raison,
      timestamp: serverTimestamp()
    });

    if (bloquer) {
      await creerNotification(userId, "compte_bloque",
        `Votre compte a été suspendu. Raison : ${raison}. Contactez support@yorix.cm`, {});
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Récupérer tous les utilisateurs (admin)
 */
export async function getUtilisateursAdmin(adminId, filtreRole = null) {
  try {
    const adminDoc = await getDoc(doc(db, "users", adminId));
    if (adminDoc.data()?.role !== ROLES.ADMIN) throw new Error("Non autorisé");

    let q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    if (filtreRole) {
      q = query(collection(db, "users"), where("role", "==", filtreRole), orderBy("createdAt", "desc"));
    }

    const snap = await getDocs(q);
    const utilisateurs = [];
    snap.forEach(doc => utilisateurs.push({ id: doc.id, ...doc.data() }));

    return { success: true, utilisateurs };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Récupérer les logs de fraude (admin)
 */
export async function getFraudLogs(adminId) {
  try {
    const adminDoc = await getDoc(doc(db, "users", adminId));
    if (adminDoc.data()?.role !== ROLES.ADMIN) throw new Error("Non autorisé");

    const q = query(
      collection(db, "fraud_logs"),
      orderBy("timestamp", "desc"),
      limit(100)
    );
    const snap = await getDocs(q);
    const logs = [];
    snap.forEach(doc => logs.push({ id: doc.id, ...doc.data() }));

    return { success: true, logs };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Supprimer un produit (admin)
 */
export async function supprimerProduitAdmin(adminId, produitId, raison) {
  try {
    const adminDoc = await getDoc(doc(db, "users", adminId));
    if (adminDoc.data()?.role !== ROLES.ADMIN) throw new Error("Non autorisé");

    const produitDoc = await getDoc(doc(db, "products", produitId));
    const produit = produitDoc.data();

    await updateDoc(doc(db, "products", produitId), {
      actif: false,
      supprimePar: adminId,
      raisonSuppression: raison,
      dateSuppression: serverTimestamp()
    });

    await creerNotification(
      produit.vendeurId,
      "produit_supprime",
      `Votre produit "${produit.name_fr}" a été retiré. Raison : ${raison}`,
      { produitId }
    );

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════════
// 16. CRÉER UN COMPTE ADMIN PAR DÉFAUT
// ═══════════════════════════════════════════════════════════════

/**
 * Initialiser le compte admin principal Yorix
 * À appeler UNE SEULE FOIS au premier lancement
 */
export async function initialiserAdmin() {
  try {
    const EMAIL_ADMIN = "admin@yorix.cm";
    const PASSWORD_ADMIN = "YorixAdmin2026!";

    const userCredential = await createUserWithEmailAndPassword(auth, EMAIL_ADMIN, PASSWORD_ADMIN);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      nom: "Administrateur Yorix",
      email: EMAIL_ADMIN,
      telephone: "+237696565654",
      role: ROLES.ADMIN,
      langue: "fr",
      actif: true,
      verifie: true,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      avatar: null,
      note: 5,
      nombreAvis: 0,
      wallet: 0,
    });

    await setDoc(doc(db, "wallets", user.uid), {
      userId: user.uid,
      solde: 0,
      totalGagne: 0,
      devise: "FCFA",
      createdAt: serverTimestamp()
    });

    console.log("✅ Compte admin créé !");
    console.log("Email :", EMAIL_ADMIN);
    console.log("Mot de passe :", PASSWORD_ADMIN);
    console.log("UID :", user.uid);
    console.log("⚠️ CHANGEZ LE MOT DE PASSE APRÈS LA PREMIÈRE CONNEXION !");

    return { success: true, uid: user.uid, email: EMAIL_ADMIN };
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      return { success: false, error: "Admin déjà créé" };
    }
    return { success: false, error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════════
// 17. GESTION DES UTILISATEURS
// ═══════════════════════════════════════════════════════════════

/**
 * Récupérer le profil d'un utilisateur
 */
export async function getProfil(userId) {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) return { success: false, error: "Utilisateur introuvable" };
    return { success: true, profil: { id: userDoc.id, ...userDoc.data() } };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Mettre à jour le profil
 */
export async function mettreAjourProfil(userId, modifications, avatarFile = null) {
  try {
    let avatarUrl = null;
    if (avatarFile) {
      const avatarRef = ref(storage, `avatars/${userId}/${Date.now()}`);
      const snap = await uploadBytes(avatarRef, avatarFile);
      avatarUrl = await getDownloadURL(snap.ref);
    }

    const updates = { ...modifications, updatedAt: serverTimestamp() };
    if (avatarUrl) updates.avatar = avatarUrl;

    await updateDoc(doc(db, "users", userId), updates);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ─────────────────────────────────────────
// EXPORTS PRINCIPAUX
// ─────────────────────────────────────────
export {
  auth,
  db,
  storage,
  ROLES,
  ORDER_STATUS,
  DELIVERY_STATUS,
  COMMISSION_RATE
};

export default {
  // Auth
  inscrireUtilisateur,
  connecterUtilisateur,
  connexionGoogle,
  deconnexion,
  observerConnexion,
  // Produits
  ajouterProduit,
  modifierProduit,
  supprimerProduit,
  getProduits,
  getProduitsVendeur,
  observerProduits,
  // Commandes
  creerCommande,
  payerCommande,
  confirmerReception,
  getCommandes,
  marquerExpediee,
  // Wallet
  getWallet,
  retirerFonds,
  // Livraison
  assignerLivreur,
  mettreAjourPosition,
  // Messages
  envoyerMessage,
  getMessages,
  marquerMessagesLus,
  // Litiges
  ouvrirLitige,
  resoudreLitige,
  // Avis
  laisserAvis,
  // Promotions
  sponsoriserProduit,
  // Tracking
  enregistrerTracking,
  getRecommandations,
  // Notifications
  observerNotifications,
  marquerNotifLue,
  // Admin
  getStatsAdmin,
  bloquerUtilisateur,
  getUtilisateursAdmin,
  getFraudLogs,
  supprimerProduitAdmin,
  initialiserAdmin,
  // Profil
  getProfil,
  mettreAjourProfil,
};
