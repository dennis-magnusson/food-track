import { useEffect, useRef, useState } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../theme";

interface SearchFoodProps {
  searchQuery: string;
  setSearchQuery: (string) => void;
  isFocused: boolean;
  onBlur: () => void;
  onFocus: () => void;
}

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  searchFoods,
  isFocused,
  onBlur,
  onFocus,
}) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchQuery);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchQuery);
    }, 300);

    return () => {
      clearTimeout(debounceTimerRef.current);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchQuery(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const inputRef = useRef<TextInput>(null);
  const handleCancelPress = (event: GestureResponderEvent): void => {
    onBlur();
    inputRef.current?.blur();
    setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.searchInput}
        placeholder="Search for a food"
        value={searchQuery}
        onChangeText={searchFoods}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {isFocused && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancelPress}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const barHeight = 40;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.accentBackground,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    height: barHeight,
    backgroundColor: colors.lightBackground,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: colors.accent,
    marginLeft: 8,
    justifyContent: "center",
    height: barHeight,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  cancelButtonText: { color: colors.lightText, fontWeight: "bold" },
});

export default SearchBar;
