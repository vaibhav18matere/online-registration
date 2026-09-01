# Documentation Guide for `lib/documents.js`

This document provides a detailed explanation of the `lib/documents.js` file, which is part of a JavaScript module designed to manage admission documents. The file exports a constant array of document objects and a function to initialize document files. Below, we will explore the purpose, key components, and functionality of this file.

## Purpose

The primary purpose of the `lib/documents.js` file is to define a structured list of admission documents required for a particular process, such as student admissions. It also provides a utility function to create an initial state for these documents, which can be used in applications to manage document uploads or storage.

## Key Components

### 1. `ADMISSION_DOCUMENTS` Array

The `ADMISSION_DOCUMENTS` is an exported constant array containing objects. Each object represents a specific document required for admission. The structure of each document object includes the following properties:

- **name**: A unique identifier for the document (e.g., `"photograph"`).
- **dbColumn**: The corresponding database column name where the document's URL will be stored (e.g., `"photograph_url"`).
- **label**: A human-readable label for the document (e.g., `"Color Passport Size Photo"`).
- **required**: A boolean indicating whether the document is mandatory (`true`) or optional (`false`).
- **accept**: A string specifying the accepted file types for the document (e.g., `"image/*"` for images or `"image/*,application/pdf"` for images and PDFs).
- **storageFolder**: The folder where the document will be stored (e.g., `"photos"` or `"documents"`).
- **hint**: A string providing additional information about the document's requirements, such as file type and size (e.g., `"JPG or PNG · up to 5MB"`).
- **optionalHint**: An optional string providing additional context for optional documents (e.g., `"if available"`).

### 2. `createInitialDocumentFiles` Function

The `createInitialDocumentFiles` function is an exported utility function that initializes an object representing the initial state of document files. The function works as follows:

- It creates an empty object named `files`.
- It iterates over each document in the `ADMISSION_DOCUMENTS` array.
- For each document, it adds a property to the `files` object with the document's `name` as the key and `null` as the value.
- It returns the `files` object, which can be used to track the upload status or presence of each document.

## How It Works

1. **Document Definition**: The `ADMISSION_DOCUMENTS` array defines the necessary documents for admission, specifying their attributes and requirements.

2. **Initialization**: The `createInitialDocumentFiles` function provides a mechanism to initialize the document files' state. This is useful in applications where you need to manage the upload or presence of these documents, as it sets up a structure where each document is initially set to `null`.

3. **Usage**: In a broader application context, this module can be imported to access the list of documents and initialize their state. The `ADMISSION_DOCUMENTS` array can be used to render forms or validate document uploads, while the `createInitialDocumentFiles` function can be used to manage the state of these documents in a user interface or backend system.

This documentation provides a comprehensive overview of the `lib/documents.js` file, ensuring accurate understanding and usage of its components.