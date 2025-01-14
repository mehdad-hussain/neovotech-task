# NeovoTech Task

A React Native mobile application built with Expo featuring a booking interface and todo management system.

## Features

- Calendar date selection
- Time slot booking
- Todo list management with toggle functionality
- Real-time updates using React Query
- Responsive UI with NativeWind (TailwindCSS)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or newer)
- [pnpm](https://pnpm.io/) (v9.15.1 or newer)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [iOS Simulator](https://developer.apple.com/xcode/) (for Mac users) or [Android Studio](https://developer.android.com/studio) (for Android development)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd neovotech-task
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm start
```

## NativeWind Setup

1. Install NativeWind dependencies:

```bash
pnpm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context
```

2. Create `tailwind.config.js` in the project root:

```js
// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

3. Configure Babel - Update or create `babel.config.js`:

```js
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel"],
  };
};
```

4. Configure Metro - Create `metro.config.js`:

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
```

5. Create `global.css` in project root:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. Add TypeScript types - Create or update `nativewind-env.d.ts`:

```ts
/// <reference types="nativewind/types" />
```

Now you can use Tailwind classes in your components using the `className` prop:

```tsx
<View className="p-4 bg-white">
  <Text className="text-xl font-bold">Hello World</Text>
</View>
```

## Running the App

Choose your preferred platform:

- **iOS Simulator**:

```bash
pnpm ios
```

- **Android Emulator**:

```bash
pnpm android
```

- **Web Browser**:

```bash
pnpm web
```

## Project Structure

```
.
├── app/                    # Main application screens
│   └── (tabs)/            # Tab-based navigation screens
│       └── index.tsx      # Home screen with booking and todos
├── types/                 # TypeScript type definitions
├── assets/               # Static assets
└── components/          # Reusable components
```

## Tech Stack

- [Expo](https://expo.dev/) - React Native framework
- [React Query](https://tanstack.com/query/latest) - Server state management
- [NativeWind](https://www.nativewind.dev/) - TailwindCSS for React Native
- [Expo Router](https://expo.github.io/router/docs/) - File-based routing
- [Axios](https://axios-http.com/) - HTTP client

## API Integration

The app uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for todo management:

- Fetches todos from `/todos`
- Supports todo toggle functionality via PUT requests

## Development Commands

```bash
# Start development server
pnpm start

# Run linting
pnpm lint

# Run tests
pnpm test

# Reset project
pnpm reset-project
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
