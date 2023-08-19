import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomFoodScreen from "../screens/CustomFoodScreen";
import MealScreen from "../screens/Meal/MealScreen";
import TodayScreen from "../screens/Today/TodayScreen";
import { RootStackParamList } from "../types";

const TodayStack = (): JSX.Element => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="Today"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Today" component={TodayScreen} />
      <Stack.Screen name="Meal" component={MealScreen} />
      <Stack.Screen name="AddCustomFood" component={CustomFoodScreen} />
    </Stack.Navigator>
  );
};

export default TodayStack;
