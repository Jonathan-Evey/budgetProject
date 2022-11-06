import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import YearsInDropDown from './YearsInDropDown';
import React, {useState} from 'react';

const YearsDropDown = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <View style={styles.btnMaxWidth}>
      <View>
        <TouchableOpacity
          style={styles.dateBtn}
          onPress={() => {
            toggleMenu();
          }}>
          <Text style={styles.dateBtnText}>{props.expenseYear}</Text>
        </TouchableOpacity>
      </View>
      {isOpen ? (
        <YearsInDropDown
          expenseYear={props.expenseYear}
          setExpenseYear={props.setExpenseYear}
          toggleMenu={toggleMenu}
        />
      ) : null}
    </View>
  );
};

export default YearsDropDown;

const styles = StyleSheet.create({
  btnMaxWidth: {
    width: '35%',
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
