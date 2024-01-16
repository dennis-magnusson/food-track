import React, { useContext } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { DayContext } from "../../context/AppContext";
import { useNutrientGoals } from "../../hooks/useNutrientGoals";
import { MyText } from "../../shared/MyText";
import ProgressBarVertical from "../../shared/ProgressBarVertical";
import { colors, layout, typography } from "../../theme";
import { getTotals } from "../../utils/getTotals";

interface DailyTotalsProps {
  handlePress: () => void;
}

const DailyTotals: React.FC<DailyTotalsProps> = ({
  handlePress,
}): JSX.Element => {
  const day = useContext(DayContext);
  const { totalCalories, totalFat, totalCarbs, totalProtein } = getTotals(day);

  const { nutrientGoals } = useNutrientGoals();

  const loading = Object.keys(nutrientGoals).length === 0;

  if (loading)
    return (
      <View style={layout.accentContainer1}>
        <View>
          <ActivityIndicator size="small" />
          <MyText
            style={{
              textAlign: "center",
              marginTop: 10,
              color: colors.secondaryText,
            }}
          >
            Loading totals
          </MyText>
        </View>
      </View>
    );

  return (
    <TouchableOpacity onPress={handlePress} style={layout.accentContainer1}>
      <MyText style={styles.title}>Daily Totals</MyText>
      <View style={styles.container}>
        <ProgressBarVertical
          amount={totalCalories}
          goalAmount={nutrientGoals.caloriesGoal}
          category="Calories"
        />
        <ProgressBarVertical
          amount={totalCarbs}
          goalAmount={nutrientGoals.carbGoal}
          category="Carbs"
        />
        <ProgressBarVertical
          amount={totalProtein}
          goalAmount={nutrientGoals.proteinGoal}
          category="Protein"
        />
        <ProgressBarVertical
          amount={totalFat}
          goalAmount={nutrientGoals.fatGoal}
          category="Fat"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: { ...typography.title1NoMargin, marginBottom: 10 },
  stat: typography.title3,
});

export default DailyTotals;
