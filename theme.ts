// theme.js

import { TextStyle, ViewStyle } from "react-native";

export const colors: Record<string, string> = {
  accent: "#ff9500",
  lightText: "#fff",
  lightBackground: "#fff",
  accentBackground: "#eee",
  fatColor: "#00897b",
  carbsColor: "#f44336",
  proteinColor: "#1565c0",
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

export const layout: { [key: string]: ViewStyle } = {
  boxContainer: {
    backgroundColor: colors.accentBackground,
    width: "90%",
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
};
