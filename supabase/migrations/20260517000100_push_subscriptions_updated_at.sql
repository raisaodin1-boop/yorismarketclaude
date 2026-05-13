-- Si la table existe déjà sans updated_at (ex. création manuelle), aligner le schéma.
ALTER TABLE public.push_subscriptions
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();
