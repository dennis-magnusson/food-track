import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { colors } from "../theme";
import { MyText } from "./MyText";

interface MyButtonProps {
  onPress: () => void;
  text: string;
  style?: StyleProp<ViewStyle>;
}

const MyButton = ({ onPress, text, style, ...rest }: MyButtonProps) => {
  const containerStyles = [styles.addButton, style];
  return (
    <TouchableOpacity onPress={onPress} style={containerStyles} {...rest}>
      <MyText style={styles.addButtonLabel}>{text}</MyText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: colors.accent,
    padding: 20,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  addButtonLabel: {
    color: colors.lightText,
    fontWeight: "bold",
  },
});

export default MyButton;
