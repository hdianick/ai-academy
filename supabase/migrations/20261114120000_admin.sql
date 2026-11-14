-- AI Academy — area amministrazione
-- Email nei profili (per la gestione utenti), statistiche per lo staff e avvisi agli utenti.

-- ---------------------------------------------------------------------------
-- Email nel profilo (copiata da auth.users, visibile solo a sé stessi e allo staff)
-- ---------------------------------------------------------------------------
alter table public.profiles add column if not exists email text;

update public.profiles p
set email = u.email
from auth.users u
where u.id = p.id and p.email is null;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, email)
  values (
    new.id,
    left(coalesce(new.raw_user_meta_data ->> 'display_name', ''), 60),
    new.email
  );
  return new;
end;
$$;

-- Un utente non può cambiare da solo l'email del profilo (resta allineata all'account).
create or replace function public.protect_profile_privileges()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select auth.uid()) is not null and not public.is_admin() then
    new.role := old.role;
    new.plan := old.plan;
    new.email := old.email;
  end if;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Progressi: lo staff può leggerli (solo lettura) per le statistiche
-- ---------------------------------------------------------------------------
drop policy if exists "progress: lettura staff" on public.user_progress;
create policy "progress: lettura staff" on public.user_progress
  for select to authenticated
  using (public.is_staff());

-- ---------------------------------------------------------------------------
-- Avvisi mostrati nella Home dell'app
-- ---------------------------------------------------------------------------
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 80),
  body text not null default '' check (char_length(body) <= 400),
  active boolean not null default true,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists announcements_touch on public.announcements;
create trigger announcements_touch before update on public.announcements
  for each row execute function public.touch_updated_at();

alter table public.announcements enable row level security;

drop policy if exists "announcements: lettura attivi o staff" on public.announcements;
create policy "announcements: lettura attivi o staff" on public.announcements
  for select to anon, authenticated
  using (active or public.is_staff());

drop policy if exists "announcements: gestione staff" on public.announcements;
create policy "announcements: gestione staff" on public.announcements
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());
