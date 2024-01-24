import { Dispatch, SetStateAction } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { inputs, typography } from "../theme";
import { CustomServingSize, Food, ServingSize } from "../types";
import { MyText } from "./MyText";
import NutritionFactsTable from "./NutritionFactsTable";

interface ServingSizesSheetProps {
  sheetRef: React.RefObject<RBSheet>;
  servingSizes: ServingSize[];
  setServingSize: Dispatch<SetStateAction<ServingSize | CustomServingSize>>;
  food: Food;
  currentlySelectedAmount: number;
}

const ServingSizesSheet: React.FC<ServingSizesSheetProps> = ({
  sheetRef,
  servingSizes,
  setServingSize,
  food,
  currentlySelectedAmount,
}) => {
  return (
    <>
      <RBSheet
        ref={sheetRef}
        closeOnDragDown={true}
        height={300}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
        }}
      >
        <ScrollView style={{ margin: 10, paddingBottom: 100 }} bounces={false}>
          <MyText style={{ ...typography.title2, marginBottom: 10 }}>
            Select serving size
          </MyText>
          {servingSizes.map((servingSize) => (
            <TouchableOpacity
              key={servingSize.id}
              onPress={() => {
                setServingSize(servingSize);
                sheetRef.current?.close();
              }}
              style={{ marginBottom: 10, paddingVertical: 5 }}
            >
              <MyText
                style={inputs.textInput}
              >{`${servingSize.description} (${servingSize.amount}${food.per100unit})`}</MyText>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => {
              setServingSize(null);
              sheetRef.current?.close();
            }}
            style={{ marginBottom: 10, paddingVertical: 5 }}
          >
            <MyText style={inputs.textInput}>Custom amount (1g)</MyText>
          </TouchableOpacity>
        </ScrollView>
      </RBSheet>

      <NutritionFactsTable food={food} amount={currentlySelectedAmount} />
    </>
  );
};

export default ServingSizesSheet;
