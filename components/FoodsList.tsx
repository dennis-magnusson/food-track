import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme";
import { Food } from "../types";

interface FoodsListProps {
  foods: Food[];
}

const FoodsList = ({ foods }: FoodsListProps): JSX.Element => {
  return (
    <View style={styles.foodContainer}>
      {foods.map((food, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => {}}>
            <View style={styles.foodItem}>
              <Text style={styles.foodName}>{food.name}</Text>
              <Text style={styles.calories}>
                {food.calories} kcal, {food.protein}g Protein | {food.carbs}g
                Carbs | {food.fat}g Fat
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
    marginHorizontal: 10,
    marginTop: 6,
    marginBottom: 6,
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
