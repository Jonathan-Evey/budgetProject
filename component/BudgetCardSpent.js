import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ToExpensesBtn from '../utility/ToExpensesBtn';
import React from 'react';

const BudgetCardSpent = props => {
  return (
    <>
      <View style={styles.budgetDetails}>
        <View style={styles.budgetDetailsTextContainer}>
          <View style={styles.budgetDetailsTextContainerLeft}>
            <Text style={[styles.budgetTitle, {marginTop: 15}]}>Expenses</Text>
            {props.spentPercent > 100 ? (
              <Text
                style={{
                  color: '#b31515',
                }}>{`You are ${props.spentOverBudget.toFixed(
                2,
              )} over budget`}</Text>
            ) : null}
          </View>
          <Text style={[styles.budgetTotal]}>{props.spent}</Text>
        </View>
        {props.spentPercent < 100 ? (
          <View
            style={[
              styles.budgetBar,
              styles.spent,
              {width: `${props.spentPercent}%`},
            ]}></View>
        ) : (
          <View
            style={[
              styles.budgetBar,
              styles.spent,
              {width: `100%`, backgroundColor: '#b31515'},
            ]}></View>
        )}
        <View style={[styles.budgetBar, styles.total]}></View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={props.openLogExpenseModal}>
          <Text style={styles.btnText}>Log Expense</Text>
        </TouchableOpacity>
        <ToExpensesBtn userData={props.userData} />
      </View>
    </>
  );
};

export default BudgetCardSpent;

const styles = StyleSheet.create({
  budgetDetails: {
    position: 'relative',
    width: '90%',
  },
  budgetDetailsTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  budgetDetailsTextContainerLeft: {
    justifyContent: 'space-between',
  },
  budgetTitle: {
    fontSize: 24,
    paddingBottom: 5,
    color: '#223252',
  },
  budgetTotal: {
    fontSize: 40,
    color: '#223252',
    alignSelf: 'flex-end',
  },
  budgetBar: {
    position: 'absolute',
    height: 10,
    borderRadius: 250,
    bottom: 5,
  },
  total: {
    width: '100%',
    backgroundColor: '#B58C7E',
    shadowColor: 'black',
    elevation: 3,
  },
  spent: {
    backgroundColor: '#223252',
    zIndex: 1,
  },
  error: {
    backgroundColor: '#b31515',
  },
  btnContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#223252',
    borderRadius: 250,
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 4,
    shadowColor: 'black',
    elevation: 3,
  },
  btnText: {
    color: '#ced4d2',
    fontWeight: 'bold',
  },
});
