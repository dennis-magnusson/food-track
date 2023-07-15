import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme";

const FoodsList = ({ foods }) => {
  return (
    <View style={styles.foodContainer}>
      {foods.map((food, index) => (
        <TouchableOpacity key={index} onPress={() => {}}>
          <View style={styles.foodItem}>
            <Text style={styles.foodName}>
              {food.name}
              {food.amount_value
                ? ", " + food.amount_value + food.amount_units
                : " "}
            </Text>
            <Text style={styles.calories}>
              {food.calories_kcal} kcal, {food.protein_grams}g Protein |{" "}
              {food.carbs_grams}g Carbs | {food.fat_grams}g Fat
            </Text>
          </View>
        </TouchableOpacity>
      ))}
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
