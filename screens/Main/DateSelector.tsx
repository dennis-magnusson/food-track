import { Ionicons } from "@expo/vector-icons";
import {
  addDays,
  format,
  isToday,
  isTomorrow,
  isYesterday,
  parseISO,
  subDays,
} from "date-fns";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DayContext } from "../../context/AppContext";

interface DateSelectorProps {
  changeDay: (toDate: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ changeDay }) => {
  const day = useContext(DayContext);
  const isoDate = parseISO(day.date);
  const readableDate = isToday(isoDate)
    ? "Today"
    : isYesterday(isoDate)
    ? "Yesterday"
    : isTomorrow(isoDate)
    ? "Tomorrow"
    : format(isoDate, "MMMM d, yyyy");

  const handleNextPress = () => {
    changeDay(addDays(isoDate, 1));
  };

  const handlePreviousPress = () => {
    changeDay(subDays(isoDate, 1));
  };

  return (
    <View style={styles.rootContainer}>
      <TouchableOpacity onPress={handlePreviousPress}>
        <View style={styles.iconContainer}>
          <Ionicons name="caret-back" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <Text style={styles.dateText}>{readableDate}</Text>
      <TouchableOpacity onPress={handleNextPress}>
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