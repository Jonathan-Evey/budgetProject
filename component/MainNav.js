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
      <View></View>
      <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
        <Text style={styles.signOutBtnText}>Sign Out</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MainNav;

const styles = StyleSheet.create({
  mainNav: {
    position: 'absolute',
    justifyContent: 'space-between',
    height: '100%',
    width: 200,
    alignSelf: 'flex-end',
    backgroundColor: '#223252',
    zIndex: 3,
  },
  signOutBtn: {
    marginBottom: 25,
    paddingVertical: 25,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#384763',
  },
  signOutBtnText: {
    fontSize: 14,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#d3d9d6',
  },
});
