import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import MyButton from "../../shared/MyButton";

interface ActionButtonsProps {
  handleAddCustomFood: () => void;
  handleScanBarcode: () => void;
  handleSearch: () => void;
  handleOpenRecipes: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  handleAddCustomFood,
  handleScanBarcode,
  handleSearch,
  handleOpenRecipes,
}): JSX.Element => {
  return (
    <>
      <View style={styles.buttonContainer}>
        <MyButton
          text="Search foods"
          style={styles.buttonL}
          onPress={handleSearch}
          icon={<Ionicons name="search" size={24} color="white" />}
        />

        <MyButton
          text="Scan barcode"
          style={styles.buttonR}
          onPress={handleScanBarcode}
          icon={<Ionicons name="barcode-outline" size={24} color="white" />}
        />
      </View>
      <View style={styles.buttonContainer}>
        <MyButton
          text="Your recipes"
          style={styles.buttonL}
          icon={<Ionicons name="file-tray-full" size={24} color="white" />}
          onPress={handleOpenRecipes}
        />
        <MyButton
          text="Custom food"
          style={styles.buttonR}
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
  buttonR: {
    marginHorizontal: 10,
    flex: 1,
    marginLeft: 0,
  },
  buttonL: {
    marginHorizontal: 10,
    flex: 1,
    marginRight: 0,
  },
});

export default ActionButtons;
