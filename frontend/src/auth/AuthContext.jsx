import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as api from '../api';
import { clearToken, getToken, setToken } from './tokenStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const startSession = useCallback(async ({ token, user: u }) => {
    await setToken(token);
    setUser(u);
  }, []);

  const signOut = useCallback(async () => {
    await clearToken();
    setUser(null);
  }, []);

  // On launch: if a token is stored, ask the backend who it belongs to.
  useEffect(() => {
    api.setUnauthorizedHandler(signOut);

    (async () => {
      try {
        const token = await getToken();
        if (token) {
          const { user: u } = await api.me();
          setUser(u);
        }
      } catch (e) {
        // A 401 is already handled by the unauthorized handler.
        // For network errors we simply show the login screen.
      } finally {
        setLoading(false);
      }
    })();
  }, [signOut]);

  const value = useMemo(
    () => ({
      loading,
      user,
      isGuest: !!user?.isGuest,
      signIn: async (email, password) => startSession(await api.logIn(email, password)),
      signUp: async (email, password) => startSession(await api.signUp(email, password)),
      continueAsGuest: async () => startSession(await api.guestSession()),
      signOut,
    }),
    [loading, user, startSession, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
