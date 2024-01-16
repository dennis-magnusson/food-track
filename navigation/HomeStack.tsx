import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BarcodeProvider } from "../context/BarcodeProvider";
import AddCustomFoodScreen from "../screens/AddCustomFood/AddCustomFoodScreen";
import AddExistingFoodScreen from "../screens/AddExistingFood/AddExistingFood";
import BarcodeScannerScreen from "../screens/BarcodeScanner/BarcodeScannerScreen";
import GoalsScreen from "../screens/GoalsScreen/GoalsScreen";
import MainScreen from "../screens/Main/MainScreen";
import MealScreen from "../screens/Meal/MealScreen";
import ModifyFoodEntryScreen from "../screens/ModifyEntry/ModifyExistingFood";
import { RootStackParamList } from "../types";

const HomeStack = (): JSX.Element => {
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
      </Stack.Navigator>
    </BarcodeProvider>
  );
};

export default HomeStack;
