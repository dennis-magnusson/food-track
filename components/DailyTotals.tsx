import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DayContext } from "../context/AppContext";
import { colors } from "../theme";
import { getTotals } from "../utils/getTotals";
import NutrientSummary from "./NutrientSummary";

const DailyTotals = (): JSX.Element => {
  const day = useContext(DayContext);
  const { totalCalories, totalFat, totalCarbs, totalProtein } = getTotals(day);
  const calorieGoal = 2500;

  return (
    <View style={styles.container}>
      <Text>Calories</Text>
      <Text>
        {totalCalories} / {calorieGoal} kcal
      </Text>
      <NutrientSummary
        totalCarbs={totalCarbs}
        totalFat={totalFat}
        totalProtein={totalProtein}
      />
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
