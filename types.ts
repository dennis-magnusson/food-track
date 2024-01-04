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
  servingSizes: ServingSize[];
  barcode?: string
};

export type FoodEntry = {
  id: number;
  meal_id: number;
  food: Food;
  amount: number;
};

export type Meal = {
  id: number;
  entries: FoodEntry[];
};

export type ServingSize = {
  description: string;
  amount: number;
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
  Main: undefined;
  Meal: { mealType: MealType };
  AddCustomFood: { mealType: MealType; mealId: number };
  AddExistingFood: {
    mealType: MealType;
    mealId: number;
    food: Food;
  };
  ModifyFoodEntry: {
    entryId: number;
    mealId: number;
    mealType: MealType;
    food: Food;
    currentAmount: number;
  };
  BarcodeScanner:undefined;
};

export type SettingsStackParamList = {
  MainSettings: undefined;
};

export interface RawMealDataRow {
  amount: number | null;
  calories: number | null;
  carbs: number | null;
  date: string;
  fat: number | null;
  fiber: number | null;
  food_id: number | null;
  entry_id: number | null;
  meal_id: number;
  name: string | null;
  per100unit: Food["per100unit"] | null;
  protein: number | null;
  salt: number | null;
  sugar: number | null;
  type: string;
}

export type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Main"
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

export type ModifyFoodEntryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ModifyFoodEntry"
>;

export type BarcodeScannerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BarcodeScanner"
>;

export type DayAction =
  | {
      type: "ADD_FOOD";
      payload: {
        mealType: MealType;
        food: FoodEntry;
      };
    }
  | {
      type: "REMOVE_FOOD";
      payload: {
        mealType: MealType;
        foodId: number;
      };
    }
  | {
      type: "CHANGE_FOOD_AMOUNT";
      payload: {
        entryId: number;
        mealType: MealType;
        newAmount: number;
      };
    }
  | {
      type: "DELETE_FOOD_ENTRY";
      payload: {
        entryId: number;
        mealType: MealType;
      };
    }
  | {
      type: "SET_DAY_DATA";
      payload: {
        meals: DayContextType["meals"];
        date: string;
      };
    }
  | {
      type: "SET_LOADING";
      payload: {
        loading: boolean;
      };
    };
