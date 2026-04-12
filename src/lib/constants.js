export const CATS = ["Téléphones","Mode","Alimentation","Maison","Agricole","Beauté","BTP","Automobile","Éducation","Services"];

export const CITIES = ["Toutes les villes","Douala","Yaoundé","Bafoussam","Bamenda","Garoua","Kribi","Ngaoundéré"];

export const ROLE_LABELS = { buyer:"🛍️ Acheteur", seller:"🏪 Vendeur", delivery:"🚚 Livreur", provider:"👷 Prestataire" };

export const DELIVERY_STATUSES = { pending:"⏳ En attente", en_cours:"🚚 En cours", livre:"✅ Livré", echec:"❌ Échoué" };

export const ESCROW_STATUSES = { pending:"⏳ En attente", securise:"🔐 Sécurisé", libere:"✅ Libéré", rembourse:"↩️ Remboursé" };

export const PREST_DATA = [
  {emoji:"🔨",name:"Claude Mbassi",meta:"Plombier · Douala",tags:["Plomberie","Sanitaire"],prix:"15 000 FCFA/h",note:4.9,avis:87},
  {emoji:"⚡",name:"Électro Bertrand",meta:"Électricien · Yaoundé",tags:["Électricité","Installation"],prix:"12 000 FCFA/h",note:4.8,avis:124},
  {emoji:"🎨",name:"Raissa Design",meta:"Graphiste · Douala",tags:["Logo","Flyer"],prix:"25 000 FCFA/projet",note:5.0,avis:56},
  {emoji:"📸",name:"PhotoCam Pro",meta:"Photographe · Kribi",tags:["Mariage","Portrait"],prix:"50 000 FCFA/jour",note:4.9,avis:203},
  {emoji:"🧹",name:"CleanPro237",meta:"Nettoyage · Douala",tags:["Ménage","Bureaux"],prix:"8 000 FCFA/h",note:4.6,avis:312},
  {emoji:"💻",name:"DevCam Tech",meta:"Développeur · Yaoundé",tags:["Site web","App"],prix:"200 000 FCFA/projet",note:4.8,avis:41},
];

export const BLOG_DATA = [
  {emoji:"📈",cat:"Business",title:"Comment vendre sur Yorix en 2026",excerpt:"Tout ce qu'il faut savoir pour démarrer votre boutique.",date:"22 mars",read:"5 min"},
  {emoji:"🌿",cat:"Local",title:"Les 10 produits camerounais les plus vendus",excerpt:"Beurre de karité, pagne wax, cacao...",date:"19 mars",read:"3 min"},
  {emoji:"💳",cat:"Paiement",title:"MTN MoMo vs Orange Money",excerpt:"Comparatif complet des deux systèmes.",date:"16 mars",read:"4 min"},
  {emoji:"🚚",cat:"Livraison",title:"Suivi commande en temps réel",excerpt:"Yorix Ride vous permet de suivre votre livreur.",date:"12 mars",read:"2 min"},
  {emoji:"🔐",cat:"Sécurité",title:"Escrow Yorix : votre argent est-il protégé ?",excerpt:"On répond à toutes vos questions.",date:"8 mars",read:"6 min"},
  {emoji:"👷",cat:"Prestataires",title:"Trouver un électricien fiable à Douala",excerpt:"Comment choisir le bon prestataire.",date:"5 mars",read:"4 min"},
];

export const COURSES_DATA = [
  {emoji:"🏪",title:"Créer sa boutique en 1h",level:"Débutant",lc:"level-deb",duree:"1h30",apprenants:"2.4K",prix:"Gratuit",bg:"#e8f7ee"},
  {emoji:"📸",title:"Photographier ses produits",level:"Débutant",lc:"level-deb",duree:"2h",apprenants:"1.8K",prix:"Gratuit",bg:"#fff3e0"},
  {emoji:"📊",title:"Analyser ses ventes",level:"Intermédiaire",lc:"level-int",duree:"3h",apprenants:"920",prix:"5 000 FCFA",bg:"#e3f2fd"},
  {emoji:"💡",title:"Marketing digital Cameroun",level:"Intermédiaire",lc:"level-int",duree:"4h",apprenants:"640",prix:"8 000 FCFA",bg:"#fce4ec"},
  {emoji:"🤝",title:"Négocier avec les fournisseurs",level:"Avancé",lc:"level-adv",duree:"2h30",apprenants:"380",prix:"10 000 FCFA",bg:"#ede7f6"},
  {emoji:"🚀",title:"Scaler vers le B2B",level:"Avancé",lc:"level-adv",duree:"5h",apprenants:"210",prix:"15 000 FCFA",bg:"#e0f2f1"},
];

export const REWARDS_DATA = [
  {icon:"🎁",name:"Bon 5 000 FCFA",pts:500},
  {icon:"🚚",name:"Livraison gratuite x3",pts:300},
  {icon:"⭐",name:"Statut VIP Yorix",pts:1000},
  {icon:"📱",name:"-20% téléphones",pts:400},
  {icon:"☕",name:"Pack café 500g",pts:200},
  {icon:"🎓",name:"Cours Academy offert",pts:350},
];
