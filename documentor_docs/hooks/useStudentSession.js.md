# Documentation Guide for `useStudentSession` Hook

## Overview

The `useStudentSession` hook is a custom React hook designed to manage and provide information about a student's authentication session using Supabase. It handles session initialization, listens for authentication state changes, and provides various session-related data and actions to the components that use it.

## Purpose

The primary purpose of the `useStudentSession` hook is to:

- Initialize and manage the authentication session using Supabase.
- Link existing registrations based on verified mobile numbers or Google email addresses.
- Provide session-related information and actions to the consuming components.

## Key Components

### Imports

- **React Hooks**: `useEffect` and `useState` are imported from React to manage component state and side effects.
- **Supabase**: `getSupabase` is imported to interact with the Supabase client.
- **Session Utilities**: Various functions are imported from `../lib/authSession` and `../lib/formState` to extract session-related information.
- **Registration Services**: Functions `linkRegistrationByEmail` and `linkRegistrationByMobile` are imported from `../lib/registrationService` to link existing registrations.

### State Variables

- **`session`**: Holds the current session object.
- **`checkingSession`**: A boolean indicating whether the session is currently being checked.
- **`initError`**: Stores any error that occurs during the initialization of the session.

### `useEffect` Hook

- **Initialization**: The `useEffect` hook initializes the authentication session by calling `initAuth`.
- **Auth State Change Listener**: Sets up a listener for authentication state changes using `supabase.auth.onAuthStateChange`.
- **Cleanup**: Returns a cleanup function to unsubscribe from the auth state change listener when the component unmounts.

### `initAuth` Function

- **Session Retrieval**: Retrieves the current session using `supabase.auth.getSession`.
- **Link Registration**: Calls `linkExistingRegistration` to link any existing registration based on the session data.
- **Error Handling**: Catches and sets any errors that occur during initialization.
- **Session Checking**: Updates `checkingSession` to `false` once the initialization is complete.

### `linkExistingRegistration` Function

- **Purpose**: Links existing registrations based on verified mobile numbers or Google email addresses.
- **Mobile Linking**: If a verified mobile number is present, it links the registration using `linkRegistrationByMobile`.
- **Email Linking**: If a Google email is present, it links the registration using `linkRegistrationByEmail`.

### `signOut` Function

- **Purpose**: Signs out the current user by calling `supabase.auth.signOut`.

### Returned Object

The hook returns an object containing:

- **`session`**: The current session object.
- **`user`**: The user object from the session, or `null` if no session exists.
- **`verifiedMobile`**: The verified mobile number from the session.
- **`authProvider`**: The authentication provider used in the session.
- **`isPhoneLogin`**: A boolean indicating if the session is authenticated via phone.
- **`googleEmail`**: The Google email associated with the session.
- **`loginDisplay`**: A display string for the login method.
- **`checkingSession`**: A boolean indicating if the session is being checked.
- **`initError`**: Any error that occurred during session initialization.
- **`isAuthenticated`**: A boolean indicating if the user is authenticated.
- **`isAdmin`**: A boolean indicating if the session belongs to an admin user.
- **`signOut`**: A function to sign out the current user.

## How It Works

1. **Initialization**: When the hook is used, it initializes the session by calling `initAuth`, which retrieves the current session and sets up a listener for authentication state changes.
2. **Session Management**: The hook manages the session state and updates it whenever there is a change in authentication state.
3. **Linking Registrations**: It attempts to link existing registrations based on verified mobile numbers or Google email addresses.
4. **Session Information**: Provides various session-related information and actions to the consuming components, such as the current user, authentication provider, and sign-out functionality.

This hook is essential for managing student sessions in applications that use Supabase for authentication, providing a seamless way to handle session state and related operations.