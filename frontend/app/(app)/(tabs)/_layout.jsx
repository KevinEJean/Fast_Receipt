import { Tabs } from 'expo-router';
import AppTabBar from '../../../src/components/AppTabBar';
import { colors } from '../../../src/theme';

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="dashboard"
      tabBar={(props) => <AppTabBar {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.bg } }}
    >
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="options" />
    </Tabs>
  );
}
