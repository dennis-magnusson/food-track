import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { MyText } from "./MyText";

interface BackButtonProps {
  backFunction: () => void;
  screenName?: string;
  actionFunction?: () => void;
  actionIcon?: keyof typeof Ionicons.glyphMap;
}

const BackButton: React.FC<BackButtonProps> = ({
  backFunction,
  actionFunction,
  actionIcon,
  screenName,
}) => {
  const padding = 15;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={backFunction} style={{ padding }}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      {screenName && (
        <MyText
          style={{
            fontSize: 24,
            position: "absolute",
            left: 0,
            right: 0,
            textAlign: "center",
          }} // TODO: This actually doesn't work since it goes over the back button and makes it unclickable
        >
          {screenName}
        </MyText>
      )}
      {actionFunction && actionIcon && (
        <TouchableOpacity onPress={actionFunction} style={{ padding }}>
          <Ionicons name={actionIcon} size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BackButton;
