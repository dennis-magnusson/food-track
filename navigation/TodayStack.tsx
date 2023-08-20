import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddCustomFoodScreen from "../screens/AddCustomFood/AddCustomFoodScreen";
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
      <Stack.Screen name="AddCustomFood" component={AddCustomFoodScreen} />
    </Stack.Navigator>
  );
};

export default TodayStack;
