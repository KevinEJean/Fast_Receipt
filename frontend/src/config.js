// Public config only. Anything prefixed EXPO_PUBLIC_ is bundled into the app,
// so never put secrets here.
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

// Set EXPO_PUBLIC_USE_MOCK_API=true to run the app before your backend exists.
export const USE_MOCK_API = process.env.EXPO_PUBLIC_USE_MOCK_API === 'true';

// Render's free tier can take ~50s to wake up after idling, so be patient.
export const REQUEST_TIMEOUT_MS = 60000;
