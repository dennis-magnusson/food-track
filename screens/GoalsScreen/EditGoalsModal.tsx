import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MyButton from "../../shared/MyButton";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { MyText } from "../../shared/MyText";
import { colors, inputs, typography } from "../../theme";
import { NutrientGoalKey } from "../../types";

interface EditGoalsModalProps {
  visible: boolean;
  updateNutrientGoals: (updatedGoals: {
    [K in NutrientGoalKey]?: number;
  }) => void;
  onCloseModal: () => void;
  nutrientGoals: { [K in NutrientGoalKey]?: number };
  savingUpdates: boolean;
}

const EditGoalsModal: React.FC<EditGoalsModalProps> = ({
  visible,
  onCloseModal,
  updateNutrientGoals,
  savingUpdates,
  nutrientGoals,
}) => {
  const [caloriesGoal, setCaloriesGoal] = React.useState(
    nutrientGoals.caloriesGoal?.toString() ?? ""
  );
  const [carbGoal, setCarbGoal] = React.useState(
    nutrientGoals.carbGoal?.toString() ?? ""
  );
  const [proteinGoal, setProteinGoal] = React.useState(
    nutrientGoals.proteinGoal?.toString() ?? ""
  );
  const [fatGoal, setFatGoal] = React.useState(
    nutrientGoals.fatGoal?.toString() ?? ""
  );

  useEffect(() => {
    setCaloriesGoal(nutrientGoals.caloriesGoal?.toString() ?? "");
    setCarbGoal(nutrientGoals.carbGoal?.toString() ?? "");
    setProteinGoal(nutrientGoals.proteinGoal?.toString() ?? "");
    setFatGoal(nutrientGoals.fatGoal?.toString() ?? "");
  }, [nutrientGoals]);

  const onSave = () => {
    updateNutrientGoals({
      caloriesGoal: parseInt(caloriesGoal),
      carbGoal: parseInt(carbGoal),
      proteinGoal: parseInt(proteinGoal),
      fatGoal: parseInt(fatGoal),
    });
    onCloseModal();
  };

  if (savingUpdates) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <MyText style={{ textAlign: "center", marginTop: 10 }}>
          Saving updates
        </MyText>
      </View>
    );
  }

  return (
    <Modal visible={visible} animationType="slide">
      <MySafeAreaView style={{ backgroundColor: colors.accentBackground }}>
        <KeyboardAvoidingView behavior="position">
          <TouchableOpacity onPress={onCloseModal} style={{ padding: 10 }}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <MyText style={{ ...typography.title1, padding: 10 }}>
            Daily Goals
          </MyText>

          <View style={{ padding: 10 }}>
            <NutrientInput
              value={caloriesGoal}
              setValue={setCaloriesGoal}
              label="Calories (kcal)"
            />
            <NutrientInput
              value={carbGoal}
              setValue={setCarbGoal}
              label="Carbs (g)"
            />
            <NutrientInput
              value={proteinGoal}
              setValue={setProteinGoal}
              label="Protein (g)"
            />
            <NutrientInput
              value={fatGoal}
              setValue={setFatGoal}
              label="Fat (g)"
            />
            <MyButton
              text="Update"
              onPress={onSave}
              style={{ marginTop: 20 }}
            />
          </View>
        </KeyboardAvoidingView>
      </MySafeAreaView>
    </Modal>
  );
};

export default EditGoalsModal;

interface NutrientInputProps {
  value: string;
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const NutrientInput: React.FC<NutrientInputProps> = ({
  value,
  setValue,
  label,
}) => {
  return (
    <View style={{ marginTop: 10 }}>
      <>
        <MyText style={{ marginBottom: 6 }}>{label}</MyText>
        <TextInput
          style={inputs.textInput}
          value={value}
          onChangeText={setValue}
          keyboardType="numeric"
        />
      </>
    </View>
  );
};
