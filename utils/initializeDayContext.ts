import { format } from "date-fns";
import { DayContextType, MealType } from "../types";

const mealTypes: MealType[] = ["breakfast", "lunch", "dinner", "snack"];

export const initializeDayContext = (date: string): DayContextType => {
  // query db for meals for the day

  return {
    date: format(new Date(), "yyyy-MM-dd"),
    meals: {
      breakfast: {
        id: 0,
        entries: [],
      },
      lunch: {
        id: 1,
        entries: [],
      },
      dinner: {
        id: 2,
        entries: [],
      },
      snack: {
        id: 3,
        entries: [],
      },
    },
  };
};
