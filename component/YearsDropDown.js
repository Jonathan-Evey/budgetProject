import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import YearsInDropDown from './YearsInDropDown';
import React, {useState} from 'react';

const YearsDropDown = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={() => {
            toggleMenu();
          }}>
          <Text>{props.expenseYear}</Text>
          <Text>^</Text>
        </TouchableOpacity>
        {isOpen ? (
          <YearsInDropDown
            expenseYear={props.expenseYear}
            setExpenseYear={props.setExpenseYear}
            toggleMenu={toggleMenu}
          />
        ) : null}
      </View>
    </View>
  );
};

export default YearsDropDown;

const styles = StyleSheet.create({});
