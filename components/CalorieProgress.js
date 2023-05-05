import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CalorieProgress = () => {
  const totalCalories = 1113;
  const calorieGoal = 2000;
  const caloriesLeft = calorieGoal - totalCalories;
  const calorieProgress = totalCalories / calorieGoal;

  return (
    <View style={styles.container}>
      <Text>Calories</Text>
      <Text>{totalCalories} / {calorieGoal} kcal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
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

export default CalorieProgress;
