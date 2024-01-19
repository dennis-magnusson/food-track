import { RouteProp, useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { DayDispatchContext } from "../../context/AppContext";
import {
  deleteFoodEntry,
  updateAmountToFoodEntry,
} from "../../services/databaseService";
import BackButton from "../../shared/BackButton";
import MyButton from "../../shared/MyButton";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { MyText } from "../../shared/MyText";
import { colors, inputs, typography } from "../../theme";
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
  const { entry, mealType } = route.params;
  console.log(entry, mealType);
  const [servingSize, setServingSize] = useState<string>(
    entry.amount.toString()
  );

  const navigation = useNavigation<ModifyFoodEntryScreenNavigationProp>();
  const dispatch = useContext(DayDispatchContext);

  const handleModifyFoodEntry = async () => {
    const newAmount = parseFloat(servingSize) || 100;

    try {
      await updateAmountToFoodEntry(entry.id, newAmount);
      dispatch({
        type: "CHANGE_FOOD_AMOUNT",
        payload: {
          mealType,
          entryId: entry.id,
          newAmount,
        },
      });
      navigation.navigate("Meal", { mealType });
    } catch (error) {
      alert(error);
    }
  };

  const handleRemoveFoodEntry = async () => {
    try {
      await deleteFoodEntry(entry.id);
      dispatch({
        type: "DELETE_FOOD_ENTRY",
        payload: {
          mealType,
          entryId: entry.id,
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

  console.log();

  return (
    <MySafeAreaView>
      <KeyboardAvoidingView>
        <BackButton backFunction={() => navigation.goBack()} />
        <View style={styles.container}>
          <MyText style={styles.title}>{entry.food.name}</MyText>
          <View style={styles.inputContainer}>
            <TextInput
              autoFocus={true}
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              onChangeText={handleInputChange}
              value={servingSize}
            />
            <MyText style={styles.inputUnits}>{entry.food.per100unit}</MyText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <MyButton
              text="Update"
              onPress={handleModifyFoodEntry}
              style={{ flex: 1 }}
            />

            <MyButton
              text="Remove entry"
              onPress={handleRemoveFoodEntry}
              style={{ backgroundColor: colors.danger, flex: 1 }}
            />
          </View>
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
