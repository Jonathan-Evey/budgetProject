import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

const CloseBtn = prop => {
  return (
    <TouchableOpacity style={styles.closeBtn} onPress={prop.closeProp}>
      <View style={[styles.bar, styles.top]}></View>
      <View style={[styles.bar, styles.bottom]}></View>
    </TouchableOpacity>
  );
};

export default CloseBtn;

const styles = StyleSheet.create({
  closeBtn: {
    marginTop: 5,
    width: 25,
  },
  bar: {
    height: 4,
    backgroundColor: '#DE2555',
  },
  top: {
    transform: [{translateY: 2}, {rotate: '45deg'}],
  },
  bottom: {
    transform: [{translateY: -2}, {rotate: '135deg'}],
  },
});
