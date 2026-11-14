-- AI Academy — schema iniziale
-- Profili, progressi degli utenti e contenuti (per la futura area amministrativa).
-- Sicurezza: Row Level Security attiva su tutte le tabelle.

-- ---------------------------------------------------------------------------
-- Tipi
-- ---------------------------------------------------------------------------
create type public.app_role as enum ('user', 'editor', 'admin');
create type public.plan_tier as enum ('free', 'premium', 'pro');

-- ---------------------------------------------------------------------------
-- Profili (uno per utente di auth.users)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text check (char_length(display_name) <= 60),
  role public.app_role not null default 'user',
  plan public.plan_tier not null default 'free',
  daily_goal integer not null default 40 check (daily_goal between 10 and 500),
  locale text not null default 'it' check (locale in ('it', 'en')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Progressi: un documento JSON per utente (stessa forma dello stato locale dell'app).
create table public.user_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  schema_version integer not null default 3,
  updated_at timestamptz not null default now()
);

-- Contenuti gestibili dall'area amministrativa (oggi l'app usa i contenuti locali).
create table public.courses (
  id text primary key,
  data jsonb not null,
  required_tier public.plan_tier not null default 'free',
  published boolean not null default false,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table public.ai_tools (
  id text primary key,
  data jsonb not null,
  published boolean not null default false,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Funzioni di supporto
-- ---------------------------------------------------------------------------
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role in ('editor', 'admin')
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Crea il profilo alla registrazione.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, left(coalesce(new.raw_user_meta_data ->> 'display_name', ''), 60));
  return new;
end;
$$;

-- Un utente non può cambiare da solo ruolo o piano (solo un admin, o il backend).
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
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create trigger profiles_protect_privileges
  before update on public.profiles
  for each row execute function public.protect_profile_privileges();

create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();
create trigger user_progress_touch before update on public.user_progress
  for each row execute function public.touch_updated_at();
create trigger courses_touch before update on public.courses
  for each row execute function public.touch_updated_at();
create trigger ai_tools_touch before update on public.ai_tools
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.courses enable row level security;
alter table public.ai_tools enable row level security;

-- Profili: ognuno vede e modifica il proprio; lo staff vede tutti.
create policy "profiles: lettura propria o staff" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or public.is_staff());

create policy "profiles: modifica propria" on public.profiles
  for update to authenticated
  using (id = (select auth.uid()) or public.is_admin())
  with check (id = (select auth.uid()) or public.is_admin());

-- Progressi: solo i propri.
create policy "progress: lettura propria" on public.user_progress
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy "progress: inserimento proprio" on public.user_progress
  for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "progress: modifica propria" on public.user_progress
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- Contenuti: pubblicati leggibili da tutti; bozze e modifiche solo per lo staff.
create policy "courses: lettura pubblicati o staff" on public.courses
  for select to anon, authenticated
  using (published or public.is_staff());

create policy "courses: gestione staff" on public.courses
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "ai_tools: lettura pubblicati o staff" on public.ai_tools
  for select to anon, authenticated
  using (published or public.is_staff());

create policy "ai_tools: gestione staff" on public.ai_tools
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());
