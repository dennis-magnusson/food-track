import { TextStyle, ViewStyle } from "react-native";

export const colors: Record<string, string> = {
  accent: "#0652dd",
  lightText: "#fff",
  secondaryText: "#666",
  lightBackground: "#f5f5f5",
  darkerBackground: "#efefef",
  accentBackground: "#fff",
  calories: "#FFA07A",
  carbs: "#ff5e57",
  fat: "#ffc048",
  protein: "#0be881",
};

const baseTitleStyle: TextStyle = {
  fontWeight: "bold",
  marginBottom: 5,
};

export const typography: { [key: string]: TextStyle } = {
  title1: {
    ...baseTitleStyle,
    fontSize: 26,
    marginTop: 10,
  },
  title1NoMargin: {
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
  secondary: {
    fontSize: 14,
    color: colors.secondaryText,
    fontWeight: "normal",
  },
};

const textInputBase: TextStyle = {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 5,
  padding: 10,
};

export const inputs: { [key: string]: TextStyle } = {
  textInput: {
    ...textInputBase,
    fontSize: 16,
  },
  textInputLarge: {
    ...textInputBase,
    fontSize: 22,
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
