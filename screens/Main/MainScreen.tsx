import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { DayDispatchContext } from "../../context/AppContext";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { colors } from "../../theme";
import { MainScreenNavigationProp, MealType } from "../../types";
import { loadDayData } from "../../utils/loadDayData";
import DailyTotals from "./DailyTotals";
import DateSelector from "./DateSelector";
import MealsList from "./MealsList";

const MainScreen: React.FC = (): JSX.Element => {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const dispatch = useContext(DayDispatchContext);

  const handleMealPress = (mealType: MealType): void => {
    navigation.navigate("Meal", { mealType });
  };

  const changeDay = (newDay: Date) => {
    loadDayData(dispatch, newDay);
  };

  return (
    <MySafeAreaView>
      <ScrollView contentContainerStyle={styles.containerInner}>
        <DateSelector changeDay={changeDay} />
        <DailyTotals />
        <MealsList handleMealPress={handleMealPress} />
      </ScrollView>
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerInner: {
    backgroundColor: colors.lightBackground,
  },
});

export default MainScreen;
