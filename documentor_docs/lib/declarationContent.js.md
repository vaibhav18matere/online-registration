# Documentation Guide for `declarationContent.js`

## Overview

The `declarationContent.js` file is a JavaScript module that exports two constants: `declarationIntro` and `declarationPoints`. These constants are used to store a declaration statement and a list of declaration points, respectively. This file is likely part of a larger application related to admissions in a medical institute, facilitated by Dr. Rasal's Sunder Education Consultancy.

## Purpose

The primary purpose of this file is to provide a structured declaration statement and a comprehensive list of points that applicants must acknowledge and agree to when applying for admission through the consultancy. This declaration ensures that applicants are fully informed of the terms and conditions associated with their admission process.

## Key Components

### 1. `declarationIntro`

- **Type**: `String`
- **Description**: This constant contains the introductory statement of the declaration. It serves as a preamble to the detailed points that follow. The statement emphasizes the correctness of the information provided by the applicant and their agreement to abide by the rules and regulations of the Medical Institute.

```javascript
export const declarationIntro =
  "I declare that the information given is correct and I agree to abide by the rules and regulation of the Medical Institute. We have received full information as herein below:";
```

### 2. `declarationPoints`

- **Type**: `Array of Strings`
- **Description**: This constant is an array containing multiple strings, each representing a specific point of the declaration. These points cover various aspects of the admission process, responsibilities of the applicant, financial obligations, and legal agreements. The points are detailed and cover a wide range of scenarios that the applicant must acknowledge.

```javascript
export const declarationPoints = [
  "I am taking admission to the medical college through Dr. Rasal's Sunder education consultancy.",
  "I have completed all formalities required by Medical Council Of India and will be responsible to have Eligibility Certificate from Medical Council of India (MCI).",
  "We are aware the Screening Test to qualify for Practice in India after this doctorate degree by National Medical Commission.",
  ...
  "We are agreed with all above said terms and conditions.",
  "I have read the terms and conditions, so I am applying for University. I am giving my consent to Dr. Rasal's Sunder education consultancy to initiate my admission process on my behalf.",
];
```

## How It Works

- The `declarationIntro` provides a general statement that sets the context for the declaration.
- The `declarationPoints` array lists specific terms and conditions that the applicant must agree to. Each point is a string that details a particular aspect of the agreement, such as financial responsibilities, legal obligations, and procedural acknowledgments.
- These constants can be imported into other parts of the application where the declaration needs to be displayed or processed, ensuring that applicants are fully informed and have agreed to the terms before proceeding with their admission.

## Usage

To use the contents of this file, you would typically import the constants into another JavaScript file where the declaration needs to be presented to the user. For example:

```javascript
import { declarationIntro, declarationPoints } from './lib/declarationContent';

// Display the declaration intro
console.log(declarationIntro);

// Display each point of the declaration
declarationPoints.forEach(point => {
  console.log(point);
});
```

This setup ensures that the declaration is consistently presented across the application, maintaining clarity and legal compliance for the admission process.