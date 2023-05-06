import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import FoodsScreen from "./screens/FoodsScreen";
import TodayStack from "./screens/TodayStack";

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
  // <Tab.Screen name="Calendar" component={CalendarScreen} />
}

export default App;
