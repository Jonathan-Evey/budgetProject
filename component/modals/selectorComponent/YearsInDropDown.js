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

  const toggleMenu = () => {
    props.setIsYearSelectorOpen(!props.isYearSelectorOpen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select year of the expense</Text>
      <View style={styles.yearContainer}>
        {Array(4)
          .fill(0)
          .map((x, index) => (
            <View key={index}>
              {props.expenseYear === currentYear - index ? (
                <TouchableOpacity
                  style={[styles.year, styles.selectedYear]}
                  onPress={() => {
                    toggleMenu();
                    props.setExpenseYear(currentYear - index);
                  }}>
                  <Text style={styles.yearText}>{currentYear - index}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.year}
                  onPress={() => {
                    toggleMenu();
                    props.setExpenseYear(currentYear - index);
                  }}>
                  <Text style={styles.yearText}>{currentYear - index}</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
      </View>
    </View>
  );
};

export default YearsInDropDown;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#B58C7E',
    top: -75,
    right: '-10%',
    width: '120%',
    paddingBottom: 15,
    zIndex: 100,
    borderColor: '#223252',
    borderWidth: 2,
    borderRadius: 15,
    shadowColor: 'black',
    elevation: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1d1d1d',
    paddingTop: 10,
    paddingBottom: 25,
  },
  yearContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '80%',
  },
  year: {
    height: 40,
    width: 50,
    margin: 2,
    borderWidth: 1,
    borderColor: '#223252',
    backgroundColor: '#dbe2e0',
  },
  selectedYear: {
    backgroundColor: '#DCA387',
  },
  yearText: {
    fontWeight: 'bold',
    color: '#1d1d1d',
  },
});
