import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const ModalSaveBtn = props => {
  return (
    <TouchableOpacity
      style={styles.saveBtn}
      onPress={() => {
        props.onPressProp();
      }}>
      <Text style={styles.saveBtnText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default ModalSaveBtn;

const styles = StyleSheet.create({
  saveBtn: {
    width: '50%',
    backgroundColor: '#DE2555',
    borderRadius: 250,
    paddingVertical: 5,
    marginTop: 15,
    marginBottom: 5,
  },
  saveBtnText: {
    color: '#1d1d1d',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
