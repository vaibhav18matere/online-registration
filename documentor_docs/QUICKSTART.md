# QUICKSTART.md

## Quick Start Guide

This guide will help you set up and run the project using Supabase for authentication and data management.

### Prerequisites

Before you begin, ensure you have the following:

- A Supabase account and project.
- Access to Vercel for environment variable configuration.

### Environment Variables

The application requires the following environment variables to be set up in your Vercel project settings:

1. **NEXT_PUBLIC_SUPABASE_URL**: This is your Supabase project URL.
2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**: This is your Supabase anonymous key.

These variables are critical for the application to connect to Supabase. If they are not set, the application will not function correctly.

### Setup Instructions

1. **Configure Environment Variables**:
   - Go to your Vercel project settings.
   - Add the following environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key.
   - After adding these variables, redeploy your project on Vercel.

2. **Initialize Supabase Client**:
   - The application uses a function `getSupabase()` to initialize the Supabase client using the environment variables. Ensure these variables are correctly set to avoid errors.

3. **Admin Access**:
   - The application includes an admin page that requires admin credentials to access and manage student registration submissions.
   - Ensure that the user has the role of "admin" in their `app_metadata` to access the admin functionalities.

### Running the Application

- Once the environment variables are configured and the project is deployed, the application will automatically attempt to connect to Supabase and manage sessions.
- The admin page will allow you to log in with admin credentials to view and manage registrations.

### Troubleshooting

- If you encounter an error stating that `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` is missing, double-check your Vercel environment variable settings and redeploy the project.
- Ensure that the user logging in has the correct admin role to access the admin functionalities.

For further assistance, refer to the Supabase and Vercel documentation.