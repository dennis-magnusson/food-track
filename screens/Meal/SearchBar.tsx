import { useEffect, useRef, useState } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, layout } from "../../theme";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (string) => void;
  isFocused: boolean;
  onBlur: () => void;
  onFocus: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
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
        placeholder="Search for a food to add"
        value={searchQuery}
        onChangeText={(query: string) => setSearchQuery(query)}
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
    ...layout.accentContainer2,
  },
  searchInput: {
    flex: 1,
    height: barHeight,
    backgroundColor: colors.accentBackground,
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
