import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme";
import { FoodEntry } from "../types";
import { calculateNutrition } from "../utils/getTotals";

interface FoodsListProps {
  foods: FoodEntry[];
}

const FoodsList = ({ foods }: FoodsListProps): JSX.Element => {
  return (
    <View style={styles.foodContainer}>
      {foods.map((foodEntry, index) => {
        const { food, amount } = foodEntry;
        const calories = calculateNutrition(food.calories, amount);
        const protein = calculateNutrition(food.protein, amount);
        const fat = calculateNutrition(food.fat, amount);
        const carbs = calculateNutrition(food.carbs, amount);

        return (
          <TouchableOpacity key={index} onPress={() => {}}>
            <View style={styles.foodItem}>
              <Text style={styles.foodName}>
                {food.name}
                {", " + amount + food.per100unit}
              </Text>
              <Text style={styles.calories}>
                {calories} kcal, {protein}g Protein | {carbs}g Carbs | {fat}g
                Fat
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  foodContainer: {
    flex: 1,
  },
  foodItem: {
    backgroundColor: colors.accentBackground,
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    padding: 16,
    elevation: 2,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  calories: {
    fontSize: 14,
  },
});
export default FoodsList;
