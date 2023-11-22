import { StyleSheet, Text, View } from "react-native";
import { Food } from "../types";

interface NutritionFactsTableProps {
  food: Food;
  amountInput: string;
}

const NutritionFactsTable: React.FC<NutritionFactsTableProps> = ({
  food,
  amountInput,
}) => {
  const amountFloat = parseFloat(amountInput);
  const amount = isNaN(amountFloat) ? 0 : amountFloat;

  const computeNutritionValue = (baseValue: number) => {
    const computedValue = (baseValue * amount) / 100;
    return Math.floor(computedValue * 10) / 10;
  };

  return (
    <View style={styles.nutritionInfo}>
      <Text style={styles.nutritionTitle}>Nutrition facts</Text>
      <Text style={styles.labelLine}>
        <Text style={styles.bold}>Calories: </Text>
        {computeNutritionValue(food.calories)}
      </Text>
      <View style={styles.separator} />
      <Text style={styles.labelLine}>
        <Text style={styles.bold}>Carbs: </Text>
        {computeNutritionValue(food.carbs)}g
      </Text>
      <Text style={styles.labelLine}>
        <Text style={styles.bold}>Fat: </Text>
        {computeNutritionValue(food.fat)}g
      </Text>
      <Text style={styles.labelLine}>
        <Text style={styles.bold}>Protein: </Text>
        {computeNutritionValue(food.protein)}g
      </Text>
      <Text style={styles.labelLine}>
        <Text style={styles.bold}>Sugar: </Text>
        {food.sugar ? computeNutritionValue(food.sugar) : "- "}g
      </Text>
      <Text style={styles.labelLine}>
        <Text style={styles.bold}>Fiber: </Text>
        {food.fiber ? computeNutritionValue(food.fiber) : "- "}g
      </Text>
      <Text style={styles.labelLine}>
        <Text style={styles.bold}>Salt: </Text>
        {food.salt ? computeNutritionValue(food.salt) : "- "}g
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  nutritionInfo: {
    marginTop: 20,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  nutritionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  labelLine: {
    fontSize: 16,
    marginVertical: 3,
  },
  separator: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginVertical: 5,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default NutritionFactsTable;
