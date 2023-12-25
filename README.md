
# React Native Weather
Repository: [https://github.com/ChaiMagal/weather-react-native](https://github.com/ChaiMagal/weather-react-native)

## Installation
### Android APK and iOS Simulator Files
- **iOS Simulator**:
    - Double-click the iOS file in the `/build` directory.
    - Drag the extracted file to the simulator.
    - Run `expo start --dev-client`.
- **Android**:
    - Use the APK file from `/build`.
    - Alternatively, download directly for your device [here](https://expo.dev//accounts/chaimagal/projects/weather-react-native/builds/79906db2-53d0-4dfd-bf6e-b99a39022d70).

## Tools Used
- Expo SDK47
- React Native Paper (for Material Design)
- Redux Toolkit (for app-level state, API calls with Axios and Thunk)
- React Navigation (for bottom and stack navigation)
- Routing with React Navigation
### Development Tools
- ESLint
- Prettier

## App Structure
- The AccuWeather API Keys should be stored in a .env file and managed separately from the code structure. For this project, they will be maintained accordingly.
### Main Stack
- **Main Page**: Displays weather details (name, country, description, image) from the AccuWeather API. Features a search bar for filtering and sorting options by name or city.
- **Info Page**: Provides detailed information about the selected city, including temperature and other details shown on the main page.

### Settings Stack
- **Main Page**: Options to toggle light/dark theme and change temperature units (Celsius/Fahrenheit).

## Functions
### Redux Implementation
- **Local Slice**: Manages dark/light mode and temperature unit preferences.
- **Weather Slice**:
    - Fetches data from the AccuWeather Top Cities API.
    - Utilizes thunk to display the current status (loading, success, fail).
        - **Loading**: Shows a progress bar and a fetching data message.
        - **Success**: Populates `weatherData` and `searchData`, sorted A-Z by default.
        - **Failure**: Displays an alert to the user.
    - Uses reducers for:
        - **Search**: Filters cities/countries based on user queries.
        - **Sort**:
            - Alphabetically (A-Z or Z-A).
            - By distance, using longitude and latitude for sorting (see `index.js` for calculation).

