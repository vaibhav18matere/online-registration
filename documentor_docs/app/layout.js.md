# Documentation Guide for `app/layout.js`

This document provides a detailed explanation of the `app/layout.js` file, which is a critical component of the KRSU Online Registration Portal. This file is responsible for defining the root layout of the application, including the structure and styling of the HTML document.

## Purpose

The primary purpose of the `app/layout.js` file is to define the root layout of the web application. It sets up the HTML structure, includes necessary metadata, and incorporates global styles and components that are used throughout the application. This file ensures that the application has a consistent look and feel and provides a foundation for rendering the application's content.

## Key Components

### Imports

- **`"./globals.css"`**: This import statement includes global CSS styles that are applied across the entire application.
- **`{ SiteHeader }`**: This component, imported from `../components/SiteHeader`, represents the header section of the site.
- **`{ SiteFooter }`**: This component, imported from `../components/SiteFooter`, represents the footer section of the site.
- **`{ AppThemeProvider }`**: This component, imported from `../components/AppThemeProvider`, is used to provide theme-related context to the application.

### Metadata

The `metadata` object contains information about the application:

- **`title`**: The title of the application, "KRSU Online Registration Portal".
- **`description`**: A brief description of the application, highlighting its purpose as an online medical admissions portal for Kyrgyz Russian Slavic University (KRSU).
- **`icons`**: Specifies the icons used for the application, including the main icon, Apple touch icon, and shortcut icon, all pointing to `/krsu-logo.jpg`.

### Viewport

The `viewport` object defines the viewport settings for the application:

- **`width`**: Set to "device-width", ensuring the application scales to the width of the device.
- **`initialScale`**: Set to 1, indicating the initial zoom level.
- **`maximumScale`**: Set to 5, allowing users to zoom in up to 5 times.
- **`viewportFit`**: Set to "cover", ensuring the viewport covers the entire screen.

### `RootLayout` Function

The `RootLayout` function is the default export of the file and defines the structure of the HTML document:

- **Parameters**: Accepts a `children` prop, which represents the content to be rendered within the layout.
- **HTML Structure**:
  - `<html lang="en">`: Sets the language of the document to English.
  - `<head>`: Contains links to preconnect to Google Fonts and includes the stylesheet for the fonts "Source Serif 4" and "Inter".
  - `<body>`: Wraps the main content of the application.
    - **`<AppThemeProvider>`**: Wraps the content to provide theme context.
    - **`<div className="min-h-screen min-h-dvh flex flex-col">`**: A container div that ensures the content takes up the minimum height of the screen and uses flexbox for layout.
      - **`<SiteHeader />`**: Renders the site header.
      - **`{children}`**: Renders the passed-in children content.
      - **`<SiteFooter />`**: Renders the site footer.

## How It Works

The `app/layout.js` file sets up the foundational layout for the application. It imports necessary global styles and components, defines metadata and viewport settings, and structures the HTML document. The `RootLayout` function ensures that the application has a consistent header and footer, and it provides a flexible area for rendering dynamic content through the `children` prop. The use of `AppThemeProvider` allows for consistent theming across the application.