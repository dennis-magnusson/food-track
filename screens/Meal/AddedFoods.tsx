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
  handleEntryPress: (
    id: FoodEntry["id"],
    food: FoodEntry["food"],
    currentAmount: FoodEntry["amount"]
  ) => void;
}

const AddedFoods: React.FC<AddedFoodsProps> = ({
  meal,
  handleEntryPress,
}): JSX.Element => {
  const renderItem = ({ item }: { item: FoodEntry }) => (
    <TouchableOpacity
      onPress={() => handleEntryPress(item.id, item.food, item.amount)}
    >
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
          keyExtractor={(item, i) => (item.id + i).toString()} // TODO: use only the id but combine the elements that share the same food id into one
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
