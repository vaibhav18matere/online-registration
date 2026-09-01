# Documentation Guide for `lib/documents.js`

This document provides a detailed explanation of the `lib/documents.js` file, which is part of a JavaScript module designed to manage admission documents. The file exports a constant array of document objects and a function to initialize document files.

## Purpose

The primary purpose of this file is to define a set of admission documents required for a specific process, likely related to student admissions. It specifies the attributes of each document, such as its name, database column, label, and other relevant metadata. Additionally, it provides a utility function to create an initial state for these documents.

## Key Components

### 1. `ADMISSION_DOCUMENTS` Constant

This is an exported constant array containing objects, each representing a specific admission document. Each object in the array has the following properties:

- **name**: A string representing the unique identifier for the document.
- **dbColumn**: A string indicating the corresponding database column where the document's URL will be stored.
- **label**: A string that provides a human-readable label for the document.
- **required**: A boolean indicating whether the document is mandatory (`true`) or optional (`false`).
- **accept**: A string specifying the accepted file types for the document upload. It includes image formats and PDFs.
- **storageFolder**: A string indicating the folder where the document will be stored.
- **hint**: A string providing additional information about the document, such as file format and size limitations.
- **optionalHint**: A string that appears only for optional documents, providing additional context (e.g., "if available").

#### Example Document Object

```javascript
{
  name: "photograph",
  dbColumn: "photograph_url",
  label: "Color Passport Size Photo",
  required: true,
  accept: "image/*",
  storageFolder: "photos",
  hint: "JPG or PNG · up to 5MB",
}
```

### 2. `createInitialDocumentFiles` Function

This exported function initializes an object representing the initial state of document files. It iterates over the `ADMISSION_DOCUMENTS` array and sets each document's initial value to `null`. This function is useful for setting up a default state before any documents are uploaded.

#### Function Implementation

```javascript
export function createInitialDocumentFiles() {
  const files = {};
  ADMISSION_DOCUMENTS.forEach((doc) => {
    files[doc.name] = null;
  });
  return files;
}
```

#### How It Works

- **Initialization**: An empty object `files` is created.
- **Iteration**: The function iterates over each document object in the `ADMISSION_DOCUMENTS` array.
- **Assignment**: For each document, a property is added to the `files` object with the document's `name` as the key and `null` as the value.
- **Return**: The function returns the `files` object, which contains all document names initialized to `null`.

## Conclusion

The `lib/documents.js` file is a straightforward module that defines a set of admission documents and provides a utility function to initialize these documents' states. It is designed to facilitate the management of document uploads by specifying necessary metadata and creating an initial state for document handling.