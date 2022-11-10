import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

const ToBudgetBtn = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={() => navigation.navigate('Budget', {userData: props.userData})}>
      <Text style={styles.btnText}>Details</Text>
    </TouchableOpacity>
  );
};

export default ToBudgetBtn;

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
