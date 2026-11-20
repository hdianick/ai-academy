-- AI Academy — richieste di abbonamento
-- I pagamenti non sono ancora attivi: chi sceglie un piano lascia una richiesta,
-- così lo staff sa chi avvisare quando gli abbonamenti partiranno.

create table if not exists public.subscription_requests (
  user_id uuid primary key references auth.users (id) on delete cascade,
  plan public.plan_tier not null check (plan in ('premium', 'pro')),
  period text not null check (period in ('monthly', 'yearly')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists subscription_requests_touch on public.subscription_requests;
create trigger subscription_requests_touch before update on public.subscription_requests
  for each row execute function public.touch_updated_at();

alter table public.subscription_requests enable row level security;

drop policy if exists "subscription_requests: propria riga" on public.subscription_requests;
create policy "subscription_requests: propria riga" on public.subscription_requests
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "subscription_requests: lettura staff" on public.subscription_requests;
create policy "subscription_requests: lettura staff" on public.subscription_requests
  for select to authenticated
  using (public.is_staff());
