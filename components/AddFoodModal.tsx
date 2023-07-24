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
          <Text>
            Enter the quantity of {selectedFood?.name} (
            {selectedFood?.per100unit}):
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => setFoodQuantity(foodQuantity - 5)}>
              <AntDesign name="minussquareo" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
              keyboardType="numeric"
              value={String(foodQuantity + selectedFood.per100unit)}
              onChangeText={(text) => setFoodQuantity(Number(text))}
              style={styles.textInput}
            />
            <TouchableOpacity onPress={() => setFoodQuantity(foodQuantity + 5)}>
              <AntDesign name="plussquareo" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <MyButton text="Add" onPress={handleFoodLog} />
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
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
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
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  textInput: {
    fontSize: 20,
    height: 30,
    width: 70,
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center",
    margin: 20,
  },
  button: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "#2196F3",
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 24,
    color: "white",
  },
  submitButton: {
    height: 20,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    marginTop: 20, // add margin top to the submit button
  },
  submitButtonText: {
    fontSize: 24,
    color: "white",
  },
});

export default AddFoodModal;
