import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import formatExpenseInput from '../../functions/formatNumericInput';
import React, {useState, useEffect} from 'react';
import CloseBtn from '../../utility/CloseBtn';
import AmountInput from '../../utility/AmountInput';
import DescriptionInput from '../../utility/DescriptionInput';
import ModalSaveBtn from '../../utility/ModalSaveBtn';
import ExpenseCategoryContainer from './ExpenseCategoryContainer';
import DayDropDown from './selectorComponent/DayDropDown';
import DaysInDropDown from './selectorComponent/DaysInDropDown';
import MonthDropDown from './selectorComponent/MonthDropDown';
import MonthsInDropDown from './selectorComponent/MonthsInDropDown';
import YearsDropDown from './selectorComponent/YearsDropDown';
import YearsInDropDown from './selectorComponent/YearsInDropDown';

const AddExpenseModal = props => {
  const [expenseTotal, setExpenseTotal] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseDay, setExpenseDay] = useState(0);
  const [dropDownDays, setDropDownDays] = useState(0);
  const [isDaySelectorOpen, setIsDaySelectorOpen] = useState(false);
  const [expenseMonth, setExpenseMonth] = useState(0);
  const [isMonthSelectorOpen, setIsMonthSelectorOpen] = useState(false);
  const [expenseYear, setExpenseYear] = useState(0);
  const [isYearSelectorOpen, setIsYearSelectorOpen] = useState(false);

  const [noExpenseAddedError, setNoExpenseAddedError] = useState(false);
  const [noCategorySelected, setNoCategorySelected] = useState(false);

  const runFormatFunction = input => {
    formatExpenseInput(
      input,
      setExpenseTotal,
      expenseTotal,
      setNoExpenseAddedError,
    );
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

  const validatData = () => {
    if (expenseTotal === '') {
      setNoExpenseAddedError(true);
    }
    if (expenseCategory === '') {
      return setNoCategorySelected(true);
    }
    if (expenseTotal !== '' && expenseCategory !== '') {
      props.saveExpense(
        expenseTotal,
        expenseMonth,
        expenseDay,
        expenseYear,
        expenseCategory,
        expenseDescription,
      );
      return props.closeLogExpenseModal();
    }
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
        <Text style={styles.title}>Expense</Text>
        <Text style={styles.expenseTitle}>Amount</Text>
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: 35,
            paddingRight: 50,
            marginBottom: 15,
          }}>
          <Text style={styles.expenseInputText}>$</Text>
          <AmountInput
            placeholderProp="0.00"
            fontSizeProp={22}
            valueProp={expenseTotal}
            onChangeProp={runFormatFunction}
          />
          {noExpenseAddedError && (
            <Text style={[styles.errorText, {bottom: -20}]}>
              Please include expense amount
            </Text>
          )}
        </View>

        <Text style={styles.expenseTitle}>Date</Text>
        <View style={styles.dateContainer}>
          <MonthDropDown
            expenseMonth={expenseMonth}
            setExpenseMonth={setExpenseMonth}
            setIsMonthSelectorOpen={setIsMonthSelectorOpen}
            isMonthSelectorOpen={isMonthSelectorOpen}
          />
          {isMonthSelectorOpen ? (
            <MonthsInDropDown
              expenseMonth={expenseMonth}
              setExpenseMonth={setExpenseMonth}
              setIsMonthSelectorOpen={setIsMonthSelectorOpen}
              isMonthSelectorOpen={isMonthSelectorOpen}
            />
          ) : null}
          <DayDropDown
            expenseDay={expenseDay}
            isDaySelectorOpen={isDaySelectorOpen}
            setIsDaySelectorOpen={setIsDaySelectorOpen}
          />
          {isDaySelectorOpen ? (
            <DaysInDropDown
              dropDownDays={dropDownDays}
              expenseDay={expenseDay}
              setExpenseDay={setExpenseDay}
              expenseMonth={expenseMonth}
              expenseYear={expenseYear}
              setDropDownDays={setDropDownDays}
              isDaySelectorOpen={isDaySelectorOpen}
              setIsDaySelectorOpen={setIsDaySelectorOpen}
            />
          ) : null}
          <YearsDropDown
            expenseYear={expenseYear}
            isYearSelectorOpen={isYearSelectorOpen}
            setIsYearSelectorOpen={setIsYearSelectorOpen}
          />
          {isYearSelectorOpen ? (
            <YearsInDropDown
              expenseYear={expenseYear}
              setExpenseYear={setExpenseYear}
              isYearSelectorOpen={isYearSelectorOpen}
              setIsYearSelectorOpen={setIsYearSelectorOpen}
            />
          ) : null}
        </View>
        <View>
          <Text style={[styles.expenseTitle, {marginBottom: 10}]}>
            Category
          </Text>
          <View style={styles.categoryContainer}>
            <ExpenseCategoryContainer
              expenseCategoryStateProp={expenseCategory}
              setExpenseCategoryStateProp={setExpenseCategory}
              setNoCategoryErrorProp={setNoCategorySelected}
            />
            {noCategorySelected && (
              <Text style={[styles.errorText, {bottom: -15}]}>
                Please select a category
              </Text>
            )}
          </View>
          <Text style={styles.expenseTitle}>Optional Description</Text>
          <DescriptionInput
            onChangeProp={setExpenseDescription}
            valueProp={expenseDescription}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <ModalSaveBtn text={'Save Expense'} onPressProp={validatData} />
        </View>
      </View>
    </View>
  );
};

export default AddExpenseModal;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    paddingTop: '7.5%',
    alignItems: 'center',
  },
  categoryContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  incomeFormContainer: {
    width: '85%',
    padding: 15,
    paddingTop: 5,
    backgroundColor: '#dbe2e0',
    borderRadius: 25,
    borderColor: '#223252',
    borderWidth: 3,
    opacity: 1,
  },
  dateContainer: {
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1d1d1d',
    transform: [{translateY: -20}],
  },
  expenseTitle: {
    color: '#1d1d1d',
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
  flexEnd: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  errorText: {
    position: 'absolute',
    right: 0,
    left: 0,
    textAlign: 'center',
    color: '#b31515',
    fontWeight: 'bold',
  },
});
