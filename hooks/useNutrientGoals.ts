import { useEffect, useState } from "react";
import { getNutrientGoals } from "../services/asyncStorage";
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

  return nutrientGoals;
};
