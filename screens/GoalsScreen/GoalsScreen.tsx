import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../shared/BackButton";
import { GoalsScreenNavigationProp } from "../../types";
import DailyIntake from "./DailyIntake";

interface GoalsScreenProps {}

const GoalsScreen: React.FC<GoalsScreenProps> = () => {
  const navigation = useNavigation<GoalsScreenNavigationProp>();

  const handleEditGoals = () => {
    // navigation.navigate("EditGoals");
    alert("Edit Goals");
  };

  return (
    <SafeAreaView>
      <BackButton
        backFunction={() => navigation.goBack()}
        actionFunction={handleEditGoals}
        actionIcon="options-outline"
      />
      <DailyIntake />
    </SafeAreaView>
  );
};

export default GoalsScreen;
