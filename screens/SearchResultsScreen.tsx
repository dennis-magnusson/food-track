import React from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SearchResultsScreen = ({route}) => {

  const formatNutrition = (nutriments) => {
    const energy = nutriments["energy-kcal_100g"]
      ? `${Math.round(nutriments["energy-kcal_100g"])} kcal | `
      : "";
    const protein = nutriments.proteins_100g
      ? `${Math.round(nutriments.proteins_100g)}g Protein | `
      : "";
    const carb = nutriments.carbohydrates_100g
      ? `${Math.round(nutriments.carbohydrates_100g)}g Carb | `
      : "";
    const fat = nutriments.fat_100g
      ? `${Math.round(nutriments.fat_100g)}g Fat`
      : "";

    return energy + protein + carb + fat;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.foodItem}>
      <Image source={{ uri: item.image_small_url }} style={styles.foodImage} />
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>
          {item.product_name}, {item.brands}
        </Text>
        <Text style={styles.foodNutrition}>
          {formatNutrition(item.nutriments)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
      </View>
      <FlatList
        data={route.params.results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.foodList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  foodList: {
    padding: 10,
  },
  foodItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  foodImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  foodInfo: {
    flex: 1,
    flexDirection: "column",
  },
  foodName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  foodNutrition: {
    fontSize: 14,
  },
});

export default SearchResultsScreen;
