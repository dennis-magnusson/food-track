import { useNavigation } from "@react-navigation/native";
import BackButton from "../../shared/BackButton";
import MyButton from "../../shared/MyButton";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { MyText } from "../../shared/MyText";

interface RecipesScreenProps {}

const RecipesScreen: React.FC<RecipesScreenProps> = () => {
  const navigation = useNavigation();
  return (
    <MySafeAreaView>
      <BackButton
        screenName="Recipes"
        backFunction={() => {
          navigation.goBack();
        }}
      />
      <MyText>No recipes added</MyText>

      <MyButton
        text="Create Recipe"
        onPress={() => {
          navigation.navigate("CreateRecipe");
        }}
      />
    </MySafeAreaView>
  );
};

export default RecipesScreen;
