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
      <View>
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
  containerInner: {
    backgroundColor: colors.lightBackground,
  },
  addButton: {
    marginHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  textInput: {
    fontSize: 20,
    height: 30,
    width: 70,
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center",
    margin: 20,
  },
  button: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "#2196F3",
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 24,
    color: "white",
  },
  submitButton: {
    height: 20,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    marginTop: 20, // add margin top to the submit button
  },
  submitButtonText: {
    fontSize: 24,
    color: "white",
  },
});

export default AddEntryScreen;
