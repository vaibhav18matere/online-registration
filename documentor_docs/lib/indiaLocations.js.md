# Documentation Guide for `indiaLocations.js`

## Overview

The `indiaLocations.js` file is a JavaScript module that provides a structured list of Indian states, union territories, and their respective cities. This module is particularly useful for applications that require location data for registration forms or any other functionality that involves selecting a state and city within India.

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
     - An array of city names if the state or union territory exists in the `INDIAN_STATE_CITIES` object.
     - An empty array if the state or union territory does not exist in the object.

2. **`isValidStateCity(stateName, cityName)`**:
   - **Purpose**: Validates whether a given city belongs to a specified state or union territory.
   - **Parameters**: 
     - `stateName` (String): The name of the state or union territory.
     - `cityName` (String): The name of the city to be validated.
   - **Returns**: 
     - `true` if the city exists within the specified state or union territory.
     - `false` if the city does not exist within the specified state or union territory or if the state or union territory itself is not found.

## Usage

### Importing the Module

To use the functionalities provided by this module, you need to import it into your JavaScript file:

```javascript
import { INDIAN_STATES, getCitiesForState, isValidStateCity } from './lib/indiaLocations';
```

### Example Usage

1. **Retrieving Cities for a State**:

```javascript
const citiesInKarnataka = getCitiesForState("Karnataka");
console.log(citiesInKarnataka);
// Output: Array of cities in Karnataka
```

2. **Validating a City-State Pair**:

```javascript
const isValid = isValidStateCity("Maharashtra", "Mumbai");
console.log(isValid);
// Output: true

const isInvalid = isValidStateCity("Maharashtra", "Chennai");
console.log(isInvalid);
// Output: false
```

## Conclusion

The `indiaLocations.js` module is a straightforward and efficient way to manage and validate Indian state and city data. It provides essential functionalities for applications that require geographical data input, ensuring that users can select valid state and city combinations.