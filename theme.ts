// theme.js

import { TextStyle, ViewStyle } from "react-native";

export const colors: Record<string, string> = {
  accent: "#ff9500",
  lightText: "#fff",
  lightBackground: "#f5f5f5",
  accentBackground: "#fff",
};

const baseTitleStyle: TextStyle = {
  fontWeight: "bold",
  marginBottom: 5,
};

export const typography: { [key: string]: TextStyle } = {
  title1: {
    ...baseTitleStyle,
    fontSize: 26,
  },
  title2: {
    ...baseTitleStyle,
    fontSize: 22,
  },
  title3: {
    ...baseTitleStyle,
    fontSize: 18,
  },
  title4: {
    ...baseTitleStyle,
    fontSize: 14,
  },
  body: {
    fontSize: 12,
    fontWeight: "normal",
  },
};

export const inputs: { [key: string]: TextStyle } = {
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
};

export const layout: { [key: string]: ViewStyle } = {
  accentContainer1: {
    backgroundColor: colors.accentBackground,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 8,
    padding: 15,
    paddingVertical: 22,
  },
  accentContainer2: {
    padding: 10,
    margin: 10,
    backgroundColor: colors.accentBackground,
    borderRadius: 10,
  },
};
