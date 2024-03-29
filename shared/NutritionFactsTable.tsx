import { StyleSheet, View } from "react-native";
import { Food } from "../types";
import { MyText } from "./MyText";

interface NutritionFactsTableProps {
  food: Food;
  amount: number;
}

const NutritionFactsTable: React.FC<NutritionFactsTableProps> = ({
  food,
  amount,
}) => {
  const computeNutritionValue = (baseValue: number) => {
    const am = Number.isNaN(amount) ? 0 : amount;
    const computedValue = (baseValue * am) / 100;
    return Math.floor(computedValue * 10) / 10;
  };

  return (
    <View style={styles.nutritionInfo}>
      <MyText style={styles.nutritionTitle}>Nutrition facts</MyText>
      <MyText style={styles.labelLine}>
        <MyText style={styles.bold}>Calories: </MyText>
        {computeNutritionValue(food.calories)}
      </MyText>
      <View style={styles.separator} />
      <View style={styles.columnsContainer}>
        <View style={styles.leftColumn}>
          <MyText style={styles.labelLine}>
            <MyText style={styles.bold}>Carbs: </MyText>
            {computeNutritionValue(food.carbs)}g
          </MyText>
          <MyText style={styles.labelLine}>
            <MyText style={styles.bold}>Fat: </MyText>
            {computeNutritionValue(food.fat)}g
          </MyText>
          <MyText style={styles.labelLine}>
            <MyText style={styles.bold}>Protein: </MyText>
            {computeNutritionValue(food.protein)}g
          </MyText>
        </View>
        <View style={styles.rightColumn}>
          <MyText style={styles.labelLine}>
            <MyText style={styles.bold}>Sugar: </MyText>
            {food.sugar ? computeNutritionValue(food.sugar) : "- "}g
          </MyText>
          <MyText style={styles.labelLine}>
            <MyText style={styles.bold}>Fiber: </MyText>
            {food.fiber ? computeNutritionValue(food.fiber) : "- "}g
          </MyText>
          <MyText style={styles.labelLine}>
            <MyText style={styles.bold}>Salt: </MyText>
            {food.salt ? computeNutritionValue(food.salt) : "- "}g
          </MyText>
        </View>
      </View>
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
  columnsContainer: {
    flexDirection: "row",
  },
  rightColumn: {
    flex: 0.5,
    flexDirection: "column",
  },
  leftColumn: {
    flex: 0.5,
    flexDirection: "column",
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
