import { RouteProp, useNavigation } from "@react-navigation/native";
import * as Device from "expo-device";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { insertFood } from "../../services/databaseService";
import MyButton from "../../shared/MyButton";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { inputs, typography } from "../../theme";
import {
  AddCustomFoodScreenNavigationProp,
  RootStackParamList,
} from "../../types";

interface AddCustomFoodScreenProps {
  route: RouteProp<RootStackParamList, "AddCustomFood">;
}

const AddCustomFoodScreen: React.FC<AddCustomFoodScreenProps> = ({
  route,
}): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [protein, setProtein] = useState<string>("");
  const [fat, setFat] = useState<string>("");
  const [carbs, setCarbs] = useState<string>("");
  const [sugar, setSugar] = useState<string>("");
  const [fiber, setFiber] = useState<string>("");
  const [salt, setSalt] = useState<string>("");
  const [per100unit, setPer100unit] = useState<"g" | "ml">("g");

  const navigation = useNavigation<AddCustomFoodScreenNavigationProp>();

  const handleAddCustomFood = async () => {
    if (!name.trim()) {
      alert("Please enter the name of the food.");
      return;
    }

    const missingFields = [];

    if (!calories) missingFields.push("Calories");
    if (!protein) missingFields.push("Protein");
    if (!carbs) missingFields.push("Carbs");
    if (!fat) missingFields.push("Fat");

    if (missingFields.length) {
      alert(
        `Please enter the following required nutritional information: ${missingFields.join(
          ", "
        )}.`
      );
      return;
    }

    const food = {
      name,
      calories: parseFloat(calories),
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      sugar: sugar ? parseFloat(sugar) : null,
      fiber: fiber ? parseFloat(fiber) : null,
      fat: parseFloat(fat),
      salt: salt ? parseFloat(salt) : null,
      per100unit,
    };

    try {
      const insertedFood = await insertFood(food);

      navigation.navigate("AddExistingFood", {
        food: insertedFood,
        mealType: route.params.mealType,
        mealId: route.params.mealId,
      });

      setName("");
      setCalories("");
      setProtein("");
      setCarbs("");
      setFat("");
      setSugar("");
      setFiber("");
      setSalt("");
    } catch (error) {
      console.log("Error inserting food:", error);
    }
  };

  const UnitButton = ({
    label,
    value,
  }: {
    label: string;
    value: "g" | "ml";
  }) => {
    const isSelected = per100unit === value;
    return (
      <TouchableOpacity
        style={[
          styles.unitButton,
          isSelected ? styles.selected : styles.unselected,
        ]}
        onPress={() => setPer100unit(value)}
      >
        <Text style={styles.unitButtonText}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <MySafeAreaView>
      <KeyboardAvoidingView
        behavior={Device.osName === "iOS" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container} bounces={false}>
          <Text style={styles.topTitle}>Name of the food</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.columnFull]}
              value={name}
              placeholder="eg. Mango"
              onChangeText={setName}
            />
          </View>
          <Text style={styles.title}>Per 100 unit</Text>
          <View style={styles.row}>
            <View style={styles.columnLeft}>
              <UnitButton label="grams" value="g" />
            </View>
            <View style={styles.columnRight}>
              <UnitButton label="millilitres" value="ml" />
            </View>
          </View>

          <Text style={styles.title}>
            Nutritional info (per 100{per100unit})
          </Text>
          <View style={styles.row}>
            <View style={styles.columnLeft}>
              <Text style={styles.label}>Calories (kcal)</Text>
              <TextInput
                style={styles.input}
                value={calories}
                onChangeText={setCalories}
                placeholder="-"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.columnRight}>
              <Text style={styles.label}>Carbs (g)</Text>
              <TextInput
                style={styles.input}
                placeholder="-"
                value={carbs}
                onChangeText={setCarbs}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.columnLeft}>
              <Text style={styles.label}>Protein (g)</Text>
              <TextInput
                style={styles.input}
                value={protein}
                onChangeText={setProtein}
                placeholder="-"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.columnRight}>
              <Text style={styles.label}>Fat (g)</Text>
              <TextInput
                style={styles.input}
                value={fat}
                onChangeText={setFat}
                placeholder="-"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.columnLeft}>
              <Text style={styles.label}>Fiber (g)</Text>
              <TextInput
                style={styles.input}
                value={fiber}
                placeholder="-"
                onChangeText={setFiber}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.columnRight}>
              <Text style={styles.label}>Salt (g)</Text>
              <TextInput
                style={styles.input}
                value={salt}
                onChangeText={setSalt}
                placeholder="-"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.columnLeft}>
              <Text style={styles.label}>Sugar (g)</Text>
              <TextInput
                style={styles.input}
                value={sugar}
                onChangeText={setSugar}
                placeholder="-"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.columnRight}></View>
          </View>

          <View style={styles.row}>
            <View style={styles.columnFull}>
              <MyButton
                text="Add new food"
                onPress={handleAddCustomFood}
                style={{ marginTop: 10 }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  topTitle: {
    ...typography.title1,
    marginBottom: 8,
  },
  title: {
    ...typography.title1,
    marginVertical: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  columnLeft: {
    flex: 1,
    paddingRight: 5,
  },
  columnRight: {
    flex: 1,
    paddingLeft: 5,
  },
  columnFull: {
    flex: 1,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    ...inputs.textInput,
  },
  unitButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  unitButtonText: {
    fontSize: 16,
  },
  selected: {
    opacity: 1,
  },
  unselected: {
    opacity: 0.3,
  },
});

export default AddCustomFoodScreen;
