# 🧪 Mini-Test Technique — TEUGA Ulrich
## Yorix.cm — Plateforme Marketplace Cameroun

**Délai :** Mardi à minuit (23h59)
**Branche de travail :** `test/teuga-ulrich`
**Rendu :** Push sur cette branche uniquement — une PR sera ouverte automatiquement

---

## Contexte de l'application

Yorix.cm est une marketplace multi-rôles (acheteurs, vendeurs, livreurs, prestataires, admins) opérant au Cameroun. Stack technique :
- **Frontend :** React 18 + Vite 5 + React Router 6 (SPA bilingue FR/EN)
- **Backend :** Supabase (PostgreSQL + Auth + Realtime + Edge Functions en TypeScript)
- **Paiement :** CinetPay, MTN MoMo, Orange Money
- **Déploiement :** Vercel

---

## Ta Mission : Sécurité & Intégrité des Données au Checkout

### Problème identifié (bug en production)

Actuellement, quand un client finalise une commande :
1. La Edge Function `confirm_checkout` crée la commande en base
2. **Le stock du produit n'est JAMAIS décrémenté** → survente possible
3. **Aucune vérification de stock** avant confirmation → un client peut acheter 10 articles s'il n'en reste que 2
4. **Pas d'idempotency** → si le réseau coupe et que le client reclique, 2 commandes identiques sont créées

### Objectif

Corriger ces 3 failles de manière robuste et sécurisée.

---

## Spécifications Techniques

### Tâche 1 — Vérification de stock avant confirmation

**Fichier :** `supabase/functions/confirm_checkout/index.ts`

Avant d'insérer la commande, ajouter une vérification transactionnelle :

```sql
-- Vérifier le stock disponible pour chaque article du panier
SELECT id, stock, name FROM products
WHERE id = $product_id
FOR UPDATE; -- verrou pessimiste pendant la transaction
```

- Si `stock < quantity` pour n'importe quel article → retourner `HTTP 409` avec le message :
  ```json
  { "error": "STOCK_INSUFFICIENT", "product": "Nom du produit", "available": 2, "requested": 5 }
  ```
- Si OK → continuer

### Tâche 2 — Décrémentation atomique du stock

Toujours dans la même transaction PostgreSQL, après insertion de la commande :

```sql
UPDATE products
SET stock = stock - $quantity,
    updated_at = NOW()
WHERE id = $product_id
  AND stock >= $quantity; -- double sécurité contre race condition
```

- Vérifier que `rowCount === 1` après chaque UPDATE
- Si `rowCount === 0` → rollback + retourner `HTTP 409`

### Tâche 3 — Idempotency sur le checkout

Ajouter un champ `idempotency_key` (UUID généré côté client au moment où l'utilisateur clique "Confirmer") :

**Côté frontend** (`src/components/Checkout.jsx` ou équivalent) :
```javascript
const idempotencyKey = crypto.randomUUID(); // généré une seule fois par session de checkout
```

**Côté Edge Function :**
```sql
-- Table à créer via migration
CREATE TABLE IF NOT EXISTS checkout_idempotency (
  key UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

- Si la clé existe déjà → retourner la commande existante (HTTP 200) sans re-créer
- Si elle n'existe pas → procéder normalement + insérer la clé

### Tâche 4 — Gestion d'erreur côté frontend

Dans le composant checkout, intercepter les nouvelles erreurs :
- `STOCK_INSUFFICIENT` → afficher un message clair à l'utilisateur avec le produit concerné (sans `alert()`)
- Réseau coupé → ne pas vider le panier, afficher un message de retry
- Le panier ne doit être vidé **que si** la commande est confirmée avec succès (HTTP 200)

---

## Migration SQL à fournir

Créer le fichier : `supabase/migrations/YYYYMMDD_checkout_security.sql`

Il doit contenir :
- La table `checkout_idempotency`
- Un index sur `created_at` pour le cleanup automatique
- Un trigger ou cron pour supprimer les clés de plus de 24h (facultatif, bonus)

---

## Critères d'évaluation

| Critère | Points |
|---------|--------|
| Vérification de stock avec verrou `FOR UPDATE` | 20 |
| Décrémentation atomique correcte | 20 |
| Idempotency key implémentée | 20 |
| Gestion d'erreur frontend sans `alert()` | 15 |
| Migration SQL propre et correcte | 15 |
| Code lisible, commenté aux endroits non évidents | 10 |
| **Total** | **100** |

---

## Règles & Contraintes

### Utilisation des IA (Modérée)
Tu peux utiliser des outils d'IA (Copilot, ChatGPT, Claude, etc.) pour :
- ✅ Comprendre la syntaxe Supabase Edge Functions / Deno
- ✅ Générer des squelettes de code
- ✅ Débugger des erreurs spécifiques

Tu **ne dois pas** :
- ❌ Soumettre du code généré sans le comprendre — tu devras l'expliquer lors du debriefing
- ❌ Utiliser l'IA pour concevoir toute l'architecture à ta place
- ❌ Copier-coller des blocs entiers sans adaptation au contexte Yorix

**Lors du debriefing, on te demandera d'expliquer chaque choix technique.**

### Git
- Travaille **uniquement** sur la branche `test/teuga-ulrich`
- Commits clairs : `fix: add stock verification before checkout`, `feat: idempotency key on checkout`, etc.
- Ne touche pas aux autres branches
- Ne supprime pas de fichiers existants hors de ta mission

---

## Lancer le projet en local

```bash
git clone https://github.com/raisaodin1-boop/yorismarketclaude.git
cd yorismarketclaude
git checkout test/teuga-ulrich
npm install
cp .env.example .env.local  # remplis avec les variables fournies séparément
npm run dev
```

Variables d'environnement nécessaires (fournies par email séparé) :
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## Questions ?

Si tu as un blocage technique, envoie un message via le canal prévu. Bonne chance.
