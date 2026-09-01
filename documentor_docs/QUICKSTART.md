# QUICKSTART.md

## Quick Start Guide

This guide will help you set up and run the project using the provided code snippets. Please follow the steps below to ensure a successful setup.

### Prerequisites

Before you begin, ensure you have the following:

- Access to the Vercel platform to manage environment variables.
- Supabase account to obtain the necessary API keys.

### Environment Variables

The application requires specific environment variables to connect to Supabase. These variables must be set in your Vercel project settings.

1. **NEXT_PUBLIC_SUPABASE_URL**: This is the URL of your Supabase instance.
2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**: This is the anonymous key for your Supabase project.

### Setting Up Environment Variables

1. Go to your Vercel dashboard.
2. Navigate to your project settings.
3. Under the "Environment Variables" section, add the following variables:

   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key.

4. Redeploy your project after setting the environment variables.

### Running the Application

Once the environment variables are set, you can run the application. The application includes an admin page that requires authentication.

- **Admin Login**: Use your admin credentials to log in and manage student registration submissions.

### Error Handling

- If the environment variables are not set correctly, you will encounter errors indicating missing `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Ensure these are correctly configured in Vercel.

### Additional Information

- The application checks for an admin session to allow access to certain features. Ensure your account has the appropriate admin role set in Supabase.

This guide provides the necessary steps to set up and run the application based on the provided code snippets. If you encounter any issues, verify that all environment variables are correctly configured and that your Supabase account is active.