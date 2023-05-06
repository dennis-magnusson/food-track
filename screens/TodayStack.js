import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealScreen from "./MealScreen";
import SearchResultsScreen from "./SearchResultsScreen";
import TodayScreen from "./TodayScreen";

const TodayStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Today" component={TodayScreen} />
      <Stack.Screen name="Meal" component={MealScreen} />
      <Stack.Screen name="Search Results" component={SearchResultsScreen} />
    </Stack.Navigator>
  );
}

export default TodayStack;