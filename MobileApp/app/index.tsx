import { Redirect } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";

export default function Index() {
  const { state } = useAuth();

  if (state.token) {
    return <Redirect href="/(tabs)" />;
  }
  return <Redirect href="/(auth)/LoginScreen" />;
}
