import { format } from "date-fns";
import { fetchMealsForDate } from "../services/databaseService";
import { DayAction } from "../types";
import parseRawMealData from "./parseRawMealData";

export const loadDayData = async (
  dispatch: React.Dispatch<DayAction>,
  date = new Date()
) => {
  const formattedDate = format(date, "yyyy-MM-dd");
  const fetchedMealData = await fetchMealsForDate(formattedDate);
  const parsedMealData = parseRawMealData(fetchedMealData);

  dispatch({
    type: "SET_DAY_DATA",
    payload: { date: formattedDate, meals: parsedMealData },
  });
  dispatch({ type: "SET_LOADING", payload: { loading: false } });
};
