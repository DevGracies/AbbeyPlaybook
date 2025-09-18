import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import api from '@/src/api/api';

export default function ConnectionsScreen() {
  const [people, setPeople] = useState<any[]>([]);

  const fetchPeople = async () => {
    try {
      const res = await api.get('/users');
      setPeople(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => { fetchPeople(); }, []);

  const handleFollow = async (id: string) => {
    try {
      await api.post(`/relationships/follow/${id}`);
      fetchPeople();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View className="flex-1 bg-slate-100 p-4">
      <Text className="text-xl font-bold text-abbeyBlack mb-4">Connections</Text>
      <FlatList
        data={people}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center bg-white p-3 rounded-2xl mb-3">
            <Image source={{ uri: item.avatar }} className="w-12 h-12 rounded-full mr-3" />
            <View className="flex-1">
              <Text className="font-semibold">{item.name}</Text>
              <Text className="text-sm text-gray-500">{item.email}</Text>
            </View>
            <TouchableOpacity onPress={() => handleFollow(item.id)} className="bg-royal px-4 py-2 rounded">
              <Text className="text-white">Follow</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}