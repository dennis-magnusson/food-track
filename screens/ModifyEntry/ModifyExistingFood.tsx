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
import { updateAmountToFoodEntry } from "../../services/databaseService";
import MyButton from "../../shared/MyButton";
import MySafeAreaView from "../../shared/MySafeAreaView";
import NutritionFactsTable from "../../shared/NutritionFactsTable";
import { inputs, typography } from "../../theme";
import {
  ModifyFoodEntryScreenNavigationProp,
  RootStackParamList,
} from "../../types";

interface ModifyFoodEntryScreenProps {
  route: RouteProp<RootStackParamList, "ModifyFoodEntry">;
}

const ModifyFoodEntryScreen: React.FC<ModifyFoodEntryScreenProps> = ({
  route,
}) => {
  const { entryId, food, mealType, currentAmount } = route.params;
  const [servingSize, setServingSize] = useState<string>(
    currentAmount.toString()
  );

  const navigation = useNavigation<ModifyFoodEntryScreenNavigationProp>();
  const dispatch = useContext(DayDispatchContext);

  const handleModifyFoodEntry = async () => {
    const newAmount = parseFloat(servingSize) || 100;

    try {
      await updateAmountToFoodEntry(entryId, newAmount);
      dispatch({
        type: "CHANGE_FOOD_AMOUNT",
        payload: {
          mealType,
          entryId,
          newAmount,
        },
      });
      navigation.navigate("Meal", { mealType });
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
            text="Update"
            onPress={handleModifyFoodEntry}
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

export default ModifyFoodEntryScreen;