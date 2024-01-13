import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { DayContext } from "../../context/AppContext";
import ProgressBarVertical from "../../shared/ProgressBarVertical";
import { layout, typography } from "../../theme";
import { getTotals } from "../../utils/getTotals";

interface DailyTotalsProps {
  handlePress: () => void;
}

const DailyTotals: React.FC<DailyTotalsProps> = ({
  handlePress,
}): JSX.Element => {
  const day = useContext(DayContext);
  const { totalCalories, totalFat, totalCarbs, totalProtein } = getTotals(day);
  const calorieGoal = 2500;
  const carbsGoal = 100;
  const proteinGoal = 150;
  const fatGoal = 100;
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <ProgressBarVertical
        amount={totalCalories}
        goalAmount={calorieGoal}
        category="Calories"
      />
      <ProgressBarVertical
        amount={totalCarbs}
        goalAmount={carbsGoal}
        category="Carbs"
      />
      <ProgressBarVertical
        amount={totalProtein}
        goalAmount={proteinGoal}
        category="Protein"
      />
      <ProgressBarVertical
        amount={totalFat}
        goalAmount={fatGoal}
        category="Fat"
      />
    </TouchableOpacity>
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
