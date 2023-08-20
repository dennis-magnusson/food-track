import { DayContextType, FoodEntry, MealType } from "../types";

export type DayAction =
  | {
      type: "ADD_FOOD";
      payload: {
        mealType: MealType;
        food: FoodEntry;
      };
    }
  | {
      type: "REMOVE_FOOD";
      payload: {
        mealType: MealType;
        foodName: string;
      };
    }
  | {
      type: "CHANGE_FOOD_AMOUNT";
      payload: {
        mealType: MealType;
        foodId: number;
        newAmount: number;
      };
    };

export function dayReducer(
  day: DayContextType,
  action: DayAction
): DayContextType {
  switch (action.type) {
    case "ADD_FOOD":
      return {
        ...day,
        meals: {
          ...day.meals,
          [action.payload.mealType]: [
            ...day.meals[action.payload.mealType],
            action.payload.food,
          ],
        },
      };
    case "REMOVE_FOOD":
      return {
        ...day,
        meals: {
          ...day.meals,
          [action.payload.mealType]: day.meals[action.payload.mealType].filter(
            (foodEntry) => foodEntry.food.name !== action.payload.foodName
          ),
        },
      };
    case "CHANGE_FOOD_AMOUNT":
      return {
        ...day,
        meals: {
          ...day.meals,
          [action.payload.mealType]: day.meals[action.payload.mealType].map(
            (foodEntry) =>
              foodEntry.food.id === action.payload.foodId
                ? { ...foodEntry, amount: action.payload.newAmount }
                : foodEntry
          ),
        },
      };
    default:
      throw Error("Unknown action");
  }
}
