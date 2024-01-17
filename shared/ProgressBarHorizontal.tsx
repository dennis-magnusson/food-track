import { StyleSheet, View } from "react-native";
import { colors } from "../theme";

interface ProgressBarHorizontalProps {
  amount: number;
  goalAmount: number;
  category: "Calories" | "Carbs" | "Protein" | "Fat";
}

const ProgressBarHorizontal: React.FC<ProgressBarHorizontalProps> = ({
  amount,
  goalAmount,
  category,
}) => {
  const progress = (amount / goalAmount) * 100;
  const barWidth = `${progress}%`;

  const getBarColor = () => {
    switch (category) {
      case "Carbs":
        return colors.carbs;
      case "Protein":
        return colors.protein;
      case "Fat":
        return colors.fat;
      default:
        return "#333";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.bar,
            { width: barWidth, backgroundColor: getBarColor() },
          ]}
        />
      </View>
    </View>
  );
};

export default ProgressBarHorizontal;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  barContainer: {
    flex: 1,
    height: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  bar: {
    height: "100%",
  },
});
