import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../src/auth/AuthContext';
import Button from '../../../src/components/Button';
import Card from '../../../src/components/Card';
import { colors } from '../../../src/theme';

export default function DashboardScreen() {
  const { isGuest, signOut } = useAuth();

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>{isGuest ? 'Browsing as a guest' : 'Your spending at a glance'}</Text>

        {isGuest ? (
          <View style={styles.banner}>
            <Text style={styles.bannerText}>
              Guest access is limited. Create an account to unlock everything.
            </Text>
            {/* Ending the guest session returns to the login / sign-up screens. */}
            <Button title="Create an account" onPress={signOut} />
          </View>
        ) : null}

        <Card style={styles.summary}>
          <Text style={styles.summaryLabel}>Spent this month</Text>
          <Text style={styles.summaryValue}>$0.00</Text>
          <Text style={styles.summaryHint}>Placeholder data</Text>
        </Card>

        <View style={styles.statsRow}>
          <Card style={styles.stat}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Receipts</Text>
          </Card>
          <Card style={styles.stat}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Categories</Text>
          </Card>
        </View>

        <Card style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Ionicons name="receipt-outline" size={32} color={colors.primary} />
          </View>
          <Text style={styles.emptyTitle}>No receipts yet</Text>
          <Text style={styles.emptyText}>Tap the camera button to scan your first receipt.</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { padding: 24, paddingTop: 32, paddingBottom: 32, gap: 16 },
  title: { fontSize: 28, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 16, color: colors.muted, marginTop: -8 },
  banner: { backgroundColor: '#eff6ff', borderRadius: 16, padding: 16, gap: 12 },
  bannerText: { color: '#1e3a8a', fontSize: 14 },
  summary: { backgroundColor: colors.primary, borderColor: colors.primary, padding: 20 },
  summaryLabel: { color: '#bfdbfe', fontSize: 14, fontWeight: '600' },
  summaryValue: { color: '#fff', fontSize: 40, fontWeight: '800', marginTop: 4 },
  summaryHint: { color: '#bfdbfe', fontSize: 12, marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 12 },
  stat: { flex: 1, alignItems: 'center', paddingVertical: 20 },
  statValue: { fontSize: 28, fontWeight: '700', color: colors.text },
  statLabel: { fontSize: 13, color: colors.muted, marginTop: 2 },
  empty: { alignItems: 'center', paddingVertical: 32 },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  emptyText: { fontSize: 14, color: colors.muted, marginTop: 4, textAlign: 'center' },
});
