import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Styling-only placeholder for "picture mode". The real camera (expo-camera) and the
// receipt-reading ML will replace the dark viewfinder area later.
export default function ScanScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />

      <View style={styles.topBar}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={styles.topButton}
          accessibilityRole="button"
          accessibilityLabel="Close camera"
        >
          <Ionicons name="close" size={28} color="#fff" />
        </Pressable>
        <Text style={styles.topTitle}>Scan receipt</Text>
        <View style={styles.topButton} />
      </View>

      <View style={styles.viewfinder}>
        <View style={styles.frame}>
          <View style={[styles.corner, styles.tl]} />
          <View style={[styles.corner, styles.tr]} />
          <View style={[styles.corner, styles.bl]} />
          <View style={[styles.corner, styles.br]} />
        </View>
        <Text style={styles.hint}>Place the receipt inside the frame</Text>
      </View>

      <View style={styles.controls}>
        <View style={styles.sideSlot}>
          <Ionicons name="images-outline" size={28} color="#fff" />
        </View>
        <Pressable style={styles.shutterOuter} accessibilityRole="button" accessibilityLabel="Take photo">
          <View style={styles.shutterInner} />
        </Pressable>
        <View style={styles.sideSlot}>
          <Ionicons name="flash-off-outline" size={28} color="#fff" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const CORNER = 32;
const THICK = 4;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0b0f19' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  topButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  topTitle: { color: '#fff', fontSize: 17, fontWeight: '700' },
  viewfinder: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 },
  frame: { width: '78%', aspectRatio: 0.66 },
  hint: { color: '#d1d5db', fontSize: 14 },
  corner: { position: 'absolute', width: CORNER, height: CORNER, borderColor: '#fff' },
  tl: { top: 0, left: 0, borderTopWidth: THICK, borderLeftWidth: THICK, borderTopLeftRadius: 14 },
  tr: { top: 0, right: 0, borderTopWidth: THICK, borderRightWidth: THICK, borderTopRightRadius: 14 },
  bl: { bottom: 0, left: 0, borderBottomWidth: THICK, borderLeftWidth: THICK, borderBottomLeftRadius: 14 },
  br: { bottom: 0, right: 0, borderBottomWidth: THICK, borderRightWidth: THICK, borderBottomRightRadius: 14 },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 32,
    paddingTop: 16,
    paddingBottom: 24,
  },
  sideSlot: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center' },
  shutterOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: { width: 62, height: 62, borderRadius: 31, backgroundColor: '#fff' },
});
