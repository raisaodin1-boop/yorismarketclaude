-- Additif, non destructif : permet aux Edge Functions de checkout de mémoriser
-- le coupon appliqué et son montant, afin que `confirm_checkout` sache que le
-- total réellement dû (et donc le montant encaissé par CinetPay) est inférieur
-- au total brut recalculé depuis le panier.
--
-- Contexte du correctif : jusqu'ici, le coupon n'était appliqué que dans
-- l'affichage côté client (CheckoutPage.jsx) ; `create_checkout_intent` et
-- `confirm_checkout` recalculaient toujours le total plein depuis les prix
-- catalogue, sans jamais connaître le coupon. Le client payait donc le montant
-- plein via CinetPay malgré l'écran affichant une réduction.

ALTER TABLE public.checkout_intents
  ADD COLUMN IF NOT EXISTS coupon_code text NULL,
  ADD COLUMN IF NOT EXISTS coupon_discount numeric(14,2) NOT NULL DEFAULT 0;
