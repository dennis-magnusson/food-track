import React, { useEffect, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { fetchAllFoods } from "../../services/databaseService";
import MyButton from "../../shared/MyButton";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { colors, typography } from "../../theme";
import { Food } from "../../types";
import { capitalize } from "../../utils/textOps";
import AddFoodModal from "./AddFoodModal";
import FoodsList from "./FoodsList";
import SearchBar from "./SearchBar";

const DEFAULT_FOOD_QUANTITY = 100;

const MealScreen = ({ route }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [foods, setFoods] = useState<Food[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [foodQuantity, setFoodQuantity] = useState<number>(
    DEFAULT_FOOD_QUANTITY
  );

  const filteredFoods = useMemo(() => {
    return foods.filter((food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, foods]);

  useEffect(() => {
    fetchAllFoods((f) => {
      setFoods(f);
    });
  }, []);

  const searchFoods = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddCustomFood = () => {
    // navigation.navigate("Add Custom Food");
  };

  const handleFoodPress = (food: Food) => {
    setSelectedFood(food);
    setFoodQuantity(DEFAULT_FOOD_QUANTITY);
    setIsModalVisible(true);
  };

  const handleFoodLog = () => {
    console.log(
      `Logged ${foodQuantity} ${selectedFood?.per100unit} of ${selectedFood?.name}`
    );
    // close the modal and reset the quantity input
    setIsModalVisible(false);
    setFoodQuantity(DEFAULT_FOOD_QUANTITY);
  };

  function handleSearchInputFocus() {
    setIsSearching(true);
  }
  function handleSearchInputBlur() {
    setIsSearching(false);
  }

  return (
    <MySafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.containerInner}>
          <Text style={styles.title}>{capitalize(route.params.mealType)}</Text>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchFoods={searchFoods}
            isFocused={isSearching}
            onFocus={handleSearchInputFocus}
            onBlur={handleSearchInputBlur}
          />
          {isSearching ? (
            <>
              <MyButton
                text="+ Add Custom Food"
                style={styles.addButton}
                onPress={handleAddCustomFood}
              />
              <FoodsList
                foods={filteredFoods}
                handleFoodPress={handleFoodPress}
              />
            </>
          ) : (
            <>
              <View>
                <Text>Not searching</Text>
              </View>
            </>
          )}
        </View>
        <AddFoodModal
          setIsModalVisible={setIsModalVisible}
          setFoodQuantity={setFoodQuantity}
          foodQuantity={foodQuantity}
          handleFoodLog={handleFoodLog}
          isModalVisible={isModalVisible}
          selectedFood={selectedFood}
        />
      </KeyboardAvoidingView>
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
  title: { ...typography.title1, margin: 15 },
  scrollView: {
    backgroundColor: colors.lightBackground,
  },
  addButton: {
    marginHorizontal: 10,
  },
});

export default MealScreen;
