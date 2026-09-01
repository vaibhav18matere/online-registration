# Documentation Guide for `lib/formState.js`

This document provides a detailed explanation of the `lib/formState.js` file, which is part of a JavaScript codebase. This file is responsible for managing the state of a form, particularly in the context of a registration process. It includes the initial state of the form, functions to transform registration data into form data, extract URLs from registration data, and retrieve verified mobile numbers from a session. Additionally, it defines labels for different registration statuses.

## Table of Contents

1. [Purpose](#purpose)
2. [Key Components](#key-components)
   - [Imports](#imports)
   - [Initial Form State](#initial-form-state)
   - [Functions](#functions)
     - [registrationToFormData](#registrationtoformdata)
     - [existingUrlsFromRegistration](#existingurlsfromregistration)
     - [getVerifiedMobileFromSession](#getverifiedmobilefromsession)
   - [Registration Status Labels](#registration-status-labels)
3. [How It Works](#how-it-works)

## Purpose

The primary purpose of the `lib/formState.js` file is to define and manage the state of a registration form. It provides utility functions to handle form data transformation and extraction of specific information from registration and session objects.

## Key Components

### Imports

The file imports the following modules and constants:

- `DEFAULT_NATIONALITY` from `./formOptions`: A default value for the nationality field in the form.
- `ADMISSION_DOCUMENTS` from `./documents`: An array of document objects used to extract URLs from registration data.
- `mobileFromE164` from `./phoneAuth`: A function to convert a phone number from E.164 format.

### Initial Form State

```javascript
export const initialFormState = {
  full_name: "",
  father_name: "",
  mother_name: "",
  address: "",
  city: "",
  pin_code: "",
  state: "",
  father_mobile: "",
  mobile: "",
  sex: "",
  nationality: DEFAULT_NATIONALITY,
  email: "",
  dob: "",
  birth_place: "",
  religion: "",
  caste: "",
  sub_caste: "",
  physics_marks: "",
  chemistry_marks: "",
  biology_marks: "",
  english_marks: "",
  neet_score: "",
  payment_mode: "",
  utr_number: "",
};
```

The `initialFormState` object defines the default state of the registration form. Each field is initialized with an empty string, except for `nationality`, which is set to `DEFAULT_NATIONALITY`.

### Functions

#### `registrationToFormData`

```javascript
export function registrationToFormData(registration) {
  if (!registration) {
    return { ...initialFormState };
  }

  return {
    full_name: registration.full_name || "",
    father_name: registration.father_name || "",
    mother_name: registration.mother_name || "",
    address: registration.address || "",
    city: registration.city || "",
    pin_code: registration.pin_code || "",
    state: registration.state || "",
    father_mobile: registration.father_mobile || "",
    mobile: registration.mobile || "",
    sex: registration.sex || "",
    nationality: registration.nationality || DEFAULT_NATIONALITY,
    email: registration.email || "",
    dob: registration.dob || "",
    birth_place: registration.birth_place || "",
    religion: registration.religion || "",
    caste: registration.caste || "",
    sub_caste: registration.sub_caste || "",
    physics_marks: registration.physics_marks != null ? String(registration.physics_marks) : "",
    chemistry_marks: registration.chemistry_marks != null ? String(registration.chemistry_marks) : "",
    biology_marks: registration.biology_marks != null ? String(registration.biology_marks) : "",
    english_marks: registration.english_marks != null ? String(registration.english_marks) : "",
    neet_score: registration.neet_score != null ? String(registration.neet_score) : "",
    payment_mode: registration.payment_mode || "",
    utr_number: registration.utr_number || "",
  };
}
```

This function transforms a `registration` object into a form data object. If the `registration` object is not provided, it returns the `initialFormState`. For each field, it assigns the value from the `registration` object if available, otherwise defaults to an empty string or `DEFAULT_NATIONALITY` for nationality. Marks and scores are converted to strings if they are not null.

#### `existingUrlsFromRegistration`

```javascript
export function existingUrlsFromRegistration(registration) {
  if (!registration) {
    return {};
  }

  const urls = {
    payment_screenshot: registration.payment_screenshot_url || null,
  };

  ADMISSION_DOCUMENTS.forEach((doc) => {
    urls[doc.name] = registration[doc.dbColumn] || null;
  });

  return urls;
}
```

This function extracts URLs related to admission documents from a `registration` object. It initializes an `urls` object with a `payment_screenshot` URL and iterates over `ADMISSION_DOCUMENTS` to populate URLs for each document based on the `registration` data.

#### `getVerifiedMobileFromSession`

```javascript
export function getVerifiedMobileFromSession(session) {
  if (!session?.user?.phone) {
    return "";
  }
  return mobileFromE164(session.user.phone);
}
```

This function retrieves a verified mobile number from a `session` object. If the session or phone number is not available, it returns an empty string. Otherwise, it converts the phone number from E.164 format using the `mobileFromE164` function.

### Registration Status Labels

```javascript
export const REGISTRATION_STATUS_LABELS = {
  draft: "Draft — not yet submitted",
  submitted: "Submitted",
  under_review: "Under review",
  approved: "Approved",
  rejected: "Rejected",
};
```

This object defines labels for different registration statuses, providing a human-readable description for each status.

## How It Works

The `lib/formState.js` file provides a structured way to manage form data and related operations in a registration process. It initializes the form state with default values and offers utility functions to transform and extract data from registration and session objects. The file also defines labels for registration statuses, aiding in the display of status information in a user interface.