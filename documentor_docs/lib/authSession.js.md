# Documentation Guide for `lib/authSession.js`

This document provides a detailed explanation of the `lib/authSession.js` file, which contains utility functions for handling user authentication sessions. The functions in this file are designed to extract and interpret authentication-related information from a session object.

## Overview

The `lib/authSession.js` file exports five functions that help determine the authentication provider, check user roles, and retrieve user information from a session object. These functions are:

1. `getAuthProviderFromSession(session)`
2. `isAdminSession(session)`
3. `isPhoneAuthSession(session)`
4. `getGoogleEmailFromSession(session)`
5. `getLoginDisplayFromSession(session, verifiedMobile)`

Each function is designed to work with a session object that contains user information, including identities, phone numbers, and metadata.

## Functions

### 1. `getAuthProviderFromSession(session)`

**Purpose:**  
Determines the authentication provider used by the user in the session.

**Parameters:**  
- `session`: An object that may contain user information.

**Returns:**  
- A string representing the authentication provider: `"google"`, `"phone"`, or `"email"`.
- Returns `null` if the session or user information is not available.

**Logic:**  
- Checks if the session and user exist.
- Searches for a Google identity in the user's identities.
- Returns `"google"` if a Google identity is found.
- Returns `"phone"` if the user has a phone number.
- Defaults to returning the provider from `app_metadata` or `"email"` if none of the above conditions are met.

### 2. `isAdminSession(session)`

**Purpose:**  
Checks if the session belongs to an admin user authenticated via email.

**Parameters:**  
- `session`: An object that may contain user information.

**Returns:**  
- `true` if the user is an admin and authenticated via email.
- `false` otherwise.

**Logic:**  
- Verifies the existence of the session and user.
- Checks if the user's role in `app_metadata` is `"admin"`.
- Confirms that the authentication provider is `"email"`.

### 3. `isPhoneAuthSession(session)`

**Purpose:**  
Determines if the session is authenticated via phone.

**Parameters:**  
- `session`: An object that may contain user information.

**Returns:**  
- `true` if the authentication provider is `"phone"`.
- `false` otherwise.

**Logic:**  
- Utilizes `getAuthProviderFromSession(session)` to check if the provider is `"phone"`.

### 4. `getGoogleEmailFromSession(session)`

**Purpose:**  
Retrieves the user's email if authenticated via Google.

**Parameters:**  
- `session`: An object that may contain user information.

**Returns:**  
- The user's email as a string if authenticated via Google.
- An empty string if not authenticated via Google or if the email is unavailable.

**Logic:**  
- Checks for the existence of the user's email.
- Confirms that the authentication provider is `"google"` before returning the email.

### 5. `getLoginDisplayFromSession(session, verifiedMobile)`

**Purpose:**  
Provides a display string for the user's login information.

**Parameters:**  
- `session`: An object that may contain user information.
- `verifiedMobile`: A string representing a verified mobile number.

**Returns:**  
- A formatted string with the verified mobile number if provided.
- The user's email if available.
- Defaults to `"your account"` if neither a verified mobile number nor an email is available.

**Logic:**  
- Prioritizes displaying the verified mobile number.
- Falls back to displaying the user's email.
- Defaults to a generic message if neither is available.

## Conclusion

The `lib/authSession.js` file provides essential functions for interpreting and managing user authentication sessions. By extracting and analyzing session data, these functions help determine the authentication method, user roles, and display relevant user information.