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
    case "CHANGE_FOOD_AMOUNT": {
      return {
        ...day,
        meals: {
          ...day.meals,
          [action.payload.mealType]: {
            ...day.meals[action.payload.mealType],
            entries: day.meals[action.payload.mealType].entries.map(
              (foodEntry) => {
                if (foodEntry.id === action.payload.entryId) {
                  const { id, meal_id, food, ...rest } = foodEntry; // destructuring needed to remove exclusive properties
                  if ("customAmount" in action.payload) {
                    return {
                      id,
                      meal_id,
                      food,
                      customAmount: action.payload.customAmount,
                    };
                  } else if (
                    "servingSize_id" in action.payload &&
                    "nServings" in action.payload
                  ) {
                    return {
                      id,
                      meal_id,
                      food,
                      servingSize_id: action.payload.servingSize_id,
                      nServings: action.payload.nServings,
                    };
                  } else {
                    throw new TypeError(
                      "Invalid payload type in reducer 'CHANGE_FOOD_AMOUNT'"
                    );
                  }
                }
                return foodEntry;
              }
            ),
          },
        },
      };
    }

    case "DELETE_FOOD_ENTRY":
      return {
        ...day,
        meals: {
          ...day.meals,
          [action.payload.mealType]: {
            ...day.meals[action.payload.mealType],
            entries: day.meals[action.payload.mealType].entries.filter(
              (foodEntry) => foodEntry.id !== action.payload.entryId
            ),
          },
        },
      };
    default:
      throw Error("Unknown action");
  }
}
