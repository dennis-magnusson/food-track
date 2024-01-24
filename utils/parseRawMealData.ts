import {
  DayContextType,
  Food,
  FoodEntry,
  MealType,
  RawMealDataRow,
} from "../types";

function parseRawMealData(rawData: RawMealDataRow[]): DayContextType["meals"] {
  var emptyMeals: DayContextType["meals"] = {
    breakfast: { id: -1, entries: [] },
    lunch: { id: -1, entries: [] },
    dinner: { id: -1, entries: [] },
    snack: { id: -1, entries: [] },
  };

  rawData.forEach((row, index) => {
    const mealType = row.type as MealType;
    emptyMeals[mealType].id = row.meal_id as number;

    if (row.name) {
      const entry: Omit<FoodEntry, "food"> & {
        food: Omit<Food, "servingSizes">;
      } = {
        id: row.entry_id,
        meal_id: row.meal_id,
        food: {
          id: row.food_id,
          name: row.name,
          calories: row.calories,
          protein: row.protein,
          fat: row.fat,
          carbs: row.carbs,
          per100unit: row.per100unit,
        },
        ...(row.servingsize_id !== null && row.n_servings !== null
          ? { servingSize_id: row.servingsize_id, nServings: row.n_servings }
          : { customAmount: row.customAmount }),
      };
      emptyMeals[mealType].entries.push(entry); // TODO: Fix type error
    }
  });

  return emptyMeals;
}

export default parseRawMealData;
