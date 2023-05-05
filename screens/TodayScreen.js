import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import CalorieProgress from '../components/CalorieProgress';
import MealBox from '../components/MealBox';
import NutrientSummary from '../components/NutrientSummary';

const TodayScreen = ({ navigation }) => {

  const nutrientsData = {
    totalProtein: 10,
    totalCarbs: 10,
    totalFats: 10,
    goalProtein: 150,
    goalCarbs: 100,
    goalFats: 50,
  }

  const calorieData = {
    meals: [
      {
        name: 'Breakfast',
        calories: 312,
      },
      {
        name: 'Lunch',
        calories: 731,
      },
      {
        name: 'Dinner',
        calories: 687,
      },
      {
        name: 'Snack',
        calories: 312,
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
            <MealBox key={index} meal={meal} handlePress={handleMealPress}/>
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
