# 🚀 YORIX CM — GUIDE D'INSTALLATION BACKEND

## 📁 Fichiers à utiliser
- `firebase-backend.js` → Tout le backend Firebase
- `firestore.rules` → Règles de sécurité
- `Yorix.jsx` → Ton frontend React

---

## ⚙️ ÉTAPE 1 — Installer Firebase dans ton projet

Dans le terminal de ton projet, tape :
```
npm install firebase
```

---

## ⚙️ ÉTAPE 2 — Activer Firestore Database

1. Dans ta console Firebase → clique "Bases de données et..."
2. Clique "Firestore Database"
3. Clique "Créer une base de données"
4. Choisis "Mode test" → Continuer
5. Choisis la région "europe-west3" → Activer

---

## ⚙️ ÉTAPE 3 — Appliquer les règles de sécurité

1. Dans Firestore → clique l'onglet "Règles"
2. Copie tout le contenu de `firestore.rules`
3. Colle-le dans l'éditeur
4. Clique "Publier"

---

## ⚙️ ÉTAPE 4 — Activer Firebase Storage

1. Dans le menu → "Hébergement et sans..."
2. Clique "Storage"
3. Clique "Commencer" → Mode test → Terminer

---

## ⚙️ ÉTAPE 5 — Créer le compte Admin

Dans ton fichier principal, appelle UNE SEULE FOIS :
```javascript
import { initialiserAdmin } from './firebase-backend.js';
await initialiserAdmin();
```

Cela crée :
- Email : admin@yorix.cm
- Mot de passe : YorixAdmin2026!
- ⚠️ CHANGEZ LE MOT DE PASSE APRÈS !

---

## 📋 UTILISATION — EXEMPLES

### Inscription d'un vendeur
```javascript
import YorixBackend from './firebase-backend.js';

const result = await YorixBackend.inscrireUtilisateur(
  "vendeur@gmail.com",
  "motdepasse123",
  "Jean Dupont",
  "696565654",
  "vendeur",
  "fr"
);
```

### Ajouter un produit
```javascript
const result = await YorixBackend.ajouterProduit(
  vendeurId,
  {
    name_fr: "iPhone 14 128GB",
    name_en: "iPhone 14 128GB",
    description_fr: "Excellent état, livré avec accessoires",
    prix: 285000,
    stock: 5,
    categorie: "Téléphones",
    ville: "Douala",
    local: false,
    escrow: true
  },
  imageFile // Fichier image optionnel
);
```

### Créer une commande
```javascript
const result = await YorixBackend.creerCommande(
  clientId,
  [{ produitId: "xxx", vendeurId: "yyy", prix: 285000, quantite: 1, nom: "iPhone 14" }],
  { ville: "Douala", quartier: "Akwa", telephone: "696565654" },
  "mtn_momo"
);
```

### Payer une commande
```javascript
const result = await YorixBackend.payerCommande(
  commandeId,
  clientId,
  287500, // total + livraison
  "mtn_momo"
);
```

### Envoyer un message sécurisé
```javascript
const result = await YorixBackend.envoyerMessage(
  expediteurId,
  destinataireId,
  "Bonjour, est-ce que le produit est disponible ?",
  commandeId
);
// Si le message contient un numéro de téléphone,
// il sera automatiquement bloqué et loggé !
```

---

## 🔐 COMPTES DE TEST

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Admin | admin@yorix.cm | YorixAdmin2026! |
| Vendeur | vendeur@yorix.cm | Test123! |
| Client | client@yorix.cm | Test123! |
| Livreur | livreur@yorix.cm | Test123! |

---

## 📞 Support
- Email : support@yorix.cm
- WhatsApp : +237 696 56 56 54
