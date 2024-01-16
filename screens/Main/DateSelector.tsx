import { AntDesign } from "@expo/vector-icons";
import {
  addDays,
  format,
  isToday,
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

const COLORS = "grey";

const DateSelector: React.FC<DateSelectorProps> = ({ changeDay }) => {
  const day = useContext(DayContext);
  const isoDate = parseISO(day.date);
  const readableDate = isToday(isoDate)
    ? `Today, ${format(isoDate, "dd MMM")}`.toUpperCase()
    : isYesterday(isoDate)
    ? `Yesterday, ${format(isoDate, "dd MMM")}`.toUpperCase()
    : format(isoDate, "EEEE, dd MMM").toUpperCase();

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
          <AntDesign name="left" size={18} color={COLORS} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert("open date picker")}>
        <Text style={styles.dateText}>{readableDate}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNextPress}>
        <View style={styles.iconContainer}>
          <AntDesign name="right" size={18} color={COLORS} />
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
    // backgroundColor: colors.accentBackground,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 14,
    //paddingVertical: 10,
  },
  iconContainer: {
    padding: 10,
    paddingHorizontal: 20,
  },
  dateText: {
    fontSize: 18,
    color: COLORS,
  },
});
