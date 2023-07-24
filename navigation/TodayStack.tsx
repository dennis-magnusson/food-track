import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddEntryScreen from "../screens/AddEntryScreen";
import CustomFoodScreen from "../screens/CustomFoodScreen";
import TodayScreen from "../screens/TodayScreen";

const TodayStack = (): JSX.Element => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Today">
      <Stack.Screen name="Today" component={TodayScreen} />
      <Stack.Screen name="Add Food" component={AddEntryScreen} />
      <Stack.Screen name="Add Custom Food" component={CustomFoodScreen} />
    </Stack.Navigator>
  );
};

export default TodayStack;
