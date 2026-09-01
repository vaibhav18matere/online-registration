# Documentation Guide for `app/layout.js`

This document provides a detailed explanation of the `app/layout.js` file, which is a part of a web application for the Kyrgyz Russian Slavic University (KRSU) Online Registration Portal. This file is responsible for defining the root layout of the application, including the structure and styling of the main HTML document.

## Purpose

The `app/layout.js` file serves as the root layout component for the application. It defines the overall structure of the HTML document, including the head and body sections. This layout is used to wrap the entire application, providing a consistent look and feel across all pages.

## Key Components

### Imports

- **`"./globals.css"`**: This import statement includes global CSS styles that are applied throughout the application.
- **`{ SiteHeader }`**: This component, imported from `../components/SiteHeader`, represents the header section of the site.
- **`{ SiteFooter }`**: This component, imported from `../components/SiteFooter`, represents the footer section of the site.
- **`{ AppThemeProvider }`**: This component, imported from `../components/AppThemeProvider`, is used to provide theme-related context to the application.

### Metadata

The `metadata` object contains information about the application:

- **`title`**: The title of the application, "KRSU Online Registration Portal".
- **`description`**: A brief description of the application, highlighting its purpose as an online medical admissions portal for KRSU.
- **`icons`**: An object specifying the icons used in the application, including the main icon, Apple touch icon, and shortcut icon, all pointing to `/krsu-logo.jpg`.

### Viewport

The `viewport` object defines the viewport settings for the application:

- **`width`**: Set to "device-width", ensuring the application scales to the width of the device.
- **`initialScale`**: Set to 1, indicating the initial zoom level.
- **`maximumScale`**: Set to 5, allowing users to zoom in up to 5 times.
- **`viewportFit`**: Set to "cover", ensuring the viewport covers the entire screen.

### `RootLayout` Function

The `RootLayout` function is the default export of the file. It defines the structure of the HTML document:

- **`<html lang="en">`**: The root HTML element with the language set to English.
- **`<head>`**: Contains links to external resources:
  - Preconnects to Google Fonts for performance optimization.
  - Links to Google Fonts stylesheets for the "Source Serif 4" and "Inter" fonts.
- **`<body>`**: The main body of the document, wrapped in the `AppThemeProvider` component to provide theme context.
  - **`<div className="min-h-screen min-h-dvh flex flex-col">`**: A container div with classes for minimum height and flexbox layout.
    - **`<SiteHeader />`**: The header component of the site.
    - **`{children}`**: A placeholder for the main content of the page, passed as a prop to the `RootLayout` function.
    - **`<SiteFooter />`**: The footer component of the site.

## How It Works

The `RootLayout` function is used to wrap the entire application, providing a consistent layout structure. It includes a header and footer, with the main content dynamically inserted via the `children` prop. The layout also incorporates global styles and theme context, ensuring a cohesive appearance across the application. The metadata and viewport settings enhance the application's accessibility and responsiveness.