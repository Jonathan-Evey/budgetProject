import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import EachYearsExpenses from '../component/expensesScreen/EachYearsExpenses';

const ExpensesScreen = ({route}) => {
  const [allMonthsInYears, setallMonthsInYears] = useState([]);
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
    let allMonthInYears = [];
    allYears.forEach(year => {
      let monthArray = objKeyValues(userData.expenses[year]).sort(function (
        a,
        b,
      ) {
        return b - a;
      });
      allMonthInYears.push(EachYear(year, monthArray));
    });
    setallMonthsInYears(allMonthInYears);
    console.log(allYears);
    console.log(allMonthInYears);
  };

  useEffect(() => {
    formatExpensesData();
  }, []);

  return (
    <SafeAreaView style={[styles.container, {paddingTop: 75}]}>
      {allMonthsInYears !== [] ? (
        <FlatList
          style={styles.card}
          data={allMonthsInYears}
          renderItem={({item}) => (
            <EachYearsExpenses data={item} userData={userData} />
          )}
          keyExtractor={(item, index) => index}
        />
      ) : null}
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
