import { RouteProp, useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { DayDispatchContext } from "../../context/AppContext";
import { insertFoodEntryToMeal } from "../../services/databaseService";
import MyButton from "../../shared/MyButton";
import MySafeAreaView from "../../shared/MySafeAreaView";
import NutritionFactsTable from "../../shared/NutritionFactsTable";
import { inputs, typography } from "../../theme";
import {
  FoodEntry,
  ModifyExistingFoodScreenNavigationProp,
  RootStackParamList,
} from "../../types";

interface ModifyExistingFoodScreenProps {
  route: RouteProp<RootStackParamList, "AddExistingFood">;
}

const ModifyExistingFoodScreen: React.FC<ModifyExistingFoodScreenProps> = ({
  route,
}) => {
  const { food, mealType, mealId } = route.params;
  const [servingSize, setServingSize] = useState<string>("100");

  const navigation = useNavigation<ModifyExistingFoodScreenNavigationProp>();
  const dispatch = useContext(DayDispatchContext);

  const handleLogFood = async () => {
    const foodEntry: Omit<FoodEntry, "id"> = {
      food: food,
      amount: parseFloat(servingSize) || 100,
    };

    try {
      const insertedId = await insertFoodEntryToMeal(mealId, foodEntry);
      console.log(insertedId);
      dispatch({
        type: "ADD_FOOD",
        payload: {
          mealType: mealType,
          food: { foodEntry, id: insertedId },
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
      setServingSize(text);
    }
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
              onChangeText={handleInputChange}
              value={servingSize}
            />
            <Text style={styles.inputUnits}>{food.per100unit}</Text>
          </View>
          <NutritionFactsTable food={food} amountInput={servingSize} />
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
});

export default ModifyExistingFoodScreen;
