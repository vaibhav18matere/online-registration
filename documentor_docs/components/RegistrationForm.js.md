# RegistrationForm Component Documentation

## Overview

The `RegistrationForm` component is a React component designed to handle the registration process for users. It provides a multi-step form interface for users to input their personal, contact, academic, payment, and document details. The form supports saving drafts and submitting the final application. It also includes validation and error handling to ensure data integrity.

## Key Components and Imports

- **React Hooks**: Utilizes `useState` and `useEffect` for managing component state and side effects.
- **Next.js Router**: Uses `useRouter` from `next/navigation` for navigation after form submission.
- **Supabase**: Interacts with Supabase for authentication and data storage.
- **Validation**: Imports `validateDraft` and `validateSubmit` for form validation.
- **Document Management**: Manages document uploads and existing document URLs.
- **UI Classes**: Uses a set of predefined CSS classes for styling.

## Component Props

- `registration`: An object containing existing registration data.
- `verifiedMobile`: A string representing the verified mobile number.
- `isPhoneLogin`: A boolean indicating if the login is via phone.
- `googleEmail`: A string representing the user's Google email.

## State Variables

- `formData`: Stores the current form data.
- `existingUrls`: Stores URLs of previously uploaded documents.
- `files`: Manages file uploads for documents.
- `errors`: Stores validation errors for form fields.
- `savingDraft`: Boolean indicating if the draft is being saved.
- `submitting`: Boolean indicating if the form is being submitted.
- `status`: Stores the status message for form actions.
- `consentAccepted`: Boolean indicating if the user has accepted the terms.
- `declarationOpen`: Boolean indicating if the declaration modal is open.
- `registrationId`: Stores the ID of the current registration.
- `isSubmitted`: Boolean indicating if the form has been submitted.

## Functions

### `handleChange`

Handles changes to form input fields. Updates `formData` and clears any existing errors for the changed field.

### `handlePinCodeChange`

Handles changes to the PIN code field, ensuring only numeric input and a maximum of 6 digits.

### `handleFileChange`

Handles file input changes, updating the `files` state and clearing any existing errors for the file field.

### `handleSaveDraft`

Saves the current form data as a draft. Validates the form data and interacts with Supabase to save the draft. Updates the status message based on the success or failure of the operation.

### `handleSubmit`

Submits the form data. Validates the form data and interacts with Supabase to submit the registration. Redirects to the dashboard upon successful submission.

### `renderFileContent`

Renders the content for file inputs, displaying the file name if uploaded or existing URL if available.

### `renderFieldError`

Renders error messages for form fields if validation errors exist.

### `sectionHeader`

Renders the header for each form section, including the step number, title, and subtitle.

## Form Sections

The form is divided into five sections:

1. **Personal Details**: Collects personal information such as name, date of birth, and nationality.
2. **Contact Details**: Collects contact information including address and mobile number.
3. **Academic Details**: Collects academic information such as marks obtained in various subjects.
4. **Payment Details**: Collects payment information and proof of payment.
5. **Documents**: Allows users to upload necessary documents for admission.

## User Interaction

- **Navigation**: Users can navigate between form sections using a navigation bar.
- **Validation**: Form fields are validated on change and submission, with errors displayed inline.
- **Draft Saving**: Users can save their progress as a draft and continue later.
- **Submission**: Users can submit the form once all required fields are completed and the terms are accepted.

## Modals

- **DeclarationModal**: Displays the terms and conditions that users must accept before submitting the form.

## Styling

The component uses a set of predefined CSS classes for consistent styling across form elements, error messages, and status banners.

## Conclusion

The `RegistrationForm` component is a comprehensive form handling solution for user registration, providing features for data entry, validation, draft saving, and submission. It ensures a smooth user experience with clear navigation and feedback mechanisms.