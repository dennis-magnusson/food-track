import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import FoodsList from "../components/FoodsList";
import MyButton from "../components/MyButton";
import MySafeAreaView from "../components/MySafeAreaView";
import SearchFood from "../components/SearchFood";
import AppContext from "../context/AppContext";
import { colors } from "../theme";

const AddEntryScreen = () => {
  const navigation = useNavigation();
  const data = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  navigation.setOptions({ title: "Add food" });

  const handleAddCustomFood = () => {
    // navigation.navigate("Custom Food");
  };

  return (
    <MySafeAreaView>
      <View>
        <ScrollView contentContainerStyle={styles.containerInner}>
          <FoodsList foods={meal} />
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
