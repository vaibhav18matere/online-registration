# Documentation Guide for `app/page.js`

This document provides a detailed explanation of the `app/page.js` file, which is a React component designed for a client-side rendered application using Next.js. The component serves as the homepage for an MBBS admissions portal for Kyrgyz Russian Slavic University (KRSU). It includes various sections that provide information about the university, the MBBS program, application steps, and career prospects.

## Purpose

The primary purpose of this file is to render the homepage of the KRSU Medical Admissions portal. It provides prospective students with information about the university, the benefits of studying there, and the steps required to apply for the MBBS program. The page is interactive and adjusts its content based on the user's authentication status.

## Key Components

### Imports

- **`Link` from `next/link`**: Used for client-side navigation between pages.
- **`useEffect` from `react`**: A React hook used to perform side effects in function components.
- **`useStudentSession` from `../hooks/useStudentSession`**: A custom hook that manages the student's session state.
- **UI Classes**: Imported from `../lib/uiClasses` to style components consistently.

### Constants

- **`APPLICATION_STEPS`**: An array of objects detailing the steps required to apply for the MBBS program.
- **`KEY_FEATURES`**: An array of strings highlighting the key features of the university.
- **`ADVANTAGES`**: An array of objects describing the advantages of studying MBBS at KRSU.
- **`RANKINGS`**: An array of objects listing the university's rankings in various categories.
- **`CAREER_LOCAL` and `CAREER_HOME`**: Arrays of objects outlining career prospects locally in Kyrgyzstan and in the student's home country, respectively.
- **`BENEFITS`**: An array of objects detailing the benefits of studying MBBS in Kyrgyzstan.

### CSS Classes

Several CSS classes are defined as constants to maintain consistent styling across the component. These include:

- `sectionEyebrowClass`
- `sectionHeadingClass`
- `sectionLeadClass`
- `infoCardClass`
- `sectionAnchorClass`

### `HomePage` Component

The `HomePage` component is the default export of the file. It is a functional component that renders the homepage content. Key features include:

- **Session Management**: Uses the `useStudentSession` hook to determine if the user is authenticated and adjusts the primary button's link and label accordingly.
- **Smooth Scrolling**: Implements smooth scrolling to sections based on the URL hash using the `useEffect` hook.
- **Sections**: The component is divided into several sections, each providing specific information:
  - **Hero Section**: Displays a banner with a call-to-action for admissions.
  - **Application Steps**: Lists the steps required to apply for the program.
  - **About the University**: Provides an overview of KRSU and its key features.
  - **MBBS Program**: Describes the MBBS program and its international recognition.
  - **Advantages**: Highlights the benefits of studying at KRSU.
  - **Rankings**: Displays the university's rankings in various categories.
  - **Career Prospects**: Outlines potential career paths after graduation.
  - **Benefits of Studying in Kyrgyzstan**: Lists the advantages of studying MBBS in Kyrgyzstan.
  - **Counseling Section**: Encourages users to start their application or seek counseling.

### Interactivity

- **Navigation Links**: Uses `Link` components for navigation, allowing users to move between the homepage, login, and application pages.
- **Responsive Design**: The layout adjusts for different screen sizes using CSS grid and flexbox.

## How It Works

1. **Session Check**: The component checks if the user is authenticated using the `useStudentSession` hook. Based on the authentication status, it sets the primary button's link and label to either direct the user to the dashboard or prompt them to log in.

2. **Smooth Scrolling**: The `useEffect` hook listens for changes in the URL hash and scrolls smoothly to the corresponding section if a hash is present.

3. **Rendering Sections**: The component renders multiple sections, each populated with data from the constants defined at the top of the file. These sections provide detailed information about the university, application process, and benefits of studying at KRSU.

4. **Styling**: The component uses predefined CSS classes to ensure consistent styling across different sections and elements.

This documentation provides a comprehensive overview of the `app/page.js` file, explaining its purpose, key components, and functionality without introducing any elements not present in the code.