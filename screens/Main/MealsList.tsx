import { useContext } from "react";
import { DayContext } from "../../context/AppContext";
import { DayContextType, MealType } from "../../types";
import MealBox from "./MealBox";

interface MealsListProps {
  handleMealPress: (mealType: MealType) => void;
}

const MealsList: React.FC<MealsListProps> = ({
  handleMealPress,
}): JSX.Element => {
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
