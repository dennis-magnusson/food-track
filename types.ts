import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type Food = {
  id: number;
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
  id: number;
  food: Food;
  amount: number;
};

export type Meal = {
  id: number;
  entries: FoodEntry[];
};

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export type DayContextType = {
  date: string;
  meals: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snack: Meal;
  };
  loading: boolean;
};

export type RootStackParamList = {
  Today: undefined;
  Meal: { mealType: MealType };
  AddCustomFood: { mealType: MealType; mealId: number };
  AddExistingFood: {
    mealType: MealType;
    mealId: number;
    food: Food;
  };
};

export interface RawMealDataRow {
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

export type TodayScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Today"
>;

export type MealScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Meal"
>;

export type AddCustomFoodScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddCustomFood"
>;

export type AddExistingFoodScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddExistingFood"
>;
