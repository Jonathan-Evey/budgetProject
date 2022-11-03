import {StyleSheet, Animated, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {auth} from '../firebase';

const MainNav = props => {
  const toTheRightValue = useState(new Animated.Value(0))[0];

  const openMenu = () => {
    Animated.timing(toTheRightValue, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };
  const closeMenu = () => {
    Animated.timing(toTheRightValue, {
      toValue: 200,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const handleSignOut = () => {
    auth
      .signOut(auth)
      .then(() => {
        props.backToLanding();
      })
      .catch(error => alert(error.message));
  };

  useEffect(() => {
    if (props.isMainNavOpen) {
      openMenu();
    }
    if (!props.isMainNavOpen) {
      closeMenu();
    }
  }, [props.isMainNavOpen]);

  return (
    <Animated.View
      style={[styles.mainNav, {transform: [{translateX: toTheRightValue}]}]}>
      <Text>MainNav</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MainNav;

const styles = StyleSheet.create({
  mainNav: {
    position: 'absolute',
    height: '100%',
    width: 200,
    alignSelf: 'flex-end',
    backgroundColor: '#223252',
    zIndex: 3,
  },
});
