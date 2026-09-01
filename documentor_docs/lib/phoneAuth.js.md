# Documentation Guide for `lib/phoneAuth.js`

This document provides a detailed explanation of the `lib/phoneAuth.js` file, which is designed to handle mobile phone authentication processes, specifically for Indian mobile numbers. The file includes functions for normalizing, validating, and formatting mobile numbers, as well as sending and verifying OTPs (One-Time Passwords) using the Supabase authentication service.

## Purpose

The primary purpose of this file is to facilitate mobile phone authentication by providing utility functions to:

1. Normalize mobile input.
2. Validate Indian mobile numbers.
3. Convert mobile numbers to and from the E.164 format.
4. Send and verify OTPs using Supabase.

## Key Components

### Constants

- **`MOBILE_REGEX`**: A regular expression pattern (`/^[6-9]\d{9}$/`) used to validate Indian mobile numbers. It ensures that the number starts with a digit between 6 and 9 and is followed by exactly 9 other digits, making a total of 10 digits.

### Functions

1. **`normalizeMobileInput(value)`**

   - **Purpose**: Strips non-digit characters from the input and limits the length to 10 digits.
   - **Parameters**: 
     - `value` (string): The input mobile number string.
   - **Returns**: A string containing only the first 10 digits of the input.

2. **`isValidIndianMobile(mobile)`**

   - **Purpose**: Validates whether a given mobile number matches the Indian mobile number format.
   - **Parameters**: 
     - `mobile` (string): The mobile number to validate.
   - **Returns**: A boolean indicating whether the mobile number is valid.

3. **`toE164IndianMobile(mobile)`**

   - **Purpose**: Converts a mobile number to the E.164 format with the Indian country code.
   - **Parameters**: 
     - `mobile` (string): The mobile number to convert.
   - **Returns**: A string in the format `+91` followed by the mobile number.

4. **`mobileFromE164(e164Phone)`**

   - **Purpose**: Extracts the mobile number from an E.164 formatted string.
   - **Parameters**: 
     - `e164Phone` (string): The E.164 formatted phone number.
   - **Returns**: A string containing the mobile number without the country code. Returns an empty string if the input is falsy.

5. **`sendPhoneOtp(supabase, mobile)`**

   - **Purpose**: Sends an OTP to the specified mobile number using Supabase.
   - **Parameters**: 
     - `supabase` (object): The Supabase client instance.
     - `mobile` (string): The mobile number to which the OTP will be sent.
   - **Returns**: None. Throws an error if the OTP sending fails.

6. **`verifyPhoneOtp(supabase, mobile, token)`**

   - **Purpose**: Verifies the OTP for the specified mobile number using Supabase.
   - **Parameters**: 
     - `supabase` (object): The Supabase client instance.
     - `mobile` (string): The mobile number for which the OTP is being verified.
     - `token` (string): The OTP token to verify.
   - **Returns**: The data returned by Supabase upon successful verification. Throws an error if verification fails.

## How It Works

- **Normalization and Validation**: The `normalizeMobileInput` function ensures that the input is a clean 10-digit number, while `isValidIndianMobile` checks if the number conforms to the Indian mobile number format.
- **Formatting**: The `toE164IndianMobile` and `mobileFromE164` functions handle conversion to and from the E.164 format, which is necessary for international phone number standards.
- **OTP Handling**: The `sendPhoneOtp` and `verifyPhoneOtp` functions interact with Supabase to send and verify OTPs, facilitating secure authentication processes.

This file is essential for applications that require mobile number authentication, particularly in the Indian context, leveraging Supabase's authentication capabilities.