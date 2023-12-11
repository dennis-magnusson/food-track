import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { inputs } from "../../theme";

interface IconButtonProps {
  onPress: () => void;
  icon: "add-circle-outline" | "remove-circle-outline";
}

const IconButton: React.FC<IconButtonProps> = ({ onPress, icon }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={
          icon === "add-circle-outline" ? styles.addButton : styles.removeButton
        }
      >
        <Ionicons name={icon} size={18} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    ...inputs.textInput,
  },
  removeButton: {
    ...inputs.textInput,
    marginLeft: 10,
  },
});

export default IconButton;
