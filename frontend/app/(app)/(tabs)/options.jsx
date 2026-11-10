import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../../src/components/Card';
import { colors } from '../../../src/theme';

const SECTIONS = [
  {
    title: 'Preferences',
    items: [
      { icon: 'notifications-outline', label: 'Notifications' },
      { icon: 'color-palette-outline', label: 'Appearance', value: 'Light' },
      { icon: 'cash-outline', label: 'Currency', value: 'CAD' },
    ],
  },
  {
    title: 'About',
    items: [
      { icon: 'shield-checkmark-outline', label: 'Privacy policy' },
      { icon: 'document-text-outline', label: 'Terms of use' },
      { icon: 'information-circle-outline', label: 'Version', value: '1.0.0', noChevron: true },
    ],
  },
];

function OptionRow({ item, last }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.row, !last && styles.rowDivider, pressed && styles.rowPressed]}
    >
      <View style={styles.iconWrap}>
        <Ionicons name={item.icon} size={20} color={colors.primary} />
      </View>
      <Text style={styles.rowLabel}>{item.label}</Text>
      {item.value ? <Text style={styles.rowValue}>{item.value}</Text> : null}
      {!item.noChevron ? <Ionicons name="chevron-forward" size={18} color={colors.inactive} /> : null}
    </Pressable>
  );
}

export default function OptionsScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Options</Text>

        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Card style={styles.list}>
              {section.items.map((item, i) => (
                <OptionRow key={item.label} item={item} last={i === section.items.length - 1} />
              ))}
            </Card>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { padding: 24, paddingTop: 32, paddingBottom: 32, gap: 24 },
  title: { fontSize: 28, fontWeight: '700', color: colors.text },
  section: { gap: 8 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginLeft: 4,
  },
  list: { padding: 0, overflow: 'hidden' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  rowDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  rowPressed: { backgroundColor: colors.bg },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: { flex: 1, fontSize: 16, color: colors.text },
  rowValue: { fontSize: 15, color: colors.muted },
});
