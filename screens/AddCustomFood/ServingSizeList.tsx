import React from "react";
import { TextInput, View } from "react-native";
import { inputs } from "../../theme";
import { ServingSize } from "../../types";
import IconButton from "./IconButton";
import sharedStyles from "./sharedStyles";

interface ServingSizeListProps {
  servingSizes: ServingSize[];
  handleUpdateServingSize: (
    index: number,
    field: "amount" | "description",
    value: string
  ) => void;
  handleRemoveServingSize: (index: number) => void;
  per100unit: string;
}

const ServingSizeList: React.FC<ServingSizeListProps> = ({
  servingSizes,
  handleRemoveServingSize,
  handleUpdateServingSize,
  per100unit,
}) => {
  return (
    <>
      {servingSizes.map((servingSize, index) => (
        <View key={index} style={sharedStyles.row}>
          <View style={sharedStyles.columnLeft}>
            <TextInput
              style={inputs.textInput}
              value={servingSize.amount}
              onChangeText={(value) =>
                handleUpdateServingSize(index, "amount", value)
              }
              placeholder={`Amount (${per100unit})`}
              keyboardType="numeric"
            />
          </View>
          <View style={sharedStyles.columnRight}>
            <TextInput
              style={inputs.textInput}
              value={servingSize.description}
              onChangeText={(value) =>
                handleUpdateServingSize(index, "description", value)
              }
              placeholder="eg. 1 medium"
            />
          </View>
          {servingSizes.length > 1 && (
            <IconButton
              onPress={() => handleRemoveServingSize(index)}
              icon="remove-circle-outline"
            />
          )}
        </View>
      ))}
    </>
  );
};

export default ServingSizeList;
