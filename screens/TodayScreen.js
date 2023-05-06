import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import CalorieProgress from '../components/CalorieProgress';
import MealBox from '../components/MealBox';
import NutrientSummary from '../components/NutrientSummary';

const TodayScreen = ({ navigation }) => {

  const nutrientsData = {
    totalProtein: 10,
    totalCarbs: 10,
    totalFat: 10,
    goalProtein: 150,
    goalCarbs: 100,
    goalFat: 50,
  }

  const calorieData = {
    meals: [
      {
        name: 'Breakfast',
        foods: [
          {
            name: 'Banana',
            amount_grams: 120,
            calories_kcal: 63,
            protein: 2,
            fat: 0,
            carbs: 23
          }
        ]
      },
      {
        name: 'Lunch',
        foods: [
          {
            name: 'Banana',
            amount_grams: 120,
            calories_kcal: 63,
            protein: 2,
            fat: 0,
            carbs: 23
          }
        ]
      },
      {
        name: 'Dinner',
        foods: [
          {
            name: 'Banana',
            amount_grams: 120,
            calories_kcal: 63,
            protein: 2,
            fat: 0,
            carbs: 23
          }
        ]
      },
      {
        name: 'Snack',
        foods: [
          {
            name: 'Banana',
            amount_grams: 120,
            calories_kcal: 63,
            protein: 2,
            fat: 0,
            carbs: 23
          }
        ]
      }
    ]
  }

  const handleMealPress = (meal) => {
    navigation.navigate('Meal', { mealData: meal })
  }

  return (
    <SafeAreaView style={styles.containerMain}>
      <ScrollView contentContainerStyle={styles.containerMeals}>
        <CalorieProgress calorieData={calorieData} />
        <NutrientSummary nutrientsData={nutrientsData} />
        {calorieData.meals.map((meal, index) =>
            <MealBox key={index} meal={meal} handlePress={handleMealPress} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerMeals: {
    paddingTop: 20,
    backgroundColor: '#fff',
    justifyContent: 'start',
    alignItems: 'center',
  },
});

export default TodayScreen;
