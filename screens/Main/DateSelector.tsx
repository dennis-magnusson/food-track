import { Ionicons } from "@expo/vector-icons";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
      <TouchableOpacity>
        <View style={styles.iconContainer}>
          <Ionicons name="caret-back" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <Text style={styles.dateText}>{readableDate}</Text>
      <TouchableOpacity>
        <View style={styles.iconContainer}>
          <Ionicons name="caret-forward" size={24} color="black" />
        </View>
      </TouchableOpacity>
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
  iconContainer: {
    padding: 10,
    paddingHorizontal: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "700",
  },
});
