import { StyleSheet, View } from "react-native";
import { MyText } from "../../shared/MyText";
import ProgressBarHorizontal from "../../shared/ProgressBarHorizontal";
import { colors, typography } from "../../theme";

interface NutrientIntakeBarProps {
  nutrientName: "Calories" | "Carbs" | "Protein" | "Fat";
  nutrientAmount: number;
  nutrientGoal: number;
}

const NutrientIntakeBar: React.FC<NutrientIntakeBarProps> = ({
  nutrientName,
  nutrientAmount,
  nutrientGoal,
}) => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.textContainer}>
        <MyText style={styles.nutrientNameText}>{nutrientName}</MyText>
        <MyText style={styles.nutrientNameText}>
          {nutrientAmount} / {nutrientGoal}{" "}
          {nutrientName === "Calories" ? "kcal" : "g"}
        </MyText>
      </View>
      <ProgressBarHorizontal
        category={nutrientName}
        amount={nutrientAmount}
        goalAmount={nutrientGoal}
      />
    </View>
  );
};

export default NutrientIntakeBar;

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 12,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  nutrientNameText: {
    ...typography.secondary,
    color: colors.secondaryText,
  },
});
