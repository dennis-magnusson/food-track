import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import MyButton from "../../shared/MyButton";

interface ActionButtonsProps {
  handleAddCustomFood: () => void;
  handleScanBarcode: () => void;
  handleSearch: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  handleAddCustomFood,
  handleScanBarcode,
  handleSearch,
}): JSX.Element => {
  return (
    <>
      <View style={styles.buttonContainer}>
        <MyButton
          text="Search previously added"
          style={styles.searchButton}
          onPress={handleSearch}
          icon={<Ionicons name="search" size={24} color="white" />}
        />
      </View>
      <View style={styles.buttonContainer}>
        <MyButton
          text="Scan Barcode"
          style={styles.scanButton}
          onPress={handleScanBarcode}
          icon={<Ionicons name="barcode-outline" size={24} color="white" />}
        />
        <MyButton
          text="Custom food"
          style={styles.addButton}
          onPress={handleAddCustomFood}
          icon={<Ionicons name="add-outline" size={24} color="white" />}
        />
      </View>
    </>
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
    marginLeft: 0,
  },
  searchButton: {
    margin: 10,
    flex: 1,
  },
  scanButton: {
    marginHorizontal: 10,
    flex: 1,
    marginRight: 0,
  },
});

export default ActionButtons;
