# Documentation Guide for `RegistrationsDataGrid.js`

## Overview

The `RegistrationsDataGrid.js` file is a React component that provides a data grid interface for displaying and managing registration data. It utilizes the Material-UI library, specifically the `DataGrid` component from `@mui/x-data-grid`, to render a table with various functionalities such as sorting, pagination, and custom cell rendering. The component also includes dialogs for viewing uploaded documents and payment screenshots associated with each registration.

## Key Components

### Imports

- **React Hooks**: `useMemo`, `useState` from React for managing component state and memoizing values.
- **Material-UI Components**: 
  - `DataGrid` for rendering the data grid.
  - `Box`, `Chip`, `Dialog`, `DialogContent`, `DialogTitle`, `IconButton`, `Typography` for UI elements.
- **Icons**: `CloseIcon`, `FolderOpenOutlinedIcon` for button icons.
- **Constants and Components**:
  - `ADMISSION_DOCUMENTS` from `../lib/documents` for document metadata.
  - `DocumentActions` from `./DocumentActions` for handling document-related actions.

### Helper Functions

- **`getUploadedDocuments(registration)`**: Filters and returns documents that have been uploaded based on the `ADMISSION_DOCUMENTS` configuration.
- **`getDocumentFileEntries(registration)`**: Maps uploaded documents to an array of file entry objects containing `id`, `label`, `url`, and `downloadLabel`.
- **`getPaymentScreenshotFileEntries(registration)`**: Returns an array with a single file entry for the payment screenshot if it exists.

### Components

#### `RegistrationFilesDialog`

- **Purpose**: Displays a dialog with a list of files (documents or payment screenshots) associated with a registration.
- **Props**:
  - `registration`: The registration object.
  - `title`: Title of the dialog.
  - `subtitle`: Subtitle of the dialog.
  - `files`: Array of file entries to display.
  - `emptyMessage`: Message to display if no files are available.
  - `open`: Boolean indicating if the dialog is open.
  - `onClose`: Function to close the dialog.
- **Structure**: Uses `Dialog`, `DialogTitle`, and `DialogContent` to structure the dialog. Displays a list of files or an empty message if no files are present.

#### `FilePreviewCell`

- **Purpose**: Renders a cell in the data grid that shows the number of uploaded files and provides a button to open the file dialog.
- **Props**:
  - `fileCount`: Number of files uploaded.
  - `ariaLabel`: Accessibility label for the button.
  - `onOpen`: Function to open the file dialog.

#### `StatusChip`

- **Purpose**: Displays a status chip with a color corresponding to the registration status.
- **Props**:
  - `status`: The status of the registration.
- **Functionality**: Maps status values to specific colors and formats the label.

### Main Component: `RegistrationsDataGrid`

- **Purpose**: Renders a data grid with registration data and provides functionality to view associated documents and payment screenshots.
- **Props**:
  - `registrations`: Array of registration objects to display in the grid.
- **State**:
  - `filesModal`: State to manage the open/close status and content of the file dialog.
- **Functions**:
  - `openFilesModal(registration, modalConfig)`: Opens the file dialog with the specified registration and configuration.
  - `closeFilesModal()`: Closes the file dialog.
- **Data Grid Configuration**:
  - **Rows**: Derived from `registrations`, with additional computed fields like `city_state`.
  - **Columns**: Configured with fields such as `created_at`, `full_name`, `status`, `mobile`, `email`, `city_state`, `pcb_total`, `neet_score`, `payment_mode`, `utr_number`, `payment_screenshot_url`, and `documents`. Custom renderers are used for `status`, `payment_screenshot_url`, and `documents` columns.
  - **Styling**: Custom styles applied to various parts of the data grid for consistent theming.

## Usage

The `RegistrationsDataGrid` component is designed to be used in applications where registration data needs to be displayed and managed. It provides a user-friendly interface for viewing detailed information about each registration, including uploaded documents and payment screenshots. The component is highly customizable through its props and can be integrated into larger applications that require data management capabilities.