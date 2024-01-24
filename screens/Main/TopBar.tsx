import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MyText } from "../../shared/MyText";
import { colors, typography } from "../../theme";
import { SettingsScreenNavigationProp } from "../../types";

interface TopBarProps {
  topPaddingAmount: number;
}

const TopBar: React.FC<TopBarProps> = ({ topPaddingAmount }) => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const navigateSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={[styles.rootContainer, { paddingTop: topPaddingAmount }]}>
      <TouchableOpacity>
        <View style={styles.iconContainer}>
          <Ionicons name="cog" size={24} color="white" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert("open date picker")}>
        <MyText style={styles.text}>Food Track</MyText>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateSettings}>
        <View style={styles.iconContainer}>
          <Ionicons name="cog" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: colors.accentBackground,
    paddingVertical: 6,
    // borderColor: "#ddd",
    // borderBottomWidth: 1,
  },
  iconContainer: {
    padding: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    ...typography.title,
  },
});
