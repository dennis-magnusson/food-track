import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { colors, layout, typography } from "../../theme";

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
      <Text style={styles.title}>Settings</Text>
      <ScrollView bounces={true} style={styles.scrollView}>
        <View style={styles.buttonContainer}>
          <Button
            title="About"
            style={styles.button}
            onPress={() => console.log("About pressed")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Export Data"
            style={styles.button}
            onPress={handleExportData}
          />
        </View>
      </ScrollView>
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
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
