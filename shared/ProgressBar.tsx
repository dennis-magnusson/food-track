import React from "react";
import { StyleSheet, View } from "react-native";
import { colors, typography } from "../theme";
import { MyText } from "./MyText";

interface ProgressBarProps {
  amount: number;
  goalAmount: number;
  category: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  amount,
  goalAmount,
  category,
}) => {
  const progress = (amount / goalAmount) * 100;
  const barHeight = `${progress}%`;

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

  const barColor = getBarColor();

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View
          style={[styles.bar, { height: barHeight, backgroundColor: barColor }]}
        />
      </View>

      <View style={styles.textBox}>
        <MyText style={styles.amountText}>
          {amount}
          {category != "Calories" ? "g" : ""}
        </MyText>
        <MyText style={styles.categoryText}>{category}</MyText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 1,
    minWidth: 70,
  },
  barContainer: {
    width: 10,
    height: 85,
    backgroundColor: colors.darkerBackground,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  bar: {
    width: 10,

    borderRadius: 10,
  },
  textBox: {
    marginLeft: 10,
    alignSelf: "flex-end",
  },
  amountText: {
    ...typography.title3,
  },
  categoryText: {
    color: "#666",
  },
});

export default ProgressBar;
