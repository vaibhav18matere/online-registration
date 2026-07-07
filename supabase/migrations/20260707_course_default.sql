-- Course is no longer selected in the UI (medical-only portal).
-- Set a default so inserts succeed without a course field from the app.

alter table registrations
  alter column course set default 'Medical';

update registrations
set course = 'Medical'
where course is null;
