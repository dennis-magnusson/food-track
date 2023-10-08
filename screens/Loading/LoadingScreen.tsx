import { Text, View } from "react-native";

interface LoadingScreenProps {}

const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  return (
    <>
      <View>
        <Text>Loading...</Text>
      </View>
    </>
  );
};

export default LoadingScreen;
