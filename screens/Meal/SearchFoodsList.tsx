import React, { useEffect, useState } from "react";
import { FlatList, Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import { MyText } from "../../shared/MyText";
import { colors } from "../../theme";
import { FoodWithoutServingSizes } from "../../types";

interface FoodsListProps {
  foods: FoodWithoutServingSizes[];
  handleFoodPress: (food: FoodWithoutServingSizes) => void;
}

const SearchFoodsList: React.FC<FoodsListProps> = ({
  foods,
  handleFoodPress,
}): JSX.Element => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const renderItem = ({ item }: { item: FoodWithoutServingSizes }) => (
    <TouchableOpacity
      style={styles.foodItem}
      key={item.id}
      onPress={() => {
        handleFoodPress(item);
      }}
    >
      <MyText style={styles.foodName}>{item.name}</MyText>
      <MyText style={styles.calories}>
        {item.calories} kcal, {item.protein}g Protein | {item.carbs}g Carbs |{" "}
        {item.fat}g Fat
      </MyText>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={foods}
      renderItem={renderItem}
      scrollEnabled={true}
      keyboardShouldPersistTaps="always"
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={[
        styles.foodContainer,
        { paddingBottom: keyboardHeight },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  foodContainer: {},
  foodItem: {
    backgroundColor: colors.accentBackground,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 6,
    marginBottom: 6,
    padding: 16,
    elevation: 2,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  calories: {
    fontSize: 14,
  },
});

export default SearchFoodsList;
