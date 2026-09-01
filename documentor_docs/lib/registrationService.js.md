# Documentation Guide for `registrationService.js`

This document provides a comprehensive guide to the `registrationService.js` file, which is part of a library responsible for handling user registration processes. The file includes functions for fetching, linking, uploading, and managing registration data using Supabase as the backend service.

## Table of Contents

1. [Purpose](#purpose)
2. [Key Components](#key-components)
3. [Function Descriptions](#function-descriptions)
   - [fetchMyRegistration](#fetchmyregistration)
   - [resolveRegistrationId](#resolveregistrationid)
   - [linkRegistrationByEmail](#linkregistrationbyemail)
   - [linkRegistrationByMobile](#linkregistrationbymobile)
   - [computePcbTotal](#computepcbtotal)
   - [uploadFile](#uploadfile)
   - [uploadDocumentFiles](#uploaddocumentfiles)
   - [buildRegistrationPayload](#buildregistrationpayload)
   - [saveRegistrationDraft](#saveregistrationdraft)
   - [submitRegistration](#submitregistration)
   - [getMissingDocuments](#getmissingdocuments)
   - [getDocumentCompletion](#getdocumentcompletion)

## Purpose

The `registrationService.js` file is designed to manage the registration process for users. It provides functions to fetch existing registrations, link registrations by email or mobile, compute total marks, upload files, and manage registration drafts and submissions. The file interacts with a Supabase database to perform these operations.

## Key Components

- **Supabase**: A backend service used for database operations and file storage.
- **ADMISSION_DOCUMENTS**: An imported constant that likely contains metadata about required admission documents.
- **DEFAULT_COURSE**: An imported constant representing the default course for registration.

## Function Descriptions

### fetchMyRegistration

```javascript
export async function fetchMyRegistration(supabase, userId)
```

- **Purpose**: Fetches the registration data for a specific user from the "registrations" table.
- **Parameters**:
  - `supabase`: The Supabase client instance.
  - `userId`: The ID of the user whose registration data is to be fetched.
- **Returns**: The registration data for the user or throws an error if the operation fails.

### resolveRegistrationId

```javascript
async function resolveRegistrationId(supabase, userId, registrationId)
```

- **Purpose**: Resolves the registration ID for a user. If a registration ID is provided, it returns that ID; otherwise, it fetches the existing registration ID for the user.
- **Parameters**:
  - `supabase`: The Supabase client instance.
  - `userId`: The ID of the user.
  - `registrationId`: The registration ID to resolve.
- **Returns**: The resolved registration ID or `null` if not found.

### linkRegistrationByEmail

```javascript
export async function linkRegistrationByEmail(supabase, email, userId)
```

- **Purpose**: Links a registration to a user by email using a Supabase remote procedure call (RPC).
- **Parameters**:
  - `supabase`: The Supabase client instance.
  - `email`: The email address to link.
  - `userId`: The ID of the user.
- **Returns**: The result of the RPC call or throws an error if the operation fails.

### linkRegistrationByMobile

```javascript
export async function linkRegistrationByMobile(supabase, mobile, userId)
```

- **Purpose**: Links a registration to a user by mobile number using a Supabase RPC.
- **Parameters**:
  - `supabase`: The Supabase client instance.
  - `mobile`: The mobile number to link.
  - `userId`: The ID of the user.
- **Returns**: The result of the RPC call or throws an error if the operation fails.

### computePcbTotal

```javascript
export function computePcbTotal(formData)
```

- **Purpose**: Computes the total marks for Physics, Chemistry, and Biology from the provided form data.
- **Parameters**:
  - `formData`: An object containing the marks for Physics, Chemistry, and Biology.
- **Returns**: The total marks for PCB.

### uploadFile

```javascript
export async function uploadFile(supabase, file, folder, userId)
```

- **Purpose**: Uploads a file to a specified folder in Supabase storage and returns the public URL.
- **Parameters**:
  - `supabase`: The Supabase client instance.
  - `file`: The file to be uploaded.
  - `folder`: The folder path where the file will be stored.
  - `userId`: The ID of the user.
- **Returns**: The public URL of the uploaded file or throws an error if the operation fails.

### uploadDocumentFiles

```javascript
export async function uploadDocumentFiles(supabase, documentFiles, userId, existingUrls)
```

- **Purpose**: Uploads multiple document files and returns their URLs.
- **Parameters**:
  - `supabase`: The Supabase client instance.
  - `documentFiles`: An object containing the document files to be uploaded.
  - `userId`: The ID of the user.
  - `existingUrls`: An object containing existing URLs for documents.
- **Returns**: An object mapping document database columns to their URLs.

### buildRegistrationPayload

```javascript
export function buildRegistrationPayload(formData, pcbTotal, urls, userId, status)
```

- **Purpose**: Builds a payload object for registration data.
- **Parameters**:
  - `formData`: An object containing form data.
  - `pcbTotal`: The total PCB marks.
  - `urls`: An object containing URLs for uploaded documents.
  - `userId`: The ID of the user.
  - `status`: The status of the registration (e.g., "draft" or "submitted").
- **Returns**: A payload object for registration.

### saveRegistrationDraft

```javascript
export async function saveRegistrationDraft(supabase, formData, files, existingUrls, userId, registrationId)
```

- **Purpose**: Saves a registration draft to the database.
- **Parameters**:
  - `supabase`: The Supabase client instance.
  - `formData`: An object containing form data.
  - `files`: An object containing files to be uploaded.
  - `existingUrls`: An object containing existing URLs for documents.
  - `userId`: The ID of the user.
  - `registrationId`: The registration ID.
- **Returns**: The saved registration data or throws an error if the operation fails.

### submitRegistration

```javascript
export async function submitRegistration(supabase, formData, files, existingUrls, userId, registrationId)
```

- **Purpose**: Submits a registration to the database.
- **Parameters**:
  - `supabase`: The Supabase client instance.
  - `formData`: An object containing form data.
  - `files`: An object containing files to be uploaded.
  - `existingUrls`: An object containing existing URLs for documents.
  - `userId`: The ID of the user.
  - `registrationId`: The registration ID.
- **Returns**: The submitted registration data or throws an error if the operation fails.

### getMissingDocuments

```javascript
export function getMissingDocuments(registration)
```

- **Purpose**: Identifies missing required documents for a registration.
- **Parameters**:
  - `registration`: An object containing registration data.
- **Returns**: An array of missing required documents.

### getDocumentCompletion

```javascript
export function getDocumentCompletion(registration)
```

- **Purpose**: Computes the document completion status for a registration.
- **Parameters**:
  - `registration`: An object containing registration data.
- **Returns**: An object containing the number of uploaded documents, total documents, and required missing documents.