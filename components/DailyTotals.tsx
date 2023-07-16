import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";
import NutrientSummary from "./NutrientSummary";

const DailyTotals = (): JSX.Element => {
  const totalCalories = 1113;
  const calorieGoal = 2000;
  const caloriesLeft = calorieGoal - totalCalories;
  const calorieProgress = totalCalories / calorieGoal;

  return (
    <View style={styles.container}>
      <Text>Calories</Text>
      <Text>
        {totalCalories} / {calorieGoal} kcal
      </Text>
      <NutrientSummary />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accentBackground,
    width: "90%",
    height: 190,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DailyTotals;
