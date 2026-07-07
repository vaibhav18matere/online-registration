# Supabase setup for student login

Students can sign in with **Google** (available immediately) or **Phone OTP** (after SMS provider is configured).

## 1. Enable Google auth (recommended first)

1. Open **Supabase Dashboard → Authentication → Providers → Google**
2. Enable **Google** sign-in
3. Create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com/):
   - Application type: **Web application**
   - **Authorized redirect URI**: `https://<your-project-ref>.supabase.co/auth/v1/callback`
4. Copy **Client ID** and **Client Secret** into Supabase Google provider settings
5. For local dev, add the same redirect URI Supabase shows in the provider panel

After saving, students can use **Continue with Google** on `/login`.

## 2. Enable Phone auth (optional, when SMS is ready)

1. Open **Supabase Dashboard → Authentication → Providers → Phone**
2. Enable **Phone** sign-in
3. Configure an **SMS provider** (Twilio, MessageBird, Vonage, etc.)
4. Test OTP delivery to Indian numbers (`+91`)

## 3. Run database migrations

Run these in the **Supabase SQL editor**:

1. `supabase/migrations/20260707_student_auth.sql` — user ownership, RLS, mobile linking
2. `supabase/migrations/20260707_google_auth_link.sql` — link old applications by email after Google login
3. `supabase/migrations/20260707_course_default.sql` — default `course` to `Medical` (field removed from UI)

## 4. Admin access

Admin users must have **app metadata** set in Supabase:

```json
{ "role": "admin" }
```

In Dashboard: **Authentication → Users → select admin user → App Metadata**

Without this, admin login will not be able to read registrations after RLS is enabled.

## 5. Environment variables

Ensure these are set (local `.env.local` and Vercel):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 6. Auth callback URL

Google sign-in redirects through `/auth/callback` in this app. Add your site URL in Supabase:

**Authentication → URL Configuration → Redirect URLs**

- `http://localhost:3000/auth/callback` (local)
- `https://your-domain.com/auth/callback` (production)

## 7. Student flow

1. `/login` — Google **or** mobile OTP
2. `/dashboard` — view application status and documents
3. `/application` — fill form, save draft, submit (requires login)

**Phone login:** mobile field in the form is locked to the verified number.

**Google login:** mobile is entered manually in the form; email is prefilled from Google.

Middleware protects `/dashboard` and `/application`; unauthenticated users are redirected to `/login`.
