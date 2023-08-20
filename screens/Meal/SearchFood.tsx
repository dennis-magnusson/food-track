import React from "react";
import { StyleSheet } from "react-native";
import MyButton from "../../shared/MyButton";
import { Food } from "../../types";
import SearchFoodsList from "./SearchFoodsList";

interface SearchFoodProps {
  handleAddCustomFood: () => void;
  handleFoodPress: () => void;
  filteredFoods: Food[];
}

const SearchFood = ({
  handleAddCustomFood,
  filteredFoods,
  handleFoodPress,
}): JSX.Element => {
  return (
    <>
      <MyButton
        text="+ Add Custom Food"
        style={styles.addButton}
        onPress={handleAddCustomFood}
      />
      <SearchFoodsList
        foods={filteredFoods}
        handleFoodPress={handleFoodPress}
      />
    </>
  );
};

const styles = StyleSheet.create({
  addButton: {
    marginHorizontal: 10,
  },
});

export default SearchFood;
