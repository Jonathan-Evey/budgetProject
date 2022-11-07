import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const ExpenseCategoryContainer = props => {
  const updateEpense = data => {
    props.setExpenseCategory(data);
  };

  let eachCategory = [
    'Bills',
    'Restaurants',
    'Entertainment',
    'Groceries',
    'Healthcare',
    'Housing',
    'Insurance',
    'Misc.',
    'Recreation',
    'Saving',
    'Transportation',
    'Utilities',
  ];

  return (
    <View style={styles.container}>
      {eachCategory.map((category, index) => (
        <View key={index}>
          {props.expenseCategory === category ? (
            <TouchableOpacity
              style={[styles.categoryBtn, styles.selected]}
              onPress={() => {
                updateEpense(category);
              }}>
              <Text style={[styles.text, styles.selected]}>{category}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() => {
                updateEpense(category);
              }}>
              <Text style={styles.text}>{category}</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

export default ExpenseCategoryContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '105%',
  },
  categoryBtn: {
    paddingHorizontal: 15,
    paddingVertical: 2,
    marginBottom: 7.5,
    borderRadius: 250,
    backgroundColor: '#223252',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#dbe2e0',
  },
  selected: {
    backgroundColor: '#DCA387',
    color: '#223252',
  },
});
