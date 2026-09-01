# Documentation Guide for `lib/formState.js`

This document provides a detailed explanation of the `lib/formState.js` file, which is part of a JavaScript codebase. This file is responsible for managing the state of a form, particularly in the context of a registration process. It includes the initial state of the form, functions to transform registration data into form data, extract URLs from registration data, and retrieve verified mobile numbers from a session. Additionally, it defines labels for different registration statuses.

## Table of Contents

1. [Imports](#imports)
2. [Initial Form State](#initial-form-state)
3. [Functions](#functions)
   - [registrationToFormData](#registrationtoformdata)
   - [existingUrlsFromRegistration](#existingurlsfromregistration)
   - [getVerifiedMobileFromSession](#getverifiedmobilefromsession)
4. [Registration Status Labels](#registration-status-labels)

## Imports

The file imports the following modules and functions:

- `DEFAULT_NATIONALITY` from `./formOptions`: This constant is used to set the default nationality in the form state.
- `ADMISSION_DOCUMENTS` from `./documents`: This array is used to map document names to their corresponding database columns.
- `mobileFromE164` from `./phoneAuth`: This function is used to convert a phone number from E.164 format.

## Initial Form State

The `initialFormState` object defines the default state of the form. It includes various fields related to personal information, contact details, academic scores, and payment information. Each field is initialized with an empty string, except for `nationality`, which is set to `DEFAULT_NATIONALITY`.

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

## Functions

### `registrationToFormData`

This function transforms a `registration` object into a form data object. If the `registration` object is not provided, it returns a copy of the `initialFormState`. For each field in the form, it assigns the corresponding value from the `registration` object, or a default value if the field is not present.

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

### `existingUrlsFromRegistration`

This function extracts URLs related to payment and admission documents from a `registration` object. It returns an object where each key corresponds to a document name, and each value is the URL from the `registration` object or `null` if not present.

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

### `getVerifiedMobileFromSession`

This function retrieves a verified mobile number from a `session` object. It uses the `mobileFromE164` function to convert the phone number from E.164 format. If the phone number is not available, it returns an empty string.

```javascript
export function getVerifiedMobileFromSession(session) {
  if (!session?.user?.phone) {
    return "";
  }
  return mobileFromE164(session.user.phone);
}
```

## Registration Status Labels

The `REGISTRATION_STATUS_LABELS` object defines human-readable labels for different registration statuses. These labels are used to describe the current state of a registration process.

```javascript
export const REGISTRATION_STATUS_LABELS = {
  draft: "Draft — not yet submitted",
  submitted: "Submitted",
  under_review: "Under review",
  approved: "Approved",
  rejected: "Rejected",
};
```

This concludes the documentation for the `lib/formState.js` file. The file is designed to handle form state management, data transformation, and status labeling in a registration context.