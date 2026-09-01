# Documentation for `lib/validation.js`

This document provides a detailed explanation of the `lib/validation.js` file, which is responsible for validating user input data and files in a specific application context. The validation logic ensures that the data meets certain criteria before it is processed further.

## Purpose

The primary purpose of this file is to validate user input data and associated files for an application process. It checks for required fields, validates data formats, and ensures that uploaded files meet specific criteria. This validation is crucial to maintain data integrity and ensure that the application process runs smoothly.

## Key Components

### Imports

- **`ADMISSION_DOCUMENTS`**: Imported from `./documents`, this constant likely contains a list of required documents for admission.
- **`INDIAN_STATES` and `isValidStateCity`**: Imported from `./indiaLocations`, these are used to validate state and city information.

### Functions

#### `isRequiredValue(val)`

- **Purpose**: Checks if a value is defined, not null, and not an empty string after trimming.
- **Usage**: Used throughout the validation process to ensure that required fields are not empty.

#### `validateFile(file, fieldName, label, errors)`

- **Purpose**: Validates an uploaded file's type and size.
- **Parameters**:
  - `file`: The file to be validated.
  - `fieldName`: The name of the field associated with the file.
  - `label`: A human-readable label for the field.
  - `errors`: An object to store error messages.
- **Logic**:
  - Checks if the file type is one of the allowed types (`image/jpeg`, `image/png`, `image/webp`, `application/pdf`).
  - Ensures the file size is under 5MB.
  - Adds an error message to `errors` if validation fails.

#### `validateCommonFields(data, errors, options)`

- **Purpose**: Validates common fields such as full name, mobile number, and email.
- **Parameters**:
  - `data`: The data object containing user input.
  - `errors`: An object to store error messages.
  - `options`: An object containing additional validation options.
- **Logic**:
  - Checks for required fields: full name, mobile number, and email.
  - Validates the format of the mobile number and email.
  - Ensures the mobile number matches a verified number if required.
  - Checks for consent acceptance if required.

#### `validateDraft(data, authOptions)`

- **Purpose**: Validates a draft version of the data.
- **Parameters**:
  - `data`: The data object containing user input.
  - `authOptions`: Options related to authentication, such as mobile number verification.
- **Logic**:
  - Calls `validateCommonFields` with specific options.
  - Returns an object containing any validation errors.

#### `validateSubmit(data, files, consentAccepted, existingUrls, authOptions)`

- **Purpose**: Validates the data and files for submission.
- **Parameters**:
  - `data`: The data object containing user input.
  - `files`: An object containing files to be validated.
  - `consentAccepted`: A boolean indicating if consent has been accepted.
  - `existingUrls`: An object containing URLs of existing files.
  - `authOptions`: Options related to authentication.
- **Logic**:
  - Checks for required fields and validates their formats.
  - Validates specific fields like mobile numbers, PIN codes, state, city, date of birth, and marks.
  - Ensures that required files are uploaded and meet validation criteria.
  - Returns an object containing any validation errors.

#### `validateForm(data, files, consentAccepted)`

- **Purpose**: A deprecated function that validates the form using `validateSubmit`.
- **Parameters**:
  - `data`: The data object containing user input.
  - `files`: An object containing files to be validated.
  - `consentAccepted`: A boolean indicating if consent has been accepted.
- **Note**: This function is marked as deprecated and should be replaced with `validateSubmit` using `authOptions`.

## How It Works

The validation process involves checking each field and file against predefined criteria. Errors are collected in an `errors` object, which is returned at the end of the validation process. This object can then be used to inform the user of any issues that need to be corrected before proceeding.

The file provides a robust mechanism for ensuring that all necessary data is present and correctly formatted, which is essential for maintaining the integrity of the application process.