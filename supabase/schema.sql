-- Schéma Supabase du site Sitiame Capital
-- À exécuter dans l'éditeur SQL du projet Supabase (ou via une migration).
-- Le site utilise la clé publique (rôle « anon ») : elle ne peut qu'INSÉRER, jamais lire de données personnelles.

-- ───────── Demandes de contact ─────────
create table if not exists public.contact_requests (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text not null,
  company     text not null default '',
  service     text not null,
  message     text not null
);
alter table public.contact_requests enable row level security;
create policy "contact_requests: insertion publique"
  on public.contact_requests for insert to anon with check (true);

-- ───────── Newsletter ─────────
create table if not exists public.newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text not null unique
);
alter table public.newsletter_subscribers enable row level security;
create policy "newsletter_subscribers: insertion publique"
  on public.newsletter_subscribers for insert to anon with check (true);

-- ───────── Rendez-vous ─────────
create table if not exists public.appointments (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  starts_at   timestamptz not null,            -- début du créneau de 30 min (heure d'Abidjan = UTC)
  name        text not null,
  email       text not null,
  phone       text not null,
  company     text not null default '',
  topic       text not null,
  message     text not null default '',
  status      text not null default 'pending'  -- pending | confirmed | cancelled
              check (status in ('pending', 'confirmed', 'cancelled'))
);

-- Un créneau ne peut être pris qu'une fois (sauf s'il a été annulé)
create unique index if not exists appointments_unique_slot
  on public.appointments (starts_at) where status <> 'cancelled';

alter table public.appointments enable row level security;
create policy "appointments: réservation publique"
  on public.appointments for insert to anon
  with check (status = 'pending' and starts_at > now());

-- Le site ne reçoit que les horaires déjà pris, jamais les données des clients.
create or replace function public.booked_slots(range_start timestamptz, range_end timestamptz)
returns setof timestamptz
language sql stable security definer set search_path = public
as $$
  select starts_at from public.appointments
  where starts_at >= range_start and starts_at < range_end and status <> 'cancelled';
$$;
grant execute on function public.booked_slots(timestamptz, timestamptz) to anon;
