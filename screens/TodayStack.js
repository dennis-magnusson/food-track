import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealScreen from "./MealScreen";
import TodayScreen from "./TodayScreen";

const TodayStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Today" component={TodayScreen} />
      <Stack.Screen name="Meal" component={MealScreen} />
    </Stack.Navigator>
  );
}

export default TodayStack;