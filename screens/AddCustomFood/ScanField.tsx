import { Ionicons } from "@expo/vector-icons";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { MyText } from "../../shared/MyText";
import { inputs } from "../../theme";

interface ScanFieldProps {
  onPress: () => void;
  scanned: boolean;
}

const ScanField: React.FC<ScanFieldProps> = ({ onPress, scanned }) => {
  const onPressScan = (): void => {
    if (!scanned) {
      onPress();
    } else {
      Alert.alert("Replace the existing barcode?", "", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: onPress,
        },
      ]);
    }
  };

  return (
    <TouchableOpacity onPress={onPressScan} style={{ marginBottom: 10 }}>
      <View
        style={{
          ...inputs.textInput,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons
          name={scanned ? "checkmark-circle-outline" : "barcode-outline"}
          size={28}
          color="black"
        />
        <MyText style={{ textAlign: "center" }}>
          {" "}
          {scanned ? "Scanned" : "Scan barcode"}
        </MyText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ScanField;
