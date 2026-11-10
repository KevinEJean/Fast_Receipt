import { API_URL, REQUEST_TIMEOUT_MS, USE_MOCK_API } from './config';
import { getToken } from './auth/tokenStorage';
import { mockRequest } from './mockApi';

// The AuthContext registers a callback here so any 401 on an authenticated
// request signs the user out centrally.
let onUnauthorized = null;
export function setUnauthorizedHandler(fn) {
  onUnauthorized = fn;
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const token = auth ? await getToken() : null;

  try {
    if (USE_MOCK_API) {
      return await mockRequest(path, { method, body, token });
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    let res;
    try {
      res = await fetch(`${API_URL}${path}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
    } catch (e) {
      if (e.name === 'AbortError') {
        throw new ApiError('The server took too long to respond. Please try again.', 0);
      }
      throw new ApiError('Cannot reach the server. Check your connection.', 0);
    } finally {
      clearTimeout(timer);
    }

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new ApiError(data.error || data.message || 'Something went wrong.', res.status);
    }
    return data;
  } catch (e) {
    // Mock errors carry a status but are not ApiError instances; normalise them.
    const err = e instanceof ApiError ? e : new ApiError(e.message, e.status ?? 0);
    if (err.status === 401 && token && onUnauthorized) onUnauthorized();
    throw err;
  }
}

// Each auth call returns { token, user } except me() which returns { user }.
export const signUp = (email, password) =>
  request('/auth/signup', { method: 'POST', body: { email, password }, auth: false });

export const logIn = (email, password) =>
  request('/auth/login', { method: 'POST', body: { email, password }, auth: false });

// Backend decides what a guest may do; the app only receives a limited token.
export const guestSession = () => request('/auth/guest', { method: 'POST', auth: false });

export const me = () => request('/auth/me');
