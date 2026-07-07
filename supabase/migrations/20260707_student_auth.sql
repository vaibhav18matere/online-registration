-- Student auth + application lifecycle
-- Run in Supabase SQL editor

alter table registrations
  add column if not exists user_id uuid references auth.users(id),
  add column if not exists status text not null default 'draft',
  add column if not exists submitted_at timestamptz,
  add column if not exists updated_at timestamptz default now();

-- Backfill status for existing rows
update registrations set status = 'submitted' where status = 'draft' and submitted_at is null and full_name is not null and full_name <> '';

alter table registrations
  drop constraint if exists registrations_status_check;

alter table registrations
  add constraint registrations_status_check
  check (status in ('draft', 'submitted', 'under_review', 'approved', 'rejected'));

create unique index if not exists registrations_one_per_user
  on registrations (user_id)
  where user_id is not null;

create unique index if not exists registrations_one_per_mobile
  on registrations (mobile);

-- Auto-update updated_at
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists registrations_updated_at on registrations;
create trigger registrations_updated_at
  before update on registrations
  for each row execute function set_updated_at();

-- RLS
alter table registrations enable row level security;

drop policy if exists "Students select own" on registrations;
drop policy if exists "Students insert own" on registrations;
drop policy if exists "Students update own" on registrations;
drop policy if exists "Admins full access" on registrations;
drop policy if exists "Service role bypass" on registrations;

create policy "Students select own"
  on registrations for select
  using (auth.uid() = user_id);

create policy "Students insert own"
  on registrations for insert
  with check (auth.uid() = user_id);

create policy "Students update own"
  on registrations for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Admins: set app_metadata role = 'admin' on admin users in Supabase dashboard
create policy "Admins full access"
  on registrations for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Link orphaned registration to user after phone login (same mobile, no user_id yet)
create or replace function link_registration_by_mobile(p_mobile text, p_user_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  update registrations
  set user_id = p_user_id, updated_at = now()
  where mobile = p_mobile
    and user_id is null
  returning id into v_id;

  return v_id;
end;
$$;

grant execute on function link_registration_by_mobile(text, uuid) to authenticated;
