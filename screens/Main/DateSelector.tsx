import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  addDays,
  format,
  isToday,
  isYesterday,
  parseISO,
  subDays,
} from "date-fns";
import { useContext, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { DateData } from "react-native-calendars";
import RBSheet from "react-native-raw-bottom-sheet";
import { DayContext } from "../../context/AppContext";
import { MyText } from "../../shared/MyText";
import CalendarSheet from "./CalendarSheet";

interface DateSelectorProps {
  changeDay: (toDate: Date) => void;
}

const COLORS = "grey";

const DateSelector: React.FC<DateSelectorProps> = ({ changeDay }) => {
  const day = useContext(DayContext);
  const calendarSelectorRef = useRef<RBSheet>();

  const isoDate = parseISO(day.date);
  const readableDate = isToday(isoDate)
    ? `Today, ${format(isoDate, "dd MMM")}`
    : isYesterday(isoDate)
    ? `Yesterday, ${format(isoDate, "dd MMM")}`
    : format(isoDate, "EEEE, dd MMM");

  const handleNextPress = () => {
    changeDay(addDays(isoDate, 1));
  };

  const handlePreviousPress = () => {
    changeDay(subDays(isoDate, 1));
  };

  const onDayPress = (date: DateData) => {
    changeDay(parseISO(date.dateString));
    calendarSelectorRef.current.close();
  };

  const goToToday = () => {
    changeDay(new Date());
    calendarSelectorRef.current.close();
  };

  return (
    <>
      <View style={styles.rootContainer}>
        <TouchableOpacity onPress={handlePreviousPress}>
          <View style={styles.iconContainer}>
            <AntDesign name="left" size={18} color={COLORS} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => calendarSelectorRef.current.open()}>
          <MyText style={styles.dateText}>
            <Ionicons name="calendar" size={18} color={COLORS} /> {readableDate}
          </MyText>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextPress}>
          <View style={styles.iconContainer}>
            <AntDesign name="right" size={18} color={COLORS} />
          </View>
        </TouchableOpacity>
      </View>
      <CalendarSheet
        calendarSelectorRef={calendarSelectorRef}
        onDayPress={onDayPress}
        selectedDate={isoDate}
        goToToday={goToToday}
      />
    </>
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
