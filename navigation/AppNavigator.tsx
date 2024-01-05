// navigation/AppNavigator.js
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import HomeStack from "./HomeStack";
import SettingsStack from "./SettingsStack";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
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
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarIcon: () => <Ionicons name="cog" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
