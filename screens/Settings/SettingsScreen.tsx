import { Text } from "react-native";
import MySafeAreaView from "../../shared/MySafeAreaView";

interface SettingsScreenProps {}

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  return (
    <>
      <MySafeAreaView>
        <Text>Settings</Text>
      </MySafeAreaView>
    </>
  );
};

export default SettingsScreen;
