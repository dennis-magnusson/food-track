import { useContext } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { DayContext } from "../../context/AppContext";
import { useNutrientGoals } from "../../hooks/useNutrientGoals";
import { MyText } from "../../shared/MyText";
import { colors, layout, typography } from "../../theme";
import { getTotals } from "../../utils/getTotals";
import NutrientIntakeBar from "./NutrientIntakeBar";

interface DailyIntakeProps {}

const DailyIntake: React.FC<DailyIntakeProps> = () => {
  const day = useContext(DayContext);
  const { totalCalories, totalFat, totalCarbs, totalProtein } = getTotals(day);

  const nutrientGoals = useNutrientGoals();

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
    <View>
      <View style={layout.accentContainer1}>
        <MyText style={typography.title1NoMargin}>Daily Intake</MyText>
        <View style={{ marginBottom: 16 }}>
          <NutrientIntakeBar
            nutrientName="Calories"
            nutrientAmount={totalCalories}
            nutrientGoal={nutrientGoals.caloriesGoal}
          />
        </View>
        <NutrientIntakeBar
          nutrientName="Carbs"
          nutrientAmount={totalCarbs}
          nutrientGoal={nutrientGoals.carbGoal}
        />
        <NutrientIntakeBar
          nutrientName="Protein"
          nutrientAmount={totalProtein}
          nutrientGoal={nutrientGoals.proteinGoal}
        />
        <NutrientIntakeBar
          nutrientName="Fat"
          nutrientAmount={totalFat}
          nutrientGoal={nutrientGoals.fatGoal}
        />
      </View>
    </View>
  );
};

export default DailyIntake;

const styles = StyleSheet.create({});
