import { FoodBeforeInsert } from "../types";

export const basicFoods: FoodBeforeInsert[] = [
  {
    name: "Apple",
    calories: 52,
    protein: 0.3,
    fat: 0.2,
    carbs: 14,
    sugar: 10,
    fiber: 2.4,
    per100unit: "g",
    servingSizes: [
      { description: "small", amount: 150 },
      { description: "large", amount: 220 },
    ],
  },
  {
    name: "Chicken Breast (Cooked)",
    calories: 165,
    protein: 31,
    fat: 3.6,
    carbs: 0,
    per100unit: "g",
    servingSizes: [
      { description: "Medium", amount: 150 },
      { description: "Large", amount: 210 },
    ],
  },
  {
    name: "Brown Rice (Cooked)",
    calories: 123,
    protein: 2.6,
    fat: 1,
    carbs: 26,
    fiber: 1.8,
    per100unit: "g",
    servingSizes: [{ description: "deciliter", amount: 90 }],
  },
  {
    name: "Banana",
    calories: 89,
    protein: 1.1,
    fat: 0.3,
    carbs: 23,
    sugar: 12,
    fiber: 2.6,
    per100unit: "g",
    servingSizes: [
      { description: "medium", amount: 118 },
      { description: "large", amount: 136 },
    ],
  },
  {
    name: "Almonds (Raw)",
    calories: 579,
    protein: 21,
    fat: 50,
    carbs: 22,
    fiber: 12.5,
    per100unit: "g",
    servingSizes: [
      { description: "piece", amount: 1.5 },
      { description: "deciliter", amount: 75 },
    ],
  },
  {
    name: "Salmon (Cooked)",
    calories: 208,
    protein: 22,
    fat: 13,
    carbs: 0,
    per100unit: "g",
    servingSizes: [],
  },
  {
    name: "Greek Yogurt (Plain, 0% Fat)",
    calories: 59,
    protein: 10,
    fat: 0.4,
    carbs: 3.6,
    sugar: 3.6,
    per100unit: "g",
    servingSizes: [{ description: "deciliter", amount: 100 }],
  },
  {
    name: "Rolled Oats (Uncooked)",
    calories: 379,
    protein: 13.5,
    fat: 6.9,
    carbs: 68,
    fiber: 10.6,
    per100unit: "g",
    servingSizes: [{ description: "deciliter", amount: 40 }],
  },
  {
    name: "Olive Oil",
    calories: 884,
    protein: 0,
    fat: 100,
    carbs: 0,
    fiber: 0,
    per100unit: "g",
    servingSizes: [{ description: "tablespoon", amount: 13.5 }],
  },
  {
    name: "Potato",
    calories: 77,
    protein: 2,
    fat: 0.1,
    carbs: 17,
    fiber: 2.2,
    per100unit: "g",
    servingSizes: [
      { description: "small", amount: 75 },
      { description: "medium", amount: 150 },
      { description: "large", amount: 300 },
    ],
  },
  {
    name: "Egg",
    calories: 68,
    protein: 5.5,
    fat: 4.7,
    carbs: 0.6,
    fiber: 0,
    per100unit: "g",
    servingSizes: [{ description: "medium", amount: 44 }],
  },
  {
    name: "0% Fat Milk",
    calories: 35,
    protein: 3.4,
    fat: 0.1,
    carbs: 5,
    fiber: 0,
    per100unit: "ml",
    servingSizes: [{ description: "deciliter", amount: 100 }],
  },
  {
    name: "1.5% Fat Milk",
    calories: 47,
    protein: 3.4,
    fat: 1.5,
    carbs: 5,
    fiber: 0,
    per100unit: "ml",
    servingSizes: [{ description: "deciliter", amount: 100 }],
  },
  {
    name: "Onion",
    calories: 40,
    protein: 1.1,
    fat: 0.1,
    carbs: 9.3,
    fiber: 1.7,
    per100unit: "g",
    servingSizes: [
      { description: "small", amount: 70 },
      { description: "medium", amount: 110 },
    ],
  },
];
