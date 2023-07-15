import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";
import AppProvider from "./context/AppProvider";
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
    <AppProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
