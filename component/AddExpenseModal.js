import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CloseBtn from '../utility/CloseBtn';
import DayDropDown from './DayDropDown';
import MonthDropDown from './MonthDropDown';
import YearsDropDown from './YearsDropDown';

const AddExpenseModal = props => {
  const [expenseTotal, setExpenseTotal] = useState('');
  const [expenseCategory, setExpenseCategory] = useState();
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseDay, setExpenseDay] = useState(0);
  const [dropDownDays, setDropDownDays] = useState(0);
  const [expenseMonth, setExpenseMonth] = useState(0);
  const [expenseYear, setExpenseYear] = useState(0);

  const [noExpensesAddedError, setNoExpensesAddedError] = useState(false);

  const formatExpenseInput = input => {
    if (input.length > 8) {
      setExpenseTotal(expenseTotal);
    } else if (input.length > 5) {
      setExpenseTotal(
        `${input.slice(0, input.length - 5)},${input.slice(
          input.length - 5,
          input.length - 2,
        )}.${input.slice(input.length - 2, input.length)}`,
      );
    } else if (input.length > 2) {
      setExpenseTotal(
        `${input.slice(0, input.length - 2)}.${input.slice(
          input.length - 2,
          input.length,
        )}`,
      );
    } else if (input.length === 1) {
      if (input === '0') {
        setExpenseTotal('');
      } else {
        setExpenseTotal(input);
      }
    } else {
      setExpenseTotal(input);
    }
  };

  const setCurrentDates = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    setExpenseDay(day);
    setExpenseMonth(month);
    setExpenseYear(year);
  };

  useEffect(() => {
    setCurrentDates();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.incomeFormContainer}>
        <View style={styles.flexEnd}>
          <CloseBtn closeProp={props.closeLogExpenseModal} />
        </View>
        <Text style={styles.title}>Add An Expense</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.expenseTitle}>Category</Text>
          <TextInput
            value={expenseDescription}
            textAlign="right"
            onChangeText={text => setExpenseDescription(text)}
          />
          <Text style={styles.expenseTitle}>Amount</Text>
          <View
            style={{flexDirection: 'row', paddingLeft: 35, paddingRight: 50}}>
            <Text style={styles.expenseInputText}>$</Text>
            <TextInput
              style={styles.expenseAmountInput}
              placeholder="0.00"
              keyboardType="numeric"
              value={expenseTotal}
              textAlign="right"
              onChangeText={text =>
                formatExpenseInput(text.replace(/[^0-9]/g, ''))
              }
            />
          </View>
          {noExpensesAddedError ? (
            <Text>Please add the amount of extra income for this month</Text>
          ) : null}
          <Text style={styles.expenseTitle}>Date</Text>
          <View style={styles.dateContainer}>
            <MonthDropDown
              expenseMonth={expenseMonth}
              setExpenseMonth={setExpenseMonth}
            />
            <DayDropDown
              expenseDay={expenseDay}
              setExpenseDay={setExpenseDay}
              expenseMonth={expenseMonth}
              expenseYear={expenseYear}
              dropDownDays={dropDownDays}
              setDropDownDays={setDropDownDays}
            />
            <YearsDropDown
              expenseYear={expenseYear}
              setExpenseYear={setExpenseYear}
            />
          </View>
          <Text style={styles.expenseTitle}>Optional Description</Text>
          <TextInput
            style={styles.expenseInput}
            value={expenseDescription}
            onChangeText={text => setExpenseDescription(text)}
          />
        </View>
        <TouchableOpacity>
          <Text>Save Budget</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddExpenseModal;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  incomeFormContainer: {
    width: '85%',
    height: '90%',
    padding: 15,
    backgroundColor: '#dbe2e0',
    borderRadius: 25,
    borderColor: '#223252',
    borderWidth: 3,
    opacity: 1,
  },
  dateContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '75%',
    color: '#223252',
    transform: [{translateY: -15}],
  },
  expenseTitle: {
    color: '#223252',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 5,
    marginBottom: 5,
  },
  expenseInputText: {
    paddingRight: 5,
    fontWeight: 'bold',
    color: '#223252',
    fontSize: 22,
  },
  expenseInput: {
    backgroundColor: '#ced4d2',
    borderWidth: 2,
    borderBottomWidth: 3,
    borderColor: '#223252',
    borderRadius: 10,
    paddingVertical: 0,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  expenseAmountInput: {
    fontWeight: 'bold',
    color: '#223252',
    fontSize: 22,
    width: '100%',
    borderRadius: 15,
    borderBottomWidth: 2,
    borderColor: 'black',
    paddingRight: 15,
    paddingVertical: 0,
  },
  flexEnd: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
