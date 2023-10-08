import { NavigationContainer } from "@react-navigation/native";
import { format } from "date-fns";
import { useEffect, useReducer } from "react";
import loadingDayContext from "./constants/loadingDayContext";
import { DayContext, DayDispatchContext } from "./context/AppContext";
import { dayReducer } from "./context/reducers";
import AppNavigator from "./navigation/AppNavigator";
import LoadingScreen from "./screens/Loading/LoadingScreen";
import { fetchMealsForDate, initializeDB } from "./services/databaseService";
import parseRawMealData from "./utils/parseRawMealData";

function App() {
  const [day, dispatch] = useReducer(dayReducer, loadingDayContext);

  useEffect(() => {
    initializeDB();

    const loadDayData = async () => {
      const todaysDate = format(new Date(), "yyyy-MM-dd");
      const fetchedMealData = await fetchMealsForDate(todaysDate);

      const parsedMealData = parseRawMealData(fetchedMealData);

      dispatch({
        type: "SET_DAY_DATA",
        payload: { date: todaysDate, meals: parsedMealData },
      });
      dispatch({ type: "SET_LOADING", payload: { loading: false } });
    };

    loadDayData();
  }, []);

  if (day.loading) {
    return <LoadingScreen />;
  }

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
