import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

// Shown for any URL that doesn't match a route. This also replaces Expo Router's
// default "Unmatched Route" / sitemap screen.
export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <View style={styles.container}>
        <Text style={styles.code}>404</Text>
        <Text style={styles.title}>Page not found</Text>
        <Text style={styles.text}>This screen doesn't exist.</Text>
        {/* "/" redirects to login or home depending on whether you're signed in */}
        <Link href="/" style={styles.link}>
          Go to the start screen
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f9fafb',
  },
  code: { fontSize: 56, fontWeight: '800', color: '#2563eb' },
  title: { fontSize: 22, fontWeight: '700', color: '#111827', marginTop: 4 },
  text: { fontSize: 16, color: '#6b7280', marginTop: 8, marginBottom: 24 },
  link: { fontSize: 16, color: '#2563eb', fontWeight: '600' },
});
