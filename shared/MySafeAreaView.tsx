import React from "react";
import { SafeAreaView, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { colors } from "../theme";

interface MySafeAreaViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const MySafeAreaView = ({ children, style, ...rest }: MySafeAreaViewProps) => {
  const containerStyle = [styles.container, style];

  return (
    <SafeAreaView style={containerStyle} {...rest}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
  },
});

export default MySafeAreaView;
