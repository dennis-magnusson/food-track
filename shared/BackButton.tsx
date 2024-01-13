import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface BackButtonProps {
  backFunction: () => void;
  actionFunction?: () => void;
  actionIcon?: keyof typeof Ionicons.glyphMap;
}

const BackButton: React.FC<BackButtonProps> = ({
  backFunction,
  actionFunction,
  actionIcon,
}) => {
  const padding = 15;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={backFunction} style={{ padding }}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      {actionFunction && actionIcon && (
        <TouchableOpacity onPress={actionFunction} style={{ padding }}>
          <Ionicons name={actionIcon} size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BackButton;
