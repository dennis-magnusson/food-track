import { Dispatch } from "react";
import { View } from "react-native";
import NutritionInput from "./NutritionInput";
import sharedStyles from "./sharedStyles";

interface NutritionInputGridProps {
  calories: string;
  carbs: string;
  protein: string;
  fat: string;
  fiber: string;
  salt: string;
  sugar: string;
  setSugar: Dispatch<React.SetStateAction<string>>;
  setSalt: Dispatch<React.SetStateAction<string>>;
  setFiber: Dispatch<React.SetStateAction<string>>;
  setFat: Dispatch<React.SetStateAction<string>>;
  setProtein: Dispatch<React.SetStateAction<string>>;
  setCarbs: Dispatch<React.SetStateAction<string>>;
  setCalories: Dispatch<React.SetStateAction<string>>;
}

const NutritionInputGrid: React.FC<NutritionInputGridProps> = ({
  calories,
  salt,
  sugar,
  protein,
  fat,
  carbs,
  fiber,
  setFiber,
  setCalories,
  setCarbs,
  setFat,
  setProtein,
  setSugar,
  setSalt,
}) => {
  return (
    <>
      <View style={sharedStyles.row}>
        <View style={sharedStyles.columnLeft}>
          <NutritionInput
            value={calories}
            setValue={setCalories}
            labelText="Calories (kcal)"
          />
        </View>
        <View style={sharedStyles.columnRight}>
          <NutritionInput
            value={carbs}
            setValue={setCarbs}
            labelText="Carbs (g)"
          />
        </View>
      </View>

      <View style={sharedStyles.row}>
        <View style={sharedStyles.columnLeft}>
          <NutritionInput
            value={protein}
            setValue={setProtein}
            labelText="Protein (g)"
          />
        </View>
        <View style={sharedStyles.columnRight}>
          <NutritionInput value={fat} setValue={setFat} labelText="Fat (g)" />
        </View>
      </View>

      <View style={sharedStyles.row}>
        <View style={sharedStyles.columnLeft}>
          <NutritionInput
            value={fiber}
            setValue={setFiber}
            labelText="Fiber (g)"
          />
        </View>
        <View style={sharedStyles.columnRight}>
          <NutritionInput
            value={salt}
            setValue={setSalt}
            labelText="Salt (g)"
          />
        </View>
      </View>

      <View style={sharedStyles.row}>
        <View style={sharedStyles.columnLeft}>
          <NutritionInput
            value={sugar}
            setValue={setSugar}
            labelText="Sugar (g)"
          />
        </View>
        <View style={sharedStyles.columnRight}></View>
      </View>
    </>
  );
};

export default NutritionInputGrid;
