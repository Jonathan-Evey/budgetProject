import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const BudgetCardBudget = (props) => {

  // const calculatePercent = () => {
  //   if (props.isAdditionalIncome) {
  //     return (props.budgetSpent / props.budget) * 100 
  //   } else {
  //     return (props.budgetSpent / props.userData.mainBudget) * 100 
  //   }
  // }
  // const calculateBudgetTotal = () => {
  //   if (props.isAdditionalIncome) {
  //     return props.userData.mainBudget + props.userData.additionalIncome.amount
  //   } else {
  //     return props.userData.mainBudget
  //   }
  // }

  // let budgetUsedPercent = calculatePercent()
  // let budgetTotal = calculateBudgetTotal()
  return (
    <>
      <View style={styles.budgetDetails}>
          <View style={styles.budgetDetailsTextContainer}>
              <View style={styles.budgetDetailsTextContainerLeft}>
                  <Text style={styles.budgetTitle}>Budget</Text>
                  {props.budgetUsedPercent < 100 ? <Text style={{color: "#223252"}}>{`Used ${props.budgetUsedPercent.toFixed()}%`}</Text>
                  : <Text style={{color: "#b31515"}}>{`Used ${props.budgetUsedPercent}%`}</Text>}
              </View>
              <Text style={styles.budgetTotal}>{props.budget}</Text>
          </View>
          {props.budgetUsedPercent < 100 ? <View style={[styles.budgetBar, styles.spent, {width: `${props.budgetUsedPercent.toFixed()}%`}]}></View> 
          :  <View style={[styles.budgetBar, styles.spent, {width: `100%`, backgroundColor: "#b31515"}]}></View>}
          <View style={[styles.budgetBar, styles.total]}></View>
      </View>
      {props.isSeeDetails ? <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={props.openAddIncomeModal}>
          <Text style={styles.btnText}>Add Income</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Full Details</Text>
        </TouchableOpacity>
      </View> : null}
  </>
  )
}

export default BudgetCardBudget

const styles = StyleSheet.create({
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
        paddingBottom: 10,
        color: "#223252",
      },
      budgetSupTitle: {
        paddingBottom: 5,
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
      error: {
        backgroundColor: "#b31515",
      },
      btnContainer: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        marginBottom: 10,
      },
      btn: {
        backgroundColor: "#223252",
        borderRadius: 250,
        paddingHorizontal: 16,
        paddingTop: 2,
        paddingBottom: 4,
        shadowColor: "black",
        elevation: 3,
      },
      btnText: {
          color: "#ced4d2",
          fontWeight: "bold",
      },
})