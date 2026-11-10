// In-memory fake backend so you can build the UI before the real one exists.
// Data resets whenever the app reloads. Delete this file once your API is live.

const users = new Map(); // email -> { id, email, password }
const sessions = new Map(); // token -> user object (public shape)

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

function fail(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function startSession(user) {
  const token = `mock-${Math.random().toString(36).slice(2)}`;
  sessions.set(token, user);
  return { token, user };
}

export async function mockRequest(path, { method = 'GET', body, token } = {}) {
  await delay();

  if (path === '/auth/signup' && method === 'POST') {
    const email = body.email.toLowerCase();
    if (users.has(email)) throw fail(409, 'An account with this email already exists.');
    const record = { id: String(users.size + 1), email, password: body.password };
    users.set(email, record);
    return startSession({ id: record.id, email, isGuest: false });
  }

  if (path === '/auth/login' && method === 'POST') {
    const record = users.get(body.email.toLowerCase());
    if (!record || record.password !== body.password) {
      throw fail(401, 'Incorrect email or password.');
    }
    return startSession({ id: record.id, email: record.email, isGuest: false });
  }

  if (path === '/auth/guest' && method === 'POST') {
    return startSession({ id: `guest-${Date.now()}`, email: null, isGuest: true });
  }

  if (path === '/auth/me' && method === 'GET') {
    const user = token && sessions.get(token);
    if (!user) throw fail(401, 'Session expired.');
    return { user };
  }

  throw fail(404, `Mock API has no route for ${method} ${path}`);
}
