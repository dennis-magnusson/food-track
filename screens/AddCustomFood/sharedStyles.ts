import { StyleSheet } from "react-native";
import { buttonStyles, inputs, typography } from "../../theme";

const sharedStyles = StyleSheet.create({
  container: {
    padding: 10,
  },
  topTitle: {
    ...typography.title1,
    marginBottom: 8,
  },
  title: {
    ...typography.title1,
    marginVertical: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  columnLeft: {
    flex: 1,
    paddingRight: 5,
  },
  columnRight: {
    flex: 1,
    paddingLeft: 5,
  },
  columnFull: {
    flex: 1,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    ...inputs.textInput,
  },
  unitButton: {
    ...buttonStyles,
    alignItems: "center",
    justifyContent: "center",
  },
  unitButtonText: {
    fontSize: 16,
  },
  selected: {
    opacity: 1,
  },
  unselected: {
    opacity: 0.3,
  },
});

export default sharedStyles;
