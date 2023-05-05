import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MealBox = ({ meal, handlePress }) => {
  return (
    <TouchableOpacity
      style={styles.mealBox}
      onPress={() => handlePress(meal)}
    >
      <View>
        <Text style={styles.mealBoxTitle}>{meal.name}</Text>
        <Text style={styles.nutritionInfo}>{meal.calories} kcal</Text>
      </View>
      <View>
        <Ionicons name="add-circle-outline" size={38} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mealBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#f0f0f0",
    width: "90%",
    height: 140,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  mealBoxTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  nutritionInfo: {
    fontSize: 16,
  },
});

export default MealBox;
