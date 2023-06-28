import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import { colors } from "../theme";

const NutrientSummary = ({ nutrientsData }) => {
  const {
    totalProtein,
    totalCarbs,
    totalFat,
    goalFat,
    goalCarbs,
    goalProtein,
  } = nutrientsData;

  const calculateProgress = (total, goal) => {
    const progress = total / goal;
    return isNaN(progress) ? 0 : progress;
  };

  const proteinProgress = calculateProgress(totalProtein, goalProtein);
  const carbProgress = calculateProgress(totalCarbs, goalCarbs);
  const fatProgress = calculateProgress(totalFat, goalFat);

  return (
    <View style={styles.nutrientSummary}>
      <View style={styles.row}>
        <View style={styles.nutrientProgressBarContainer}>
          <Text style={styles.nutrientNameText}>Protein</Text>
          <ProgressBar
            progress={proteinProgress}
            color={colors.proteinColor}
            height={6}
            borderRadius={10}
            width={null}
          />
          <Text style={styles.nutrientProportionText}>
            {totalProtein} / {goalProtein}g
          </Text>
        </View>
        <View style={styles.nutrientProgressBarContainer}>
          <Text style={styles.nutrientNameText}>Carbs</Text>
          <ProgressBar
            progress={carbProgress}
            color={colors.carbsColor}
            height={6}
            borderRadius={10}
            width={null}
          />
          <Text style={styles.nutrientProportionText}>
            {totalCarbs} / {goalCarbs}g
          </Text>
        </View>
        <View style={styles.nutrientProgressBarContainer}>
          <Text style={styles.nutrientNameText}>Fat</Text>
          <ProgressBar
            progress={fatProgress}
            color={colors.fatColor}
            height={6}
            borderRadius={10}
            width={null}
          />
          <Text style={styles.nutrientProportionText}>
            {totalFat} / {goalFat}g
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nutrientSummary: {
    backgroundColor: colors.accentBackground,
    width: "90%",
    height: 90,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  calorieProgress: {
    justifyContent: "center",
    alignItems: "center",
  },
  nutrientsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  nutrientProgressBarContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  nutrientNameText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5,
  },
  nutrientProportionText: {
    textAlign: "center",
    marginTop: 5,
  },
});

export default NutrientSummary;
