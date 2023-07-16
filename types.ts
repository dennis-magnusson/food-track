export type Food = {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  sugar?: number;
  fiber?: number;
  salt?: number;
  per100unit: "g" | "ml";
};

export type FoodEntry = {
  food: Food;
  amount: number;
};

export type Meal = {
  type: "breakfast" | "lunch" | "dinner" | "snack";
  foodEntries: FoodEntry[];
};

export type DayContext = {
  date: string;
  meals: Meal[];
};
