import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { DayContext } from "../../context/AppContext";
import { MyText } from "../../shared/MyText";
import { layout, typography } from "../../theme";
import { getTotals } from "../../utils/getTotals";
import NutrientIntakeBar from "./NutrientIntakeBar";

interface DailyIntakeProps {}

const DailyIntake: React.FC<DailyIntakeProps> = () => {
  const day = useContext(DayContext);
  const { totalCalories, totalFat, totalCarbs, totalProtein } = getTotals(day);
  return (
    <View>
      <View style={layout.accentContainer1}>
        <MyText style={typography.title1NoMargin}>Daily Intake</MyText>
        <View style={{ marginBottom: 16 }}>
          <NutrientIntakeBar
            nutrientName="Calories"
            nutrientAmount={totalCalories}
            nutrientGoal={2500}
          />
        </View>
        <NutrientIntakeBar
          nutrientName="Carbs"
          nutrientAmount={totalCarbs}
          nutrientGoal={343}
        />
        <NutrientIntakeBar
          nutrientName="Protein"
          nutrientAmount={totalProtein}
          nutrientGoal={142}
        />
        <NutrientIntakeBar
          nutrientName="Fat"
          nutrientAmount={totalFat}
          nutrientGoal={90}
        />
      </View>
    </View>
  );
};

export default DailyIntake;

const styles = StyleSheet.create({});
