import { useContext } from "react";
import { DayContext } from "../context/AppContext";
import { Meal } from "../types";
import MealBox from "./MealBox";

interface MealBoxProps {
  handleMealPress: (meal: Meal) => void;
}

const MealsList = ({ handleMealPress }: MealBoxProps): JSX.Element => {
  const { meals } = useContext(DayContext);
  return (
    <>
      {Object.entries(meals).map(([mealType, foodEntries]) => (
        <MealBox
          key={mealType}
          meal={{ type: mealType, foodEntries }}
          handleMealPress={handleMealPress}
        />
      ))}
    </>
  );
};

export default MealsList;
