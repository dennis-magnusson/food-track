import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const CustomFoodScreen = () => {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const handleSubmit = () => {
    // handle form submission, e.g. save data to database
    console.log(`Submitted: ${foodName} - ${calories} kcal, ${protein}g protein, ${carbs}g carbs, ${fat}g fat`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Food Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter food name"
        value={foodName}
        onChangeText={(text) => setFoodName(text)}
      />

      <Text style={styles.label}>Calories (kcal/100g):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter calories per 100g"
        keyboardType="numeric"
        value={calories}
        onChangeText={(text) => setCalories(text)}
      />

      <Text style={styles.label}>Protein (g/100g):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter protein per 100g"
        keyboardType="numeric"
        value={protein}
        onChangeText={(text) => setProtein(text)}
      />

      <Text style={styles.label}>Carbohydrates (g/100g):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter carbs per 100g"
        keyboardType="numeric"
        value={carbs}
        onChangeText={(text) => setCarbs(text)}
      />

      <Text style={styles.label}>Fat (g/100g):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter fat per 100g"
        keyboardType="numeric"
        value={fat}
        onChangeText={(text) => setFat(text)}
      />

      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
});
export default CustomFoodScreen;