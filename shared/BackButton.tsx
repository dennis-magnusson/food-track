import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

interface BackButtonProps {
  backFunction: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ backFunction }) => {
  return (
    <>
      <TouchableOpacity onPress={backFunction} style={{ padding: 15 }}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </>
  );
};

export default BackButton;
