import { format } from "date-fns";
import { Calendar, DateData } from "react-native-calendars";
import RBSheet from "react-native-raw-bottom-sheet";
import MyButton from "../../shared/MyButton";
import { baseFont, colors } from "../../theme";

interface CalendarSheetProps {
  calendarSelectorRef: React.MutableRefObject<RBSheet>;
  onDayPress: (date: DateData) => void;
  selectedDate: Date;
  goToToday: () => void;
}

const CalendarSheet: React.FC<CalendarSheetProps> = ({
  calendarSelectorRef,
  onDayPress,
  selectedDate,
  goToToday,
}) => {
  const markedDates = {
    [format(selectedDate, "yyyy-MM-dd")]: {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: colors.accent,
          borderRadius: 8,
        },
        text: {
          color: "white",
        },
      },
    },
  };

  const calendarTheme = {
    textDayFontFamily: baseFont,
    textMonthFontFamily: baseFont,
    textDayHeaderFontFamily: baseFont,
    indicatorColor: colors.accent,
    todayTextColor: colors.accent,
    arrowColor: colors.accent,
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 14,
  };

  return (
    <>
      <RBSheet
        ref={calendarSelectorRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType="none"
        height={450}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.1)",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
          container: {
            borderTopColor: colors.greyBorder,
            borderTopWidth: 1,
          },
        }}
      >
        <Calendar
          markingType={"custom"}
          height={400}
          firstDay={1}
          onDayPress={onDayPress}
          initialDate={format(selectedDate, "yyyy-MM-dd")}
          markedDates={markedDates}
          theme={calendarTheme}
        />
        <MyButton
          onPress={goToToday}
          style={{ margin: 10 }}
          text={"Go to today"}
        />
      </RBSheet>
    </>
  );
};

export default CalendarSheet;
