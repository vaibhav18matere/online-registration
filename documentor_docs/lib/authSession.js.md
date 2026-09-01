# Documentation Guide for `lib/authSession.js`

This document provides a detailed explanation of the `lib/authSession.js` file, which contains utility functions for handling user authentication sessions. The functions in this file are designed to extract and interpret authentication-related information from a session object.

## Overview

The `lib/authSession.js` file exports five functions that operate on a session object to determine the authentication provider, check if the session belongs to an admin, verify if the session is authenticated via phone, retrieve a Google email, and get a display name for login purposes.

## Functions

### 1. `getAuthProviderFromSession(session)`

#### Purpose
This function determines the authentication provider used in the session.

#### Parameters
- `session`: An object representing the user's session.

#### Returns
- A string representing the authentication provider, which can be `"google"`, `"phone"`, or `"email"`.
- Returns `null` if the session or user information is not available.

#### Logic
- Checks if the session and user exist.
- Searches for a Google identity in the user's identities.
- Returns `"google"` if a Google identity is found.
- Returns `"phone"` if the user has a phone number.
- Defaults to returning the provider from `app_metadata` or `"email"` if none of the above conditions are met.

### 2. `isAdminSession(session)`

#### Purpose
This function checks if the session belongs to an admin user.

#### Parameters
- `session`: An object representing the user's session.

#### Returns
- `true` if the session belongs to an admin user authenticated via email.
- `false` otherwise.

#### Logic
- Checks if the session and user exist.
- Retrieves the user's role from `app_metadata`.
- Confirms the role is `"admin"`.
- Verifies that the authentication provider is `"email"`.

### 3. `isPhoneAuthSession(session)`

#### Purpose
This function checks if the session is authenticated via a phone number.

#### Parameters
- `session`: An object representing the user's session.

#### Returns
- `true` if the authentication provider is `"phone"`.
- `false` otherwise.

#### Logic
- Utilizes `getAuthProviderFromSession(session)` to determine if the provider is `"phone"`.

### 4. `getGoogleEmailFromSession(session)`

#### Purpose
This function retrieves the user's email if the session is authenticated via Google.

#### Parameters
- `session`: An object representing the user's session.

#### Returns
- The user's email as a string if authenticated via Google.
- An empty string if the email is not available or the provider is not Google.

#### Logic
- Checks if the session, user, and email exist.
- Confirms the authentication provider is `"google"`.
- Returns the user's email if conditions are met.

### 5. `getLoginDisplayFromSession(session, verifiedMobile)`

#### Purpose
This function provides a display name for login purposes based on the session information or a verified mobile number.

#### Parameters
- `session`: An object representing the user's session.
- `verifiedMobile`: A string representing a verified mobile number.

#### Returns
- A formatted string with the verified mobile number if available.
- The user's email if no verified mobile is provided.
- Defaults to `"your account"` if neither is available.

#### Logic
- Checks if a verified mobile number is provided and returns it in a formatted string.
- Returns the user's email if available.
- Defaults to `"your account"` if neither a verified mobile nor an email is present.

## Conclusion

The `lib/authSession.js` file provides essential functions for interpreting and managing user authentication sessions. Each function is designed to extract specific information from the session object, allowing for flexible and secure handling of user authentication states.