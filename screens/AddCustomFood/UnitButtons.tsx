import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MyText } from "../../shared/MyText";
import { inputs } from "../../theme";
import sharedStyles from "./sharedStyles";

interface UnitButtonsProps {
  per100unit: string;
  setPer100unit: Dispatch<SetStateAction<"g" | "ml">>;
}

const UnitButtons: React.FC<UnitButtonsProps> = ({
  per100unit,
  setPer100unit,
}) => {
  const UnitButton = ({
    label,
    value,
  }: {
    label: string;
    value: "g" | "ml";
  }) => {
    const isSelected = per100unit === value;
    return (
      <TouchableOpacity
        style={[
          styles.unitButton,
          isSelected ? styles.selected : styles.unselected,
        ]}
        onPress={() => setPer100unit(value)}
      >
        <MyText style={styles.unitButtonText}>{label}</MyText>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <MyText style={sharedStyles.title}>Unit</MyText>
      <View style={sharedStyles.row}>
        <View style={sharedStyles.columnLeft}>
          <UnitButton label="grams" value="g" />
        </View>
        <View style={sharedStyles.columnRight}>
          <UnitButton label="millilitres" value="ml" />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  unitButton: {
    ...inputs.textInput,
    alignItems: "center",
    justifyContent: "center",
  },
  unitButtonText: {
    fontSize: 16,
  },
  selected: {
    opacity: 1,
  },
  unselected: {
    opacity: 0.3,
  },
});

export default UnitButtons;
