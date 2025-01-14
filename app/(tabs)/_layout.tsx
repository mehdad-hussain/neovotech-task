import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
      </Tabs>
      {/* Bottom Navigation */}
      <View className="absolute bottom-0 w-full flex-row justify-around p-4 bg-white border border-b-0 border-gray-200 rounded-t-[40px] shadow-lg">
        <TouchableOpacity className="items-center">
          <Ionicons name="home-outline" size={24} color="black" />
          <Text className="text-xs mt-1">Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Text className="text-xs mt-1">Activities</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Text className="text-xs mt-1">Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="grid-outline" size={24} color="black" />
          <Text className="text-xs mt-1">Menu</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
