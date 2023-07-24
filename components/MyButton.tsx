import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { colors } from "../theme";

interface MyButtonProps {
  onPress: () => void;
  text: string;
  style?: StyleProp<ViewStyle>;
}

const MyButton = ({ onPress, text, style, ...rest }: MyButtonProps) => {
  const containerStyles = [styles.addButton, style];
  return (
    <TouchableOpacity onPress={onPress} style={containerStyles} {...rest}>
      <Text style={styles.addButtonLabel}>{text}</Text>
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
