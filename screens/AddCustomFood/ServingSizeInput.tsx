import React from "react";
import { View } from "react-native";
import { MyText } from "../../shared/MyText";
import { ServingSize } from "../../types";
import IconButton from "./IconButton";
import ServingSizeList from "./ServingSizeList";
import sharedStyles from "./sharedStyles";

interface ServingSizeInputProps {
  servingSizes: ServingSize[];
  handleUpdateServingSize: (
    index: number,
    field: "amount" | "description",
    value: string
  ) => void;
  handleRemoveServingSize: (index: number) => void;
  handleAddServingSize: () => void;
  per100unit: string;
}

const ServingSizeInput: React.FC<ServingSizeInputProps> = ({
  servingSizes,
  handleAddServingSize,
  handleRemoveServingSize,
  handleUpdateServingSize,
  per100unit,
}) => {
  return (
    <>
      <MyText style={sharedStyles.title}>Serving sizes</MyText>
      <ServingSizeList
        handleRemoveServingSize={handleRemoveServingSize}
        handleUpdateServingSize={handleUpdateServingSize}
        servingSizes={servingSizes}
        per100unit={per100unit}
      />
      <View style={sharedStyles.row}>
        <IconButton onPress={handleAddServingSize} icon="add-circle-outline" />
      </View>
    </>
  );
};

export default ServingSizeInput;
