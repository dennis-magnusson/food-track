import { DayAction, DayContextType } from "../types";

export function dayReducer(
  day: DayContextType,
  action: DayAction
): DayContextType {
  switch (action.type) {
    case "SET_DAY_DATA":
      return {
        ...day,
        meals: action.payload.meals,
        date: action.payload.date,
      };
    case "SET_LOADING":
      return {
        ...day,
        loading: action.payload.loading,
      };
    case "ADD_FOOD":
      return {
        ...day,
        meals: {
          ...day.meals,
          [action.payload.mealType]: {
            ...day.meals[action.payload.mealType],
            entries: [
              ...day.meals[action.payload.mealType].entries,
              action.payload.food,
            ],
          },
        },
      };
    case "REMOVE_FOOD":
      return {
        ...day,
        meals: {
          ...day.meals,
          [action.payload.mealType]: {
            ...day.meals[action.payload.mealType],
            entries: day.meals[action.payload.mealType].entries.filter(
              (foodEntry) => foodEntry.food.id !== action.payload.foodId
            ),
          },
        },
      };
    case "CHANGE_FOOD_AMOUNT":
      return {
        ...day,
        meals: {
          ...day.meals,
          [action.payload.mealType]: {
            ...day.meals[action.payload.mealType],
            entries: day.meals[action.payload.mealType].entries.map(
              (foodEntry) =>
                foodEntry.food.id === action.payload.foodId
                  ? { ...foodEntry, amount: action.payload.newAmount }
                  : foodEntry
            ),
          },
        },
      };
    default:
      throw Error("Unknown action");
  }
}
