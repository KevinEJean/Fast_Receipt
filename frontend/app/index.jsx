import { Redirect } from 'expo-router';
import { useAuth } from '../src/auth/AuthContext';

// The app's entry point ("/"). Opening the app, or any fallback to the root,
// lands here and is sent to the right place based on login state.
// (The root layout shows a spinner while the stored session is being checked.)
export default function Index() {
  const { user } = useAuth();
  return <Redirect href={user ? '/dashboard' : '/login'} />;
}
