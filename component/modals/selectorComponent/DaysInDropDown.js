import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';

const DaysInDropDown = props => {
  const toggleMenu = () => {
    props.setIsDaySelectorOpen(!props.isDaySelectorOpen);
  };
  let thirtyOne = [1, 3, 5, 7, 8, 10, 12];
  let thirty = [4, 6, 9, 11];

  const match = (value, array) => {
    return array.some(e => e === value);
  };

  const setDaysInDropdown = (monthData, yearData) => {
    if (match(monthData, thirtyOne)) {
      props.setDropDownDays(31);
    } else if (match(monthData, thirty)) {
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
    <View style={styles.container}>
      <Text style={styles.title}>Select day of the expense</Text>
      <View style={styles.dayContainer}>
        {Array(props.dropDownDays)
          .fill(0)
          .map((x, index) => (
            <View key={index} style={styles.dayWidth}>
              {props.expenseDay === index + 1 ? (
                <TouchableOpacity
                  style={[styles.day, styles.selectedDay]}
                  onPress={() => {
                    toggleMenu();
                    props.setExpenseDay(index + 1);
                  }}>
                  <Text style={styles.dayText}>{index + 1}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.day}
                  onPress={() => {
                    toggleMenu();
                    props.setExpenseDay(index + 1);
                  }}>
                  <Text style={styles.dayText}>{index + 1}</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
      </View>
    </View>
  );
};

export default DaysInDropDown;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B58C7E',
    top: -95,
    right: '-10%',
    width: '120%',
    paddingBottom: 15,
    zIndex: 100,
    borderColor: '#223252',
    borderWidth: 2,
    borderRadius: 15,
    shadowColor: 'black',
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1d1d1d',
    paddingTop: 10,
    paddingBottom: 25,
  },
  dayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    marginHorizontal: 'auto',
  },
  dayWidth: {
    width: '14.25%',
  },
  day: {
    height: 40,
    width: '100%',
    paddingLeft: 2,
    borderWidth: 1,
    borderColor: '#223252',
    backgroundColor: '#dbe2e0',
  },
  selectedDay: {
    backgroundColor: '#DCA387',
  },
  dayText: {
    fontWeight: 'bold',
    color: '#1d1d1d',
  },
});
