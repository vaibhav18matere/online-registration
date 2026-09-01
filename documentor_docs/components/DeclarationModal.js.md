# DeclarationModal Component Documentation

## Overview

The `DeclarationModal` component is a React component designed to display a modal dialog that presents an undertaking and declaration to the user. This component is intended to be used in a client-side environment, as indicated by the `"use client";` directive at the top of the file. The modal can be opened or closed based on the `isOpen` prop, and it provides a mechanism to close the modal via a button or by pressing the "Escape" key.

## Purpose

The primary purpose of the `DeclarationModal` component is to present a list of declaration points to the user in a modal format. It ensures that the user acknowledges the content by providing an "I have read this" button to close the modal.

## Key Components

### Props

- **`isOpen`**: A boolean prop that determines whether the modal is visible. If `true`, the modal is displayed; if `false`, the modal is hidden.
- **`onClose`**: A function prop that is called to close the modal. This function is invoked when the user clicks the close button, clicks outside the modal content, or presses the "Escape" key.

### useEffect Hook

The `useEffect` hook is used to manage side effects related to the modal's visibility:

- When the modal is open (`isOpen` is `true`), the `useEffect` hook:
  - Disables scrolling on the body by setting `document.body.style.overflow` to `"hidden"`.
  - Adds an event listener for the "keydown" event to close the modal when the "Escape" key is pressed.
- When the modal is closed (`isOpen` is `false`), the effect cleans up by:
  - Restoring the body's overflow style.
  - Removing the "keydown" event listener.

### Modal Structure

- **Backdrop**: A semi-transparent backdrop that covers the entire viewport. Clicking on this backdrop will trigger the `onClose` function.
- **Dialog**: The main content area of the modal, styled with a yellow background and rounded corners. It contains:
  - **Header**: Displays the title "Undertaking and Declaration" and a close button ("X") that triggers the `onClose` function.
  - **Content**: Displays the introductory text (`declarationIntro`) and a list of declaration points (`declarationPoints`).
  - **Footer**: Contains a button labeled "I have read this" that also triggers the `onClose` function.

### Styling

The component uses a combination of Tailwind CSS classes and custom styles to achieve its appearance. Key styling features include:

- Fixed positioning to ensure the modal covers the entire viewport.
- Responsive design with adjustments for small and larger screens.
- A backdrop with a blur effect and semi-transparent background.
- A yellow-themed dialog with white text for contrast.

## How It Works

1. **Rendering**: The component renders nothing if `isOpen` is `false`. If `isOpen` is `true`, it renders the modal structure.
2. **Event Handling**: The modal listens for click events on the backdrop and the close button, as well as "keydown" events for the "Escape" key, to trigger the `onClose` function.
3. **Content Display**: The modal displays introductory text and a list of declaration points, which are imported from `../lib/declarationContent`.
4. **User Interaction**: The user can close the modal by clicking the close button, clicking outside the modal content, or pressing the "Escape" key.

This component is designed to be reusable and can be integrated into any React application where a declaration modal is needed.