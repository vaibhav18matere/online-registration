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
- **Registration Services**: Functions `linkRegistrationByEmail` and `linkRegistrationByMobile` are imported to link existing registrations.

### State Variables

- **`session`**: Holds the current session object.
- **`checkingSession`**: A boolean indicating whether the session is being initialized or checked.
- **`initError`**: Stores any error that occurs during the initialization of the session.

### `useEffect` Hook

- **Initialization**: The `useEffect` hook is used to initialize the authentication session when the component mounts.
- **Session Management**: It retrieves the current session from Supabase and sets up a listener for authentication state changes.
- **Cleanup**: Returns a cleanup function to unsubscribe from the authentication state listener when the component unmounts.

### `linkExistingRegistration` Function

- **Purpose**: Links an existing registration to the current session based on a verified mobile number or Google email.
- **Logic**: 
  - Checks if the session has a user ID.
  - Attempts to link registration by mobile if a verified mobile number is present.
  - Attempts to link registration by email if a Google email is present.

### `signOut` Function

- **Purpose**: Signs out the current user by calling the `signOut` method on the Supabase authentication client.

### Returned Object

The hook returns an object containing:

- **`session`**: The current session object.
- **`user`**: The user object from the session, or `null` if no session exists.
- **`verifiedMobile`**: The verified mobile number from the session.
- **`authProvider`**: The authentication provider used for the session.
- **`isPhoneLogin`**: A boolean indicating if the session was authenticated via phone.
- **`googleEmail`**: The Google email associated with the session.
- **`loginDisplay`**: A display string for the login method.
- **`checkingSession`**: A boolean indicating if the session is still being checked.
- **`initError`**: Any error that occurred during session initialization.
- **`isAuthenticated`**: A boolean indicating if the user is authenticated.
- **`isAdmin`**: A boolean indicating if the session belongs to an admin user.
- **`signOut`**: A function to sign out the current user.

## How It Works

1. **Initialization**: When the hook is used, it initializes the session by calling `getSupabase().auth.getSession()` and sets up a listener for authentication state changes.
2. **Session Linking**: If a session is found, it attempts to link existing registrations using the `linkExistingRegistration` function.
3. **State Management**: The hook manages session-related state and provides this state to the consuming component.
4. **Session Actions**: Provides a `signOut` function to allow the user to sign out.

This hook is essential for managing user sessions in a React application using Supabase, providing a seamless way to handle authentication and session-related data.