import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BudgetCardBudget from "./BudgetCardBudget"
import BudgetCardSpent from './BudgetCardSpent'

const BudgetCard = (props) => {
  
  let componentType = {
    budget: "budget",
    spent: "spent",
  }

  const [isSeeDetails, setIsSeeDeatils] = useState(false)
  const [spentPercent, setSpentPercent] = useState()
  const [spentOverBudget, setSpentOverBudget] = useState()

  const openBudget = () => {
    setIsSeeDeatils(!isSeeDetails)
  }

  useEffect(() => {
    setSpentOverBudget(200 - props.budget)
    setSpentPercent((200 / props.budget) * 100)
  }, [])

  return (
    <>
      {props.budget === 0 ? 
        <View style={[styles.card, styles.elevation, {height: "17.5%"}]}>
          <TouchableOpacity onPress={props.openBudgetModal} style={styles.newBudget}>
            <Text style={styles.newBudgetText}>Start here to begin your budget journey</Text>
          </TouchableOpacity>
        </View> 
      : 
        <View style={[styles.card, styles.withBudget, styles.elevation]}>
          <BudgetCardBudget userData={props.userData} budget={props.budget} budgetSpent={700} budgetUsedPercent={props.budgetUsedPercent} componentType={componentType.budget} isSeeDetails={isSeeDetails} openAddIncomeModal={props.openAddIncomeModal}/>
          {isSeeDetails ? 
          <BudgetCardSpent spent={400} spentOverBudget={spentOverBudget} spentPercent={spentPercent} componentType={componentType.spent}/>

           : null}
          {!isSeeDetails ? 
          <View style={[styles.btnContainer, {width: "80%", justifyContent: "space-between"},]}>
            <TouchableOpacity style={styles.optionsBtn}>
              <Text style={styles.optionsBtnText}>Log Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsBtn} onPress={openBudget}>
              <Text style={styles.optionsBtnText}>Details</Text>
            </TouchableOpacity>
          </View> : 
          <View style={[styles.btnContainer, {width: "90%", justifyContent: "flex-end", marginTop: 20,}]}>
            <TouchableOpacity style={styles.optionsBtn} onPress={openBudget}>
              <Text style={styles.optionsBtnText}>Close</Text>
            </TouchableOpacity>
          </View>}
        </View>}
    </>
  )
}

export default BudgetCard

const styles = StyleSheet.create({
  card: {
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
    textAlign: "center",
  },
  btnContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  optionsBtn: {
    backgroundColor: "#223252",
    borderRadius: 250,
    paddingHorizontal: 24,
    paddingVertical: 2,
    shadowColor: "black",
    elevation: 3,
  },
  optionsBtnText: {
    color: "#ced4d2",
    fontWeight: "bold",
  },
})