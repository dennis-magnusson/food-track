import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { fetchAllRecipes } from "../../services/databaseService";
import BackButton from "../../shared/BackButton";
import MyButton from "../../shared/MyButton";
import MySafeAreaView from "../../shared/MySafeAreaView";
import { MyText } from "../../shared/MyText";
import { Recipe } from "../../types";

interface RecipesScreenProps {}

const RecipesScreen: React.FC<RecipesScreenProps> = () => {
  const navigation = useNavigation();

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // fetch recipes
  fetchAllRecipes().then((result) => {
    console.log(result);
  });

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
