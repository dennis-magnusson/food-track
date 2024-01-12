import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../theme";
import { MyText } from "./MyText";

interface MyButtonProps {
  onPress: () => void;
  text: string;
  style?: StyleProp<ViewStyle>;
  icon?: JSX.Element;
}

const MyButton = ({ onPress, text, style, icon, ...rest }: MyButtonProps) => {
  const containerStyles = [styles.buttonBase, style];
  return (
    <TouchableOpacity onPress={onPress} style={containerStyles} {...rest}>
      <View style={styles.container}>
        {icon}
        <MyText style={styles.buttonLabel}>{text}</MyText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    backgroundColor: colors.accent,
    padding: 20,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonLabel: {
    color: colors.lightText,
    fontWeight: "bold",
  },
  container: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});

export default MyButton;
