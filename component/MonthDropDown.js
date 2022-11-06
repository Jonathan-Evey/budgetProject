import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MonthsInDropDown from './MonthsInDropDown';
import React, {useState} from 'react';

const MonthDropDown = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Text>Month</Text>
        <TouchableOpacity
          style={styles.dateBtn}
          onPress={() => {
            toggleMenu();
          }}>
          <Text>{props.expenseMonth}</Text>
          <Text>^</Text>
        </TouchableOpacity>
      </View>
      {isOpen ? (
        <MonthsInDropDown
          setExpenseMonth={props.setExpenseMonth}
          toggleMenu={toggleMenu}
        />
      ) : null}
    </View>
  );
};

export default MonthDropDown;

const styles = StyleSheet.create({
  dateBtn: {
    flexDirection: 'row',
  },
});
