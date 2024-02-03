import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MyText } from "../../shared/MyText";
import { colors, layout } from "../../theme";

interface SettingItemProps {
  itemName: string;
  value?: string;
  onPress: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  onPress,
  itemName,
  value,
}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.settingOption}>
        <View style={styles.buttonContainer}>
          <MyText style={styles.nameText}>{itemName}</MyText>
          {value && <MyText style={styles.valueText}>{value}</MyText>}
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  settingOption: {},
  buttonContainer: {
    ...layout.accentContainer1,
    marginVertical: 5,
    flexDirection: "row",
  },
  nameText: {},
  valueText: {
    marginLeft: "auto",
    color: colors.secondaryText,
  },
});

export default SettingItem;
