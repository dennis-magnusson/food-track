import { format, isToday, isYesterday, parseISO } from "date-fns";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DayContext } from "../../context/AppContext";
import { layout, typography } from "../../theme";
import { getTotals } from "../../utils/getTotals";

const DailyTotals: React.FC = (): JSX.Element => {
  const day = useContext(DayContext);
  const { totalCalories, totalFat, totalCarbs, totalProtein } = getTotals(day);
  const calorieGoal = 2500;

  const isoDate = parseISO(day.date);
  const readableDate = isToday(isoDate)
    ? "Today"
    : isYesterday(isoDate)
    ? "Yesterday"
    : format(isoDate, "MMMM d, yyyy");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Totals for {readableDate}</Text>
      <Text style={styles.stat}>{totalCalories} calories</Text>
      <Text style={styles.stat}>{totalProtein}g protein</Text>
      <Text style={styles.stat}>{totalCarbs}g carbohydrates</Text>
      <Text style={styles.stat}>{totalFat}g fat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...layout.accentContainer1,
  },
  title: { ...typography.title1, marginBottom: 8 },
  stat: typography.title3,
});

export default DailyTotals;
