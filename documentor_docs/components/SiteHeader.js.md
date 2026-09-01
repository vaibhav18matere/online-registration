# SiteHeader Component Documentation

## Overview

The `SiteHeader` component is a React component designed to serve as the header for a web application. It provides navigation links, handles user authentication states, and supports both desktop and mobile views. The component is built using Next.js and React hooks to manage state and side effects.

## Key Components and Functionality

### Imports

- **Image** and **Link** from `next/image` and `next/link`: Used for rendering images and navigation links.
- **usePathname** from `next/navigation`: Retrieves the current pathname for routing logic.
- **useEffect**, **useId**, and **useState** from React: Used for managing component state and side effects.
- **useStudentSession** from a custom hook: Manages user session state, including authentication and admin status.

### Constants

- **navLinkClass**: A string containing CSS classes for styling navigation links in the header.
- **mobileMenuLinkClass**: A string containing CSS classes for styling navigation links in the mobile menu.
- **SECTION_LINKS**: An array of objects defining section links with `href` and `label` properties for navigation.

### Component Logic

- **State Management**:
  - `menuOpen`: A boolean state to track whether the mobile menu is open.
  - `menuId`: A unique ID for the mobile menu, generated using `useId`.

- **Effect Hooks**:
  - **Close Menu on Pathname Change**: Closes the mobile menu whenever the pathname changes.
  - **Disable Body Scroll on Menu Open**: Disables body scrolling when the mobile menu is open and restores it when closed. Also listens for the "Escape" key to close the menu.

- **Functions**:
  - **closeMenu**: Sets `menuOpen` to `false` to close the mobile menu.
  - **toggleMenu**: Toggles the `menuOpen` state to open or close the mobile menu.
  - **handleSectionNavigate**: Handles navigation to section links, closes the menu, and scrolls to the target section smoothly if on the homepage.

### Rendered Output

- **Header**: A sticky header with a logo and navigation links.
  - **Logo**: Displays the KRSU logo with a link to the homepage.
  - **Mobile Menu Button**: A button to toggle the mobile menu, with an animated hamburger icon.
  - **Navigation Links**: Conditionally rendered based on user authentication and admin status.
    - **Desktop Navigation**: Displays links for "Dashboard", "Login", "Application", "Apply Now", "Admin", and "Logout" based on session state.
    - **Mobile Navigation**: Similar links as desktop, but rendered in a collapsible menu.

- **Mobile Menu**: A modal-like overlay that appears when `menuOpen` is `true`.
  - **Overlay**: A semi-transparent background that closes the menu when clicked.
  - **Menu Content**: Contains section links and account-related links, similar to the desktop navigation.

## Usage

The `SiteHeader` component is intended to be used at the top of a page layout to provide consistent navigation and branding across the application. It adapts to different screen sizes and user authentication states, ensuring a responsive and personalized user experience.

## Notes

- The component relies on the `useStudentSession` hook to determine user authentication and admin status.
- The component uses CSS classes for styling, which are assumed to be defined elsewhere in the application.
- The component assumes the presence of specific routes and elements (e.g., section IDs) for navigation and scrolling functionality.