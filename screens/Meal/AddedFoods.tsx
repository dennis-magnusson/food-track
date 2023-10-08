import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { layout, typography } from "../../theme";
import { FoodEntry, Meal } from "../../types";

interface AddedFoodsProps {
  meal: Meal;
}

const AddedFoods: React.FC<AddedFoodsProps> = ({ meal }): JSX.Element => {
  const renderItem = ({ item }: { item: FoodEntry }) => (
    <TouchableOpacity>
      <View style={{ ...layout.accentContainer1 }}>
        <Text style={{ ...typography.title3, marginBottom: 0 }}>
          {item.food.name} {item.amount}
          {item.food.per100unit}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {meal.entries.length !== 0 ? (
        <FlatList
          data={meal.entries}
          renderItem={renderItem}
          scrollEnabled={true}
        />
      ) : (
        <View style={styles.nothingContainer}>
          <Text style={styles.nothingText}>No food tracked...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nothingContainer: {
    flex: 1,
    alignItems: "center",
  },
  nothingText: {
    ...typography.title2,
    marginTop: 50,
  },
});

export default AddedFoods;
