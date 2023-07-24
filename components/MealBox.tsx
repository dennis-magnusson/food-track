import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme";
import { FoodEntry, Meal, MealType } from "../types";

interface MealBoxProps {
  meal: { type: MealType; foodEntries: FoodEntry[] };
  handleMealPress: (meal: Meal) => void;
}

const MealBox = ({ meal, handleMealPress }: MealBoxProps): JSX.Element => {
  return (
    <TouchableOpacity
      style={styles.mealBox}
      onPress={() => handleMealPress(meal)}
    >
      <View>
        <Text style={styles.mealBoxTitle}>{meal.type}</Text>
        {meal.foodEntries.map((entry, index) => (
          <Text key={index} style={styles.nutritionInfo}>
            {entry.food.name}, {entry.amount}
            {entry.food.per100unit}
          </Text>
        ))}
      </View>
      <View>
        <Ionicons name="add-circle-outline" size={38} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mealBox: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.accentBackground,
    width: "90%",
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  mealBoxTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  nutritionInfo: {
    fontSize: 12,
  },
});

export default MealBox;
