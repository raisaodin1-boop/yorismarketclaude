-- Intents créés/modifiés uniquement par Edge (service role), pas par le client authentifié.
-- Évite la falsification de payload / totaux via @supabase/supabase-js.

drop policy if exists checkout_intents_insert_owner on public.checkout_intents;
drop policy if exists checkout_intents_update_owner_or_admin on public.checkout_intents;

create policy checkout_intents_update_admin_only
on public.checkout_intents
for update
to authenticated
using (public.is_platform_admin())
with check (public.is_platform_admin());
