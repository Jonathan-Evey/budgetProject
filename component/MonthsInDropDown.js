import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const MonthsInDropDown = props => {
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select month of the expense</Text>
      <View style={styles.monthContainer}>
        {eachMonth.map((text, index) => (
          <View key={index}>
            {props.expenseMonth === index + 1 ? (
              <TouchableOpacity
                style={[styles.month, styles.selectedMonth]}
                onPress={() => {
                  toggleMenu();
                  props.setExpenseMonth(index + 1);
                }}>
                <Text style={styles.monthText}>{text}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.month}
                onPress={() => {
                  toggleMenu();
                  props.setExpenseMonth(index + 1);
                }}>
                <Text style={styles.monthText}>{text}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default MonthsInDropDown;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#B58C7E',
    top: -115,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1d1d1d',
    paddingTop: 10,
    paddingBottom: 25,
  },
  monthContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '80%',
  },
  month: {
    height: 40,
    width: 50,
    margin: 2,
    paddingLeft: 2,
    borderWidth: 1,
    borderColor: '#223252',
    backgroundColor: '#dbe2e0',
  },
  selectedMonth: {
    backgroundColor: '#DCA387',
  },
  monthText: {
    fontWeight: 'bold',
    color: '#1d1d1d',
  },
});
