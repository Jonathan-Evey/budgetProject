import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import EachYearsExpenses from '../component/expensesScreen/EachYearsExpenses';
import EditMenuBtn from '../utility/EditMenuBtn';

const ExpensesScreen = ({route}) => {
  const [allMonthsInYears, setAllMonthsInYears] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const {userData} = route.params;

  const objKeyValues = obj => {
    return Object.keys(obj);
  };

  const EachYear = (year, monthArray) => {
    return {year: year, months: monthArray};
  };

  const formatExpensesData = () => {
    let allYears = objKeyValues(userData.expenses).sort(function (a, b) {
      return b - a;
    });
    let allMonths = [];
    allYears.forEach(year => {
      let monthArray = objKeyValues(userData.expenses[year]).sort(function (
        a,
        b,
      ) {
        return b - a;
      });
      allMonths.push(EachYear(year, monthArray));
    });
    setAllMonthsInYears(allMonths);
  };

  useEffect(() => {
    formatExpensesData();
  }, []);

  return (
    <SafeAreaView style={[styles.container, {paddingTop: 50}]}>
      {allMonthsInYears !== [] ? (
        <FlatList
          style={styles.card}
          data={allMonthsInYears}
          renderItem={({item}) => (
            <EachYearsExpenses
              allMonthsInYears={allMonthsInYears}
              data={item}
              userData={userData}
              isEdit={isEdit}
              isDelete={isDelete}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      ) : null}
      <EditMenuBtn />
    </SafeAreaView>
  );
};

export default ExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EAF1EE',
  },
  card: {
    width: '100%',
    backgroundColor: '#EAF1EE',
    paddingTop: 15,
  },
});
