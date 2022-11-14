import {StyleSheet, TextInput} from 'react-native';
import React from 'react';

const DescriptionInput = props => {
  return (
    <TextInput
      style={styles.expenseInput}
      value={props.valueProp}
      onChangeText={text => props.onChangeProp(text)}
    />
  );
};

export default DescriptionInput;

const styles = StyleSheet.create({
  expenseInput: {
    backgroundColor: '#ced4d2',
    borderWidth: 2,
    borderBottomWidth: 3,
    borderColor: '#223252',
    borderRadius: 10,
    paddingVertical: 0,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    marginBottom: 10,
  },
});
