import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { insertFood } from "../services/databaseService";
import MyButton from "../shared/MyButton";
import MySafeAreaView from "../shared/MySafeAreaView";
import { colors } from "../theme";

const CustomFoodScreen = ({ navigation }) => {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [sugar, setSugar] = useState("");
  const [fiber, setFiber] = useState("");
  const [salt, setSalt] = useState("");
  const [per100unit, setPer100unit] = useState("g"); // Default value is "g"

  function resetForm() {
    setFoodName("");
    setCalories("");
    setPer100unit("g");
    setProtein("");
    setSalt("");
    setFiber("");
    setFat("");
    setCarbs("");
    setSugar("");
  }

  function handleSubmit() {
    if (!foodName || !calories || !protein || !carbs || !fat) {
      Alert.alert(
        "Missing fields",
        "Please fill out all required fields (calories, protein, carbs, fat)"
      );
      return;
    }

    // Convert strings to numbers
    const caloriesNum = parseFloat(calories);
    const proteinNum = parseFloat(protein);
    const carbsNum = parseFloat(carbs);
    const fatNum = parseFloat(fat);
    const sugarNum = parseFloat(sugar || "0"); // Default to 0 if not provided
    const fiberNum = parseFloat(fiber || "0"); // Default to 0 if not provided
    const saltNum = parseFloat(salt || "0");

    const food = {
      name: foodName,
      calories: caloriesNum,
      protein: proteinNum,
      carbs: carbsNum,
      fat: fatNum,
      sugar: sugarNum,
      fiber: fiberNum,
      salt: saltNum,
      per100unit: per100unit,
    };

    // Add to database
    insertFood(food);

    resetForm();
    navigation.goBack();
  }

  return (
    <MySafeAreaView>
      <ScrollView style={styles.container}>
        <Text style={styles.label}>Food Name:</Text>
        <TextInput
          style={styles.input}
          value={foodName}
          onChangeText={(text) => setFoodName(text)}
        />

        <Text style={styles.label}>Unit:</Text>
        <Picker
          selectedValue={per100unit}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => setPer100unit(itemValue)}
        >
          <Picker.Item label="Grams (g)" value="g" />
          <Picker.Item label="Milliliters (ml)" value="ml" />
        </Picker>
        <Text style={styles.label}>Calories (kcal/100{per100unit}):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={calories}
          onChangeText={(text) => setCalories(text)}
        />

        <Text style={styles.label}>Protein (g/100{per100unit}):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={protein}
          onChangeText={(text) => setProtein(text)}
        />

        <Text style={styles.label}>Carbohydrates (g/100{per100unit}):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={carbs}
          onChangeText={(text) => setCarbs(text)}
        />

        <Text style={styles.label}>Fat (g/100{per100unit}):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={fat}
          onChangeText={(text) => setFat(text)}
        />
        <Text style={styles.label}>Sugar (g/100{per100unit}):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={sugar}
          onChangeText={(text) => setSugar(text)}
        />

        <Text style={styles.label}>Fiber (g/100{per100unit}):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={fiber}
          onChangeText={(text) => setFiber(text)}
        />
        <Text style={styles.label}>Salt (g/100{per100unit}):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={salt}
          onChangeText={(text) => setSalt(text)}
        />
        <MyButton text="+ Add Custom Food" onPress={handleSubmit} />
      </ScrollView>
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.lightBackground,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
});
export default CustomFoodScreen;
