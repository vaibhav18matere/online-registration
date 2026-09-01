# Documentation Guide for `lib/formOptions.js`

This document provides a detailed explanation of the `lib/formOptions.js` file, which is part of a JavaScript codebase. This file contains constants and a function that are likely used for form-related operations, such as setting default values and validating input data.

## Purpose

The primary purpose of the `lib/formOptions.js` file is to define and export constants and a utility function that can be used in form handling. These exports include a list of religions, a default nationality, a default course, and a function to calculate the latest allowed birth date.

## Key Components

### 1. `RELIGIONS`

```javascript
export const RELIGIONS = [
  "Hinduism",
  "Islam",
  "Christianity",
  "Sikhism",
  "Buddhism",
  "Jainism",
  "Zoroastrianism (Parsi)",
  "Judaism",
  "Other",
];
```

- **Description**: This is an array of strings representing different religions. It is exported as a constant named `RELIGIONS`.
- **Usage**: This array can be used to populate a dropdown or selection field in a form where users are required to select their religion.

### 2. `DEFAULT_NATIONALITY`

```javascript
export const DEFAULT_NATIONALITY = "Indian";
```

- **Description**: This is a string constant that holds the default nationality value, which is "Indian".
- **Usage**: This constant can be used to set a default value for a nationality field in a form.

### 3. `DEFAULT_COURSE`

```javascript
export const DEFAULT_COURSE = "Medical";
```

- **Description**: This is a string constant that holds the default course value, which is "Medical".
- **Usage**: This constant can be used to set a default value for a course selection field in a form.

### 4. `getLatestAllowedBirthDate`

```javascript
export function getLatestAllowedBirthDate() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
```

- **Description**: This function calculates and returns the latest allowed birth date as a string in the format `YYYY-MM-DD`.
- **Logic**:
  - It creates a new `Date` object representing the current date.
  - It subtracts one day from the current date to ensure the birth date is not set to the current day.
  - It extracts the year, month, and day from the adjusted date.
  - It formats the month and day to always be two digits by padding with a leading zero if necessary.
  - It returns the formatted date string.
- **Usage**: This function can be used to validate birth date inputs in a form, ensuring that the date entered is not later than the day before the current date.

## Conclusion

The `lib/formOptions.js` file provides essential constants and a utility function for form handling, specifically for setting default values and validating date inputs. The exports from this file can be integrated into form components to enhance user experience by providing predefined options and ensuring valid input data.