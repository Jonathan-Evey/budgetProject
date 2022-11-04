import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import DaysInDropDown from './DaysInDropDown';

const DayDropDown = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  let thirtyOne = [1, 3, 5, 7, 8, 10, 12];
  let thirty = [4, 6, 9, 11];

  const match = (value, array) => {
    return array.some(e => e === value);
  };

  const setDaysInDropdown = (monthData, yearData) => {
    if (match(monthData, thirtyOne)) {
      props.setDropDownDays(31);
    }
    if (match(monthData, thirty)) {
      props.setDropDownDays(30);
    } else if (leapYear(yearData)) {
      props.setDropDownDays(29);
    } else {
      props.setDropDownDays(28);
    }
  };

  const leapYear = year => {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  };
  useEffect(() => {
    if (props.expenseMonth === 0 || props.expenseYear === 0) {
      return;
    }
    setDaysInDropdown(props.expenseMonth, props.expenseYear);
  }, [props.expenseMonth, props.expenseYear]);

  return (
    <View>
      <View>
        <TouchableOpacity onPress={toggleMenu}>
          <Text>{props.expenseDay}</Text>
          <Text>^</Text>
        </TouchableOpacity>
      </View>
      {isOpen ? (
        <DaysInDropDown
          dropDownDays={props.dropDownDays}
          setExpenseDay={props.setExpenseDay}
          toggleMenu={toggleMenu}
        />
      ) : null}
    </View>
  );
};

export default DayDropDown;

const styles = StyleSheet.create({});
