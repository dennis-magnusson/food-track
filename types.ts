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
  food: Food;
  amount: number;
};

export type Meal = FoodEntry[];

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export type DayContextType = {
  date: string;
  meals: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snack: Meal;
  };
};

export type RootStackParamList = {
  Today: undefined;
  Meal: { mealType: MealType };
  AddCustomFood: undefined;
};

export type TodayScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Today"
>;

export type MealScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Meal"
>;
