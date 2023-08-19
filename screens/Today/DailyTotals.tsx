import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DayContext } from "../../context/AppContext";
import { layout, typography } from "../../theme";
import { getTotals } from "../../utils/getTotals";

const DailyTotals = (): JSX.Element => {
  const day = useContext(DayContext);
  const { totalCalories, totalFat, totalCarbs, totalProtein } = getTotals(day);
  const calorieGoal = 2500;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Totals</Text>
      <Text style={styles.stat}>{totalCalories} calories</Text>
      <Text style={styles.stat}>{totalProtein} protein</Text>
      <Text style={styles.stat}>{totalCarbs} carbohydrates</Text>
      <Text style={styles.stat}>{totalFat} fat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...layout.boxContainer,
  },
  title: { ...typography.title1, marginBottom: 8 },
  stat: typography.title3,
});

export default DailyTotals;
