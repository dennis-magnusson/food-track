import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AddFoodModal from "../components/AddFoodModal";
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

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [foodQuantity, setFoodQuantity] = useState<number>(100);

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
    // navigation.navigate("Add Custom Food");
  };

  const handleFoodPress = (food: Food) => {
    setSelectedFood(food);
    setFoodQuantity(100);
    setIsModalVisible(true);
  };

  const handleFoodLog = () => {
    console.log(
      `Logged ${foodQuantity} ${selectedFood?.per100unit} of ${selectedFood?.name}`
    );
    // close the modal and reset the quantity input
    setIsModalVisible(false);
    setFoodQuantity(0);
  };

  return (
    <MySafeAreaView>
      <View style={styles.container}>
        <View style={styles.containerInner}>
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
          <ScrollView contentContainerStyle={styles.scrollView}>
            <FoodsList
              foods={filteredFoods}
              handleFoodPress={handleFoodPress}
            />
          </ScrollView>
        </View>
        <AddFoodModal
          setIsModalVisible={setIsModalVisible}
          setFoodQuantity={setFoodQuantity}
          foodQuantity={foodQuantity}
          handleFoodLog={handleFoodLog}
          isModalVisible={isModalVisible}
          selectedFood={selectedFood}
        />
      </View>
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInner: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: colors.lightBackground,
  },
  addButton: {
    marginHorizontal: 10,
  },
});

export default AddEntryScreen;
