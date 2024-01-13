import { useEffect, useState } from "react";
import { getNutrientGoals, storeNutrientGoal } from "../services/asyncStorage";
import { NutrientGoalKey } from "../types";

export const useNutrientGoals = () => {
  const [nutrientGoals, setNutrientGoals] = useState<{
    [K in NutrientGoalKey]?: number;
  }>({});

  useEffect(() => {
    const fetchNutrientGoals = async () => {
      const goals = await getNutrientGoals();
      setNutrientGoals(goals);
    };

    fetchNutrientGoals();
  }, []);

  const updateAndStoreNutrientGoals = async (updatedGoals: {
    [K in NutrientGoalKey]?: number;
  }) => {
    setNutrientGoals(updatedGoals);
    for (const nutrient in updatedGoals) {
      if (updatedGoals.hasOwnProperty(nutrient)) {
        await storeNutrientGoal(
          nutrient as NutrientGoalKey,
          updatedGoals[nutrient]!
        );
      }
    }
  };

  return { nutrientGoals, updateAndStoreNutrientGoals };
};
