import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../theme";

interface SearchFoodProps {
  searchQuery: string;
  setSearchQuery: (string) => void;
}

const SearchFood = ({ searchQuery, setSearchQuery, searchFoods }) => {
  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a food"
        value={searchQuery}
        onChangeText={searchFoods}
      />
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
  },
});

export default SearchFood;
