# SiteFooter Component Documentation

## Overview

The `SiteFooter` component is a React functional component that renders the footer section of a web page. It is designed to provide a visually appealing and informative footer for the Kyrgyz Russian Slavic University's online registration portal. The footer includes the university's logo and some text information regarding the portal and contact details for assistance.

## Purpose

The primary purpose of the `SiteFooter` component is to display a footer at the bottom of the web page. It serves as a branding element by including the university's logo and provides users with essential information about the online registration portal and contact details for further assistance.

## Key Components

### 1. `<footer>` Element

- **Class Names**: 
  - `mt-auto`: Ensures the footer is pushed to the bottom of the page.
  - `bg-yellow-soft/80`: Applies a soft yellow background color with 80% opacity.
  - `backdrop-blur-sm`: Adds a small blur effect to the background.
  - `text-white`: Sets the text color to white.
  - `border-t border-line/60`: Adds a top border with a line color at 60% opacity.

The `<footer>` element serves as the container for the entire footer content.

### 2. `<div>` Container

- **Class Names**:
  - `max-w-[1100px] mx-auto`: Centers the content and limits its maximum width to 1100 pixels.
  - `px-4 md:px-5 lg:px-6`: Provides padding on the x-axis, with responsive adjustments for medium (`md`) and large (`lg`) screens.
  - `py-7 md:py-9 pb-6 md:pb-7`: Provides padding on the y-axis, with responsive adjustments for medium screens.
  - `grid grid-cols-1 gap-5`: Utilizes a grid layout with a single column and a gap of 5 units between grid items.

This `<div>` acts as a wrapper for the content within the footer, ensuring proper spacing and alignment.

### 3. Logo and Text Section

#### Logo

- **Element**: `<img>`
- **Attributes**:
  - `src="/krsu-logo.jpg"`: Specifies the path to the university's logo image.
  - `alt="Kyrgyz Russian Slavic University logo"`: Provides alternative text for the image.
  - `width={40}` and `height={40}`: Sets the dimensions of the image.
- **Class Names**:
  - `shrink-0`: Prevents the image from shrinking.
  - `w-10 h-10`: Sets the width and height to 10 units.
  - `rounded-lg`: Applies rounded corners to the image.
  - `object-cover`: Ensures the image covers the allocated space while maintaining aspect ratio.
  - `bg-white`: Sets the background color to white.
  - `shadow-sm`: Adds a small shadow effect to the image.

#### Text Information

- **Text Elements**:
  - **Portal Name**: 
    - `<p>` element with class `m-0 text-[13px] leading-relaxed text-red font-semibold` displays the name "KRSU Online Registration Portal" in red, bold text with a relaxed line height.
  - **Contact Information**:
    - `<p>` element with class `mt-2 m-0 text-xs leading-relaxed text-text-muted` provides contact information in muted text color with a relaxed line height.

The logo and text section is organized using a flexbox layout (`flex items-start gap-3`) to align the logo and text side by side with a gap of 3 units.

## How It Works

The `SiteFooter` component is a simple, self-contained component that can be imported and used in any React application to display a footer. It uses Tailwind CSS classes for styling, ensuring a responsive and visually consistent design. The component does not accept any props or manage any state, making it a static component that renders the same content every time it is used.

To use the `SiteFooter` component, simply import it into the desired file and include it in the JSX as follows:

```jsx
import { SiteFooter } from './components/SiteFooter';

function App() {
  return (
    <div className="App">
      {/* Other components */}
      <SiteFooter />
    </div>
  );
}
```

This will render the footer at the bottom of the page, providing users with the university's branding and contact information for the online registration portal.