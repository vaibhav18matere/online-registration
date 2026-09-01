# Documentation Guide for `LoginPage.js`

## Overview

The `LoginPage.js` file is a React component designed for user authentication in a web application. It provides two primary methods for users to sign in: via a mobile number with OTP (One-Time Password) verification and through Google authentication. This component is part of a Next.js application and utilizes Supabase for backend services.

## Key Components

### Imports

- **React Hooks**: `useEffect`, `useState` are used for managing component state and side effects.
- **Next.js Navigation**: `useRouter`, `useSearchParams` are used for routing and handling URL search parameters.
- **Supabase**: `getSupabase` is imported to interact with Supabase services.
- **Phone Authentication**: Functions like `isValidIndianMobile`, `normalizeMobileInput`, `sendPhoneOtp`, and `verifyPhoneOtp` are used for handling mobile number authentication.
- **Google Authentication**: `signInWithGoogle` is used for Google-based authentication.
- **UI Classes**: Various UI-related classes are imported for styling purposes.

### Constants

- **AUTH_ERROR_MESSAGES**: An object containing error messages related to authentication failures.

### Components

- **GoogleIcon**: A functional component that returns an SVG icon representing Google.

### Main Component: `LoginPage`

#### State Variables

- **`step`**: Tracks the current step in the authentication process (`"mobile"` or `"otp"`).
- **`mobile`**: Stores the user's mobile number input.
- **`otp`**: Stores the OTP input by the user.
- **`error`**: Stores any error messages to be displayed.
- **`sending`**: Boolean indicating if the OTP is being sent.
- **`verifying`**: Boolean indicating if the OTP is being verified.
- **`googleLoading`**: Boolean indicating if the Google sign-in process is ongoing.

#### Effects

- **`useEffect`**: Listens for changes in `authErrorCode` and sets the appropriate error message if an error code is present.

#### Event Handlers

- **`handleMobileChange`**: Normalizes and updates the mobile number input, clearing any existing errors.
- **`handleOtpChange`**: Updates the OTP input, ensuring it is numeric and up to 6 digits, and clears any existing errors.
- **`handleSendOtp`**: Validates the mobile number, sends an OTP using Supabase, and transitions to the OTP step.
- **`handleVerifyOtp`**: Validates the OTP, verifies it using Supabase, and redirects the user upon successful verification.
- **`handleGoogleSignIn`**: Initiates the Google sign-in process and handles any errors that occur.

#### Rendered Output

- **Main Container**: A `main` element that wraps the login form, styled for responsiveness and visual appeal.
- **Google Sign-In Button**: A button that triggers Google authentication, displaying a loading spinner when active.
- **Error Display**: A conditional block that displays error messages when present.
- **Mobile Number Form**: A form for entering and submitting a mobile number to receive an OTP.
- **OTP Verification Form**: A form for entering and verifying the received OTP, with an option to change the mobile number.

## How It Works

1. **Initial State**: The component initializes with the mobile number input step.
2. **Mobile Number Input**: Users enter their mobile number, which is validated and normalized. Upon submission, an OTP is sent.
3. **OTP Verification**: Users enter the OTP received on their mobile. The OTP is verified, and upon success, users are redirected to the specified path.
4. **Google Sign-In**: Users can alternatively sign in using their Google account. The process is initiated by clicking the Google sign-in button.
5. **Error Handling**: Any errors encountered during the authentication process are displayed to the user.

This component provides a seamless and user-friendly interface for authentication, leveraging both mobile OTP and Google sign-in methods.