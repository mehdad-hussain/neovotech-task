import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Todo } from "../../types/todo";

const fetchTodos = async (): Promise<Todo[]> => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
  return data;
};

const HomeScreen = () => {
  const days = [
    { day: "MON", date: "10", active: true },
    { day: "TUE", date: "11", active: false },
    { day: "WED", date: "12", active: false },
    { day: "THU", date: "13", active: false },
    { day: "FRI", date: "14", active: false },
    { day: "SAT", date: "15", active: false },
    { day: "SUN", date: "16", active: false },
  ];

  const timeSlots = ["12:00", "13:00", "14:00", "15:00", "16:00"];

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const queryClient = useQueryClient();

  const toggleTodoMutation = useMutation({
    mutationFn: async (todoId: number) => {
      const todoToUpdate = todos?.find((t) => t.id === todoId);
      if (!todoToUpdate) return;

      const { data } = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const renderTodoItem = ({ item: todo }: { item: Todo }) => (
    <View className="flex-row items-center justify-between bg-gray-50 p-3 mx-6 rounded-lg shadow mt-2 border border-gray-200">
      <Text className={`flex-1 ${todo.completed ? "line-through text-gray-400" : "text-gray-800"} font-medium`}>
        {todo.title}
      </Text>
      <TouchableOpacity onPress={() => toggleTodoMutation.mutate(todo.id)}>
        <Ionicons
          name={todo.completed ? "checkmark-circle" : "ellipse-outline"}
          size={24}
          color={todo.completed ? "green" : "gray"}
        />
      </TouchableOpacity>
    </View>
  );

  const HeaderComponent = () => (
    <View className="p-4 flex gap-4">
      {/* Header */}
      <View className="p-4 flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="text-gray-500">Hello,</Text>
          <Text className="text-xl font-bold">Good morning</Text>
        </View>
        <TouchableOpacity className="ml-4">
          <Ionicons name="chatbubble-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center mt-4 bg-gray-100 rounded-full p-3">
        <Ionicons name="search" size={20} color="gray" />
        <TextInput className="ml-2 flex-1" placeholder="Search center" />
      </View>

      {/* Calendar Strip */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-1">
        {days.map((item, index) => (
          <TouchableOpacity key={index} className={`px-4 items-center ${item.active ? "opacity-100" : "opacity-50"}`}>
            <Text className="text-sm text-gray-600">{item.day}</Text>
            <Text className={`text-lg mt-1 ${item.active ? "font-bold text-green-500" : "text-gray-700"}`}>
              {item.date}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Booking Card */}
      <View className="mx-4">
        <View className="bg-gray-100 rounded-xl overflow-hidden shadow">
          <Image source={{ uri: "https://placehold.co/600x400" }} className="w-full h-40" resizeMode="cover" />
          <View className="p-4">
            <Text className="text-lg font-bold">PLCE Padel</Text>
            <Text className="text-gray-600">Södertälje, Sweden - 17km</Text>
          </View>
        </View>
      </View>

      {/* Time Slots */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4 px-4">
        {timeSlots.map((time, index) => (
          <TouchableOpacity
            key={index}
            className={`px-6 py-2 rounded-full border mr-2 ${
              time === "14:00" ? "bg-green-500 border-green-500" : "border-gray-300"
            }`}
          >
            <Text className={time === "14:00" ? "text-white" : "text-gray-700"}>{time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* TODO List Header */}
      <View className="mt-4 px-4">
        <Text className="text-lg font-bold mb-2">TODO List</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error loading todos</Text>
      ) : (
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={HeaderComponent}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
