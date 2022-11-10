import {StyleSheet, Text, View, Animated} from 'react-native';
import React, {useState, useEffect} from 'react';

const DropDownMenuIcon = props => {
  const closedBar = useState(new Animated.Value(0))[0];
  const openBar = useState(new Animated.Value(0))[0];

  const openAnimation = () => {
    Animated.sequence([
      Animated.timing(closedBar, {
        toValue: -60,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(openBar, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closedAnimation = () => {
    Animated.sequence([
      Animated.timing(openBar, {
        toValue: -60,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(closedBar, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (props.isDropDownOpen) {
      openAnimation();
    } else {
      closedAnimation();
    }
  }, [props.isDropDownOpen]);
  return (
    <View style={styles.iconContainer}>
      <Animated.View
        style={[
          styles.bar,
          styles.left,
          {
            backgroundColor: props.bgColor,
            transform: [{rotate: '45deg'}, {translateX: closedBar}],
          },
        ]}></Animated.View>
      <Animated.View
        style={[
          styles.bar,
          styles.right,
          {
            backgroundColor: props.bgColor,
            transform: [{rotate: '135deg'}, {translateX: closedBar}],
          },
        ]}></Animated.View>
      <Animated.View
        style={[
          styles.bar,
          styles.left,
          {
            backgroundColor: props.bgColor,
            transform: [{rotate: '-45deg'}, {translateX: openBar}],
          },
        ]}></Animated.View>
      <Animated.View
        style={[
          styles.bar,
          styles.right,
          {
            backgroundColor: props.bgColor,
            transform: [{rotate: '-135deg'}, {translateX: openBar}],
          },
        ]}></Animated.View>
    </View>
  );
};

export default DropDownMenuIcon;

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
    width: 30,
    height: 15,
    overflow: 'hidden',
  },
  bar: {
    position: 'absolute',
    height: 3,
    borderRadius: 250,
    width: '60%',
    top: 6,
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
});
