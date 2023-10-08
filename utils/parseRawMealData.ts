import { DayContextType, Food, FoodEntry, MealType } from "../types";

interface RawMealDataRow {
  amount: number | null;
  calories: number | null;
  carbs: number | null;
  date: string;
  fat: number | null;
  fiber: number | null;
  food_id: number | null;
  meal_id: number;
  name: string | null;
  per100unit: Food["per100unit"] | null;
  protein: number | null;
  salt: number | null;
  sugar: number | null;
  type: string;
}

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
      // if the row contains an entry
      const entry: FoodEntry = {
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
      emptyMeals[mealType].entries.push();
    }
  });

  console.log(emptyMeals);

  return emptyMeals;
}

export default parseRawMealData;
