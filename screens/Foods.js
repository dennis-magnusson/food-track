import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const FoodsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const searchFoods = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchQuery}&page_size=20&json=true`
      );
      const data = await response.json();
      setSearchResults(data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFood = () => {
    console.log("Add food");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.foodItem}>
      <Image
              source={{ uri: item.image_small_url }}
              style={{ width: 50, height: 50 }}
            />
      <Text style={styles.foodName}>
        {item.product_name}, {item.brands}
      </Text>
      <Text
        style={styles.foodNutrition}
      >{`${item.nutriments["energy-kcal_100g"]} kcal | ${item.nutriments.proteins_100g}g Protein | ${item.nutriments.carbohydrates_100g}g Carb | ${item.nutriments.fat_100g}g Fat`}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleAddFood}>
          <Text style={styles.addFoodButton}>+ Add Food</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a food"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchFoods}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchFoods}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.foodList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    alignItems: "flex-end",
  },
  addFoodButton: {
    color: "blue",
    fontWeight: "bold",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  foodList: {
    padding: 10,
  },
  foodItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  foodName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  foodNutrition: {
    fontSize: 14,
  },
});

export default FoodsScreen;
