import { FlatList, StyleSheet, Text, View } from "react-native";
import { typography } from "../../theme";
import { FoodEntry, Meal } from "../../types";

interface AddedFoodsProps {
  meal: Meal;
}

const AddedFoods = ({ meal }): JSX.Element => {
  const renderItem = ({ item }: { item: FoodEntry }) => (
    <Text>
      {item.food.name}: {item.amount}
      {item.food.per100unit}
    </Text>
  );
  return (
    <View style={styles.container}>
      {meal.length !== 0 ? (
        <FlatList data={meal} renderItem={renderItem} scrollEnabled={true} />
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
