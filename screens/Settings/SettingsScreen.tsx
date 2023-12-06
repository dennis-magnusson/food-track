import { StyleSheet, Text } from "react-native";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { typography } from "../../theme";

interface SettingsScreenProps {}

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  return (
    <>
      <MySafeAreaView style={styles.container}>
        <Text style={styles.title}>Settings</Text>
      </MySafeAreaView>
    </>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  title: {
    ...typography.title1,
  },
});
