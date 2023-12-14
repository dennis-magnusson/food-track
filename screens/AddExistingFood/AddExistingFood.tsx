import { RouteProp, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { DayDispatchContext } from "../../context/AppContext";
import {
  fetchServingSizesForFood,
  insertFoodEntryToMeal,
} from "../../services/databaseService";
import BackButton from "../../shared/BackButton";
import MyButton from "../../shared/MyButton";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { MyText } from "../../shared/MyText";
import NutritionFactsTable from "../../shared/NutritionFactsTable";
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
  const customSize: ServingSize = {
    description: "Custom amount",
    amount: 1,
  };
  const [multiplier, setMultiplier] = useState<string>("1");
  const [servingSize, setServingSize] = useState<ServingSize>(customSize);
  const [servingSizes, setServingSizes] = useState<ServingSize[]>([customSize]);
  const navigation = useNavigation<AddExistingFoodScreenNavigationProp>();
  const dispatch = useContext(DayDispatchContext);

  useEffect(() => {
    const fetchServingSizes = async () => {
      const fetchedServingSizes = await fetchServingSizesForFood(food.id);
      setServingSizes([...servingSizes, ...fetchedServingSizes]);
    };

    fetchServingSizes();
  }, []);

  const handleLogFood = async () => {
    const foodEntry: Omit<FoodEntry, "meal_id" | "id"> = {
      food: food,
      amount: getAmount(),
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

  const getAmount = (): number => {
    const amnt =
      multiplier == ""
        ? 0
        : parseFloat(multiplier.replace(",", ".")) * servingSize.amount;
    console.log(amnt);
    return amnt;
  };

  const handleInputChange = (text: string) => {
    if (
      (text === "" || /^[\d]*[.,]?[\d]*$/.test(text)) &&
      !/^[.,]$/.test(text)
    ) {
      setMultiplier(text);
    }
  };

  const refRBSheet = useRef();

  if (servingSizes.length === 0) {
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
              value={multiplier}
              autoFocus={true}
            />
            <TouchableOpacity
              onPress={() => refRBSheet.current?.open()}
              style={styles.selectorButton}
            >
              <MyText>{`${servingSize.description} (${servingSize.amount}${food.per100unit})`}</MyText>
            </TouchableOpacity>
          </View>
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            height={300}
            customStyles={{
              wrapper: {
                backgroundColor: "transparent",
              },
            }}
          >
            <ScrollView
              style={{ margin: 10, paddingBottom: 100 }}
              bounces={false}
            >
              <MyText style={{ ...typography.title2, marginBottom: 10 }}>
                Select serving size
              </MyText>
              {servingSizes.map((servingSize, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => {
                    setServingSize(servingSize);
                    refRBSheet.current?.close();
                  }}
                  style={{ marginBottom: 10, paddingVertical: 5 }}
                >
                  <MyText
                    style={inputs.textInput}
                  >{`${servingSize.description} (${servingSize.amount}${food.per100unit})`}</MyText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </RBSheet>

          <NutritionFactsTable food={food} amount={getAmount()} />
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
