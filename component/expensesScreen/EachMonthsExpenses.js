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
import DropDownMenuIcon from '../../utility/DropDownMenuIcon';

const EachMonthsExpenses = ({
  data,
  userData,
  year,
  setUpdateUserData,
  updateUserData,
  isEdit,
  isDelete,
}) => {
  const [isShowEachExpense, setIsShowEachExpense] = useState(false);
  const [sortedExpenses, setSortedExpenses] = useState([]);
  const toggleEachExpenseShown = useRef(new Animated.Value(0)).current;

  const toggleEachExpense = () => {
    Animated.timing(toggleEachExpenseShown, {
      toValue: isShowEachExpense ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const monthTextArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const sortData = () => {
    let expensesInMonth = userData.expenses[year][data];
    expensesInMonth.sort((a, b) => {
      return b.date - a.date;
    });
    setSortedExpenses(expensesInMonth);
  };

  useEffect(() => {
    toggleEachExpense();
  }, [isShowEachExpense]);

  useEffect(() => {
    let month = new Date().getMonth() + 1;

    if (
      data === month.toString() &&
      year === new Date().getFullYear().toString()
    ) {
      setIsShowEachExpense(true);
    }
    sortData();
  }, []);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.monthHeader}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setIsShowEachExpense(!isShowEachExpense);
        }}>
        <Text style={styles.title}>{monthTextArray[data - 1]}</Text>
        <DropDownMenuIcon
          bgColor={'#7a8497'}
          isDropDownOpen={isShowEachExpense}
        />
      </TouchableOpacity>

      {isShowEachExpense && (
        <>
          <View style={styles.eachExpenseHeader}>
            <Text style={styles.headerText}>Category</Text>
            <Text
              style={[
                styles.headerText,
                {textAlign: 'center', marginLeft: 20},
              ]}>
              Amount
            </Text>
            <Text style={[styles.headerText, {textAlign: 'right'}]}>Day</Text>
          </View>
          <FlatList
            data={sortedExpenses}
            renderItem={({item, index}) => (
              <EachExpense
                userData={userData}
                year={year}
                data={item}
                month={data}
                setUpdateUserData={setUpdateUserData}
                updateUserData={updateUserData}
                isEdit={isEdit}
                isDelete={isDelete}
              />
            )}
            keyExtractor={item => item.id}
          />
        </>
      )}
    </View>
  );
};

export default EachMonthsExpenses;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#d3d9d6',
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 15,
    paddingLeft: 25,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#7a8497',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#223252',
  },
  eachExpenseHeader: {
    paddingHorizontal: 10,
    backgroundColor: '#dbe2e0',
    borderBottomWidth: 2,
    borderBottomColor: '#9199a9',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
    color: '#223252',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
