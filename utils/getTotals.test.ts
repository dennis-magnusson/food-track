import { DayContextType, Food, FoodEntry, Meal } from "../types";
import { getTotals } from "./getTotals";

// Sample data for testing
const apple: Food = {
  id: 1,
  name: "Apple",
  calories: 52,
  protein: 0.2,
  fat: 0.2,
  carbs: 14,
  per100unit: "g",
};

const bread: Food = {
  id: 2,
  name: "Bread",
  calories: 265,
  protein: 8,
  fat: 3,
  carbs: 49,
  per100unit: "g",
};

const foodEntry1: FoodEntry = { food: apple, amount: 150 };
const foodEntry2: FoodEntry = { food: bread, amount: 100 };

const breakfast: Meal = [foodEntry1];
const lunch: Meal = [foodEntry2];

const day: DayContextType = {
  date: "2023-08-19",
  meals: {
    breakfast: breakfast,
    lunch: lunch,
    dinner: [],
    snack: [],
  },
};

// Test cases
test("calculate totals for a single meal", () => {
  const mealTotals = getTotals(breakfast);
  expect(mealTotals.totalCalories).toBeCloseTo(78);
  expect(mealTotals.totalProtein).toBeCloseTo(0.3);
  expect(mealTotals.totalFat).toBeCloseTo(0.3);
  expect(mealTotals.totalCarbs).toBeCloseTo(21);
});

test("calculate totals for a whole day", () => {
  const dayTotals = getTotals(day);
  expect(dayTotals.totalCalories).toBeCloseTo(343);
  expect(dayTotals.totalProtein).toBeCloseTo(8.3);
  expect(dayTotals.totalFat).toBeCloseTo(3.3);
  expect(dayTotals.totalCarbs).toBeCloseTo(70);
});
