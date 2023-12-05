import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import { SettingsStackParamList } from "../types";

const SettingsStack = (): JSX.Element => {
  const Stack = createNativeStackNavigator<SettingsStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="MainSettings"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MainSettings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
