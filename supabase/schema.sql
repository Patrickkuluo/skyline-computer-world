-- Skyline Computer World — run once in Supabase Dashboard → SQL Editor

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin() returns boolean
language sql security definer set search_path = public stable as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  price integer not null check (price >= 0),
  category text not null,
  brand text,
  model text,
  condition text,
  stock integer not null default 0,
  availability text not null default 'In Stock'
    check (availability in ('In Stock','Available on Order','Out of Stock')),
  images text[] not null default '{}' check (cardinality(images) <= 6),
  specifications jsonb not null default '{}'::jsonb,
  -- [{ "label": "Storage", "choices": [{ "value": "256GB SSD", "price": 0 }, { "value": "512GB SSD", "price": 5000 }] }]
  options jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_brand_model_idx on public.products (brand, model);

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at before update on public.products
  for each row execute function public.set_updated_at();

alter table public.products enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Public can read products" on public.products;
create policy "Public can read products" on public.products for select using (true);
drop policy if exists "Admins insert products" on public.products;
create policy "Admins insert products" on public.products for insert with check (public.is_admin());
drop policy if exists "Admins update products" on public.products;
create policy "Admins update products" on public.products for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admins delete products" on public.products;
create policy "Admins delete products" on public.products for delete using (public.is_admin());

drop policy if exists "Users read own admin row" on public.admin_users;
create policy "Users read own admin row" on public.admin_users for select using (user_id = auth.uid());

-- Storage bucket for product images (public read, admin write)
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true)
  on conflict (id) do nothing;
drop policy if exists "Admins upload images" on storage.objects;
create policy "Admins upload images" on storage.objects for insert with check (bucket_id = 'product-images' and public.is_admin());
drop policy if exists "Admins update images" on storage.objects;
create policy "Admins update images" on storage.objects for update using (bucket_id = 'product-images' and public.is_admin());
drop policy if exists "Admins delete images" on storage.objects;
create policy "Admins delete images" on storage.objects for delete using (bucket_id = 'product-images' and public.is_admin());

-- AFTER creating your admin user in Authentication → Users, run this with your email:
-- insert into public.admin_users (user_id) select id from auth.users where email = 'you@example.com';