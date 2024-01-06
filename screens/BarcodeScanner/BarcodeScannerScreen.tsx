import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, View } from "react-native";
import TextScreen from "../../shared/TextScreen";
import { colors } from "../../theme";
import parseAPIFood from "../../utils/parseAPIFood";

interface BarcodeScannerScreenProps {}

const BarcodeScannerScreen: React.FC<
  BarcodeScannerScreenProps
> = ({}): JSX.Element => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    console.log(type, data);
    navigation.goBack();

    // check database if barcode exists

    // if barcode exists, navigate to AddExistingFoodScreen with food data

    // if barcode does not exist, call API to get food data
    try {
      const response = await axios.get(
        `https://world.openfoodfacts.net/api/v2/product/${data}?fields=product_name,nutriments`
      );
      const result = response.data;

      // Check if the API returned what you want
      if (result.status === 1) {
        console.log("result: ", result);
        const parsedFood = parseAPIFood(result, data);
        console.log(parsedFood);
      } else {
        alert("An API error occurred while scanning the barcode.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while scanning the barcode.");
    }
  };

  if (hasPermission === null) {
    return <TextScreen text="Requesting for camera permission" />;
  }
  if (hasPermission === false) {
    return <TextScreen text="No access to camera" />;
  }

  const borderColor = scanned ? colors.accent : colors.carbs;

  return (
    <SafeAreaView style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {!scanned && <View style={[styles.scannerBox, { borderColor }]} />}
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scannerBox: {
    position: "absolute",
    top: "40%", // adjust as needed
    left: "20%", // adjust as needed
    width: "60%", // adjust as needed
    height: "20%", // adjust as needed
    borderWidth: 4,
    borderRadius: 10,
    // borderStyle: 'dashed',
  },
});

export default BarcodeScannerScreen;
