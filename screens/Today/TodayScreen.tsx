import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { colors } from "../../theme";
import { MealType, TodayScreenNavigationProp } from "../../types";
import DailyTotals from "./DailyTotals";
import MealsList from "./MealsList";

const TodayScreen: React.FC = (): JSX.Element => {
  const navigation = useNavigation<TodayScreenNavigationProp>();

  const handleMealPress = (mealType: MealType): void => {
    navigation.navigate("Meal", { mealType });
  };

  return (
    <MySafeAreaView>
      <ScrollView contentContainerStyle={styles.containerInner}>
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

export default TodayScreen;
