import React from 'react';
import { View, Text, Image } from 'react-native';

const GoalCard = ({ goal }) => {
  return (
    <View style={{ padding: 10, margin: 10, borderWidth: 1 }}>
      <Image source={{ uri: goal.goalImage }} style={{ height: 150, width: '100%' }} />
      <Text>{goal.goalName}</Text>
      <Text>Amount: {goal.goalAmount}</Text>
      <Text>Target Date: {goal.durationDate}</Text>
    </View>
  );
};

export default GoalCard;
