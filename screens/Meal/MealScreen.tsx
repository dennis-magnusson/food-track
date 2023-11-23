import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import * as Device from "expo-device";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { DayContext } from "../../context/AppContext";
import { fetchAllFoods } from "../../services/databaseService";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { colors, typography } from "../../theme";
import {
  AddCustomFoodScreenNavigationProp,
  DayContextType,
  Food,
  FoodEntry,
  RootStackParamList,
} from "../../types";
import { capitalize } from "../../utils/textOps";
import AddedFoods from "./AddedFoods";
import SearchBar from "./SearchBar";
import SearchFood from "./SearchFood";

const DEFAULT_FOOD_QUANTITY = 100;

interface MealScreenProps {
  route: RouteProp<RootStackParamList, "Meal">;
}

const MealScreen: React.FC<MealScreenProps> = ({ route }): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [foods, setFoods] = useState<Food[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const { meals }: DayContextType = useContext(DayContext);
  const navigation = useNavigation<AddCustomFoodScreenNavigationProp>();

  const filteredFoods = useMemo(() => {
    return foods.filter((food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, foods]);

  useFocusEffect(
    useCallback(() => {
      fetchAllFoods((f) => {
        setFoods(f);
      });
    }, [])
  );

  const handleAddCustomFood = () => {
    navigation.navigate("AddCustomFood", {
      mealType: route.params.mealType,
      mealId: meals[route.params.mealType].id,
    });
  };

  const handleFoodPress = (food: Food) => {
    navigation.navigate("AddExistingFood", {
      mealType: route.params.mealType,
      food,
      mealId: meals[route.params.mealType].id,
    });
  };

  const handleEntryPress = (
    id: FoodEntry["id"],
    food: FoodEntry["food"],
    currentAmount: FoodEntry["amount"]
  ) => {
    navigation.navigate("ModifyFoodEntry", {
      mealType: route.params.mealType,
      entryId: id,
      food,
      mealId: meals[route.params.mealType].id,
      currentAmount,
    });
  };

  return (
    <MySafeAreaView>
      <KeyboardAvoidingView
        behavior={Device.osName === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.containerInner}>
          <Text style={styles.title}>{capitalize(route.params.mealType)}</Text>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isFocused={isSearching}
            onFocus={() => setIsSearching(true)}
            onBlur={() => setIsSearching(false)}
          />
          {isSearching ? (
            <SearchFood
              handleAddCustomFood={handleAddCustomFood}
              filteredFoods={filteredFoods}
              handleFoodPress={handleFoodPress}
            />
          ) : (
            <AddedFoods
              meal={meals[route.params.mealType]}
              handleEntryPress={handleEntryPress}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInner: {
    flex: 1,
  },
  title: { ...typography.title1, margin: 15 },
  scrollView: {
    backgroundColor: colors.lightBackground,
  },
});

export default MealScreen;
