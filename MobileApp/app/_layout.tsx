import { Providers } from "./providers";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Providers>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </Providers>
  );
}
