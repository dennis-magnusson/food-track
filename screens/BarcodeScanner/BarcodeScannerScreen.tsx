import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState, } from "react";
import { Button, View, StyleSheet, Text, SafeAreaView } from "react-native";

interface BarcodeScannerScreenProps {
}

const BarcodeScannerScreen: React.FC<BarcodeScannerScreenProps> = ({ }): JSX.Element => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        };
    
        getBarCodeScannerPermissions();
      }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
    if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>Barcode Scanner</Text>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />

            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scannerBox: {
        position: 'absolute',
        top: '40%', // adjust as needed
        left: '20%', // adjust as needed
        width: '60%', // adjust as needed
        height: '20%', // adjust as needed
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        borderStyle: 'dashed',
    }
}); 

export default BarcodeScannerScreen;