import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { MyText } from "../../shared/MyText";
import { layout, typography } from "../../theme";

const SettingsScreen: React.FC = () => {
  const [theme, setTheme] = useState("auto");

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const handleExportData = () => {
    console.log("Data export"); // TODO: implement
  };

  return (
    <MySafeAreaView style={styles.container}>
      <MyText style={styles.title}>Settings</MyText>
      <ScrollView bounces={true} style={styles.scrollView}>
        <View style={styles.buttonContainer}>
          <Button title="About" onPress={() => console.log("About pressed")} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Export Data" onPress={handleExportData} />
        </View>
      </ScrollView>
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...typography.title1,
    marginLeft: 15,
  },
  scrollView: {
    marginTop: layout.accentContainer1.margin,
  },
  buttonContainer: {
    ...layout.accentContainer1,
  },
});

export default SettingsScreen;
