# DocumentChecklist Component Documentation

## Overview

The `DocumentChecklist` component is a React functional component designed to display a checklist of admission documents. It provides a visual representation of whether each document has been uploaded or is missing, based on the registration data provided to it. This component is part of a larger application, likely related to an admissions or registration system.

## Purpose

The primary purpose of the `DocumentChecklist` component is to render a list of required and optional documents for admission, indicating the upload status of each document. It provides a user-friendly interface to quickly assess which documents have been uploaded and which are still missing.

## Key Components

### Imports

- **`ADMISSION_DOCUMENTS`**: Imported from `../lib/documents`, this constant likely contains an array of document objects, each representing a document required for admission.
- **`DocumentActions`**: Imported from `./DocumentActions`, this component is used to provide actions related to each document, such as viewing or downloading the uploaded document.
- **`cardHoverClass` and `mergeClasses`**: Imported from `../lib/uiClasses`, these are utility functions/classes used for styling purposes.

### Component Function

- **`DocumentChecklist`**: This is the main functional component. It accepts a single prop:
  - `registration`: An object containing the registration data, which includes information about the uploaded documents.

### JSX Structure

- **`<ul>` Element**: The component returns an unordered list (`<ul>`) with the following classes:
  - `m-0 p-0 list-none grid gap-2`: These classes are used to style the list, removing default margins and padding, and setting it up as a grid with gaps between items.

- **Mapping Over `ADMISSION_DOCUMENTS`**: The component maps over the `ADMISSION_DOCUMENTS` array to generate a list item (`<li>`) for each document.

  - **`<li>` Element**: Each list item represents a document and includes:
    - **`key`**: Set to `doc.name`, ensuring each list item has a unique key.
    - **`className`**: Uses `mergeClasses` to combine multiple classes for styling:
      - Base classes: `"flex items-center justify-between gap-3 px-3.5 py-3 rounded-lg border-[1.5px]"`.
      - Conditional classes based on upload status:
        - `"border-success/50 bg-success-bg"` if the document is uploaded.
        - `"border-line bg-yellow-bg"` if the document is missing.
      - `cardHoverClass`: Additional styling for hover effects.

  - **Document Label**: Displays the document's label with conditional styling:
    - If the document is required, a red asterisk (`*`) is shown.
    - If optional, a hint is displayed in muted text.

  - **Upload Status**: Displays the upload status of the document:
    - If uploaded, shows "Uploaded" in green text and includes the `DocumentActions` component.
    - If missing, shows "Missing" in muted text.

### Conditional Logic

- **`uploaded` Variable**: Determines if a document has been uploaded by checking the `registration` object for the presence of a value at `doc.dbColumn`.

## How It Works

1. The component receives a `registration` object as a prop.
2. It iterates over the `ADMISSION_DOCUMENTS` array to render each document as a list item.
3. For each document, it checks if the document has been uploaded by evaluating the `registration` object.
4. It conditionally applies styles and displays different content based on whether the document is uploaded or missing.
5. The `DocumentActions` component is used to provide additional actions for uploaded documents.

This component effectively communicates the status of admission documents, aiding users in managing their document submissions.