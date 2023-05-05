import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProgressBar from "react-native-progress/Bar";

const NutrientSummary = ({ nutrientsData }) => {
  const {
    totalProtein,
    totalCarbs,
    totalFats,
    goalFats,
    goalCarbs,
    goalProtein,
  } = nutrientsData;

  const proteinProgress = totalProtein / goalProtein;
  const carbProgress = totalCarbs / goalCarbs;
  const fatProgress = totalFats / goalFats;

  return (
    <View style={styles.nutrientSummary}>
      <View style={styles.row}>
        <View style={styles.nutrientProgressBarContainer}>
          <Text style={styles.nutrientNameText}>Protein</Text>
          <ProgressBar
            progress={proteinProgress}
            color="#1565C0"
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
            color="#F44336"
            height={6}
            borderRadius={10}
            width={null}
          />
          <Text style={styles.nutrientProportionText}>
            {totalCarbs} / {goalCarbs}g
          </Text>
        </View>
        <View style={styles.nutrientProgressBarContainer}>
          <Text style={styles.nutrientNameText}>Fats</Text>
          <ProgressBar
            progress={fatProgress}
            color="#00897B"
            height={6}
            borderRadius={10}
            width={null}
          />
          <Text style={styles.nutrientProportionText}>
            {totalFats} / {goalFats}g
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nutrientSummary: {
    backgroundColor: "#f0f0f0",
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
