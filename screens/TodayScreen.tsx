import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import CalorieProgress from "../components/CalorieProgress";
import MealsList from "../components/MealsList";
import MySafeAreaView from "../components/MySafeAreaView";
import NutrientSummary from "../components/NutrientSummary";
import { colors } from "../theme";

const TodayScreen = ({ navigation }) => {
  const nutrientsData = {
    totalProtein: 10,
    totalCarbs: 10,
    totalFat: 10,
    goalProtein: 150,
    goalCarbs: 100,
    goalFat: 50,
  };

  const calorieData = {
    meals: [
      {
        name: "Breakfast",
        foods: [
          {
            name: "Banana",
            amount_grams: 120,
            calories_kcal: 63,
            protein: 2,
            fat: 0,
            carbs: 23,
          },
        ],
      },
      {
        name: "Lunch",
        foods: [
          {
            name: "Banana",
            amount_grams: 120,
            calories_kcal: 63,
            protein: 2,
            fat: 0,
            carbs: 23,
          },
        ],
      },
      {
        name: "Dinner",
        foods: [
          {
            name: "Banana",
            amount_grams: 120,
            calories_kcal: 63,
            protein: 2,
            fat: 0,
            carbs: 23,
          },
        ],
      },
      {
        name: "Snack",
        foods: [
          {
            name: "Banana",
            amount_grams: 120,
            calories_kcal: 63,
            protein: 2,
            fat: 0,
            carbs: 23,
          },
        ],
      },
    ],
  };

  const handleMealPress = (meal) => {
    navigation.navigate("Meal", { mealData: meal });
  };

  return (
    <MySafeAreaView>
      <ScrollView contentContainerStyle={styles.containerInner}>
        <CalorieProgress calorieData={calorieData} />
        <NutrientSummary nutrientsData={nutrientsData} />
        <MealsList
          meals={calorieData.meals}
          handleMealPress={handleMealPress}
        />
      </ScrollView>
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerInner: {
    paddingTop: 20,
    backgroundColor: colors.lightBackground,
    justifyContent: "start",
    alignItems: "center",
  },
});

export default TodayScreen;
