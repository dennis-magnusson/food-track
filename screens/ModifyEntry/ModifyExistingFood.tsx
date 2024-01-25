import { RouteProp, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { CUSTOM_SERVING_SIZE_OPTION } from "../../constants/customFood";
import { DayDispatchContext } from "../../context/AppContext";
import {
  deleteFoodEntry,
  fetchServingSizesForFood,
  updateAmountToFoodEntry,
} from "../../services/databaseService";
import BackButton from "../../shared/BackButton";
import MyButton from "../../shared/MyButton";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { MyText } from "../../shared/MyText";
import ServingSizesSheet from "../../shared/ServingSizesSheet";
import { colors, inputs, typography } from "../../theme";
import {
  FoodEntryBeforeInsert,
  ModifyFoodEntryScreenNavigationProp,
  RootStackParamList,
  ServingSize,
} from "../../types";

interface ModifyFoodEntryScreenProps {
  route: RouteProp<RootStackParamList, "ModifyFoodEntry">;
}

const ModifyFoodEntryScreen: React.FC<ModifyFoodEntryScreenProps> = ({
  route,
}) => {
  const [nServings, setNServings] = useState<string>("1");
  const [servingSize, setServingSize] = useState<ServingSize>(null);
  const [servingSizes, setServingSizes] = useState<ServingSize[]>([]);

  const navigation = useNavigation<ModifyFoodEntryScreenNavigationProp>();
  const dispatch = useContext(DayDispatchContext);

  const { entry, mealType, mealId } = route.params;
  const food = entry.food;

  const servingSizesSheetRef = useRef<RBSheet>();

  useEffect(() => {
    const fetchServingSizes = async () => {
      const fetchedServingSizes = await fetchServingSizesForFood(food.id);
      setServingSizes([...servingSizes, ...fetchedServingSizes]);
    };
    fetchServingSizes();
  }, []);

  useEffect(() => {
    if ("nServings" in entry && "servingSize_id" in entry) {
      setNServings(entry.nServings.toString());
      if (servingSizes.length > 0) {
        setServingSize(servingSizes.find((s) => s.id === entry.servingSize_id));
      }
    } else if ("customAmount" in entry) {
      setNServings(entry.customAmount.toString());
    } else {
      throw new Error("Invalid food entry");
    }
  }, [entry, servingSizes]);

  const handleModifyFoodEntry = async () => {
    if (nServings === "") {
      alert("Please enter a valid amount");
      return;
    }

    let foodEntry: FoodEntryBeforeInsert;

    if (servingSize === null) {
      foodEntry = {
        food: food,
        customAmount: getNServingsInputValueParsed(),
      };
    } else {
      foodEntry = {
        food: food,
        servingSize_id: servingSize.id,
        nServings: getNServingsInputValueParsed(),
      };
    }

    try {
      await updateAmountToFoodEntry(entry.id, foodEntry);
      if ("customAmount" in foodEntry) {
        dispatch({
          type: "CHANGE_FOOD_AMOUNT",
          payload: {
            mealType,
            entryId: entry.id,
            customAmount: foodEntry.customAmount,
          },
        });
      } else {
        dispatch({
          type: "CHANGE_FOOD_AMOUNT",
          payload: {
            mealType,
            entryId: entry.id,
            servingSize_id: foodEntry.servingSize_id,
            nServings: foodEntry.nServings,
          },
        });
      }
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

  const getNServingsInputValueParsed = (): number =>
    parseFloat(nServings.replace(",", "."));

  const handleInputChange = (text: string) => {
    if (
      (text === "" || /^[\d]*[.,]?[\d]*$/.test(text)) &&
      !/^[.,]$/.test(text)
    ) {
      setNServings(text);
    }
  };

  return (
    <MySafeAreaView>
      <KeyboardAvoidingView>
        <BackButton backFunction={() => navigation.goBack()} />
        <View style={styles.container}>
          <MyText style={styles.title}>{entry.food.name}</MyText>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={handleInputChange}
              value={nServings}
              autoFocus={true}
            />
            <TouchableOpacity
              onPress={() => servingSizesSheetRef.current?.open()}
              style={styles.selectorButton}
            >
              {servingSize === null ? (
                <MyText>{`${CUSTOM_SERVING_SIZE_OPTION.description} (${CUSTOM_SERVING_SIZE_OPTION.amount}${food.per100unit})`}</MyText>
              ) : (
                <MyText>{`${servingSize.description} (${servingSize.amount}${food.per100unit})`}</MyText>
              )}
            </TouchableOpacity>
          </View>
          <ServingSizesSheet
            servingSizes={servingSizes}
            setServingSize={setServingSize}
            food={entry.food}
            currentlySelectedAmount={getNServingsInputValueParsed()}
            sheetRef={servingSizesSheetRef}
          />
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
    marginRight: 10,
    flex: 0.1,
  },
  selectorButton: {
    flex: 0.9,
    ...inputs.textInput,
  },
});

export default ModifyFoodEntryScreen;
