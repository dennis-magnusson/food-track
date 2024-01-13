import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT_NUTRIENT_GOALS } from "../constants/defaultPreferences";
import { NutrientGoalKey } from "../types";

export const initializeAsyncStorage = async () => {
  for (const nutrient in DEFAULT_NUTRIENT_GOALS) {
    const existingValue = await AsyncStorage.getItem(nutrient);
    if (existingValue === null) {
      const nutrientGoalValue =
        DEFAULT_NUTRIENT_GOALS[nutrient as NutrientGoalKey];
      await storeNutrientGoal(nutrient as NutrientGoalKey, nutrientGoalValue);
    }
  }
};

export const storeNutrientGoal = async (
  nutrient: NutrientGoalKey,
  nutrientGoalValue: number
) => {
  try {
    await AsyncStorage.setItem(nutrient, nutrientGoalValue.toString());
  } catch (e) {
    console.log(e);
  }
};

export const getNutrientGoals = async (): Promise<{
  [K in NutrientGoalKey]?: number;
}> => {
  const nutrientKeys: NutrientGoalKey[] = [
    "carbGoal",
    "proteinGoal",
    "fatGoal",
    "caloriesGoal",
  ];
  const nutrientGoals: { [K in NutrientGoalKey]?: number } = {};

  for (const key of nutrientKeys) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        nutrientGoals[key] = parseFloat(value);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return nutrientGoals;
};
