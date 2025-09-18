import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { useAuth } from '@/src/contexts/AuthContext';
import api from '@/src/api/api';

export default function ProfileScreen() {
  const { state, refreshUser, logout } = useAuth();
  const [bio, setBio] = useState(state.user?.bio || '');
  const [editing, setEditing] = useState(false);

  useEffect(() => { setBio(state.user?.bio || ''); }, [state.user]);

  const saveProfile = async () => {
    try {
      await api.put(`/users/${state.user?.id}`, { bio });
      await refreshUser();
      setEditing(false);
    } catch (e) {
      console.log(e);
    }
  };

  if (!state.user) return null;

  return (
    <View className="flex-1 bg-slate-100 p-4">
      <View className="items-center mb-6">
        <Image source={{ uri: state.user.avatar }} className="w-24 h-24 rounded-full mb-3" />
        <Text className="text-xl font-bold text-abbeyBlack">{state.user.name}</Text>
        <Text className="text-sm text-gray-500">{state.user.email}</Text>
      </View>

      <View className="bg-white rounded-2xl p-4">
        {editing ? (
          <>
            <TextInput value={bio} onChangeText={setBio} className="border border-gray-200 rounded p-2 mb-3" multiline />
            <TouchableOpacity onPress={saveProfile} className="bg-royal py-2 rounded">
              <Text className="text-white text-center">Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text className="text-sm text-gray-600 mb-3">{bio || 'No bio yet'}</Text>
            <TouchableOpacity onPress={() => setEditing(true)} className="bg-abbeyBlack py-2 rounded mb-2">
              <Text className="text-white text-center">Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => logout()} className="border border-red-400 py-2 rounded">
              <Text className="text-center text-red-500">Logout</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
