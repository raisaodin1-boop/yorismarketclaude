-- ═══════════════════════════════════════════════════════════════════════════
-- Atomic checkout stock decrement
--
-- `confirm_checkout` performs several REST calls, so per-line stock decrement
-- can leave partial orders when a later cart item runs out under concurrency.
-- These RPCs move stock consumption for the whole cart into one Postgres
-- transaction: aggregate quantities, lock product rows deterministically, check
-- availability, then decrement all rows together.
-- ═══════════════════════════════════════════════════════════════════════════

create or replace function public.decrement_cart_stock(p_items jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_shortage jsonb;
begin
  if p_items is null or jsonb_typeof(p_items) <> 'array' then
    return null;
  end if;

  -- Missing products fail before any stock update.
  select jsonb_build_object(
           'product_id', r.id,
           'name',       'Produit introuvable',
           'available',  0,
           'requested',  r.qty
         )
    into v_shortage
    from (
      select (elem->>'id')::uuid as id,
             sum(greatest(1, coalesce(nullif(elem->>'qty', '')::integer, 1)))::integer as qty
        from jsonb_array_elements(p_items) elem
       where elem->>'id' is not null
       group by (elem->>'id')::uuid
    ) r
    left join public.products p on p.id = r.id
   where p.id is null
   order by r.id
   limit 1;

  if v_shortage is not null then
    return v_shortage;
  end if;

  -- Lock existing product rows in a stable order to avoid deadlocks.
  perform p.id
    from public.products p
    join (
      select (elem->>'id')::uuid as id
        from jsonb_array_elements(p_items) elem
       where elem->>'id' is not null
       group by (elem->>'id')::uuid
    ) r on r.id = p.id
   order by p.id
     for update;

  -- Check aggregated quantities while locks are held.
  select jsonb_build_object(
           'product_id', p.id,
           'name',       coalesce(p.name_fr, 'Produit'),
           'available',  coalesce(p.stock, 0),
           'requested',  r.qty
         )
    into v_shortage
    from (
      select (elem->>'id')::uuid as id,
             sum(greatest(1, coalesce(nullif(elem->>'qty', '')::integer, 1)))::integer as qty
        from jsonb_array_elements(p_items) elem
       where elem->>'id' is not null
       group by (elem->>'id')::uuid
    ) r
    join public.products p on p.id = r.id
   where coalesce(p.stock, 0) < r.qty
   order by p.id
   limit 1;

  if v_shortage is not null then
    return v_shortage;
  end if;

  update public.products p
     set stock      = coalesce(p.stock, 0) - r.qty,
         updated_at = now()
    from (
      select (elem->>'id')::uuid as id,
             sum(greatest(1, coalesce(nullif(elem->>'qty', '')::integer, 1)))::integer as qty
        from jsonb_array_elements(p_items) elem
       where elem->>'id' is not null
       group by (elem->>'id')::uuid
    ) r
   where p.id = r.id;

  return null;
end;
$$;

revoke all on function public.decrement_cart_stock(jsonb) from public;
revoke all on function public.decrement_cart_stock(jsonb) from authenticated;
revoke all on function public.decrement_cart_stock(jsonb) from anon;
grant execute on function public.decrement_cart_stock(jsonb) to service_role;

comment on function public.decrement_cart_stock(jsonb) is
  'Atomically checks and decrements all product stock for a checkout cart. '
  'Returns NULL on success or a STOCK_INSUFFICIENT-style jsonb shortage.';


create or replace function public.restore_cart_stock(p_items jsonb)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_updated integer;
begin
  if p_items is null or jsonb_typeof(p_items) <> 'array' then
    return 0;
  end if;

  update public.products p
     set stock      = coalesce(p.stock, 0) + r.qty,
         updated_at = now()
    from (
      select (elem->>'id')::uuid as id,
             sum(greatest(1, coalesce(nullif(elem->>'qty', '')::integer, 1)))::integer as qty
        from jsonb_array_elements(p_items) elem
       where elem->>'id' is not null
       group by (elem->>'id')::uuid
    ) r
   where p.id = r.id;

  get diagnostics v_updated = row_count;
  return v_updated;
end;
$$;

revoke all on function public.restore_cart_stock(jsonb) from public;
revoke all on function public.restore_cart_stock(jsonb) from authenticated;
revoke all on function public.restore_cart_stock(jsonb) from anon;
grant execute on function public.restore_cart_stock(jsonb) to service_role;

comment on function public.restore_cart_stock(jsonb) is
  'Best-effort compensation used by confirm_checkout cleanup when stock was '
  'reserved but later order writes failed before checkout completion.';
