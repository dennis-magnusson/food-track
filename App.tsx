import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { initialDay } from "./constants/initialDay";
import { DayContext, DayDispatchContext } from "./context/AppContext";
import { dayReducer } from "./context/reducers";
import AppNavigator from "./navigation/AppNavigator";

const Tab = createBottomTabNavigator();

function App() {
  const [day, dispatch] = React.useReducer(dayReducer, initialDay);
  return (
    <DayContext.Provider value={day}>
      <DayDispatchContext.Provider value={dispatch}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </DayDispatchContext.Provider>
    </DayContext.Provider>
  );
}

export default App;
