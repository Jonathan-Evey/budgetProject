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
  // const formatDate = () => {

  // }

  return (
    <View style={[styles.card, {flexDirection: 'row', height: 75}]}>
      <Text>{`$${data.expenseAmount}`}</Text>
      <Text>{data.date}</Text>
    </View>
  );
};

export default EachExpense;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#dbe2e0',
    borderBottomWidth: 1,
    borderBottomColor: '#9199a9',
  },
});
