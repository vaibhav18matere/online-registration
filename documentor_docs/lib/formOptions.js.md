# Documentation Guide for `lib/formOptions.js`

This document provides a detailed explanation of the `lib/formOptions.js` file, which is part of a JavaScript codebase. This file contains constants and a function that are likely used for form handling, specifically for selecting options related to religion, nationality, and course, as well as calculating a date constraint.

## Purpose

The primary purpose of the `lib/formOptions.js` file is to define and export constants and a utility function that can be used in form handling. These exports include a list of religions, a default nationality, a default course, and a function to determine the latest allowed birth date.

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

- **Description**: `RELIGIONS` is an array of strings, each representing a different religion. This array is exported as a constant and can be used to populate a dropdown or selection list in a form where users can select their religion.
- **Usage**: This constant can be imported into other modules or components where a list of religions is required for user selection.

### 2. `DEFAULT_NATIONALITY`

```javascript
export const DEFAULT_NATIONALITY = "Indian";
```

- **Description**: `DEFAULT_NATIONALITY` is a string constant that holds the value `"Indian"`. It represents the default nationality that might be pre-selected or used as a placeholder in a form.
- **Usage**: This constant can be used to set a default value for nationality fields in forms.

### 3. `DEFAULT_COURSE`

```javascript
export const DEFAULT_COURSE = "Medical";
```

- **Description**: `DEFAULT_COURSE` is a string constant with the value `"Medical"`. It indicates the default course selection, which might be used in educational or professional forms.
- **Usage**: This constant can be used to set a default course option in forms where users need to select or specify their course of study.

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

- **Description**: `getLatestAllowedBirthDate` is a function that calculates and returns the latest allowed birth date as a string in the format `YYYY-MM-DD`. The function subtracts one day from the current date to ensure that the birth date is not set to the current day.
- **Usage**: This function can be used in forms where a birth date is required, ensuring that the selected date is not set to the current day, which might be a requirement for certain applications.

## How It Works

- **Constants**: The constants `RELIGIONS`, `DEFAULT_NATIONALITY`, and `DEFAULT_COURSE` are straightforward exports that provide predefined values for use in forms.
- **Function**: The `getLatestAllowedBirthDate` function creates a new `Date` object representing the current date, subtracts one day from it, and formats it into a string. This formatted string is then returned, ensuring that the latest allowed birth date is always one day before the current date.

This file is designed to be imported into other parts of the application where these constants and the date function are needed, promoting reusability and consistency across the codebase.