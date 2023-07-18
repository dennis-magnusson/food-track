import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import FoodsList from "../components/FoodsList";
import MyButton from "../components/MyButton";
import MySafeAreaView from "../components/MySafeAreaView";
import SearchFood from "../components/SearchFood";
import { DayContext } from "../context/AppContext";
import { colors } from "../theme";
import { MealType } from "../types";

const AddEntryScreen = ({ route }) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mealType, setMealType] = useState<MealType>(route.params.meal.type);
  const day = useContext(DayContext);

  navigation.setOptions({ title: `Add food to ${mealType}` });

  const handleAddCustomFood = () => {
    // navigation.navigate("Custom Food");
  };

  return (
    <MySafeAreaView>
      <View>
        <ScrollView contentContainerStyle={styles.containerInner}>
          <FoodsList foods={day.meals[mealType]} />
        </ScrollView>
        <SearchFood
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchFoods={undefined}
        />
        <MyButton
          text="+ Add Custom Food"
          style={styles.addButton}
          onPress={handleAddCustomFood}
        />
      </View>
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerInner: {
    paddingTop: 16,
    backgroundColor: colors.lightBackground,
  },
  addButton: {
    marginHorizontal: 10,
  },
});

export default AddEntryScreen;
