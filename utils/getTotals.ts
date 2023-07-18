import { DayContextType, FoodEntry, Meal } from "../types";

type Totals = {
  totalCalories: number;
  totalCarbs: number;
  totalFat: number;
  totalProtein: number;
};

export function getTotals(day: DayContextType): Totals {
  let totalCalories = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalProtein = 0;

  Object.values(day.meals).forEach((meal: Meal) => {
    meal.forEach((entry: FoodEntry) => {
      const { food, amount } = entry;
      const ratio = amount / 100;

      totalCalories += food.calories * ratio;
      totalCarbs += food.carbs * ratio;
      totalFat += food.fat * ratio;
      totalProtein += food.protein * ratio;
    });
  });

  return {
    totalCalories,
    totalCarbs,
    totalFat,
    totalProtein,
  };
}
