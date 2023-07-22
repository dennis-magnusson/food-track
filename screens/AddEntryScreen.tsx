import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import FoodsList from "../components/FoodsList";
import MyButton from "../components/MyButton";
import MySafeAreaView from "../components/MySafeAreaView";
import SearchFood from "../components/SearchFood";
import { fetchAllFoods } from "../services/databaseService";
import { colors } from "../theme";
import { Food, MealType } from "../types";

const AddEntryScreen = ({ route }) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mealType, setMealType] = useState<MealType>(route.params.meal.type);
  const [foods, setFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>(foods);

  useEffect(() => {
    fetchAllFoods((f) => {
      setFoods(f);
      setFilteredFoods(f);
    });
  }, []);

  const searchFoods = (query: string) => {
    setSearchQuery(query);
    setFilteredFoods(
      foods.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  navigation.setOptions({ title: `Add food - ${mealType}` });

  const handleAddCustomFood = () => {
    // navigation.navigate("Custom Food");
  };

  return (
    <MySafeAreaView>
      <View>
        <SearchFood
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchFoods={searchFoods}
        />
        <MyButton
          text="+ Add Custom Food"
          style={styles.addButton}
          onPress={handleAddCustomFood}
        />
        <ScrollView contentContainerStyle={styles.containerInner}>
          <FoodsList foods={filteredFoods} />
        </ScrollView>
      </View>
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerInner: {
    backgroundColor: colors.lightBackground,
  },
  addButton: {
    marginHorizontal: 10,
  },
});

export default AddEntryScreen;
