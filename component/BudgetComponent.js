import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const BudgetComponent = (props) => {
    let componentType = {
        budget: "budget",
        spent: "spent",
      }

    const [budgetUsedPercent, setBudgetUsedPercent] = useState()
      


    useEffect(() => {
        setBudgetUsedPercent((700 / props.budget) * 100)
    }, [])
    

  return (
    <>
    {props.componentType === componentType.budget ? 
    <View style={styles.budgetDetails}>
        <View style={styles.budgetDetailsTextContainer}>
            <View style={styles.budgetDetailsTextContainerLeft}>
                <Text style={styles.budgetTitle}>Budget</Text>
                {budgetUsedPercent < 100 ? <Text style={{color: "#223252"}}>{`Used ${budgetUsedPercent}%`}</Text>
                : <Text style={{color: "#b31515"}}>{`Used ${budgetUsedPercent}%`}</Text>}
            </View>
            <Text style={styles.budgetTotal}>{props.budget}</Text>
        </View>
        {budgetUsedPercent < 100 ? <View style={[styles.budgetBar, styles.spent, {width: `${budgetUsedPercent}%`}]}></View> 
        :  <View style={[styles.budgetBar, styles.spent, {width: `100%`, backgroundColor: "#b31515"}]}></View>}
        <View style={[styles.budgetBar, styles.total]}></View>
    </View>
    : null}
    {props.componentType === componentType.spent ? 
    <View style={styles.budgetDetails}>
        <View style={styles.budgetDetailsTextContainer}>
          <View style={styles.budgetDetailsTextContainerLeft}>
            <Text style={[styles.budgetTitle, styles.budgetSupTitle, {marginTop: 10,}]}>Spent</Text>
            {props.spentPercent > 100 ? <Text style={{color: "#b31515"}}>{`You are ${props.spentOverBudget} over budget`}</Text> : null}
          </View>
          <Text style={[styles.budgetTotal]}>{props.spent}</Text>
        </View>
        {props.spentPercent < 100 ? <View style={[styles.budgetBar, styles.spent, {width: `${props.spentPercent}%`}]}></View> 
        : <View style={[styles.budgetBar, styles.spent, {width: `100%`, backgroundColor: "#b31515"}]}></View>}
        <View style={[styles.budgetBar, styles.total] }></View>
    </View>
    : null}
    </>
  )
}

export default BudgetComponent

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
      }
})