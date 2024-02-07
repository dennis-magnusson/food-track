import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useNutrientGoals } from "../../hooks/useNutrientGoals";
import BackButton from "../../shared/BackButton";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { GoalsScreenNavigationProp } from "../../types";
import DailyIntake from "./DailyIntake";
import DailyProgressChart from "./DailyProgressChart";
import EditGoalsModal from "./EditGoalsModal";

interface GoalsScreenProps {}

const GoalsScreen: React.FC<GoalsScreenProps> = () => {
  const navigation = useNavigation<GoalsScreenNavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [savingUpdates, setSavingUpdates] = useState(false);
  const { nutrientGoals, updateAndStoreNutrientGoals } = useNutrientGoals();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <MySafeAreaView>
      <BackButton
        backFunction={() => navigation.goBack()}
        actionFunction={openModal}
        actionIcon="options-outline"
        screenName="Goals"
      />
      <EditGoalsModal
        visible={modalVisible}
        onCloseModal={closeModal}
        updateNutrientGoals={updateAndStoreNutrientGoals}
        nutrientGoals={nutrientGoals}
        savingUpdates={savingUpdates}
      />
      <DailyIntake nutrientGoals={nutrientGoals} />
      <DailyProgressChart />
    </MySafeAreaView>
  );
};

export default GoalsScreen;
