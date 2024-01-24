import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DayDispatchContext } from "../../context/AppContext";
import { MainScreenNavigationProp, MealType } from "../../types";
import { loadDayData } from "../../utils/loadDayData";
import DailyTotals from "./DailyTotals";
import DateSelector from "./DateSelector";
import MealsList from "./MealsList";
import TopBar from "./TopBar";

const MainScreen: React.FC = (): JSX.Element => {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const dispatch = useContext(DayDispatchContext);
  const insets = useSafeAreaInsets();

  const handleMealPress = (mealType: MealType): void => {
    navigation.navigate("Meal", { mealType });
  };

  const navigateToGoals = () => {
    navigation.navigate("Goals");
  };

  const changeDay = (newDay: Date) => {
    loadDayData(dispatch, newDay);
  };

  return (
    <>
      <TopBar topPaddingAmount={insets.top} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom,
          backgroundColor: "#fff",
        }}
        bounces={false}
      >
        <DailyTotals handlePress={navigateToGoals} />
        <DateSelector changeDay={changeDay} />
        <MealsList handleMealPress={handleMealPress} />
      </ScrollView>
    </>
  );
};

export default MainScreen;
