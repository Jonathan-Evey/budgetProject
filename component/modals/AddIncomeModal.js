import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import CloseBtn from '../../utility/CloseBtn';
import AmountInput from '../../utility/AmountInput';
import DescriptionInput from '../../utility/DescriptionInput';
import ModalSaveBtn from '../../utility/ModalSaveBtn';
import DayDropDown from './selectorComponent/DayDropDown';
import DaysInDropDown from './selectorComponent/DaysInDropDown';
import MonthDropDown from './selectorComponent/MonthDropDown';
import MonthsInDropDown from './selectorComponent/MonthsInDropDown';
import YearsDropDown from './selectorComponent/YearsDropDown';
import YearsInDropDown from './selectorComponent/YearsInDropDown';

const AddIncomeModal = props => {
  const [additionalIncome, setAdditionalIncome] = useState('');
  const [description, setDescription] = useState('');
  const [noDescriptionError, setNoDescriptionError] = useState(false);
  const [expenseDay, setExpenseDay] = useState(0);
  const [isDaySelectorOpen, setIsDaySelectorOpen] = useState(false);
  const [dropDownDays, setDropDownDays] = useState(0);
  const [expenseMonth, setExpenseMonth] = useState(0);
  const [isMonthSelectorOpen, setIsMonthSelectorOpen] = useState(false);
  const [expenseYear, setExpenseYear] = useState(0);
  const [isYearSelectorOpen, setIsYearSelectorOpen] = useState(false);

  const [noIncomeInputError, setNoIncomeInputError] = useState(false);

  const formatInput = input => {
    input = input.replace(/[^0-9]/g, '');
    if (input.length > 8) {
      setAdditionalIncome(additionalIncome);
    } else if (input.length > 5) {
      setAdditionalIncome(
        `${input.slice(0, input.length - 5)},${input.slice(
          input.length - 5,
          input.length - 2,
        )}.${input.slice(input.length - 2, input.length)}`,
      );
    } else if (input.length > 2) {
      setAdditionalIncome(
        `${input.slice(0, input.length - 2)}.${input.slice(
          input.length - 2,
          input.length,
        )}`,
      );
    } else if (input.length === 1) {
      if (input === '0') {
        setAdditionalIncome('');
      } else {
        setAdditionalIncome(input);
      }
    } else {
      setAdditionalIncome(input);
    }
  };

  const validateData = () => {
    if (additionalIncome === '') {
      setNoIncomeInputError(true);
    }
    if (description === '') {
      setNoDescriptionError(true);
    }

    if (additionalIncome !== '' && description !== '') {
      props.saveExtraIncome(
        additionalIncome,
        description,
        expenseDay,
        expenseMonth,
        expenseYear,
      );
      props.setUpdateUserData(!props.updateUserData);
      props.closeAddIncomeModal();
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
          <CloseBtn closeProp={props.closeAddIncomeModal} />
        </View>
        <Text style={styles.title}>Extra Income</Text>
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
            valueProp={additionalIncome}
            onChangeProp={formatInput}
          />
          {noIncomeInputError ? (
            <Text style={[styles.errorText, {bottom: -20}]}>
              Please incluse the amount of extra income
            </Text>
          ) : null}
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
          <Text style={styles.expenseTitle}>Description</Text>
          <DescriptionInput
            onChangeProp={setDescription}
            valueProp={description}
          />
          {noDescriptionError && (
            <Text style={[styles.errorText, {bottom: -10}]}>
              Please include a description
            </Text>
          )}
        </View>
        <View style={{alignItems: 'center'}}>
          <ModalSaveBtn text={'Add Income'} onPressProp={validateData} />
        </View>
      </View>
    </View>
  );
};

export default AddIncomeModal;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    paddingTop: '7.5%',
    alignItems: 'center',
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
  flexEnd: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  dateContainer: {
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
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
