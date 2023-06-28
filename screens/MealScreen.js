import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import FoodsList from "../components/FoodsList";
import MySafeAreaView from "../components/MySafeAreaView";
import SearchFood from "../components/SearchFood";
import { colors } from "../theme";

const MealScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const searchFoods = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchQuery}&page_size=20&json=true`
      );
      const data = await response.json();
      navigation.navigate("Search Results", {
        results: data.products,
        isLoading,
        searchQuery,
      }); // navigate to the SearchResults screen and pass the search results as a parameter
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFood = () => {
    console.log("Add food");
  };

  return (
    <MySafeAreaView>
      <ScrollView contentContainerStyle={styles.containerInner}>
        <FoodsList meal={meal} />
      </ScrollView>
      <SearchFood />
      <TouchableOpacity onPress={handleAddFood} style={styles.addButton}>
        <Text style={styles.addButtonLabel}>+ Add Custom Food</Text>
      </TouchableOpacity>
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
    backgroundColor: colors.accent,
    padding: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  addButtonLabel: {
    color: colors.lightText,
    fontWeight: "bold",
  },
});

export default MealScreen;
