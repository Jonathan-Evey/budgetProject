import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import EachExpense from './EachExpense';

const EachMonthsExpenses = ({data, userData, year}) => {
  const [eachExpense, setEachExpense] = useState();
  const [isShowEachExpense, setIsShowEachExpense] = useState(false);
  const toggleEachExpenseShown = useRef(new Animated.Value(0)).current;

  const toggleEachExpense = () => {
    Animated.timing(toggleEachExpenseShown, {
      toValue: isShowEachExpense ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  // const objKeyValues = (obj, value) => {
  //   return Object.keys(obj).find(key => key === value);
  // };

  // const findAllExpenseData = () => {
  //   let currentMonthData = userData.expenses[year][data];
  //   console.log(currentMonthData);
  //   setEachExpense(currentMonthData);
  // };

  useEffect(() => {
    toggleEachExpense();
  }, [isShowEachExpense]);

  // useEffect(() => {
  //   findAllExpenseData();
  // }, []);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setIsShowEachExpense(!isShowEachExpense);
        }}>
        <Text style={{backgroundColor: 'blue', height: 50}}>{data}</Text>
      </TouchableOpacity>

      {isShowEachExpense && (
        <FlatList
          data={userData.expenses[year][data]}
          renderItem={({item}) => <EachExpense data={item} />}
          keyExtractor={(item, index) => index}
        />
      )}
    </View>
  );
};

export default EachMonthsExpenses;

const styles = StyleSheet.create({});
