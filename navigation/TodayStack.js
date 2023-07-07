import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomFoodScreen from "../screens/CustomFoodScreen";
import MealScreen from "../screens/MealScreen";
import SearchResultsScreen from "../screens/SearchResultsScreen";
import TodayScreen from "../screens/TodayScreen";

const TodayStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Today" component={TodayScreen} />
      <Stack.Screen name="Meal" component={MealScreen} />
      <Stack.Screen name="Search Results" component={SearchResultsScreen} />
      <Stack.Screen name="Custom Food" component={CustomFoodScreen} />
    </Stack.Navigator>
  );
};

export default TodayStack;
