import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import MyButton from "../../shared/MyButton";
import { MyText } from "../../shared/MyText";
import { colors, layout, typography } from "../../theme";
import { Food } from "../../types";

interface FoodsListProps {
  foods: Food[];
  handleFoodPress: (food: Food) => void;
  handleAddCustomFood: () => void;
}

const SearchFoodsList: React.FC<FoodsListProps> = ({
  foods,
  handleFoodPress,
  handleAddCustomFood,
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

  const renderItem = ({ item }: { item: Food }) => (
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
    <>
      <MyText
        style={{
          ...typography.title2,
          marginLeft: 15,
          marginTop: 10,
          color: colors.secondaryText,
        }}
      >
        Found {foods.length} foods
      </MyText>

      {foods.length === 0 ? (
        <MyButton
          text="Add a custom food"
          style={{ margin: 10 }}
          onPress={handleAddCustomFood}
          icon={<Ionicons name="add-outline" size={24} color="white" />}
        />
      ) : (
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  foodContainer: {},
  foodItem: {
    ...layout.accentContainer1,
  },
  foodName: typography.title3,
  calories: {
    fontSize: 14,
  },
});

export default SearchFoodsList;
