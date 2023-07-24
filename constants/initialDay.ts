import { format } from "date-fns";
import { DayContextType } from "../types";

export const initialDay: DayContextType = {
  date: format(new Date(), "yyyy-MM-dd"),
  meals: {
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: [],
  },
};
