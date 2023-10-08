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
  AddCustomFood: { mealType: MealType };
  AddExistingFood: {
    mealType: MealType;
    food: Food;
  };
};

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
