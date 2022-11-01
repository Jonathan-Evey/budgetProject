import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const BudgetCard = (props) => {

  const [budgetSpentPercent, setBudgetSpentPercent] = useState()

  useEffect(() => {
    setBudgetSpentPercent((500 / props.budget) * 100)
  }, [])

  return (
    <>
      {props.budget === 0 ? 
        <View style={[styles.card, styles.elevation]}>
          <TouchableOpacity style={styles.newBudget}>
            <Text style={styles.newBudgetText}>Start Your Budget</Text>
          </TouchableOpacity>
        </View> 
      : 
        <View style={[styles.card, styles.withBudget, styles.elevation]}>
          <View style={styles.budgetDetails}>
            <View style={styles.budgetDetailsTextContainer}>
              <View style={styles.budgetDetailsTextContainerLeft}>
                <Text style={styles.budgetTitle}>Budget</Text>
                <Text style={{color: "#223252"}}>{`Spent ${500} out of`}</Text>
              </View>
              <Text style={styles.budgetTotal}>{props.budget}</Text>
            </View>
            {budgetSpentPercent ? <View style={[styles.budgetBar, styles.spent, {width: `${budgetSpentPercent}%`}]}></View> : null}
            <View style={[styles.budgetBar, styles.total]}></View>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.optionsBtn}>
              <Text style={styles.optionsBtnText}>Log Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsBtn}>
              <Text style={styles.optionsBtnText}>See Details</Text>
            </TouchableOpacity>
          </View>
        </View>}
    </>
  )
}

export default BudgetCard

const styles = StyleSheet.create({
  card: {
    height: "17.5%",
    width: "90%",
    backgroundColor: "#dbe2e0",
    borderRadius: 25,
    borderColor: "#223252",
    borderWidth: 3,
    marginTop: 25,
  },
  withBudget: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 10,
  },
  elevation: {
    shadowColor: "black",
    elevation: 10,
  },
  newBudget: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  newBudgetText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#223252",
  },
  budgetDetails: {
    position: "relative",
    width: "90%"
  },
  budgetDetailsTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  budgetDetailsTextContainerLeft: {
    justifyContent: "space-between",
  },
  budgetTitle: {
    fontSize: 24,
    paddingBottom: 20,
    color: "#223252",
  },
  budgetTotal: {
    fontSize: 40,
    color: "#223252",
    alignSelf: "flex-end",
  },
  budgetBar: {
    position: "absolute",
    height: 10,
    borderRadius: 250,
    bottom: 5,
  },
  total: {
    width: "100%",
    backgroundColor: "#B58C7E",
    shadowColor: "black",
    elevation: 3,
  },
  spent: {
    backgroundColor: "#223252",
    zIndex: 1,
  },
  btnContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionsBtn: {
    backgroundColor: "#DCA387",
    borderRadius: 250,
    paddingHorizontal: 24,
    paddingVertical: 2,
    shadowColor: "black",
    elevation: 3,
  },
  optionsBtnText: {
    color: "#1d1d1d",
    fontWeight: "bold",
  },
})