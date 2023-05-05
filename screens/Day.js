import React from 'react';
import { Text, View } from 'react-native';

const DayViewScreen = ({ day }) => {
  return (
    <View>
      <Text>{day}</Text>
    </View>
  );
};

export default DayViewScreen;