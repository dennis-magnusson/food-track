import { useContext } from "react";
import { DayContext } from "../context/AppContext";
import { DayContextType, Meal, MealType } from "../types";
import MealBox from "./MealBox";

interface MealBoxProps {
  handleMealPress: (meal: Meal) => void;
}

const MealsList = ({ handleMealPress }: MealBoxProps): JSX.Element => {
  const { meals }: DayContextType = useContext(DayContext);
  return (
    <>
      {Object.entries(meals).map(([mealType, foodEntries]) => (
        <MealBox
          key={mealType}
          mealData={{ type: mealType as MealType, meal: foodEntries }}
          handleMealPress={handleMealPress}
        />
      ))}
    </>
  );
};

export default MealsList;
