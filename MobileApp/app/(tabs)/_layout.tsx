import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
       <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="connections" options={{ title: "Connections" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
