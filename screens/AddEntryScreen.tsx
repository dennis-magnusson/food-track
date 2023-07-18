import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import MyButton from "../components/MyButton";
import MySafeAreaView from "../components/MySafeAreaView";
import SearchFood from "../components/SearchFood";
import { colors } from "../theme";

const AddEntryScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState<string>("");

  navigation.setOptions({ title: "Add food" });

  const handleAddCustomFood = () => {
    // navigation.navigate("Custom Food");
  };

  return (
    <MySafeAreaView>
      <View>
        <ScrollView contentContainerStyle={styles.containerInner}></ScrollView>
        <SearchFood
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchFoods={undefined}
        />
        <MyButton
          text="+ Add Custom Food"
          style={styles.addButton}
          onPress={handleAddCustomFood}
        />
      </View>
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerInner: {
    paddingTop: 16,
    backgroundColor: colors.lightBackground,
  },
  addButton: {
    marginHorizontal: 10,
  },
});

export default AddEntryScreen;
