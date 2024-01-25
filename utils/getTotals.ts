import useAmounts from "../hooks/useAmounts";
import { DayContextType, FoodEntry, Meal } from "../types";

type Totals = {
  totalCalories: number;
  totalCarbs: number;
  totalFat: number;
  totalProtein: number;
};

export function getTotals(meal: Meal, amounts: number[]): Totals;
export function getTotals(day: DayContextType): Totals;

export function getTotals(
  input: Meal | DayContextType,
  amounts: (number | null)[] = []
): Totals {
  let totalCalories = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalProtein = 0;

  if ((input as DayContextType).date !== undefined) {
    const day = input as DayContextType;
    Object.values(day.meals).forEach((meal: Meal) => {
      const amounts = useAmounts(meal.entries);
      const mealTotals = getTotals(meal, amounts); // Recursive call to get the totals of this meal
      totalCalories += mealTotals.totalCalories;
      totalCarbs += mealTotals.totalCarbs;
      totalFat += mealTotals.totalFat;
      totalProtein += mealTotals.totalProtein;
    });
  } else {
    const meal = input as Meal;
    meal.entries.forEach((entry: FoodEntry, index: number) => {
      let amount = amounts[index] || 1;
      const ratio = amount / 100;

      totalCalories += entry.food.calories * ratio;
      totalCarbs += entry.food.carbs * ratio;
      totalFat += entry.food.fat * ratio;
      totalProtein += entry.food.protein * ratio;
    });
  }

  return {
    totalCalories: Math.floor(totalCalories),
    totalCarbs: Math.floor(totalCarbs),
    totalFat: Math.floor(totalFat),
    totalProtein: Math.floor(totalProtein),
  };
}
