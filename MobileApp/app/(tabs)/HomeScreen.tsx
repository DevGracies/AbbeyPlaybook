import React, { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl, Image } from "react-native";
import api from "../../src/api/api";

type User = {
  id: string;
  name: string;
  avatar: string;
};

type Post = {
  id: string;
  user: User;
  createdAt: string;
  content: string;
};

function PostCard({ item }: { item: Post }) {
  return (
    <View className="bg-white rounded-2xl p-4 mb-3">
      <View className="flex-row items-center mb-3">
        <Image
          source={{ uri: item.user.avatar }}
          className="w-12 h-12 rounded-full mr-3"
        />
        <View>
          <Text className="font-semibold">{item.user.name}</Text>
          <Text className="text-xs text-gray-500">{item.createdAt}</Text>
        </View>
      </View>
      <Text className="text-gray-800">{item.content}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await api.get<Post[]>("/posts"); // API expected to return an array
      setPosts(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View className="flex-1 bg-slate-100 p-4">
      <Text className="text-xl font-bold text-abbeyBlack mb-4">Gist Feed</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard item={item} />}
        keyExtractor={(i) => i.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchPosts} />
        }
      />
    </View>
  );
}
