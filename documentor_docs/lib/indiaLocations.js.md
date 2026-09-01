# Documentation Guide for `indiaLocations.js`

## Overview

The `indiaLocations.js` file is a JavaScript module that provides a structured list of Indian states, union territories, and their respective cities. This module is particularly useful for applications that require location data for registration forms or any other functionality that involves selecting Indian states and cities.

## Key Components

### Constants

1. **`INDIAN_STATES`**: 
   - An array containing the names of all Indian states and union territories.
   - The names follow the official Government of India nomenclature.

2. **`INDIAN_STATE_CITIES`**:
   - An object where each key is the name of an Indian state or union territory, and the value is an array of cities within that state or territory.
   - This structure allows for easy retrieval of cities based on the state or union territory.

### Functions

1. **`getCitiesForState(stateName)`**:
   - **Purpose**: Retrieves the list of cities for a given state or union territory.
   - **Parameters**: 
     - `stateName` (String): The name of the state or union territory for which the cities are to be retrieved.
   - **Returns**: 
     - An array of city names if the `stateName` exists in `INDIAN_STATE_CITIES`.
     - An empty array if the `stateName` does not exist.

2. **`isValidStateCity(stateName, cityName)`**:
   - **Purpose**: Checks if a given city belongs to a specified state or union territory.
   - **Parameters**:
     - `stateName` (String): The name of the state or union territory.
     - `cityName` (String): The name of the city to be validated.
   - **Returns**:
     - `true` if the `cityName` exists within the list of cities for the given `stateName`.
     - `false` if the `cityName` does not exist or if the `stateName` is not found.

## How It Works

- The module exports two constants and two functions.
- The `INDIAN_STATES` array provides a comprehensive list of all states and union territories, which can be used to populate dropdowns or selection fields in forms.
- The `INDIAN_STATE_CITIES` object maps each state or union territory to its respective cities, facilitating quick lookups.
- The `getCitiesForState` function allows users to retrieve all cities for a specific state or union territory, which is useful for dynamically populating city selection fields based on the selected state.
- The `isValidStateCity` function is a utility to verify if a city belongs to a particular state, ensuring data integrity in applications where state-city relationships are critical.

## Usage Example

```javascript
import { INDIAN_STATES, getCitiesForState, isValidStateCity } from './lib/indiaLocations.js';

// Example: Get all cities for Andhra Pradesh
const citiesInAndhraPradesh = getCitiesForState('Andhra Pradesh');
console.log(citiesInAndhraPradesh);

// Example: Validate if 'Mumbai' is a city in 'Maharashtra'
const isValid = isValidStateCity('Maharashtra', 'Mumbai');
console.log(isValid); // Output: true
```

This module is essential for applications that require accurate and official location data for India, ensuring consistency and correctness in user inputs related to geographical locations.