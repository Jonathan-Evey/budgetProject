import {StyleSheet, TouchableOpacity, Animated} from 'react-native';
import React, {useState, useEffect} from 'react';

const MainNavBtn = props => {
  const shortBarAnimation = useState(new Animated.Value(0))[0];
  const midBarAnimation = useState(new Animated.Value(0))[0];
  const longBarAnimation = useState(new Animated.Value(0))[0];
  const xBarAnimation = useState(new Animated.Value(0))[0];
  const xBarTwoAnimation = useState(new Animated.Value(0))[0];

  const showBars = () => {
    Animated.sequence([
      Animated.timing(xBarTwoAnimation, {
        toValue: -60,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(xBarAnimation, {
        toValue: 60,
        duration: 150,
        useNativeDriver: true,
      }),

      Animated.timing(shortBarAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(longBarAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(midBarAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const closeBars = () => {
    Animated.sequence([
      Animated.timing(midBarAnimation, {
        toValue: 50,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(longBarAnimation, {
        toValue: 50,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(shortBarAnimation, {
        toValue: 50,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(xBarAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(xBarTwoAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (props.isMainNavOpen) {
      closeBars();
    } else {
      showBars();
    }
  }, [props.isMainNavOpen]);

  return (
    <TouchableOpacity
      style={[styles.userMainMenuBtn, {overflow: 'hidden'}]}
      onPress={() => {
        props.setIsMainNavOpen(!props.isMainNavOpen);
      }}>
      <Animated.View
        style={[
          styles.bar,
          styles.midBar,
          {transform: [{translateX: midBarAnimation}]},
        ]}></Animated.View>
      <Animated.View
        style={[
          styles.bar,
          styles.longBar,
          {transform: [{translateX: longBarAnimation}]},
        ]}></Animated.View>
      <Animated.View
        style={[
          styles.bar,
          styles.shortBar,
          {transform: [{translateX: shortBarAnimation}]},
        ]}></Animated.View>
      <Animated.View
        style={[
          styles.xBar,
          styles.bar,
          {
            transform: [
              {translateY: 14},
              {rotate: '45deg'},
              {translateX: xBarAnimation},
            ],
          },
        ]}></Animated.View>
      <Animated.View
        style={[
          styles.xBar,
          styles.bar,
          {
            transform: [
              {translateY: 14},
              {rotate: '135deg'},
              {translateX: xBarTwoAnimation},
            ],
          },
        ]}></Animated.View>
    </TouchableOpacity>
  );
};

export default MainNavBtn;

const styles = StyleSheet.create({
  userMainMenuBtn: {
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    height: 50,
    width: 50,
    zIndex: 4,
  },
  bar: {
    height: 4,
    backgroundColor: '#DE2555',
    borderRadius: 250,
  },
  shortBar: {
    width: '55%',
  },
  midBar: {
    width: '75%',
  },
  longBar: {
    width: '95%',
  },
  xBar: {
    position: 'absolute',
    width: '75%',
  },
});
