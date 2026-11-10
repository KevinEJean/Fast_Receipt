# Expo auth frontend

Login / sign-up / guest flow for an Expo (React Native, JSX) app. All real auth decisions live in the backend; this app only shows screens, stores the token securely, and attaches it to requests.

## Requirements

```bash
git version
node -v
npm -v
```

Visit online guides/documentation to install [Git](https://github.com/git-guides/install-git), [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## Setup

Copy an `.env` file from `.env.example` :

```bash
cp .env.example .env
```

```bash
git clone <GitHub_Repository_URL>
cd ./Fast_Receipt/frontend
npm i
npx expo start -c
```

Scan the QR code with Expo Go. With `EXPO_PUBLIC_USE_MOCK_API=true` the app works
with no backend: sign up, log in, or continue as guest.

## Structure

```
app/
  _layout.jsx          AuthProvider + Stack.Protected route guards
  (auth)/login.jsx     login + "Continue as guest"
  (auth)/signup.jsx    sign up
  (app)/index.jsx      home (post-login), shows guest banner
src/
  api.js               fetch wrapper: base URL, Bearer token, timeout, 401 handling
  config.js            API_URL, mock toggle, timeout
  mockApi.js           in-memory fake backend (delete when the real one is live)
  auth/AuthContext.jsx session state: user, signIn, signUp, continueAsGuest, signOut
  auth/tokenStorage.js expo-secure-store wrapper
  components/          Field, Button
```

## Backend contract this frontend expects

All bodies are JSON. Errors should return a non-2xx status and `{ "error": "message" }`.

| Method | Path           | Body                  | Success response                                  |
|--------|----------------|-----------------------|---------------------------------------------------|
| POST   | `/auth/signup` | `{ email, password }` | `{ token, user: { id, email, isGuest: false } }`  |
| POST   | `/auth/login`  | `{ email, password }` | `{ token, user: { id, email, isGuest: false } }`  |
| POST   | `/auth/guest`  | none                  | `{ token, user: { id, email: null, isGuest: true } }` |
| GET    | `/auth/me`     | none (Bearer token)   | `{ user: { id, email, isGuest } }`                |

## Notes

- `expo-secure-store` works on iOS and Android (including Expo Go), not on web.
- `Stack.Protected` needs a recent Expo Router (SDK 53+).

**List of available versions**

```bash
npm view expo versions --json
```

**Update to latest version**

```bash
npx expo install expo@latest
npx expo install --fix
npx expo-doctor
```

**Update to a specific version :**

```bash
npx expo install expo@^54.0.0
npx expo install --fix
npx expo-doctor
```