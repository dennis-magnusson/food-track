import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { DayContext } from "../../context/AppContext";
import ProgressBar from "../../shared/ProgressBar";
import { layout, typography } from "../../theme";
import { getTotals } from "../../utils/getTotals";

const DailyTotals: React.FC = (): JSX.Element => {
  const day = useContext(DayContext);
  const { totalCalories, totalFat, totalCarbs, totalProtein } = getTotals(day);
  const calorieGoal = 2500;
  const carbsGoal = 100;
  const proteinGoal = 150;
  const fatGoal = 100;
  return (
    <View style={styles.container}>
      <ProgressBar
        amount={totalCalories}
        goalAmount={calorieGoal}
        category="Calories"
      />
      <ProgressBar
        amount={totalCarbs}
        goalAmount={carbsGoal}
        category="Carbs"
      />
      <ProgressBar
        amount={totalProtein}
        goalAmount={proteinGoal}
        category="Protein"
      />
      <ProgressBar amount={totalFat} goalAmount={fatGoal} category="Fat" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...layout.accentContainer1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: { ...typography.title1, marginBottom: 8 },
  stat: typography.title3,
});

export default DailyTotals;
