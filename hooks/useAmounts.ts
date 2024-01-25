import { useEffect, useState } from "react";
import { getAmountForServingSize } from "../services/databaseService";
import { FoodEntry } from "../types";

function useAmounts(entries: FoodEntry[]) {
  const [amounts, setAmounts] = useState<(number | null)[]>([]);

  useEffect(() => {
    async function fetchAmounts() {
      const newAmounts = await Promise.all(
        entries.map(async (entry) => {
          if ("nServings" in entry && "servingSize_id" in entry) {
            const result = await getAmountForServingSize(entry.servingSize_id);
            return result[0].amount * entry.nServings;
          } else if ("customAmount" in entry) {
            return entry.customAmount;
          } else {
            throw new Error("Invalid entry type", entry);
          }
        })
      );

      setAmounts(newAmounts);
    }

    fetchAmounts();
  }, [entries]);

  return amounts;
}

export default useAmounts;
