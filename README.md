# Getting Started

# Installation

# Step 1: react native navigation

1. Stack navigation
2. Drawer navigation

# Step 2: react native vector icons

1. npm install react-native-vector-icons

# For iOS:

- cd ios && pod install

# For Android:

Modify android/app/build.gradle:

- apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

# Step 3: Date and Time Picker

- npm install react-native-modal-datetime-picker @react-native-community/datetimepicker

setSelectedDate(date.toLocaleDateString()); // Example: "1/1/2025" (depends on locale)

setSelectedDate(date.toDateString()); // Example: "Mon Jan 01 2025"
setSelectedDate(date.toISOString()); // Example: "2025-01-01T00:00:00.000Z"

setSelectedDate(
date.toLocaleDateString("en-GB") // Example: "01/01/2025" (DD/MM/YYYY)
);

setSelectedDate(
date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
// Example: "January 1, 2025"
);

# Step 4: Snackbar

- npm install react-native-snackbar

# Step 5: Jwt decode

- npm install jwt-decode
