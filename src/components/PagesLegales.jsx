// ═══════════════════════════════════════════════════════════════
// ✅ PAGES LÉGALES — CGV, Mentions légales, Confidentialité
// ═══════════════════════════════════════════════════════════════
export function PagesLegales({ type, goPage }) {
  const sections = {
    cgv: {
      title: "📜 Conditions Générales de Vente",
      updated: "Dernière mise à jour : 16 avril 2026",
      content: [
        { h: "1. Objet", p: "Les présentes Conditions Générales de Vente (CGV) régissent les relations entre Yorix CM, société camerounaise immatriculée au Registre du Commerce de Douala (RC DOUALA/2026/B237), et toute personne effectuant un achat sur la plateforme www.yorix.cm." },
        { h: "2. Produits et services", p: "Yorix CM est une marketplace mettant en relation des vendeurs indépendants camerounais et des acheteurs. Les produits vendus sont sous la responsabilité de leurs vendeurs respectifs. Yorix CM assure la sécurité des transactions via son système Escrow." },
        { h: "3. Commande", p: "La commande est validée après paiement complet (MTN Mobile Money, Orange Money, ou paiement à la livraison selon la zone). Un email de confirmation est envoyé automatiquement. L'acheteur peut suivre sa commande depuis son espace personnel." },
        { h: "4. Prix et paiement", p: "Les prix sont indiqués en Francs CFA (FCFA) toutes taxes comprises. Les moyens de paiement acceptés sont : MTN Mobile Money, Orange Money, carte bancaire et paiement à la livraison (cash) dans certaines zones. Yorix CM prélève une commission de 5% sur chaque vente, incluse dans le prix affiché." },
        { h: "5. Livraison", p: "Les délais de livraison varient selon la zone : 20 minutes à 2 heures pour les livraisons intra-ville à Douala et Yaoundé, 1 à 3 jours pour les livraisons inter-villes. Les frais de livraison sont calculés selon la distance et le poids du colis." },
        { h: "6. Escrow et protection acheteur", p: "Le paiement est bloqué par Yorix CM jusqu'à la confirmation de réception du produit par l'acheteur. En cas de litige, Yorix CM arbitre et rembourse l'acheteur sous 48h si le vendeur est en tort." },
        { h: "7. Droit de rétractation", p: "Conformément au droit camerounais, l'acheteur dispose d'un délai de 7 jours à compter de la réception du produit pour exercer son droit de rétractation, sauf pour les produits périssables, personnalisés ou descellés pour des raisons d'hygiène." },
        { h: "8. Garanties", p: "Tous les produits vendus sur Yorix CM bénéficient de la garantie légale de conformité. Les produits électroniques et électroménagers bénéficient d'une garantie minimum de 6 mois, sauf mention contraire du vendeur." },
        { h: "9. Responsabilité", p: "Yorix CM agit en qualité d'intermédiaire. La responsabilité des produits vendus incombe aux vendeurs. Yorix CM ne saurait être tenu responsable des dommages indirects résultant de l'utilisation des produits." },
        { h: "10. Litiges", p: "Tout litige sera soumis en priorité à une médiation amiable via le support Yorix CM (support@yorix.cm ou WhatsApp +237 696 56 56 54). À défaut de résolution, les tribunaux de Douala seront seuls compétents." },
      ],
    },
    mentions: {
      title: "📋 Mentions Légales",
      updated: "Dernière mise à jour : 16 avril 2026",
      content: [
        { h: "Éditeur du site", p: "Yorix CM — Société commerciale de droit camerounais\nRegistre du Commerce : DOUALA/2026/B237\nSiège social : Akwa, Douala, Cameroun\nTéléphone : +237 696 56 56 54\nEmail : support@yorix.cm\nSite : www.yorix.cm" },
        { h: "Directeur de la publication", p: "La direction de Yorix CM est responsable de la publication du site et de son contenu éditorial." },
        { h: "Hébergement", p: "Le site yorix.cm est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. La base de données est hébergée par Supabase Inc. Les images sont stockées sur Cloudinary." },
        { h: "Propriété intellectuelle", p: "L'ensemble des éléments du site (textes, logos, images, vidéos, code source) sont la propriété exclusive de Yorix CM ou de ses partenaires. Toute reproduction, représentation, modification ou adaptation totale ou partielle est interdite sans autorisation écrite préalable." },
        { h: "Marque Yorix", p: "« Yorix » est une marque déposée. Son utilisation sans autorisation expose à des poursuites judiciaires." },
        { h: "Cookies", p: "Le site utilise des cookies techniques nécessaires au fonctionnement de la plateforme (authentification, panier, préférences). Des cookies d'analyse peuvent être utilisés pour améliorer l'expérience utilisateur. Vous pouvez les refuser via les paramètres de votre navigateur." },
        { h: "Données personnelles", p: "Vos données personnelles sont collectées et traitées conformément à notre Politique de Confidentialité. Vous disposez d'un droit d'accès, de rectification et de suppression en écrivant à support@yorix.cm." },
        { h: "Contact", p: "Pour toute question : support@yorix.cm\nWhatsApp : +237 696 56 56 54\nAdresse : Akwa, Douala, Cameroun" },
      ],
    },
    confidentialite: {
      title: "🔒 Politique de Confidentialité",
      updated: "Dernière mise à jour : 16 avril 2026",
      content: [
        { h: "1. Introduction", p: "Yorix CM s'engage à protéger la vie privée de ses utilisateurs. Cette politique décrit comment nous collectons, utilisons et protégeons vos données personnelles." },
        { h: "2. Données collectées", p: "Nous collectons les données suivantes :\n• Identité : nom, prénom, email, téléphone\n• Adresse de livraison\n• Historique de commandes et préférences\n• Données de paiement (non stockées, traitées par les opérateurs mobile)\n• Données techniques : adresse IP, type de navigateur, pages visitées" },
        { h: "3. Finalités du traitement", p: "Vos données sont utilisées pour :\n• Traiter vos commandes et assurer la livraison\n• Vous contacter concernant vos achats\n• Améliorer nos services et votre expérience\n• Vous envoyer des offres (avec votre consentement)\n• Respecter nos obligations légales et fiscales" },
        { h: "4. Partage des données", p: "Vos données sont partagées uniquement avec :\n• Les vendeurs concernés par vos commandes (nom, téléphone, adresse)\n• Les livreurs pour assurer la livraison\n• Les opérateurs de paiement mobile (MTN MoMo, Orange Money)\n• Les autorités légales sur réquisition judiciaire\n\nNous ne vendons jamais vos données à des tiers." },
        { h: "5. Durée de conservation", p: "Vos données de compte sont conservées tant que votre compte est actif. Les données de commande sont conservées 10 ans à des fins comptables et légales. Vous pouvez demander la suppression de votre compte à tout moment." },
        { h: "6. Sécurité", p: "Vos données sont stockées de manière sécurisée chez Supabase (certifié SOC 2). Les mots de passe sont chiffrés. Les paiements sont traités directement par les opérateurs mobiles sans que Yorix ne stocke vos identifiants bancaires." },
        { h: "7. Vos droits", p: "Vous disposez des droits suivants :\n• Accès à vos données\n• Rectification de données inexactes\n• Suppression (« droit à l'oubli »)\n• Portabilité de vos données\n• Opposition au traitement\n\nPour exercer ces droits : support@yorix.cm" },
        { h: "8. Cookies", p: "Les cookies techniques (authentification, panier) sont nécessaires au fonctionnement du site. Les cookies analytiques (statistiques anonymes) peuvent être désactivés dans votre navigateur sans perte de fonctionnalité." },
        { h: "9. Modifications", p: "Cette politique peut être modifiée. Les utilisateurs seront informés de tout changement substantiel par email ou via une notification sur la plateforme." },
        { h: "10. Contact", p: "Pour toute question concernant vos données personnelles :\nEmail : support@yorix.cm\nWhatsApp : +237 696 56 56 54" },
      ],
    },
  };

  const page = sections[type] || sections.cgv;

  return (
    <section className="sec anim">
      <div style={{ maxWidth:820, margin:"0 auto" }}>
        <button
          onClick={() => goPage("home")}
          style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", color:"var(--gray)", fontSize:14, marginBottom:20, padding:"8px 0" }}
        >
          ← Retour à l'accueil
        </button>

        <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.8rem", color:"var(--ink)", marginBottom:6, letterSpacing:"-.5px" }}>
          {page.title}
        </h1>
        <p style={{ fontSize:".78rem", color:"var(--gray)", marginBottom:28 }}>
          {page.updated}
        </p>

        <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:14, padding:"26px 30px" }}>
          {page.content.map((section, i) => (
            <div key={i} style={{ marginBottom:24 }}>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1rem", color:"var(--green)", marginBottom:8 }}>
                {section.h}
              </h2>
              <p style={{ fontSize:".85rem", color:"var(--ink)", lineHeight:1.75, whiteSpace:"pre-line" }}>
                {section.p}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation entre les 3 pages légales */}
        <div style={{ display:"flex", gap:8, justifyContent:"center", marginTop:24, flexWrap:"wrap" }}>
          <button
            onClick={() => goPage("cgv")}
            style={{ padding:"9px 18px", borderRadius:8, border:`1.5px solid ${type==="cgv" ? "var(--green)" : "var(--border)"}`, background:type==="cgv" ? "var(--green)" : "var(--surface)", color:type==="cgv" ? "#fff" : "var(--ink)", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:".8rem" }}
          >📜 CGV</button>
          <button
            onClick={() => goPage("mentions")}
            style={{ padding:"9px 18px", borderRadius:8, border:`1.5px solid ${type==="mentions" ? "var(--green)" : "var(--border)"}`, background:type==="mentions" ? "var(--green)" : "var(--surface)", color:type==="mentions" ? "#fff" : "var(--ink)", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:".8rem" }}
          >📋 Mentions légales</button>
          <button
            onClick={() => goPage("confidentialite")}
            style={{ padding:"9px 18px", borderRadius:8, border:`1.5px solid ${type==="confidentialite" ? "var(--green)" : "var(--border)"}`, background:type==="confidentialite" ? "var(--green)" : "var(--surface)", color:type==="confidentialite" ? "#fff" : "var(--ink)", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:".8rem" }}
          >🔒 Confidentialité</button>
        </div>

        <div style={{ textAlign:"center", marginTop:20, fontSize:".78rem", color:"var(--gray)" }}>
          Une question ? <a href="mailto:support@yorix.cm" style={{ color:"var(--green)", fontWeight:600 }}>support@yorix.cm</a> · <a href={`https://wa.me/237696565654`} style={{ color:"var(--green)", fontWeight:600 }}>WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
