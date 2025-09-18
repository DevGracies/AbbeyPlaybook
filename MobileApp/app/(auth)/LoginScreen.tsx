import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '@/src/contexts/AuthContext';  

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-royal justify-center px-6">
      <View className="bg-white rounded-3xl p-6 shadow-lg">
        <Text className="text-2xl font-bold text-abbeyBlack mb-2">Abbey Connect</Text>
        <Text className="text-sm text-gray-500 mb-6">Staff social, private & joyful</Text>

        {error ? <Text className="text-red-500 mb-2">{error}</Text> : null}

        <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" className="border border-gray-200 rounded px-3 py-2 mb-3" />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry className="border border-gray-200 rounded px-3 py-2 mb-4" />

        <TouchableOpacity onPress={handleLogin} className="bg-abbeyBlack py-3 rounded mb-3">
          <Text className="text-white text-center font-semibold">{loading ? 'Signing in...' : 'Sign In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text className="text-center text-sm text-royal"> Dont have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
