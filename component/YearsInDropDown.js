import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const YearsInDropDown = props => {
  let currentYear = new Date().getFullYear();

  return (
    <ScrollView style={styles.dayContainer}>
      {Array(5)
        .fill(0)
        .map((x, index) => (
          <View key={index} style={styles.day}>
            <TouchableOpacity
              onPress={() => {
                props.toggleMenu();
                props.setExpenseYear(currentYear - index);
              }}>
              <Text>{currentYear - index}</Text>
            </TouchableOpacity>
          </View>
        ))}
    </ScrollView>
  );
};

export default YearsInDropDown;

const styles = StyleSheet.create({
  dayContainer: {
    maxHeight: 50,
  },
  day: {
    marginTop: 2,
  },
});
