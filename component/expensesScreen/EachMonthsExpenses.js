import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import EachExpense from './EachExpense';

const EachMonthsExpenses = ({data, userData, year}) => {
  const [eachExpense, setEachExpense] = useState([]);

  const objKeyValues = (obj, value) => {
    return Object.keys(obj).find(key => key === value);
  };

  const findAllExpenseData = () => {
    let currentMonthData = userData.expenses[year][data];
    setEachExpense(currentMonthData);
  };
  useEffect(() => {
    findAllExpenseData();
  }, []);
  return (
    <SafeAreaView>
      <Text style={{backgroundColor: 'blue', height: 50}}>{data}</Text>
      {eachExpense ? (
        <FlatList
          data={eachExpense}
          renderItem={({item}) => <EachExpense data={item} />}
          keyExtractor={(item, index) => index}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default EachMonthsExpenses;

const styles = StyleSheet.create({});
