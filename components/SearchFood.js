import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../theme";

const SearchFood = ({ searchQuery, setSearchQuery, searchFoods }) => {
  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a food"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={searchFoods}
      />
      <TouchableOpacity style={styles.searchButton} onPress={searchFoods}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.accentBackground,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: colors.lightBackground,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: colors.accent,
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: colors.lightText,
    fontWeight: "bold",
  },
});

export default SearchFood;
