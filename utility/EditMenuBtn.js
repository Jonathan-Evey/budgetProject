import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import React, {useState, useEffect} from 'react';

const EditMenuBtn = () => {
  const showMenu = useState(new Animated.Value(50))[0];
  const toLeft = useState(new Animated.Value(50))[0];
  const toRight = useState(new Animated.Value(-50))[0];
  const height = useState(new Animated.Value(0.4))[0];
  const width = useState(new Animated.Value(0.2))[0];
  const opacityOne = useState(new Animated.Value(1))[0];
  const opacityTwo = useState(new Animated.Value(0))[0];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onLoadAnimation = () => {
    Animated.timing(showMenu, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const showMenuOptions = () => {
    Animated.parallel([
      Animated.timing(toRight, {
        toValue: 25,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(toLeft, {
        toValue: -25,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(height, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(width, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityOne, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(opacityTwo, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideMenuOptions = () => {
    Animated.parallel([
      Animated.timing(toLeft, {
        toValue: 50,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(height, {
        toValue: 0.4,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(width, {
        toValue: 0.2,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(toRight, {
        toValue: -50,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityOne, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(opacityTwo, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      showMenuOptions();
    }
    if (!isMenuOpen) {
      hideMenuOptions();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    onLoadAnimation();
  }, []);

  return (
    <Animated.View
      style={[styles.container, {transform: [{translateY: showMenu}]}]}>
      <Animated.View
        style={[
          styles.menuBackground,
          styles.open,
          {opacity: opacityTwo},
        ]}></Animated.View>
      <Animated.View
        style={[
          styles.menuBackground,
          styles.closed,
          {opacity: opacityOne},
        ]}></Animated.View>
      <TouchableOpacity
        style={[
          styles.menuOptionBtn,
          {
            transform: [
              {translateX: toLeft},
              {scaleY: height},
              {scaleX: width},
            ],
          },
        ]}>
        <Animated.Text
          style={[styles.menuOptionBtnText, {opacity: opacityTwo}]}>
          Delete
        </Animated.Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuToggle}
        onPress={() => {
          toggleMenu();
        }}>
        <View style={styles.menuDot}></View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuOptionBtn,
          {
            transform: [
              {translateX: toRight},
              {scaleY: height},
              {scaleX: width},
            ],
          },
        ]}>
        <Animated.Text
          style={[styles.menuOptionBtnText, {opacity: opacityTwo}]}>
          Edit
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default EditMenuBtn;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    zIndex: 5,
    marginBottom: 10,
  },
  menuBackground: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d9d6',
    borderWidth: 2,
    borderColor: '#223252',
    borderRadius: 15,
    elevation: 5,
    shadowColor: 'black',
  },
  closed: {
    width: 75,
    height: 35,
  },
  open: {
    width: 290,
    height: 50,
    borderRadius: 25,
  },
  menuToggle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 60,
    height: '100%',
    opacity: 1,
    elevation: 6,
    shadowColor: '#d3d9d6',
    zIndex: 7,
  },
  menuDot: {
    height: 10,
    width: 10,
    borderRadius: 250,
    backgroundColor: '#DE2555',
  },
  menuOptionBtn: {
    width: 75,
    height: 30,
    backgroundColor: '#DE2555',
    borderRadius: 250,
    justifyContent: 'center',
    opacity: 1,
    elevation: 6,
    shadowColor: '#d3d9d6',
    zIndex: 6,
  },
  menuOptionBtnText: {
    fontWeight: 'bold',
    color: '#223252',
    fontSize: 16,
    textAlign: 'center',
  },
});
