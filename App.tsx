import { NavigationContainer } from "@react-navigation/native";
import { format } from "date-fns";
import { useEffect, useReducer } from "react";
import { DayContext, DayDispatchContext } from "./context/AppContext";
import { dayReducer } from "./context/reducers";
import AppNavigator from "./navigation/AppNavigator";
import { initializeDB, populateBasicFoods } from "./services/databaseService";
import { initializeDayContext } from "./utils/initializeDayContext";

function App() {
  const [day, dispatch] = useReducer(
    dayReducer,
    initializeDayContext(format(new Date(), "yyyy-MM-dd"))
  );

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
