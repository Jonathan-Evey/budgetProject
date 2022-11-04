import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const MonthsInDropDown = props => {
  return (
    <ScrollView style={styles.dayContainer}>
      {Array(12)
        .fill(0)
        .map((x, index) => (
          <View key={index} style={styles.day}>
            <TouchableOpacity
              onPress={() => {
                props.toggleMenu();
                props.setExpenseMonth(index + 1);
              }}>
              <Text>{index + 1}</Text>
            </TouchableOpacity>
          </View>
        ))}
    </ScrollView>
  );
};

export default MonthsInDropDown;

const styles = StyleSheet.create({
  dayContainer: {
    maxHeight: 50,
  },
  day: {
    marginTop: 2,
  },
});
