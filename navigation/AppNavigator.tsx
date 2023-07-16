// navigation/AppNavigator.js
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
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
          tabBarIcon: () => <Ionicons name="add" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
