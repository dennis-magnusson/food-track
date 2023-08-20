import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../theme";
import { Food } from "../../types";

interface FoodsListProps {
  foods: Food[];
  handleFoodPress: (food: Food) => void;
}

const SearchFoodsList = ({
  foods,
  handleFoodPress,
}: FoodsListProps): JSX.Element => {
  const renderItem = ({ item }: { item: Food }) => (
    <TouchableOpacity
      style={styles.foodItem}
      key={item.id}
      onPress={() => {
        handleFoodPress(item);
      }}
    >
      <Text style={styles.foodName}>{item.name}</Text>
      <Text style={styles.calories}>
        {item.calories} kcal, {item.protein}g Protein | {item.carbs}g Carbs |{" "}
        {item.fat}g Fat
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={foods}
      renderItem={renderItem}
      scrollEnabled={true}
      keyboardShouldPersistTaps="always"
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.foodContainer}
    />
  );
};

const styles = StyleSheet.create({
  foodContainer: {},
  foodItem: {
    backgroundColor: colors.accentBackground,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 6,
    marginBottom: 6,
    padding: 16,
    elevation: 2,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  calories: {
    fontSize: 14,
  },
});

export default SearchFoodsList;
