// navigation/AppNavigator.js
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import HistoryStack from "./HistoryStack";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: () => <Ionicons name="body" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryStack}
        options={{
          tabBarIcon: () => <Ionicons name="book" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
