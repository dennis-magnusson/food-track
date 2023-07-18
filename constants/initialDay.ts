import { format } from "date-fns";
import { DayContextType } from "../types";

export const initialDay: DayContextType = {
  date: format(new Date(), "yyyy-MM-dd"),
  meals: {
    breakfast: [
      {
        food: {
          name: "Scrambled Eggs",
          calories: 140,
          protein: 12,
          fat: 10,
          carbs: 2,
          per100unit: "g",
        },
        amount: 200,
      },
      {
        food: {
          name: "Whole Wheat Toast",
          calories: 70,
          protein: 4,
          fat: 1,
          carbs: 13,
          per100unit: "g",
        },
        amount: 50,
      },
      {
        food: {
          name: "Orange Juice",
          calories: 110,
          protein: 1,
          fat: 0,
          carbs: 26,
          per100unit: "ml",
        },
        amount: 200,
      },
    ],
    lunch: [
      {
        food: {
          name: "Grilled Chicken Breast",
          calories: 165,
          protein: 31,
          fat: 3.6,
          carbs: 0,
          per100unit: "g",
        },
        amount: 150,
      },
      {
        food: {
          name: "Brown Rice",
          calories: 111,
          protein: 2.6,
          fat: 0.9,
          carbs: 23,
          per100unit: "g",
        },
        amount: 100,
      },
      {
        food: {
          name: "Steamed Broccoli",
          calories: 55,
          protein: 3.7,
          fat: 0.6,
          carbs: 11,
          per100unit: "g",
        },
        amount: 150,
      },
    ],
    dinner: [
      {
        food: {
          name: "Salmon Fillet",
          calories: 280,
          protein: 26,
          fat: 19,
          carbs: 0,
          per100unit: "g",
        },
        amount: 150,
      },
      {
        food: {
          name: "Quinoa",
          calories: 120,
          protein: 4,
          fat: 2,
          carbs: 21,
          per100unit: "g",
        },
        amount: 100,
      },
      {
        food: {
          name: "Roasted Asparagus",
          calories: 66,
          protein: 4.8,
          fat: 2.2,
          carbs: 8.5,
          per100unit: "g",
        },
        amount: 100,
      },
    ],
    snack: [
      {
        food: {
          name: "Greek Yogurt",
          calories: 120,
          protein: 12,
          fat: 0,
          carbs: 17,
          per100unit: "g",
        },
        amount: 150,
      },
      {
        food: {
          name: "Mixed Berries",
          calories: 50,
          protein: 1,
          fat: 0,
          carbs: 14,
          per100unit: "g",
        },
        amount: 100,
      },
    ],
  },
};
