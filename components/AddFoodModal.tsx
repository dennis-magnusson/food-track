import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Food } from "../types";
import MyButton from "./MyButton";

interface AddFoodModalProps {
  setIsModalVisible: (isVisible: boolean) => void;
  isModalVisible: boolean;
  foodQuantity: number;
  selectedFood: Food | null;
  setFoodQuantity: (quantity: number) => void;
  handleFoodLog: () => void;
}

const AddFoodModal = ({
  setIsModalVisible,
  foodQuantity,
  setFoodQuantity,
  selectedFood,
  handleFoodLog,
  isModalVisible,
}: AddFoodModalProps): JSX.Element => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={isModalVisible}
    onRequestClose={() => setIsModalVisible(false)}
  >
    <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.foodNameText}>
            {selectedFood?.name} ({selectedFood?.per100unit}):
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => setFoodQuantity(foodQuantity - 5)}>
              <AntDesign name="minus" size={50} color="black" />
            </TouchableOpacity>
            <TextInput
              keyboardType="numeric"
              value={String(foodQuantity)}
              onChangeText={(text) => setFoodQuantity(Number(text))}
              style={styles.textInput}
              autoFocus={true}
            />
            <TouchableOpacity onPress={() => setFoodQuantity(foodQuantity + 5)}>
              <AntDesign name="plus" size={50} color="black" />
            </TouchableOpacity>
          </View>
          <MyButton
            style={styles.submitButton}
            text="Add food"
            onPress={handleFoodLog}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 90,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  foodNameText: {
    fontWeight: "700",
    fontSize: 18,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  textInput: {
    fontSize: 38,
    width: 100,
    borderRadius: 5,
    borderWidth: 3,
    textAlign: "center",
    margin: 10,
  },
  submitButton: {
    marginTop: 10,
    width: 200,
  },
});

export default AddFoodModal;
