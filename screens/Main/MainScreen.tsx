import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { colors } from "../../theme";
import { MainScreenNavigationProp, MealType } from "../../types";
import DailyTotals from "./DailyTotals";
import DateSelector from "./DateSelector";
import MealsList from "./MealsList";

const MainScreen: React.FC = (): JSX.Element => {
  const navigation = useNavigation<MainScreenNavigationProp>();

  const handleMealPress = (mealType: MealType): void => {
    navigation.navigate("Meal", { mealType });
  };

  return (
    <MySafeAreaView>
      <ScrollView contentContainerStyle={styles.containerInner}>
        <DateSelector />
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
