# SiteFooter Component Documentation

## Overview

The `SiteFooter` component is a React functional component that renders the footer section of a web page. This component is designed to be used as part of a larger web application, specifically for the Kyrgyz Russian Slavic University's online registration portal. The footer provides branding and contact information for users seeking assistance.

## Purpose

The primary purpose of the `SiteFooter` component is to display a footer at the bottom of the web page. It includes the university's logo and some text information about the online registration portal and contact details for assistance.

## Key Components

### 1. `<footer>` Element

- **Class Names**: 
  - `mt-auto`: Ensures the footer is pushed to the bottom of the page.
  - `bg-yellow-soft/80`: Sets a semi-transparent yellow background color.
  - `backdrop-blur-sm`: Applies a small blur effect to the background.
  - `text-white`: Sets the text color to white.
  - `border-t border-line/60`: Adds a top border with a semi-transparent line color.

The `<footer>` element serves as the container for the entire footer content.

### 2. `<div>` Container

- **Class Names**:
  - `max-w-[1100px] mx-auto`: Centers the content and limits its maximum width to 1100 pixels.
  - `px-4 md:px-5 lg:px-6`: Provides responsive horizontal padding.
  - `py-7 md:py-9 pb-6 md:pb-7`: Provides responsive vertical padding.
  - `grid grid-cols-1 gap-5`: Uses a grid layout with a single column and a gap between grid items.

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
  - `bg-white shadow-sm`: Adds a white background and a small shadow effect.

#### Text Information

- **Paragraph 1**:
  - **Class Names**: 
    - `m-0`: Removes default margin.
    - `text-[13px] leading-relaxed text-red font-semibold`: Sets the font size, line height, color, and weight.
  - **Content**: "KRSU Online Registration Portal"

- **Paragraph 2**:
  - **Class Names**:
    - `mt-2 m-0`: Adds top margin and removes default margin.
    - `text-xs leading-relaxed text-text-muted`: Sets the font size, line height, and muted text color.
  - **Content**: "For assistance, contact the admissions office during working hours."

This section contains the university's logo and descriptive text about the online registration portal, including contact information for assistance.

## How It Works

The `SiteFooter` component is a simple, self-contained React component that returns a JSX structure. When rendered, it displays a footer with a logo and text information. The component uses Tailwind CSS classes for styling, ensuring a responsive and visually appealing design. The logo and text are aligned using a flexbox layout, providing a clean and organized appearance.

To use this component, simply import and include it in the desired location within your React application. It does not require any props or state management, making it straightforward to integrate into existing projects.