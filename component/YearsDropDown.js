import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import React from 'react';

const YearsDropDown = props => {
  const toggleMenu = () => {
    props.setIsYearSelectorOpen(!props.isYearSelectorOpen);
  };

  return (
    <View style={styles.btnMaxWidth}>
      <TouchableOpacity
        style={styles.dateBtn}
        onPress={() => {
          toggleMenu();
        }}>
        <Text style={styles.dateBtnText}>{props.expenseYear}</Text>
      </TouchableOpacity>
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
