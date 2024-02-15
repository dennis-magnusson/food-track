import BackButton from "../../shared/BackButton";
import MySafeAreaView from "../../shared/MySafeAreaView";

interface CreateRecipeScreenProps {}

const CreateRecipeScreen: React.FC<CreateRecipeScreenProps> = () => {
  return (
    <MySafeAreaView>
      <BackButton screenName="Create Recipe" backFunction={() => {}} />
      <RecipeNameInput />
      <FoodsSelector />
      <InsertButton />
    </MySafeAreaView>
  );
};

export default CreateRecipeScreen;
