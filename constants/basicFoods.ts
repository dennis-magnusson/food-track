import { Food, ServingSize } from "../types";

type ServingSizeBeforeInsert = Omit<ServingSize, "id" | "food_id">;

type FoodBeforeInsert = Omit<Food, "id" | "servingSizes"> & {
  servingSizes: ServingSizeBeforeInsert[];
};

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
      { description: "Small", amount: 150 },
      { description: "Large", amount: 220 },
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
      { description: "100g serving", amount: 100 },
      { description: "200g serving", amount: 200 },
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
    servingSizes: [
      { description: "100g serving", amount: 100 },
      { description: "200g serving", amount: 200 },
    ],
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
      { description: "Medium banana", amount: 118 },
      { description: "Large banana", amount: 136 },
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
      { description: "30g serving", amount: 30 },
      { description: "60g serving", amount: 60 },
    ],
  },
  {
    name: "Spinach (Raw)",
    calories: 23,
    protein: 2.9,
    fat: 0.4,
    carbs: 3.6,
    fiber: 2.2,
    per100unit: "g",
    servingSizes: [
      { description: "50g serving", amount: 50 },
      { description: "100g serving", amount: 100 },
    ],
  },
  {
    name: "Salmon (Cooked)",
    calories: 208,
    protein: 22,
    fat: 13,
    carbs: 0,
    per100unit: "g",
    servingSizes: [
      { description: "100g serving", amount: 100 },
      { description: "200g serving", amount: 200 },
    ],
  },
  {
    name: "Greek Yogurt (Plain, 0% Fat)",
    calories: 59,
    protein: 10,
    fat: 0.4,
    carbs: 3.6,
    sugar: 3.6,
    per100unit: "g",
    servingSizes: [
      { description: "100g serving", amount: 100 },
      { description: "200g serving", amount: 200 },
    ],
  },
  {
    name: "Rolled Oats (Uncooked)",
    calories: 379,
    protein: 13.5,
    fat: 6.9,
    carbs: 68,
    fiber: 10.6,
    per100unit: "g",
    servingSizes: [{ description: "1 dl", amount: 40 }],
  },
];
