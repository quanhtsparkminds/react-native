import { HomeScreen, IntroLoginScreen } from "screens";
import { Ionicons } from "@react-native-vector-icons/ionicons";

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NotificationScreen } from "screens/NotificationScreen";
import { images } from "@assets/index";
import { Image } from "react-native";
const Tab = createBottomTabNavigator();

export const BottomTabbar = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({})}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Image source={images.home} width={size} tintColor={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={images.bell} width={size} tintColor={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
