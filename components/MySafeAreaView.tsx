import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { colors } from "../theme";

const MySafeAreaView = ({ children, style, ...rest }) => {
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
