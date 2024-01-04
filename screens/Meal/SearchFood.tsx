import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import MyButton from "../../shared/MyButton";
import { Food } from "../../types";
import SearchFoodsList from "./SearchFoodsList";
import { typography } from "../../theme";

interface SearchFoodProps {
  handleAddCustomFood: () => void;
  handleScanBarcode: () => void;
  handleFoodPress: (food: Food) => void;
  filteredFoods: Food[];
}

const SearchFood: React.FC<SearchFoodProps> = ({
  handleAddCustomFood,
  filteredFoods,
  handleFoodPress,
  handleScanBarcode
}): JSX.Element => {
  return (
    <>
    <View style={styles.buttonContainer}>
    <MyButton
        text="Scan Barcode"
        style={styles.scanButton}
        onPress={handleScanBarcode}
        icon={<Ionicons name="barcode-outline" size={24} color="white" />}
      />
      <MyButton
        text="Manual Entry"
        style={styles.addButton}
        onPress={handleAddCustomFood}
        icon={<Ionicons name="add-outline" size={24} color="white" />}
      />
    </View>
      
      <SearchFoodsList
        foods={filteredFoods}
        handleFoodPress={handleFoodPress}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    gap: 10,
  },
  addButton: {
    marginHorizontal: 10,
    flex: 1,
    marginLeft: 0
  },
  scanButton: {
    marginHorizontal: 10,
    flex: 1,
    backgroundColor: "#ff9900",
    marginRight: 0
  },
});

export default SearchFood;
