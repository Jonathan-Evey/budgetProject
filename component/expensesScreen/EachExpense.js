import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React from 'react';

const EachExpense = ({data}) => {
  return (
    <View style={{flexDirection: 'row', backgroundColor: 'blue', height: 50}}>
      <Text>{data.expenseAmount}</Text>
      <Text>{data.date}</Text>
    </View>
  );
};

export default EachExpense;

const styles = StyleSheet.create({});
