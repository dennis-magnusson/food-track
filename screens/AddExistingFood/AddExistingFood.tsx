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
  fetchServingSizesForFood,
  insertFoodEntryToMeal,
} from "../../services/databaseService";
import BackButton from "../../shared/BackButton";
import MyButton from "../../shared/MyButton";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { MyText } from "../../shared/MyText";
import ServingSizesSheet from "../../shared/ServingSizesSheet";
import { inputs, typography } from "../../theme";
import {
  AddExistingFoodScreenNavigationProp,
  FoodEntryBeforeInsert,
  RootStackParamList,
  ServingSize,
} from "../../types";

interface AddExistingFoodScreenProps {
  route: RouteProp<RootStackParamList, "AddExistingFood">;
}

const AddExistingFoodScreen: React.FC<AddExistingFoodScreenProps> = ({
  route,
}) => {
  const [nServings, setNServings] = useState<string>("1");
  const [servingSize, setServingSize] = useState<ServingSize>(null);
  const [servingSizes, setServingSizes] = useState<ServingSize[]>(undefined);

  const navigation = useNavigation<AddExistingFoodScreenNavigationProp>();
  const dispatch = useContext(DayDispatchContext);

  const { food, mealType, mealId } = route.params;

  useEffect(() => {
    const fetchServingSizes = async () => {
      const fetchedServingSizes = await fetchServingSizesForFood(food.id);
      setServingSizes([...fetchedServingSizes]);
    };

    fetchServingSizes();
  }, []);

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

  const refRBSheet = useRef<RBSheet>();

  const handleLogFood = async () => {
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

  if (!servingSizes) {
    return <MyText>Loading...</MyText>;
  }

  return (
    <MySafeAreaView>
      <KeyboardAvoidingView>
        <BackButton backFunction={() => navigation.goBack()} />
        <View style={styles.container}>
          <MyText style={styles.title}>{food.name}</MyText>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={handleInputChange}
              value={nServings}
              autoFocus={true}
            />
            <TouchableOpacity
              onPress={() => refRBSheet.current?.open()}
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
            sheetRef={refRBSheet}
            servingSizes={servingSizes}
            setServingSize={setServingSize}
            food={food}
            currentlySelectedAmount={getNServingsInputValueParsed()}
          />
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

export default AddExistingFoodScreen;
