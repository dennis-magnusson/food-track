import { format, isToday, isYesterday, parseISO } from "date-fns";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DayContext } from "../../context/AppContext";

interface DateSelectorProps {}

const DateSelector: React.FC<DateSelectorProps> = () => {
  const day = useContext(DayContext);
  const isoDate = parseISO(day.date);
  const readableDate = isToday(isoDate)
    ? "Today"
    : isYesterday(isoDate)
    ? "Yesterday"
    : format(isoDate, "MMMM d, yyyy");

  return (
    <View style={styles.rootContainer}>
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>{"<"}</Text>
      </View>
      <Text style={styles.dateText}>{readableDate}</Text>
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>{">"}</Text>
      </View>
    </View>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  iconText: {
    fontWeight: "700",
  },
  iconContainer: {
    padding: 10,
    paddingHorizontal: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "700",
  },
});
