# DeclarationModal Component Documentation

## Overview

The `DeclarationModal` component is a React component designed to display a modal dialog that presents an undertaking and declaration to the user. This component is intended to be used in a client-side environment, as indicated by the `"use client";` directive at the top of the file. The modal can be opened or closed based on the `isOpen` prop, and it provides a mechanism to close the modal via a close button or by pressing the "Escape" key.

## Purpose

The primary purpose of the `DeclarationModal` component is to present a set of declarations or undertakings to the user in a modal format. It ensures that the user acknowledges the content by providing an "I have read this" button, which closes the modal when clicked.

## Key Components

### Props

- **`isOpen`**: A boolean prop that determines whether the modal is open or closed. If `true`, the modal is displayed; if `false`, the modal is not rendered.
- **`onClose`**: A function prop that is called to close the modal. This function is invoked when the user clicks the close button, clicks outside the modal content, or presses the "Escape" key.

### useEffect Hook

The `useEffect` hook is used to manage side effects related to the modal's open state:

- When the modal is open (`isOpen` is `true`), the `useEffect` hook:
  - Disables scrolling on the body by setting `document.body.style.overflow` to `"hidden"`.
  - Adds an event listener for the "keydown" event to close the modal when the "Escape" key is pressed.
- When the modal is closed or unmounted, the `useEffect` hook:
  - Restores the body's overflow style to its default state.
  - Removes the "keydown" event listener.

### Modal Structure

- **Backdrop**: The modal includes a backdrop that covers the entire viewport with a semi-transparent background and a slight blur effect. Clicking on the backdrop triggers the `onClose` function.
- **Dialog**: The modal dialog is a centered container with a yellow background and rounded corners. It contains the following sections:
  - **Header**: Displays the title "Undertaking and Declaration" and a close button ("X") that triggers the `onClose` function.
  - **Content**: Displays the introductory text (`declarationIntro`) and a list of declaration points (`declarationPoints`). The content is scrollable if it exceeds the available height.
  - **Footer**: Contains a button labeled "I have read this" that triggers the `onClose` function when clicked.

### Styling

The component uses a combination of Tailwind CSS classes and custom styles to achieve its layout and appearance. Key styles include:

- **Backdrop**: `bg-[rgba(20,16,12,0.55)]` for the semi-transparent background and `backdrop-blur-[2px]` for the blur effect.
- **Dialog**: `bg-yellow-soft` for the background color, `border-line` for the border color, and `shadow-md` for the shadow effect.
- **Text**: Uses `text-white` and `text-white/90` for text color, with responsive font sizes for different screen sizes.

## How It Works

1. **Rendering**: The component renders nothing if `isOpen` is `false`. If `isOpen` is `true`, it renders the modal with the backdrop and dialog.
2. **Event Handling**: The component listens for the "Escape" key press and backdrop clicks to close the modal by calling the `onClose` function.
3. **Content Display**: The modal displays the introductory text and a list of declaration points, which are imported from `../lib/declarationContent`.
4. **User Interaction**: The user can close the modal by clicking the close button, clicking outside the dialog, or pressing the "Escape" key. The "I have read this" button also closes the modal.

This component is designed to be reusable and can be integrated into any React application where a declaration modal is needed.