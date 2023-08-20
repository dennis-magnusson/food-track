import { DayContextType, FoodEntry, Meal } from "../types";

type Totals = {
  totalCalories: number;
  totalCarbs: number;
  totalFat: number;
  totalProtein: number;
};

export function getTotals(meal: Meal): Totals;
export function getTotals(day: DayContextType): Totals;

export function getTotals(input: Meal | DayContextType): Totals {
  let totalCalories = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalProtein = 0;

  if ((input as DayContextType).date !== undefined) {
    const day = input as DayContextType;
    Object.values(day.meals).forEach((meal: Meal) => {
      const mealTotals = getTotals(meal); // Recursive call to get the totals of this meal
      totalCalories += mealTotals.totalCalories;
      totalCarbs += mealTotals.totalCarbs;
      totalFat += mealTotals.totalFat;
      totalProtein += mealTotals.totalProtein;
    });
  } else {
    const meal = input as Meal;
    meal.forEach((entry: FoodEntry) => {
      const { food, amount } = entry;
      const ratio = amount / 100;

      totalCalories += food.calories * ratio;
      totalCarbs += food.carbs * ratio;
      totalFat += food.fat * ratio;
      totalProtein += food.protein * ratio;
    });
  }

  return {
    totalCalories: Math.floor(totalCalories),
    totalCarbs: Math.floor(totalCarbs),
    totalFat: Math.floor(totalFat),
    totalProtein: Math.floor(totalProtein),
  };
}
