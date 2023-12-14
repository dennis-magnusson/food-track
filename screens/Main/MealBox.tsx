import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MyText } from "../../shared/MyText";
import { layout, typography } from "../../theme";
import { Meal, MealType } from "../../types";
import { getTotals } from "../../utils/getTotals";
import { capitalize } from "../../utils/textOps";

interface MealBoxProps {
  mealData: { type: MealType; meal: Meal };
  handleMealPress: (mealType: MealType) => void;
}

const MealBox: React.FC<MealBoxProps> = ({
  mealData,
  handleMealPress,
}): JSX.Element => {
  const totalCalories = getTotals(mealData.meal).totalCalories;

  return (
    <TouchableOpacity
      style={styles.mealBox}
      onPress={() => handleMealPress(mealData.type)}
    >
      <View>
        <MyText style={styles.mealBoxTitle}>{capitalize(mealData.type)}</MyText>
        <MyText style={styles.caloriesText}>{totalCalories} calories</MyText>
        {mealData.meal.entries.map((entry, index) => (
          <MyText key={index} style={styles.foodsText}>
            {entry.food.name}
          </MyText>
        ))}
      </View>
      <View>
        <Ionicons name="add-circle-outline" size={38} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mealBox: {
    ...layout.accentContainer1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mealBoxTitle: {
    ...typography.title2,
    marginTop: 0,
  },
  caloriesText: {
    ...typography.secondary,
    marginBottom: 5,
    fontWeight: "700",
  },
  foodsText: {
    ...typography.secondary,
  },
});

export default MealBox;
