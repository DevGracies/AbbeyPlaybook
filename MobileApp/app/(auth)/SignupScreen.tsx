import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '@/src/contexts/AuthContext'; 

export default function SignupScreen() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await register(name, email, password);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View className="flex-1 bg-royal justify-center px-6">
      <View className="bg-white rounded-3xl p-6 shadow-lg">
        <Text className="text-2xl font-bold text-abbeyBlack mb-2">Create account</Text>
        <TextInput placeholder="Full name" value={name} onChangeText={setName} className="border border-gray-200 rounded px-3 py-2 mb-3" />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" className="border border-gray-200 rounded px-3 py-2 mb-3" />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry className="border border-gray-200 rounded px-3 py-2 mb-4" />

        <TouchableOpacity onPress={handleSignup} className="bg-abbeyBlack py-3 rounded mb-3">
          <Text className="text-white text-center font-semibold">Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text className="text-center text-sm text-royal">Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
