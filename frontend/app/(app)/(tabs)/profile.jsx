import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../src/auth/AuthContext';
import Button from '../../../src/components/Button';
import Card from '../../../src/components/Card';
import { colors } from '../../../src/theme';

function InfoRow({ label, value, last }) {
  return (
    <View style={[styles.row, !last && styles.rowDivider]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const { user, isGuest, signOut } = useAuth();
  const initial = isGuest ? '?' : (user?.email?.[0] ?? '?').toUpperCase();

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <Text style={styles.name} numberOfLines={1}>
            {isGuest ? 'Guest' : user?.email}
          </Text>
          <View style={[styles.badge, isGuest && styles.badgeGuest]}>
            <Text style={[styles.badgeText, isGuest && styles.badgeTextGuest]}>
              {isGuest ? 'Guest account' : 'Member'}
            </Text>
          </View>
        </View>

        <Card style={styles.list}>
          <InfoRow label="Email" value={isGuest ? 'Not set' : user?.email} />
          <InfoRow label="Account type" value={isGuest ? 'Guest' : 'Standard'} last />
        </Card>

        {isGuest ? (
          <Button title="Create an account" onPress={signOut} />
        ) : (
          <Button title="Log out" variant="secondary" onPress={signOut} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { padding: 24, paddingTop: 32, paddingBottom: 32, gap: 20 },
  title: { fontSize: 28, fontWeight: '700', color: colors.text },
  header: { alignItems: 'center', gap: 8, paddingVertical: 8 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 40, fontWeight: '700', color: colors.primary },
  name: { fontSize: 20, fontWeight: '700', color: colors.text, maxWidth: '90%' },
  badge: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeGuest: { backgroundColor: '#fef3c7' },
  badgeText: { fontSize: 12, fontWeight: '700', color: colors.primary },
  badgeTextGuest: { color: '#92400e' },
  list: { padding: 0 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  rowDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  rowLabel: { fontSize: 15, color: colors.muted },
  rowValue: { fontSize: 15, color: colors.text, fontWeight: '600', flexShrink: 1 },
});
