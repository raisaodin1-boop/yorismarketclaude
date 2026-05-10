-- Listes dashboard / filtres intents par client et statut
create index if not exists idx_checkout_intents_customer_status
  on public.checkout_intents (customer_id, status)
  where customer_id is not null;

create index if not exists idx_checkout_intents_status_created
  on public.checkout_intents (status, created_at desc);
