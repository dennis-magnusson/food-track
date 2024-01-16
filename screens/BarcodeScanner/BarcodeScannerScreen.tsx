import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, View } from "react-native";
import { useBarcode } from "../../hooks/useBarcode";
import TextScreen from "../../shared/TextScreen";
import { colors } from "../../theme";

const BarcodeScannerScreen = ({ route }): JSX.Element => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const { updateBarcode } = useBarcode();

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
    updateBarcode(data);
    navigation.goBack();
  };

  if (hasPermission === null) {
    return <TextScreen text="Requesting for camera permission" />;
  }
  if (hasPermission === false) {
    return <TextScreen text="No access to camera" />;
  }

  const borderColor = colors.accent;

  return (
    <SafeAreaView style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {!scanned && (
        <>
          <View style={[styles.leftBracket, { borderColor }]} />
          <View style={[styles.rightBracket, { borderColor }]} />
        </>
      )}
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </SafeAreaView>
  );
};

const BORDER_WIDTH = 5;
const TOP = "40%";
const HEIGHT = "20%";
const WIDTH = "10%";
const LEFT_OR_RIGHT = "10%";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  leftBracket: {
    position: "absolute",
    top: TOP,
    left: LEFT_OR_RIGHT,
    width: WIDTH,
    height: HEIGHT,
    borderLeftWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderTopWidth: BORDER_WIDTH,
  },
  rightBracket: {
    position: "absolute",
    top: TOP,
    right: LEFT_OR_RIGHT,
    width: WIDTH,
    height: HEIGHT,
    borderRightWidth: BORDER_WIDTH,
    borderTopWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
  },
});

export default BarcodeScannerScreen;
