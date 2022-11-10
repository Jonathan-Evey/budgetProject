import {StyleSheet, TextInput} from 'react-native';
import React from 'react';

const AmountInput = props => {
  return (
    <TextInput
      style={styles.expenseAmountInput}
      placeholder="0.00"
      keyboardType="numeric"
      value={props.valueProp}
      textAlign="right"
      onChangeText={text => props.onChangeProp(text)}
    />
  );
};

export default AmountInput;

const styles = StyleSheet.create({
  expenseAmountInput: {
    fontWeight: 'bold',
    color: '#223252',
    fontSize: 22,
    width: '100%',
    borderRadius: 15,
    borderBottomWidth: 2,
    borderColor: 'black',
    paddingRight: 15,
    paddingVertical: 0,
  },
});
