import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ToBudgetBtn from '../../utility/ToBudgetBtn';

const BudgetCardBudget = props => {
  const [remainingAmount, setRemainingAmount] = useState(null);

  const formatBudgetRemaining = () => {
    let amountRemaining = (props.budget - props.budgetSpent)
      .toString()
      .replace(/[^0-9]/g, '');
    if (amountRemaining.length > 5) {
      return setRemainingAmount(
        `$${amountRemaining.slice(
          0,
          amountRemaining.length - 5,
        )},${amountRemaining.slice(
          amountRemaining.length - 5,
          amountRemaining.length - 2,
        )}.${amountRemaining.slice(
          amountRemaining.length - 2,
          amountRemaining.length,
        )}`,
      );
    } else {
      return setRemainingAmount(`$${props.budget - props.budgetSpent}`);
    }
  };

  useEffect(() => {
    formatBudgetRemaining();
  }, [props.budget]);

  return (
    <>
      <View style={styles.budgetDetails}>
        <View style={styles.budgetDetailsTextContainer}>
          <View style={styles.budgetDetailsTextContainerLeft}>
            <Text style={styles.budgetTitle}>Remaining</Text>
            {props.budgetUsedPercent > 100 ? (
              <Text
                style={{
                  color: '#b31515',
                  marginTop: -5,
                }}>{`Over budget by ${
                props.budgetUsedPercent.toFixed() - 100
              }%`}</Text>
            ) : null}
          </View>
          <Text style={styles.budgetTotal}>{remainingAmount}</Text>
        </View>
        {props.budgetUsedPercent < 100 ? (
          <View
            style={[
              styles.budgetBar,
              styles.spent,
              {width: `${props.budgetUsedPercent.toFixed()}%`},
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
      {props.isSeeDetails ? (
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={props.openAddIncomeModal}>
            <Text style={styles.btnText}>Add Extra Income</Text>
          </TouchableOpacity>
          <ToBudgetBtn userData={props.userData} />
        </View>
      ) : null}
    </>
  );
};

export default BudgetCardBudget;

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
    justifyContent: 'flex-end',
  },
  budgetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
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
