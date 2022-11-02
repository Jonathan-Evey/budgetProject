import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BudgetComponent from "./BudgetComponent"

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
    setSpentOverBudget(400 - props.budget)
    setSpentPercent((400 / props.budget) * 100)
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
          <BudgetComponent budget={props.budget} budgetSpent={700} componentType={componentType.budget}/>
          {isSeeDetails ? 
          <BudgetComponent spent={400} spentOverBudget={spentOverBudget} spentPercent={spentPercent} componentType={componentType.spent}/>

           : null}
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.optionsBtn}>
              <Text style={styles.optionsBtnText}>Log an Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsBtn} onPress={openBudget}>
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
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
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