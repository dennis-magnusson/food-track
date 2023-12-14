import { Picker } from "@react-native-picker/picker";
import { RouteProp, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { DayDispatchContext } from "../../context/AppContext";
import {
  fetchServingSizesForFood,
  insertFoodEntryToMeal,
} from "../../services/databaseService";
import BackButton from "../../shared/BackButton";
import MyButton from "../../shared/MyButton";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { MyText } from "../../shared/MyText";
import { inputs, typography } from "../../theme";
import {
  AddExistingFoodScreenNavigationProp,
  FoodEntry,
  RootStackParamList,
  ServingSize,
} from "../../types";

interface AddExistingFoodScreenProps {
  route: RouteProp<RootStackParamList, "AddExistingFood">;
}

const AddExistingFoodScreen: React.FC<AddExistingFoodScreenProps> = ({
  route,
}) => {
  const { food, mealType, mealId } = route.params;
  const [foodAmount, setFoodAmount] = useState<string>("100");
  const [servingSizes, setServingSizes] = useState<ServingSize[]>([]);

  const navigation = useNavigation<AddExistingFoodScreenNavigationProp>();
  const dispatch = useContext(DayDispatchContext);

  useEffect(() => {
    const fetchServingSizes = async () => {
      const fetchedServingSizes = await fetchServingSizesForFood(food.id);
      setServingSizes(fetchedServingSizes);
      if (fetchedServingSizes.length > 0) {
        setFoodAmount(fetchedServingSizes[0].amount.toString());
      }
    };

    fetchServingSizes();
  }, []);

  const handleLogFood = async () => {
    const foodEntry: Omit<FoodEntry, "meal_id" | "id"> = {
      food: food,
      amount: parseFloat(foodAmount) || 100,
    };

    try {
      const insertedId = await insertFoodEntryToMeal(mealId, foodEntry);
      dispatch({
        type: "ADD_FOOD",
        payload: {
          mealType: mealType,
          food: { ...foodEntry, id: insertedId, meal_id: mealId },
        },
      });
      navigation.navigate("Meal", { mealType: route.params.mealType });
    } catch (error) {
      alert(error);
    }
  };

  const handleInputChange = (text: string) => {
    if (
      (text === "" || /^[\d]*[.,]?[\d]*$/.test(text)) &&
      !/^[.,]$/.test(text)
    ) {
      setFoodAmount(text);
    }
  };

  return (
    <MySafeAreaView>
      <KeyboardAvoidingView>
        <BackButton backFunction={() => navigation.goBack()} />
        <View style={styles.container}>
          <MyText style={styles.title}>{food.name}</MyText>
          {servingSizes.length > 0 && (
            <Picker
              selectedValue={foodAmount}
              onValueChange={(itemValue) => setFoodAmount(itemValue)}
              style={styles.picker}
            >
              {servingSizes.map((size, i) => (
                <Picker.Item
                  key={i}
                  label={`${size.description} (${size.amount}${food.per100unit})`}
                  value={size.amount}
                />
              ))}
            </Picker>
          )}
          <View style={styles.inputContainer}>
            <TextInput
              // autoFocus={servingSizes.length == 0}
              style={styles.input}
              placeholder="Custom amount"
              keyboardType="numeric"
              onChangeText={handleInputChange}
              value={foodAmount}
            />
            <MyText style={styles.inputUnits}>{food.per100unit}</MyText>
          </View>
          {/* <NutritionFactsTable food={food} amountInput={foodAmount} /> */}
          <MyButton
            text="Log food"
            onPress={handleLogFood}
            style={{ marginTop: 10 }}
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
    fontSize: 18,
    padding: 10,
    fontWeight: "bold",
  },
  input: {
    ...inputs.textInput,
    flex: 1,
  },
  picker: {
    ...inputs.textInput,
    marginBottom: 10,
  },
});

export default AddExistingFoodScreen;
