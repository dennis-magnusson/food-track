import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { colors } from "../../theme";
import { Meal } from "../../types";
import DailyTotals from "./DailyTotals";
import MealsList from "./MealsList";

const TodayScreen = (): JSX.Element => {
  const navigation = useNavigation();

  const handleMealPress = (meal: Meal): void => {
    navigation.navigate("Meal", {
      meal,
    });
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
    paddingTop: 20,
    backgroundColor: colors.lightBackground,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default TodayScreen;
