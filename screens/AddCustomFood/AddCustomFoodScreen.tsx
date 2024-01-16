import { RouteProp, useNavigation } from "@react-navigation/native";
import * as Device from "expo-device";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useBarcode } from "../../hooks/useBarcode";
import { insertFood } from "../../services/databaseService";
import BackButton from "../../shared/BackButton";
import MyButton from "../../shared/MyButton";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { MyText } from "../../shared/MyText";
import { inputs, typography } from "../../theme";
import {
  AddCustomFoodScreenNavigationProp,
  RootStackParamList,
} from "../../types";
import NutritionInputGrid from "./NutritionInputGrid";
import ScanField from "./ScanField";
import ServingSizeInput from "./ServingSizeInput";
import UnitButtons from "./UnitButtons";
import sharedStyles from "./sharedStyles";

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
  const [barcodeInput, setBarcodeInput] = useState<string>("");

  const [servingSizes, setServingSizes] = useState<
    Array<{ amount: string; description: string }>
  >([
    {
      amount: "",
      description: "",
    },
  ]);

  const navigation = useNavigation<AddCustomFoodScreenNavigationProp>();

  const { barcode, clearBarcode } = useBarcode();

  useEffect(() => {
    if (barcode) {
      setBarcodeInput(barcode);
      clearBarcode();
    }
  }, [barcode, clearBarcode]);

  const handleAddServingSize = (): void => {
    setServingSizes([...servingSizes, { amount: "", description: "" }]);
  };

  const handleRemoveServingSize = (index: number): void => {
    const newServingSizes = [...servingSizes];
    newServingSizes.splice(index, 1);
    setServingSizes(newServingSizes);
  };

  const handleUpdateServingSize = (
    index: number,
    field: "amount" | "description",
    value: string
  ): void => {
    const newServingSizes = [...servingSizes];
    newServingSizes[index] = { ...newServingSizes[index], [field]: value };
    setServingSizes(newServingSizes);
  };

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
      servingSizes: servingSizes.map((size) => ({
        ...size,
        amount: parseFloat(size.amount),
      })),
      barcodeInput,
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

  return (
    <MySafeAreaView>
      <KeyboardAvoidingView
        behavior={Device.osName === "iOS" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <BackButton backFunction={() => navigation.goBack()} />
        <ScrollView style={styles.container} bounces={false}>
          <MyText style={styles.topTitle}>Food name</MyText>
          <View style={sharedStyles.row}>
            <TextInput
              style={[inputs.textInput, styles.columnFull]}
              value={name}
              placeholder="eg. Mango"
              onChangeText={setName}
            />
          </View>
          <UnitButtons per100unit={per100unit} setPer100unit={setPer100unit} />

          <MyText style={sharedStyles.title}>
            Nutritional info (per 100{per100unit})
          </MyText>
          <NutritionInputGrid
            calories={calories}
            setCalories={setCalories}
            fat={fat}
            setFat={setFat}
            carbs={carbs}
            setCarbs={setCarbs}
            protein={protein}
            setProtein={setProtein}
            fiber={fiber}
            setFiber={setFiber}
            salt={salt}
            setSalt={setSalt}
            sugar={sugar}
            setSugar={setSugar}
          />

          <ServingSizeInput
            handleAddServingSize={handleAddServingSize}
            handleRemoveServingSize={handleRemoveServingSize}
            handleUpdateServingSize={handleUpdateServingSize}
            per100unit={per100unit}
            servingSizes={servingSizes.map((size) => ({
              ...size,
              amount: parseFloat(size.amount),
            }))}
          />

          <View style={sharedStyles.row}>
            <MyText style={sharedStyles.title}>Add barcode</MyText>
          </View>

          <ScanField
            onPress={() => navigation.navigate("BarcodeScanner")}
            barcode={barcodeInput}
          />

          <View style={sharedStyles.row}>
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
  columnFull: {
    flex: 1,
  },
  label: {
    marginBottom: 5,
  },
  barcodeContainer: {
    marginTop: 20,
  },
});

export default AddCustomFoodScreen;
