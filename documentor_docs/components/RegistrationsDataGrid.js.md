# RegistrationsDataGrid.js Documentation

## Overview

The `RegistrationsDataGrid.js` file is a React component that provides a data grid interface for displaying and managing registration data. It utilizes the Material-UI library, specifically the `DataGrid` component from `@mui/x-data-grid`, to render a table with various columns representing different attributes of a registration. The component also includes functionality for viewing uploaded documents and payment screenshots associated with each registration.

## Key Components

### Imports

- **React Hooks**: `useMemo`, `useState` are used for memoizing data and managing component state.
- **Material-UI Components**: 
  - `DataGrid` for rendering the data grid.
  - `Box`, `Chip`, `Dialog`, `DialogContent`, `DialogTitle`, `IconButton`, `Typography` for UI elements.
- **Icons**: `CloseIcon`, `FolderOpenOutlinedIcon` for button icons.
- **Constants and Components**:
  - `ADMISSION_DOCUMENTS` from `../lib/documents` for document metadata.
  - `DocumentActions` from `./DocumentActions` for handling document-related actions.

### Helper Functions

- **`getUploadedDocuments(registration)`**: Filters and returns documents that have been uploaded based on the `ADMISSION_DOCUMENTS` configuration.
- **`getDocumentFileEntries(registration)`**: Maps uploaded documents to a format suitable for display, including `id`, `label`, `url`, and `downloadLabel`.
- **`getPaymentScreenshotFileEntries(registration)`**: Returns an array with payment screenshot details if available.

### Components

#### `RegistrationFilesDialog`

A dialog component that displays a list of files (documents or payment screenshots) associated with a registration. It includes:

- **Props**: `registration`, `title`, `subtitle`, `files`, `emptyMessage`, `open`, `onClose`.
- **UI Elements**: 
  - `Dialog` for the modal window.
  - `DialogTitle` for the title and close button.
  - `DialogContent` for displaying the list of files or an empty message.

#### `FilePreviewCell`

A component that displays a preview of the number of files uploaded. It includes:

- **Props**: `fileCount`, `ariaLabel`, `onOpen`.
- **UI Elements**: 
  - `Chip` to show the count of uploaded files.
  - `IconButton` with `FolderOpenOutlinedIcon` to trigger the opening of the file dialog.

#### `StatusChip`

A component that displays the status of a registration as a chip with color coding. It includes:

- **Props**: `status`.
- **Color Mapping**: Maps registration statuses to specific colors.

### Main Component: `RegistrationsDataGrid`

The primary component that renders the data grid. It includes:

- **State Management**: 
  - `filesModal` state to manage the visibility and content of the file dialog.
- **Functions**:
  - `openFilesModal(registration, modalConfig)`: Opens the file dialog with specified configuration.
  - `closeFilesModal()`: Closes the file dialog.
- **Data Processing**:
  - `rows`: Memoized array of registration data with additional computed fields.
  - `columns`: Memoized array of column definitions for the data grid.
- **Rendering**:
  - Displays a message if there are no registrations.
  - Renders the `DataGrid` with specified rows, columns, and configurations.
  - Includes the `RegistrationFilesDialog` for file viewing.

## How It Works

1. **Data Preparation**: The component processes the `registrations` prop to create `rows` with additional computed fields like `city_state`.
2. **Column Definitions**: Defines columns for the data grid, including custom renderers for status and file preview cells.
3. **File Dialog Management**: Uses state to manage the visibility and content of the file dialog, allowing users to view uploaded documents and payment screenshots.
4. **Rendering**: Renders the data grid with pagination, sorting, and custom styling. Displays a dialog for file viewing when triggered.

This component provides a comprehensive interface for managing registration data, with features for viewing associated documents and payment information.