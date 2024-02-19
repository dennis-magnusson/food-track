import { useNavigation } from "@react-navigation/native";
import BackButton from "../../shared/BackButton";
import MySafeAreaView from "../../shared/MySafeAreaView";
import FoodsSelector from "./FoodsSelector";
import InsertButton from "./InsertButton";
import RecipeNameInput from "./RecipeNameInput";

interface CreateRecipeScreenProps {}

const CreateRecipeScreen: React.FC<CreateRecipeScreenProps> = () => {
  const navigation = useNavigation();

  return (
    <MySafeAreaView>
      <BackButton
        screenName="Create Recipe"
        backFunction={() => navigation.goBack()}
      />
      <RecipeNameInput />
      <FoodsSelector />
      <InsertButton />
    </MySafeAreaView>
  );
};

export default CreateRecipeScreen;
