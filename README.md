
# @precooked/react-auth-button

The `AuthButton` component provides a flexible way to integrate Firebase authentication with multiple providers 
(e.g., Google, Facebook, GitHub, Apple, etc.) into your React applications.

## Installation

To use the `AuthButton`, you need to install the package along with `firebase`:

```bash
npm install @precooked/react-auth-button firebase
```

## Firebase Setup

Before using the `AuthButton`, make sure to set up Firebase in your project:

```tsx
// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};

// Initialize Firebase and get the authentication instance
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

## Usage

```tsx
import React from 'react';
import AuthButton from '@precooked/react-auth-button';
import { auth } from './firebaseConfig';

const App = () => {
    const handleAuthSuccess = (user) => {
        console.log('User signed in:', user);
    };

    const handleAuthError = (error) => {
        console.error('Authentication error:', error);
    };

    return (
        <AuthButton
            auth={auth}
            provider="google"
            onAuthSuccess={handleAuthSuccess}
            onAuthError={handleAuthError}
            title="Login with Google"
        />
    );
};

export default App;
```

## Props

| Prop Name       | Type                                          | Description                                                                 | Default          |
|-----------------|-----------------------------------------------|-----------------------------------------------------------------------------|------------------|
| `auth`          | `Auth`                                        | The Firebase authentication instance.                                       | -                |
| `provider`      | `"google" \| "facebook" \| "github" \| "apple" \| "microsoft" \| "twitter" \| "email"` | Specifies the authentication provider.                           | -                |
| `onAuthSuccess` | `(user: User) => void`                        | Callback function called when authentication is successful.                 | -                |
| `onAuthError`   | `(error: Error) => void`                      | Callback function called when authentication fails.                         | -                |
| `title`         | `string`                                      | Text to display on the button. If provided, uses a standard button instead of an icon button. | - |
| `icon`          | `string`                                      | Icon to display. Defaults to the `provider` value.                          | Provider value   |
| `iconPaths`     | `any[]`                                       | Custom paths for the icon if using a custom SVG.                            | -                |
| `iconSize`      | `number`                                      | Size of the icon in the button.                                             | `24`             |
| `style`         | `React.CSSProperties`                         | Custom styles for the button.                                               | -                |
| `hasShadow`     | `boolean`                                     | Whether the button should have a shadow.                                    | `true`           |
| `borderRadius`  | `number`                                      | The border radius of the button.                                            | `4`              |
| `type`          | `"clear" \| "outline" \| "solid"`           | Type of button style.                                                       | `"solid"`        |
| `titleStyle`    | `React.CSSProperties`                         | Custom styles for the button's title text.                                  | -                |
| `size`          | `"xs" \| "sm" \| "md" \| "lg" \| "xl"`     | Size of the button.                                                         | `"md"`           |
| `color`         | `string`                                      | Button color. Defaults to the color associated with the provider.           | Provider color   |

## License

MIT
