import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';

const BAR_HEIGHT = 64; // the white bar itself (without the bottom safe-area inset)
const ADD_SIZE = 64; // diameter of the center Add button
const RAISE = 24; // how far the Add button pokes above the bar

const TABS = {
  profile: ['person-outline', 'person', 'Profile'],
  dashboard: ['grid-outline', 'grid', 'Dashboard'],
  options: ['settings-outline', 'settings', 'Options'],
};

export default function AppTabBar(props) {
  const { state, navigation } = props;
  console.log("After:", props.navigation);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const mid = Math.ceil(state.routes.length / 2);
  const left = state.routes.slice(0, mid);
  const right = state.routes.slice(mid);

  const renderTab = (route) => {
    const focused = state.routes[state.index].key === route.key;
    const [outline, filled, label] = TABS[route.name] ?? ['ellipse-outline', 'ellipse', route.name];


    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
    };

    return (
      <Pressable
        key={route.key}
        onPress={onPress}
        style={styles.tab}
        accessibilityRole="tab"
        accessibilityLabel={label}
        accessibilityState={{ selected: focused }}
      >
        <Ionicons
          name={focused ? filled : outline}
          size={24}
          color={focused ? colors.primary : colors.inactive}
        />
        <Text style={[styles.label, focused && styles.labelActive]}>{label}</Text>
      </Pressable>
    );
  };

  return (
    <View style={[styles.outer, { height: BAR_HEIGHT + RAISE + insets.bottom }]}>
      <View style={[styles.bar, { height: BAR_HEIGHT + insets.bottom, paddingBottom: insets.bottom }]}>
        <View style={styles.side}>{left.map(renderTab)}</View>
        <View style={styles.centerGap} />
        <View style={styles.side}>{right.map(renderTab)}</View>
      </View>

      <Pressable
        onPress={() => router.push('/scan')}
        style={({ pressed }) => [styles.add, pressed && styles.addPressed]}
        accessibilityRole="button"
        accessibilityLabel="Add a receipt with the camera"
      >
        <Ionicons name="camera" size={28} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: colors.bg,
    justifyContent: 'flex-end',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.card,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  side: { flex: 1, flexDirection: 'row' },
  centerGap: { width: ADD_SIZE + 24 },
  tab: {
    flex: 1,
    height: BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  label: { fontSize: 11, fontWeight: '500', color: colors.inactive },
  labelActive: { color: colors.primary, fontWeight: '700' },
  add: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -ADD_SIZE / 2,
    width: ADD_SIZE,
    height: ADD_SIZE,
    borderRadius: ADD_SIZE / 2,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.bg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10,
  },
  addPressed: { transform: [{ scale: 0.95 }], opacity: 0.9 },
});
