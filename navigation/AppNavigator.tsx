// navigation/AppNavigator.js
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import FoodsScreen from "../screens/FoodsScreen";
import TodayStack from "./TodayStack";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Log"
        component={TodayStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Foods"
        component={FoodsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="food-apple-outline"
              size={24}
              color="black"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
