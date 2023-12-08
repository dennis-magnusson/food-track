import { View } from "react-native";
import { MyText } from "../../shared/MyText";

interface LoadingScreenProps {}

const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  return (
    <>
      <View>
        <MyText>Loading...</MyText>
      </View>
    </>
  );
};

export default LoadingScreen;
