import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import AppProvider from "./context/AppProvider";
import AppNavigator from "./navigation/AppNavigator";

const Tab = createBottomTabNavigator();

function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
