-- Link orphaned registration to user after Google login (same email, no user_id yet)
create or replace function link_registration_by_email(p_email text, p_user_id uuid)
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
  where lower(email) = lower(p_email)
    and user_id is null
  returning id into v_id;

  return v_id;
end;
$$;

grant execute on function link_registration_by_email(text, uuid) to authenticated;
