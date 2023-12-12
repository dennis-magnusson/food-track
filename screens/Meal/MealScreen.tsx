import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { DayContext } from "../../context/AppContext";
import { fetchAllFoods } from "../../services/databaseService";
import BackButton from "../../shared/BackButton";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { MyText } from "../../shared/MyText";
import { colors, typography } from "../../theme";
import {
  AddCustomFoodScreenNavigationProp,
  DayContextType,
  Food,
  FoodEntry,
  FoodWithoutServingSizes,
  RootStackParamList,
} from "../../types";
import { capitalize } from "../../utils/textOps";
import AddedFoods from "./AddedFoods";
import SearchBar from "./SearchBar";
import SearchFood from "./SearchFood";

interface MealScreenProps {
  route: RouteProp<RootStackParamList, "Meal">;
}

const MealScreen: React.FC<MealScreenProps> = ({ route }): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [foods, setFoods] = useState<FoodWithoutServingSizes[]>([]);
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
      <View style={styles.containerInner}>
        <BackButton backFunction={() => navigation.goBack()} />
        <MyText style={styles.title}>
          {capitalize(route.params.mealType)}
        </MyText>
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
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerInner: {
    flex: 1,
  },
  title: { ...typography.title1, marginLeft: 15 },
  scrollView: {
    backgroundColor: colors.lightBackground,
  },
});

export default MealScreen;
