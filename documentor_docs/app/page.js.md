# Documentation Guide for `app/page.js`

This document provides a detailed explanation of the `app/page.js` file, which is a React component designed for a client-side rendered page using Next.js. The file is structured to present information about the Kyrgyz Russian Slavic University (KRSU) and its MBBS program, including application steps, university features, advantages, rankings, career prospects, and benefits of studying in Kyrgyzstan.

## Purpose

The primary purpose of this file is to render the homepage of the KRSU Medical Admissions website. It provides prospective students with information about the university, the MBBS program, and the application process. The page is interactive and adjusts its content based on the user's authentication status.

## Key Components

### Imports

- **`Link` from `next/link`**: Used for client-side navigation between pages.
- **`useEffect` from `react`**: A React hook used to perform side effects in function components.
- **`useStudentSession` from `../hooks/useStudentSession`**: A custom hook to manage student session state.
- **UI Classes**: Imported from `../lib/uiClasses` to style components consistently.

### Constants

- **`APPLICATION_STEPS`**: An array of objects detailing the steps involved in the application process.
- **`KEY_FEATURES`**: An array of strings highlighting the key features of the university.
- **`ADVANTAGES`**: An array of objects describing the advantages of studying MBBS at KRSU.
- **`RANKINGS`**: An array of objects listing the university's rankings in various categories.
- **`CAREER_LOCAL`**: An array of objects outlining career opportunities in Kyrgyzstan after graduation.
- **`CAREER_HOME`**: An array of objects detailing career prospects in the student's home country.
- **`BENEFITS`**: An array of objects explaining the benefits of studying MBBS in Kyrgyzstan.

### CSS Classes

Several CSS classes are defined to style different sections of the page:

- **`sectionEyebrowClass`**: Styles for section headers.
- **`sectionHeadingClass`**: Styles for section titles.
- **`sectionLeadClass`**: Styles for lead paragraphs.
- **`infoCardClass`**: Styles for informational cards.
- **`sectionAnchorClass`**: Styles for section anchors.

### `HomePage` Component

The `HomePage` component is the default export of the file and is responsible for rendering the entire page. It includes:

- **Session Management**: Uses `useStudentSession` to determine if the user is authenticated and sets the primary button's href and label accordingly.
- **`useEffect` Hook**: Handles smooth scrolling to sections based on URL hash.
- **JSX Structure**: The component returns a series of sections, each displaying different information about the university and the MBBS program.

#### Sections

1. **Hero Section**: Displays a banner with a call-to-action for admissions.
2. **Application Steps**: Lists the steps required to apply for the MBBS program.
3. **About the University**: Provides an overview of KRSU and its key features.
4. **MBBS Program**: Describes the MBBS program and its international recognition.
5. **Advantages**: Highlights the benefits of studying at KRSU.
6. **Rankings**: Displays the university's rankings in various categories.
7. **Career Prospects**: Outlines career opportunities after graduation, both locally and internationally.
8. **Benefits of Studying in Kyrgyzstan**: Lists the advantages of pursuing an MBBS in Kyrgyzstan.
9. **Counseling Section**: Encourages students to start their application process.

### Links

The page includes several `Link` components for navigation:

- **Primary Button**: Directs users to either the dashboard or login page based on authentication status.
- **Secondary Button**: Directs users to the application start page.

## How It Works

The `HomePage` component uses React and Next.js features to render a dynamic and interactive page. It leverages client-side routing with `next/link` and manages session state with a custom hook. The component is styled using a combination of imported CSS classes and inline styles, ensuring a consistent and visually appealing layout.

The use of arrays and mapping functions allows for easy updates and maintenance of the content displayed on the page. Each section is clearly defined and styled, providing a comprehensive overview of the university and its offerings to prospective students.