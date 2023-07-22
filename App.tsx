import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useReducer } from "react";
import { initialDay } from "./constants/initialDay";
import { DayContext, DayDispatchContext } from "./context/AppContext";
import { dayReducer } from "./context/reducers";
import AppNavigator from "./navigation/AppNavigator";
import { initializeDB, populateBasicFoods } from "./services/databaseService";

const Tab = createBottomTabNavigator();

function App() {
  const [day, dispatch] = useReducer(dayReducer, initialDay);

  useEffect(() => {
    initializeDB();
    populateBasicFoods();
  }, []);

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
