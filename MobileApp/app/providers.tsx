import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@/src/contexts/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SafeAreaProvider>
  );
}
