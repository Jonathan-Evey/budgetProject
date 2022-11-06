import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const MonthDropDown = props => {
  const eachMonth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const toggleMenu = () => {
    props.setIsMonthSelectorOpen(!props.isMonthSelectorOpen);
  };

  const findMonth = monthNum => {
    return eachMonth.at(monthNum - 1);
  };

  return (
    <View style={styles.btnMaxWidth}>
      <TouchableOpacity
        style={styles.dateBtn}
        onPress={() => {
          toggleMenu();
        }}>
        <Text style={styles.dateBtnText}>{findMonth(props.expenseMonth)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MonthDropDown;

const styles = StyleSheet.create({
  btnMaxWidth: {
    width: '30%',
  },
  dateBtn: {
    paddingHorizontal: 20,
    borderRadius: 250,
    backgroundColor: '#223252',
  },
  dateBtnText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dbe2e0',
  },
});
