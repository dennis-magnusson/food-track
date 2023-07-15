import MealBox from "./MealBox";

const MealsList = ({ meals, handleMealPress }) => {
  return (
    <>
      {meals.map((meal, index) => (
        <MealBox key={index} meal={meal} handlePress={handleMealPress} />
      ))}
    </>
  );
};

export default MealsList;
