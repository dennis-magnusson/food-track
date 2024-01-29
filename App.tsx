import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useReducer } from "react";
import { StatusBar } from "react-native";
import loadingDayContext from "./constants/loadingDayContext";
import { DayContext, DayDispatchContext } from "./context/AppContext";
import { dayReducer } from "./context/reducers";
import MainStack from "./navigation/MainStack";
import { initializeAsyncStorage } from "./services/asyncStorage";
import { initializeDB } from "./services/databaseService";
import { loadDayData } from "./utils/loadDayData";

// Add missing import for useFonts
import { useFonts } from "expo-font";

function App() {
  const [day, dispatch] = useReducer(dayReducer, loadingDayContext);
  const [fontsLoaded] = useFonts({
    "Work Sans Bold": require("./assets/fonts/WorkSans-Bold.ttf"),
    "Work Sans ExtraBold": require("./assets/fonts/WorkSans-ExtraBold.ttf"),
    "Work Sans Regular": require("./assets/fonts/WorkSans-Regular.ttf"),
    "Work Sans Thin": require("./assets/fonts/WorkSans-Thin.ttf"),
    "Work Sans Medium": require("./assets/fonts/WorkSans-Medium.ttf"),
  });

  useEffect(() => {
    //dropAllTables();
    initializeDB();
    //insertAllBasicFoods();
    initializeAsyncStorage();
    loadDayData(dispatch);
  }, []);

  if (!fontsLoaded || day.loading) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <DayContext.Provider value={day}>
        <DayDispatchContext.Provider value={dispatch}>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </DayDispatchContext.Provider>
      </DayContext.Provider>
    </>
  );
}

export default App;
