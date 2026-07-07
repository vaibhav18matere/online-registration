-- Run this in the Supabase SQL editor to add document URL columns.
alter table registrations
  add column if not exists marksheet_10th_url text,
  add column if not exists marksheet_12th_url text,
  add column if not exists aadhar_card_url text,
  add column if not exists neet_marksheet_url text,
  add column if not exists pan_card_url text,
  add column if not exists passport_first_page_url text,
  add column if not exists passport_last_page_url text;
