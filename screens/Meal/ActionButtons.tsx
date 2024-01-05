import React from "react";
import MyButton from "../../shared/MyButton";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ActionButtonsProps {
    handleAddCustomFood: () => void;
    handleScanBarcode: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
    handleAddCustomFood,
    handleScanBarcode
}): JSX.Element => {
    return (
        <View style={styles.buttonContainer}>
    <MyButton
        text="Scan Barcode"
        style={styles.scanButton}
        onPress={handleScanBarcode}
        icon={<Ionicons name="barcode-outline" size={24} color="white" />}
      />
      <MyButton
        text="Manual Entry"
        style={styles.addButton}
        onPress={handleAddCustomFood}
        icon={<Ionicons name="add-outline" size={24} color="white" />}
      />
    </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "stretch",
      gap: 10,
    },
    addButton: {
      marginHorizontal: 10,
      flex: 1,
      marginLeft: 0
    },
    scanButton: {
      marginHorizontal: 10,
      flex: 1,
      backgroundColor: "#ff9900",
      marginRight: 0
    },
  });

  export default ActionButtons;