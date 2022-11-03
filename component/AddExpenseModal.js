import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';

const AddExpenseModal = props => {
  const [expenseTotal, setExpenseTotal] = useState('');

  const [noExpensesAddedError, setnoExpensesAddedError] = useState(false);

  const formatExpenseInput = input => {
    if (input.length > 5) {
      setExpenseTotal(
        `${input.slice(0, input.length - 5)},${input.slice(
          input.length - 5,
          input.length - 2,
        )}.${input.slice(input.length - 2, input.length)}`,
      );
    } else if (input.length > 2) {
      setExpenseTotal(
        `${input.slice(0, input.length - 2)}.${input.slice(
          input.length - 2,
          input.length,
        )}`,
      );
    } else {
      setExpenseTotal(input);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.incomeFormContainer}>
        <TouchableOpacity onPress={props.closeLogExpenseModal}>
          <Text>Close</Text>
        </TouchableOpacity>
        <Text>Add New Expense</Text>
        <View>
          <Text>Amount of extra income for this month's budget</Text>
          <TextInput
            keyboardType="numeric"
            value={expenseTotal}
            textAlign="right"
            onChangeText={text =>
              formatExpenseInput(text.replace(/[^0-9]/g, ''))
            }
          />

          {noExpensesAddedError ? (
            <Text>Please add the amount of extra income for this month</Text>
          ) : null}
        </View>
        <TouchableOpacity>
          <Text>Save Budget</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddExpenseModal;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  incomeFormContainer: {
    width: '85%',
    height: '90%',
    backgroundColor: '#EAF1EE',
    opacity: 1,
  },
});
