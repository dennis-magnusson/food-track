import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import BackButton from "../../shared/BackButton";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { MyText } from "../../shared/MyText";
import { layout, typography } from "../../theme";
import SectionDivider from "./SectionDivider";
import SettingItem from "./SettingItem";

const SettingsScreen: React.FC = () => {
  const [theme, setTheme] = useState("auto");

  const navigation = useNavigation();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const handleExportData = () => {
    console.log("Data export"); // TODO: implement
  };

  return (
    <MySafeAreaView style={styles.container}>
      <BackButton backFunction={navigation.goBack} />
      <MyText style={styles.title}>Settings</MyText>
      <ScrollView bounces={true} style={styles.scrollView}>
        <SectionDivider sectionName="Appearance" />
        <SettingItem itemName="Theme" onPress={() => {}} value="Auto" />
        <SettingItem itemName="Language" onPress={() => {}} value="English" />
        <SettingItem
          itemName="First day of the week"
          onPress={() => {}}
          value="Mon"
        />
        <SectionDivider sectionName="Data" />
        <SettingItem itemName="Export data" onPress={handleExportData} />
        <SettingItem itemName="Import data" onPress={() => {}} />
        <SettingItem itemName="Clear data" onPress={() => {}} />
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
});

export default SettingsScreen;
