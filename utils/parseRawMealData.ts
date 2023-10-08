import { DayContextType, FoodEntry, MealType, RawMealDataRow } from "../types";

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
      const entry: FoodEntry = {
        id: row.meal_id,
        food: {
          id: row.food_id,
          name: row.name,
          calories: row.calories,
          protein: row.protein,
          fat: row.fat,
          carbs: row.carbs,
          per100unit: row.per100unit,
        },
        amount: row.amount,
      };
      emptyMeals[mealType].entries.push(entry);
    }
  });

  return emptyMeals;
}

export default parseRawMealData;
