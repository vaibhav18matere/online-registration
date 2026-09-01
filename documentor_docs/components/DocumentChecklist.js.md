# DocumentChecklist Component Documentation

## Overview

The `DocumentChecklist` component is a React functional component designed to display a checklist of admission documents. It provides a visual representation of whether each document has been uploaded or is missing, and includes actions for uploaded documents.

## Purpose

The primary purpose of the `DocumentChecklist` component is to render a list of admission documents, indicating their upload status and providing actions for documents that have been uploaded. This component is useful in scenarios where users need to verify which documents have been submitted as part of a registration or admission process.

## Key Components

### Imports

- **`ADMISSION_DOCUMENTS`**: Imported from `../lib/documents`, this constant presumably contains an array of document objects that define the documents required for admission.
- **`DocumentActions`**: Imported from `./DocumentActions`, this component is used to render actions related to each document, such as viewing or downloading the uploaded document.
- **`cardHoverClass` and `mergeClasses`**: Imported from `../lib/uiClasses`, these are utility functions/classes used for styling purposes.

### Component Definition

- **`DocumentChecklist`**: This is the main functional component that takes a `registration` prop. The `registration` prop is expected to be an object containing the upload status of each document.

### JSX Structure

- **`<ul>` Element**: The component returns an unordered list (`<ul>`) with CSS classes for styling. It uses a grid layout with no margin or padding and a gap between items.

- **Mapping Over `ADMISSION_DOCUMENTS`**: The component iterates over the `ADMISSION_DOCUMENTS` array using the `map` function. For each document, it checks if the document has been uploaded by evaluating the presence of a corresponding property in the `registration` object.

- **`<li>` Element**: Each document is represented by a list item (`<li>`) with a unique `key` based on the document's name. The list item is styled conditionally based on whether the document is uploaded or missing:
  - **Uploaded**: If the document is uploaded, the list item has a green border and background.
  - **Missing**: If the document is missing, the list item has a yellow border and background.

- **Document Label**: Each list item displays the document's label. If the document is required, a red asterisk is shown next to the label. If optional, a hint is displayed in muted text.

- **Upload Status and Actions**: 
  - If the document is uploaded, the status "Uploaded" is displayed in green text, and the `DocumentActions` component is rendered with the document's URL and label.
  - If the document is missing, the status "Missing" is displayed in muted text.

## How It Works

1. **Data Source**: The component relies on the `ADMISSION_DOCUMENTS` array to determine which documents need to be displayed. Each document object in this array should have properties like `name`, `dbColumn`, `label`, `required`, and `optionalHint`.

2. **Registration Prop**: The `registration` prop is an object that contains the upload status of each document. The presence of a document's `dbColumn` in this object indicates that the document has been uploaded.

3. **Conditional Styling**: The component uses conditional logic to apply different styles and content based on whether a document is uploaded or missing.

4. **Document Actions**: For uploaded documents, the `DocumentActions` component is used to provide additional functionality, such as viewing or downloading the document.

This component is a straightforward implementation for displaying a checklist of documents with their upload status, making it easy for users to track their document submissions.