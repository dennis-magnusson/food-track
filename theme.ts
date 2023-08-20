// theme.js

import { TextStyle, ViewStyle } from "react-native";

export const colors: Record<string, string> = {
  accent: "#ff9500",
  lightText: "#fff",
  lightBackground: "#fff",
  accentBackground: "#eee",
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
