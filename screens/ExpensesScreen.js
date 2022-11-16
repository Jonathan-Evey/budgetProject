import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import EachYearsExpenses from '../component/expensesScreen/EachYearsExpenses';
import EditMenuBtn from '../utility/EditMenuBtn';

const ExpensesScreen = ({route}) => {
  const navigation = useNavigation();
  const [allMonthsInYears, setAllMonthsInYears] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const {userData, setUpdateUserData, updateUserData} = route.params;

  const objKeyValues = obj => {
    return Object.keys(obj);
  };

  const EachYear = (year, monthArray) => {
    return {year: year, months: monthArray};
  };

  const formatExpensesData = () => {
    if (!userData.expenses) {
      return;
    }
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

  const toggleEditBtns = () => {
    if (isDelete) {
      setIsDelete(false);
    }
    setIsEdit(!isEdit);
  };

  const toggleDeleteBtns = () => {
    if (isEdit) {
      setIsEdit(false);
    }
    setIsDelete(!isDelete);
  };

  useEffect(() => {
    formatExpensesData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          title="Add expense"
          onPress={() => {
            console.log('hedder button');
          }}>
          <Text>Add Expense</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
              setUpdateUserData={setUpdateUserData}
              updateUserData={updateUserData}
              isEdit={isEdit}
              isDelete={isDelete}
            />
          )}
          keyExtractor={item => item.year}
        />
      ) : null}
      <EditMenuBtn
        setIsDelete={setIsDelete}
        setIsEdit={setIsEdit}
        toggleDeleteBtns={toggleDeleteBtns}
        toggleEditBtns={toggleEditBtns}
      />
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
