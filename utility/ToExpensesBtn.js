import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

const ToExpensesBtn = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={() =>
        navigation.navigate('Expenses', {
          userData: props.userData,
          setUpdateUserData: props.setUpdateUserData,
          updateUserData: props.updateUserData,
        })
      }>
      <Text style={styles.btnText}>View Expenses</Text>
    </TouchableOpacity>
  );
};

export default ToExpensesBtn;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#223252',
    borderRadius: 250,
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 4,
    shadowColor: 'black',
    elevation: 3,
  },
  btnText: {
    color: '#ced4d2',
    fontWeight: 'bold',
  },
});
