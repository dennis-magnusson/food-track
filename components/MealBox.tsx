import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { layout, typography } from "../theme";
import { Meal, MealType } from "../types";
import { getTotals } from "../utils/getTotals";

interface MealBoxProps {
  mealData: { type: MealType; meal: Meal };
  handleMealPress: (meal: Meal) => void;
}

const MealBox = ({ mealData, handleMealPress }: MealBoxProps): JSX.Element => {
  const totalCalories = getTotals(mealData.meal).totalCalories;

  return (
    <TouchableOpacity
      style={styles.mealBox}
      onPress={() => handleMealPress(mealData.meal)}
    >
      <View>
        <Text style={styles.mealBoxTitle}>{mealData.type}</Text>
        <Text>{totalCalories} cal</Text>
      </View>
      <View>
        <Ionicons name="add-circle-outline" size={38} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mealBox: {
    ...layout.boxContainer,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mealBoxTitle: {
    ...typography.title2,
  },
});

export default MealBox;
