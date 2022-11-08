import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const DayDropDown = props => {
  const toggleMenu = () => {
    props.setIsDaySelectorOpen(!props.isDaySelectorOpen);
  };

  return (
    <View style={styles.btnMaxWidth}>
      <TouchableOpacity style={styles.dateBtn} onPress={toggleMenu}>
        <Text style={styles.dateBtnText}>{props.expenseDay}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DayDropDown;

const styles = StyleSheet.create({
  btnMaxWidth: {
    width: '25%',
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
