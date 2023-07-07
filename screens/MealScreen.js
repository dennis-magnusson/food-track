import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import FoodsList from "../components/FoodsList";
import MyButton from "../components/MyButton";
import MySafeAreaView from "../components/MySafeAreaView";
import SearchFood from "../components/SearchFood";
import { colors } from "../theme";

const MealScreen = ({ navigation, route }) => {
  const meal = [
    {
      name: "Banana",
      amount_value: 120,
      amount_units: "g",
      calories_kcal: 63,
      protein_grams: 2,
      fat_grams: 0,
      carbs_grams: 23,
    },
    {
      name: "Peanut butter",
      amount_value: 15,
      amount_units: "ml",
      calories_kcal: 100,
      protein_grams: 4,
      fat_grams: 5,
      carbs_grams: 1,
    },
  ];

  navigation.setOptions({ title: route.params.mealData.name });

  const handleAddCustomFood = () => {
    navigation.navigate("Custom Food");
  };

  return (
    <MySafeAreaView>
      <ScrollView contentContainerStyle={styles.containerInner}>
        <FoodsList foods={meal} />
      </ScrollView>
      <SearchFood />
      <MyButton
        text="+ Add Custom Food"
        style={styles.addButton}
        onPress={handleAddCustomFood}
      />
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerInner: {
    paddingTop: 16,
    backgroundColor: colors.lightBackground,
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

  addButton: {
    marginHorizontal: 10,
  },
});

export default MealScreen;
