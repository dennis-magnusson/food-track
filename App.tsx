import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useReducer } from "react";
import { StatusBar } from "react-native";
import loadingDayContext from "./constants/loadingDayContext";
import { DayContext, DayDispatchContext } from "./context/AppContext";
import { dayReducer } from "./context/reducers";
import AppNavigator from "./navigation/AppNavigator";
import LoadingScreen from "./screens/Loading/LoadingScreen";
import { initializeAsyncStorage } from "./services/asyncStorage";
import { initializeDB } from "./services/databaseService";
import { loadDayData } from "./utils/loadDayData";

function App() {
  const [day, dispatch] = useReducer(dayReducer, loadingDayContext);

  useEffect(() => {
    initializeDB();
    initializeAsyncStorage();
    loadDayData(dispatch);
  }, []);

  if (day.loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <DayContext.Provider value={day}>
        <DayDispatchContext.Provider value={dispatch}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </DayDispatchContext.Provider>
      </DayContext.Provider>
    </>
  );
}

export default App;
