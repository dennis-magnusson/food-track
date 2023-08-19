import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import MySafeAreaView from "../shared/MySafeAreaView";
import { RootStackParamList } from "../types";

const HistoryStack = (): JSX.Element => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <MySafeAreaView>
      <Text>History</Text>
    </MySafeAreaView>
  );
};

export default HistoryStack;
