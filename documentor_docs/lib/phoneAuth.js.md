# Documentation Guide for `lib/phoneAuth.js`

This document provides a detailed explanation of the `lib/phoneAuth.js` file, which is designed to handle mobile phone authentication processes, specifically for Indian mobile numbers. The file includes functions for normalizing, validating, and formatting mobile numbers, as well as sending and verifying OTPs (One-Time Passwords) using the Supabase authentication service.

## Purpose

The primary purpose of this file is to facilitate mobile phone authentication by providing utility functions to:

1. Normalize and validate Indian mobile numbers.
2. Convert mobile numbers to and from the E.164 international format.
3. Send and verify OTPs using Supabase's authentication service.

## Key Components

### Constants

- **`MOBILE_REGEX`**: A regular expression pattern (`/^[6-9]\d{9}$/`) used to validate Indian mobile numbers. It ensures that the number starts with a digit between 6 and 9 and is followed by exactly 9 other digits, making a total of 10 digits.

### Functions

1. **`normalizeMobileInput(value)`**

   - **Purpose**: Strips non-digit characters from the input and truncates the result to the first 10 digits.
   - **Parameters**: 
     - `value` (string): The input string representing a mobile number.
   - **Returns**: A string containing only the first 10 digits of the input.

2. **`isValidIndianMobile(mobile)`**

   - **Purpose**: Validates whether a given mobile number matches the Indian mobile number format.
   - **Parameters**: 
     - `mobile` (string): The mobile number to validate.
   - **Returns**: A boolean indicating whether the mobile number is valid according to the `MOBILE_REGEX`.

3. **`toE164IndianMobile(mobile)`**

   - **Purpose**: Converts a valid Indian mobile number to the E.164 international format by prefixing it with `+91`.
   - **Parameters**: 
     - `mobile` (string): The mobile number to convert.
   - **Returns**: A string representing the mobile number in E.164 format.

4. **`mobileFromE164(e164Phone)`**

   - **Purpose**: Extracts the local mobile number from an E.164 formatted phone number.
   - **Parameters**: 
     - `e164Phone` (string): The E.164 formatted phone number.
   - **Returns**: A string representing the local mobile number without the `+91` prefix. Returns an empty string if the input is falsy.

5. **`sendPhoneOtp(supabase, mobile)`**

   - **Purpose**: Sends an OTP to the specified mobile number using Supabase's authentication service.
   - **Parameters**: 
     - `supabase` (object): The Supabase client instance.
     - `mobile` (string): The mobile number to which the OTP should be sent.
   - **Returns**: None. Throws an error if the OTP sending process fails.

6. **`verifyPhoneOtp(supabase, mobile, token)`**

   - **Purpose**: Verifies the OTP for the specified mobile number using Supabase's authentication service.
   - **Parameters**: 
     - `supabase` (object): The Supabase client instance.
     - `mobile` (string): The mobile number for which the OTP is being verified.
     - `token` (string): The OTP token to verify.
   - **Returns**: The data returned by Supabase upon successful verification. Throws an error if the verification process fails.

## How It Works

1. **Normalization and Validation**: The `normalizeMobileInput` function is used to clean and prepare the mobile number input by removing non-digit characters and ensuring it is no longer than 10 digits. The `isValidIndianMobile` function checks if the cleaned number conforms to the expected format for Indian mobile numbers.

2. **Formatting**: The `toE164IndianMobile` and `mobileFromE164` functions handle the conversion between local Indian mobile numbers and the international E.164 format, which is necessary for international communication standards.

3. **OTP Handling**: The `sendPhoneOtp` function sends an OTP to the user's mobile number using Supabase's authentication service, while the `verifyPhoneOtp` function checks the validity of the OTP provided by the user.

This file is essential for applications that require mobile number verification and authentication, particularly in the context of Indian mobile numbers.