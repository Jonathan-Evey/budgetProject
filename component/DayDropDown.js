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
    console.log(monthData);
    if (match(monthData, thirtyOne)) {
      console.log('set 31');
      props.setDropDownDays(31);
    } else if (match(monthData, thirty)) {
      console.log('set 30');
      props.setDropDownDays(30);
    } else if (leapYear(yearData)) {
      console.log('set 29');
      props.setDropDownDays(29);
    } else {
      console.log('set 28');
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
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.btnLabel}>Day</Text>
        <TouchableOpacity style={styles.dateBtn} onPress={toggleMenu}>
          <Text style={styles.dateBtnText}>{props.expenseDay}</Text>
          <Text style={[styles.dateBtnText, styles.downArrow]}>^</Text>
        </TouchableOpacity>
      </View>
      {isOpen ? (
        <DaysInDropDown
          dropDownDays={props.dropDownDays}
          expenseDay={props.expenseDay}
          setExpenseDay={props.setExpenseDay}
          toggleMenu={toggleMenu}
        />
      ) : null}
    </View>
  );
};

export default DayDropDown;

const styles = StyleSheet.create({
  btnLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#223252',
  },
  dateBtn: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#223252',
    borderTopWidth: 1,
    borderTopColor: '#223252',
  },
  dateBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#223252',
  },
  downArrow: {
    marginLeft: 15,
    transform: [{rotate: '180deg'}],
  },
});
