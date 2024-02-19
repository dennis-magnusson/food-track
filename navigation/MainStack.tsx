import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BarcodeProvider } from "../context/BarcodeProvider";
import AddCustomFoodScreen from "../screens/AddCustomFood/AddCustomFoodScreen";
import AddExistingFoodScreen from "../screens/AddExistingFood/AddExistingFood";
import BarcodeScannerScreen from "../screens/BarcodeScanner/BarcodeScannerScreen";
import CreateRecipeScreen from "../screens/CreateRecipe/CreateRecipeScreen";
import GoalsScreen from "../screens/Goals/GoalsScreen";
import MainScreen from "../screens/Main/MainScreen";
import MealScreen from "../screens/Meal/MealScreen";
import ModifyFoodEntryScreen from "../screens/ModifyEntry/ModifyExistingFood";
import RecipesScreen from "../screens/Recipes/RecipesScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import { RootStackParamList } from "../types";

const MainStack = (): JSX.Element => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <BarcodeProvider>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Meal" component={MealScreen} />
        <Stack.Screen name="AddCustomFood" component={AddCustomFoodScreen} />
        <Stack.Screen
          name="AddExistingFood"
          component={AddExistingFoodScreen}
        />
        <Stack.Screen
          name="ModifyFoodEntry"
          component={ModifyFoodEntryScreen}
        />
        <Stack.Screen name="BarcodeScanner" component={BarcodeScannerScreen} />
        <Stack.Screen name="Goals" component={GoalsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Recipes" component={RecipesScreen} />
        <Stack.Screen name="CreateRecipe" component={CreateRecipeScreen} />
      </Stack.Navigator>
    </BarcodeProvider>
  );
};

export default MainStack;
