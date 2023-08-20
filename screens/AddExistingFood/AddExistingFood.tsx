import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MyButton from "../../shared/MyButton";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { inputs, typography } from "../../theme";
import { Food } from "../../types";

const AddExistingFoodScreen = ({ route }) => {
  const food: Food = route.params.food;
  const [servingSize, setServingSize] = useState<string>("100");

  const handleLogFood = () => {
    /* Handle the logging here */
  };

  const computeNutritionValue = (baseValue: number) => {
    const serving = parseFloat(servingSize);
    const computedValue = isNaN(serving) ? 0 : (baseValue * serving) / 100;

    return Math.floor(computedValue * 10) / 10;
  };

  return (
    <MySafeAreaView>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <Text style={styles.title}>{food.name}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              autoFocus={true}
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              onChangeText={setServingSize}
              value={servingSize}
            />
            <Text style={styles.inputUnits}>{food.per100unit}</Text>
          </View>

          <View style={styles.nutritionInfo}>
            <Text style={styles.nutritionTitle}>Nutrition facts</Text>
            <Text style={styles.labelLine}>
              <Text style={styles.bold}>Calories: </Text>
              {computeNutritionValue(food.calories)}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.labelLine}>
              <Text style={styles.bold}>Protein: </Text>
              {computeNutritionValue(food.protein)}g
            </Text>
            <Text style={styles.labelLine}>
              <Text style={styles.bold}>Fat: </Text>
              {computeNutritionValue(food.fat)}g
            </Text>
            <Text style={styles.labelLine}>
              <Text style={styles.bold}>Carbs: </Text>
              {computeNutritionValue(food.carbs)}g
            </Text>
            <Text style={styles.labelLine}>
              <Text style={styles.bold}>Sugar: </Text>
              {food.sugar ? computeNutritionValue(food.sugar) : "- "}g
            </Text>
            <Text style={styles.labelLine}>
              <Text style={styles.bold}>Fiber: </Text>
              {food.fiber ? computeNutritionValue(food.fiber) : "- "}g
            </Text>
            <Text style={styles.labelLine}>
              <Text style={styles.bold}>Salt: </Text>
              {food.salt ? computeNutritionValue(food.salt) : "- "}g
            </Text>
          </View>

          <MyButton
            text="Log food"
            onPress={handleLogFood}
            style={{ marginTop: 20 }}
          />
        </View>
      </KeyboardAvoidingView>
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: { ...typography.title1, marginBottom: 10 },
  inputContainer: {
    flexDirection: "row",
  },
  inputUnits: {
    fontSize: 16,
    flex: 0.5,
    padding: 10,
  },
  input: {
    ...inputs.textInput,
    flex: 0.5,
  },
  nutritionInfo: {
    marginTop: 20,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  nutritionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  labelLine: {
    fontSize: 16,
    marginVertical: 3,
  },
  separator: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginVertical: 5,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default AddExistingFoodScreen;
