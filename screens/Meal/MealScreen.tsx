import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
import { DayContext } from "../../context/AppContext";
import { useBarcode } from "../../hooks/useBarcode";
import {
  fetchAllFoods,
  fetchFoodByBarcode,
} from "../../services/databaseService";
import BackButton from "../../shared/BackButton";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { MyText } from "../../shared/MyText";
import { colors, typography } from "../../theme";
import {
  AddCustomFoodScreenNavigationProp,
  DayContextType,
  Food,
  FoodEntry,
  RootStackParamList,
} from "../../types";
import { capitalize } from "../../utils/textOps";
import ActionButtons from "./ActionButtons";
import AddedFoods from "./AddedFoods";
import SearchBar from "./SearchBar";
import SearchFoodsList from "./SearchFoodsList";

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

  const { barcode, clearBarcode } = useBarcode();

  const isFocused = navigation.isFocused();

  useEffect(() => {
    if (barcode && isFocused) {
      barcodeScanned(barcode);
    }
    return () => {
      clearBarcode();
    };
  }, [barcode, clearBarcode]);

  const barcodeScanned = (barcode_data: string) => {
    // check if database contains food with barcode
    fetchFoodByBarcode(barcode_data)
      .then((food) => {
        if (!food) {
          alert("Food not found");
        } else {
          handleFoodPress(food);
        }
      })
      .catch((err) => {
        console.log("error: ", err);
      });
    // if yes, navigate to add food screen with food data
    // if no, alert that food not found with possibility to navigate to add custom food
  };

  const handleScanBarcode = () => {
    navigation.navigate("BarcodeScanner");
  };

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
          <SearchFoodsList
            foods={filteredFoods}
            handleFoodPress={handleFoodPress}
          />
        ) : (
          <>
            <ActionButtons
              handleAddCustomFood={handleAddCustomFood}
              handleScanBarcode={handleScanBarcode}
            />
            <AddedFoods
              meal={meals[route.params.mealType]}
              handleEntryPress={handleEntryPress}
            />
          </>
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
