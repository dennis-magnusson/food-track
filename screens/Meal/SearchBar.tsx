import { useEffect, useRef, useState } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MyText } from "../../shared/MyText";
import { colors, inputs } from "../../theme";

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
        autoFocus={isFocused}
      />
      {isFocused && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancelPress}
        >
          <MyText style={styles.cancelButtonText}>Cancel</MyText>
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
    margin: 10,
  },
  searchInput: {
    flex: 1,
    ...inputs.textInput,
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
