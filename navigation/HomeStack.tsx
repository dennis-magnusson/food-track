import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddCustomFoodScreen from "../screens/AddCustomFood/AddCustomFoodScreen";
import AddExistingFoodScreen from "../screens/AddExistingFood/AddExistingFood";
import MainScreen from "../screens/Main/MainScreen";
import MealScreen from "../screens/Meal/MealScreen";
import { RootStackParamList } from "../types";

const HomeStack = (): JSX.Element => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Meal" component={MealScreen} />
      <Stack.Screen name="AddCustomFood" component={AddCustomFoodScreen} />
      <Stack.Screen name="AddExistingFood" component={AddExistingFoodScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
