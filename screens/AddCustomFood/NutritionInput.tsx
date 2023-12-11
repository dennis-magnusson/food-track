import React from "react";
import { TextInput } from "react-native";
import { MyText } from "../../shared/MyText";
import { inputs } from "../../theme";

interface NutritionInputProps {
  value: string;
  labelText: string;
  setValue: (value: string) => void;
}

const NutritionInput: React.FC<NutritionInputProps> = ({
  value,
  labelText,
  setValue,
}) => {
  return (
    <>
      <MyText style={styles.label}>{labelText}</MyText>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder="-"
        keyboardType="numeric"
      />
    </>
  );
};

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
  },
  input: {
    ...inputs.textInput,
  },
});
export default NutritionInput;
