import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";
import { initializeDatabase } from "./db";
import AppNavigator from "./navigation/AppNavigator";

const Tab = createBottomTabNavigator();

function App() {
  useEffect(() => {
    initializeDatabase().catch((error) =>
      console.log("Error initializing database: ", error)
    );
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
  // <Tab.Screen name="Calendar" component={CalendarScreen} />
}

export default App;
