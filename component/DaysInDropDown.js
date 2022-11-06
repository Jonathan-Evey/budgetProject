import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const DaysInDropDown = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select the day of the expense</Text>
      <View style={styles.dayContainer}>
        {Array(props.dropDownDays)
          .fill(0)
          .map((x, index) => (
            <View key={index}>
              {props.expenseDay === index + 1 ? (
                <TouchableOpacity
                  style={[styles.day, styles.selectedDay]}
                  onPress={() => {
                    props.toggleMenu();
                    props.setExpenseDay(index + 1);
                  }}>
                  <Text style={styles.dayText}>{index + 1}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.day}
                  onPress={() => {
                    props.toggleMenu();
                    props.setExpenseDay(index + 1);
                  }}>
                  <Text style={styles.dayText}>{index + 1}</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
      </View>
    </View>
  );
};

export default DaysInDropDown;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#B58C7E',
    top: -175,
    left: 7.5,
    width: 279,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    zIndex: 100,
    borderColor: '#223252',
    borderWidth: 2,
    borderRadius: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1d1d1d',
    paddingTop: 10,
    paddingBottom: 25,
  },
  dayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    height: 40,
    width: 35,
    paddingLeft: 2,
    borderWidth: 1,
    borderColor: '#223252',
    backgroundColor: '#dbe2e0',
  },
  selectedDay: {
    backgroundColor: '#DCA387',
  },
  dayText: {
    color: '#1d1d1d',
  },
});
