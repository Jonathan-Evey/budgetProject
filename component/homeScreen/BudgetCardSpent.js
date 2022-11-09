import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ToExpensesBtn from '../../utility/ToExpensesBtn';
import React, {useState, useEffect} from 'react';

const BudgetCardSpent = props => {
  const [spentAmount, setSpentAmount] = useState(null);

  const formatSpentAmount = () => {
    let spentAmount = props.spent.toString().replace(/[^0-9]/g, '');

    if (spentAmount.length > 5) {
      return setSpentAmount(
        `$${spentAmount.slice(0, spentAmount.length - 5)},${spentAmount.slice(
          spentAmount.length - 5,
          spentAmount.length - 2,
        )}.${spentAmount.slice(spentAmount.length - 2, spentAmount.length)}`,
      );
    } else {
      console.log(props.spent.length);
      return setSpentAmount(`$${props.spent}`);
    }
  };

  useEffect(() => {
    formatSpentAmount();
  }, [props.spent]);

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
                }}>{`${props.spentOverBudget.toFixed(2)} over budget`}</Text>
            ) : (
              <Text
                style={{
                  color: '#223252',
                }}>{`Used ${props.spentPercent.toFixed()}% of budget`}</Text>
            )}
          </View>
          <Text style={[styles.budgetTotal]}>{spentAmount}</Text>
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
          <Text style={styles.btnText}>Enter Expense</Text>
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
