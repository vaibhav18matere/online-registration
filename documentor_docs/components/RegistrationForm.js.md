# RegistrationForm Component Documentation

## Overview

The `RegistrationForm` component is a React component designed for handling user registration in a web application. It is built using React hooks and integrates with Supabase for authentication and data storage. The form is divided into multiple sections, each capturing different aspects of the user's information, such as personal details, contact information, academic records, payment details, and document uploads.

## Key Components and Imports

- **React Hooks**: The component utilizes `useState` and `useEffect` for managing state and side effects.
- **Next.js Router**: `useRouter` from `next/navigation` is used for navigation after form submission.
- **Supabase**: The component interacts with Supabase for user authentication and data storage.
- **Validation**: Functions `validateDraft` and `validateSubmit` are used to validate form data before saving or submitting.
- **Document Handling**: Functions and constants like `ADMISSION_DOCUMENTS` and `createInitialDocumentFiles` manage document uploads.
- **UI Classes**: Various CSS classes are imported from `../lib/uiClasses` to style the form elements.

## State Variables

- `formData`: Holds the current state of the form inputs.
- `existingUrls`: Stores URLs of previously uploaded documents.
- `files`: Manages the files uploaded by the user.
- `errors`: Tracks validation errors for form fields.
- `savingDraft` and `submitting`: Boolean flags indicating if the form is currently being saved as a draft or submitted.
- `status`: Stores the status message to be displayed to the user.
- `consentAccepted`: Boolean indicating if the user has accepted the terms and conditions.
- `declarationOpen`: Controls the visibility of the `DeclarationModal`.
- `registrationId` and `isSubmitted`: Track the registration ID and submission status.

## Form Sections

The form is divided into five main sections:

1. **Personal Details**: Captures the user's name, parent's names, date of birth, sex, nationality, religion, and caste information.
2. **Contact Details**: Collects the user's address, state, city, PIN code, mobile number, and email.
3. **Academic Details**: Records marks obtained in subjects like Physics, Chemistry, Biology, and English, along with the NEET score.
4. **Payment Details**: Allows the user to select a payment mode and upload a payment screenshot.
5. **Documents**: Facilitates the upload of required documents for admission.

## Key Functions

- `handleChange`: Updates `formData` based on user input and clears any existing errors for the changed field.
- `handlePinCodeChange`: Ensures the PIN code input contains only digits and is limited to 6 characters.
- `handleFileChange`: Updates the `files` state when a user uploads a file and clears any existing errors for the file input.
- `handleSaveDraft`: Validates the form data and saves it as a draft using Supabase.
- `handleSubmit`: Validates the form data and submits it, redirecting the user to the dashboard upon success.
- `renderFileContent`: Renders the content for file inputs, showing the file name or upload prompt.
- `renderFieldError`: Displays error messages for form fields.

## Validation

The component uses two validation functions:

- `validateDraft`: Validates the form data before saving it as a draft.
- `validateSubmit`: Validates the form data before final submission, ensuring all required fields are filled and files are uploaded.

## User Interface

The form is styled using a set of predefined CSS classes imported from `../lib/uiClasses`. It includes responsive design elements and provides feedback to the user through status messages and error highlights.

## Modal

The `DeclarationModal` component is used to display the terms and conditions. It is controlled by the `declarationOpen` state variable.

## Navigation

Upon successful submission, the user is redirected to the dashboard using the Next.js router.

## Conclusion

The `RegistrationForm` component is a comprehensive form handling solution for user registration, integrating validation, file uploads, and Supabase authentication. It is designed to provide a seamless user experience with clear feedback and error handling.