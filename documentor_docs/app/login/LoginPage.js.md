# Documentation Guide for `LoginPage.js`

## Overview

The `LoginPage.js` file is a React component designed for user authentication in a web application. It provides two primary methods for users to sign in: via a mobile number with OTP (One-Time Password) verification and through Google authentication. This component is part of a Next.js application and utilizes Supabase for backend services.

## Key Components and Functions

### Imports

- **React Hooks**: `useEffect`, `useState` are used for managing component state and side effects.
- **Next.js Navigation**: `useRouter`, `useSearchParams` are used for routing and handling URL query parameters.
- **Supabase**: `getSupabase` is imported to interact with the Supabase backend.
- **Phone Authentication**: Functions like `isValidIndianMobile`, `normalizeMobileInput`, `sendPhoneOtp`, and `verifyPhoneOtp` are used for handling mobile number authentication.
- **Google Authentication**: `signInWithGoogle` is used for Google-based authentication.
- **UI Classes**: Various UI-related classes are imported for styling purposes.

### Constants

- **`AUTH_ERROR_MESSAGES`**: An object that maps error codes to user-friendly error messages related to authentication failures.

### Components

#### `GoogleIcon`

A functional component that returns an SVG icon representing Google. This icon is used in the Google sign-in button.

#### `LoginPage`

The main component that handles the login functionality. It includes:

- **State Variables**:
  - `step`: Tracks the current step in the login process (`"mobile"` or `"otp"`).
  - `mobile`: Stores the user's mobile number input.
  - `otp`: Stores the OTP input by the user.
  - `error`: Holds any error messages to be displayed.
  - `sending`, `verifying`, `googleLoading`: Boolean flags to indicate loading states for sending OTP, verifying OTP, and Google sign-in, respectively.

- **Effect Hook**:
  - `useEffect`: Listens for changes in `authErrorCode` and sets an error message if an error code is present in the URL.

- **Event Handlers**:
  - `handleMobileChange`: Normalizes and updates the mobile number input.
  - `handleOtpChange`: Updates the OTP input, ensuring it is numeric and limited to 6 digits.
  - `handleSendOtp`: Validates the mobile number and sends an OTP using Supabase.
  - `handleVerifyOtp`: Validates the OTP and verifies it using Supabase.
  - `handleGoogleSignIn`: Initiates Google sign-in using Supabase.

### Rendered Output

The component renders a login form with the following features:

- **Google Sign-In Button**: Allows users to sign in using their Google account. Displays a loading spinner when processing.
- **Error Display**: Shows error messages when authentication fails.
- **Mobile Number Form**: Allows users to enter their mobile number and request an OTP.
- **OTP Form**: Allows users to enter the received OTP for verification.
- **Change Number Button**: Allows users to go back to the mobile number input step.

### Styling

The component uses a combination of imported UI classes and inline styles to achieve a responsive and visually appealing design.

## How It Works

1. **Initial State**: The component initializes with the mobile number input step.
2. **Mobile Number Input**: Users enter their mobile number, which is validated and normalized.
3. **Send OTP**: Upon submitting the mobile number, an OTP is sent to the user's phone if the number is valid.
4. **OTP Input**: Users enter the OTP received on their phone.
5. **Verify OTP**: The entered OTP is verified, and upon success, the user is redirected to the specified path.
6. **Google Sign-In**: Users can alternatively sign in using their Google account, which redirects them upon successful authentication.

This component effectively manages user authentication through mobile OTP and Google sign-in, providing a seamless user experience with error handling and loading states.