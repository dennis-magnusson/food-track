import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomFoodScreen from "../screens/CustomFoodScreen";
import MealScreen from "../screens/Meal/MealScreen";
import TodayScreen from "../screens/Today/TodayScreen";

const TodayStack = (): JSX.Element => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Today">
      <Stack.Screen name="Today" component={TodayScreen} />
      <Stack.Screen name="Meal" component={MealScreen} />
      <Stack.Screen name="Add Custom Food" component={CustomFoodScreen} />
    </Stack.Navigator>
  );
};

export default TodayStack;
