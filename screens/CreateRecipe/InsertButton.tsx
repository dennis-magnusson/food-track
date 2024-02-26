import { insertTestRecipe } from "../../services/databaseService";
import MyButton from "../../shared/MyButton";

interface InsertButtonProps {}

const InsertButton: React.FC<InsertButtonProps> = () => {
  return (
    <>
      <MyButton text="Create" onPress={insertTestRecipe} />
    </>
  );
};

export default InsertButton;
