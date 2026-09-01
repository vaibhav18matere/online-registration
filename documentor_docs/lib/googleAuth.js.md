# Documentation Guide for `lib/googleAuth.js`

## Overview

The `lib/googleAuth.js` file contains a function that facilitates user authentication through Google using Supabase's OAuth capabilities. This function is designed to initiate the sign-in process with Google and handle redirection upon successful authentication.

## Function: `signInWithGoogle`

### Purpose

The `signInWithGoogle` function is an asynchronous function that initiates the OAuth sign-in process with Google. It is intended to be used in applications that require user authentication via Google, leveraging Supabase's authentication services.

### Parameters

- `supabase`: An instance of the Supabase client. This client is used to interact with Supabase's authentication API.
- `redirectPath`: A string representing the path to which the user should be redirected after successful authentication. This path is appended to the current origin to form the complete redirect URL.

### How It Works

1. **Construct Redirect URL**: 
   - The function constructs a `redirectTo` URL using the current window's origin and appends `/auth/callback` with a query parameter `next` that encodes the `redirectPath`. This URL is used to redirect the user after successful authentication.

2. **Initiate OAuth Sign-In**:
   - The function calls `supabase.auth.signInWithOAuth` with the following configuration:
     - `provider`: Set to `"google"`, indicating that Google is the OAuth provider.
     - `options`: An object containing:
       - `redirectTo`: The URL to redirect the user after authentication.
       - `queryParams`: An object with additional parameters:
         - `access_type`: Set to `"offline"`, which typically requests a refresh token for offline access.
         - `prompt`: Set to `"consent"`, which forces the user to consent to the requested permissions.

3. **Error Handling**:
   - The function awaits the result of the `signInWithOAuth` call. If an error occurs during this process, it is thrown, allowing the calling code to handle it appropriately.

### Example Usage

```javascript
import { signInWithGoogle } from './lib/googleAuth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('your-supabase-url', 'your-supabase-anon-key');

async function handleGoogleSignIn() {
  try {
    await signInWithGoogle(supabase, '/dashboard');
    console.log('Redirecting to Google for authentication...');
  } catch (error) {
    console.error('Error during Google sign-in:', error);
  }
}

handleGoogleSignIn();
```

### Key Considerations

- **Asynchronous Nature**: The function is asynchronous and returns a promise. It should be called using `await` or handled with `.then()` and `.catch()` for proper error management.
- **Error Propagation**: Any error encountered during the sign-in process is thrown, so it is crucial to implement error handling in the calling code.
- **Redirect Path**: Ensure that the `redirectPath` provided is a valid path within your application to avoid navigation issues post-authentication.

This documentation provides a comprehensive understanding of the `signInWithGoogle` function, its purpose, and its usage within an application.