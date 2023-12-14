import React from "react";
import { Text, TextProps } from "react-native";

export const MyText: React.FC<TextProps> = ({ children, style, ...props }) => {
  return (
    <Text {...props} style={[{ fontSize: 16 }, style]}>
      {children}
    </Text>
  );
};
