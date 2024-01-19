import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MyText } from "../../shared/MyText";
import { layout, typography } from "../../theme";
import { FoodEntry, Meal } from "../../types";

interface AddedFoodsProps {
  meal: Meal;
  handleEntryPress: (entry: FoodEntry) => void;
}

const AddedFoods: React.FC<AddedFoodsProps> = ({
  meal,
  handleEntryPress,
}): JSX.Element => {
  const renderItem = ({ item }: { item: FoodEntry }) => (
    <TouchableOpacity onPress={() => handleEntryPress(item)}>
      <View></View>
      <View style={{ ...layout.accentContainer1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: "https://cdn.s-cloud.fi/v1/w750_h750_q75/assets/dam-id/3R7FAxbYq5M9S1OQQvExI4.jpg",
            }}
            style={{
              height: 60,
              width: 60,
              marginRight: 12,
              resizeMode: "contain",
            }}
          />
          <View style={{ flex: 1 }}>
            <MyText style={typography.title3}>{item.food.name}</MyText>
            <MyText style={{ ...typography.secondary, marginBottom: 0 }}>
              {item.amount} {item.food.per100unit} ·{" "}
              {Math.floor((item.amount / 100) * item.food.calories)} cal
            </MyText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {meal.entries.length !== 0 ? (
        <FlatList
          data={meal.entries}
          renderItem={renderItem}
          keyExtractor={(item, i) => item.id.toString()}
          scrollEnabled={true}
        />
      ) : (
        <View style={styles.nothingContainer}>
          <MyText style={styles.nothingText}>No food tracked...</MyText>
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
