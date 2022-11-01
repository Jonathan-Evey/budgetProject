import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const BudgetComponent = (props) => {
    let componentType = {
        budget: "budget",
        spent: "spent",
      }

    const [budgetUsedPercent, setBudgetUsedPercent] = useState()
    

    useEffect(() => {
        setBudgetUsedPercent((500 / props.budget) * 100)
    }, [])
    

  return (
    <>
    {props.componentType === componentType.budget ? 
    <View style={styles.budgetDetails}>
        <View style={styles.budgetDetailsTextContainer}>
            <View style={styles.budgetDetailsTextContainerLeft}>
                <Text style={styles.budgetTitle}>Budget</Text>
                {/* <Text style={{color: "#223252"}}>{`Used ${500} of`}</Text> */}
            </View>
            <Text style={styles.budgetTotal}>{props.budget}</Text>
        </View>
        {budgetUsedPercent ? <View style={[styles.budgetBar, styles.spent, {width: `${budgetUsedPercent}%`}]}></View> : null}
        <View style={[styles.budgetBar, styles.total]}></View>
    </View>
    : null}
    {props.componentType === componentType.spent ? 
    <View style={styles.budgetDetails}>
        <View style={styles.budgetDetailsTextContainer}>
            
            <Text style={[styles.budgetTitle, styles.budgetSupTitle, {marginTop: 10,}]}>Spent</Text>
            {/* <Text style={{color: "#223252"}}>{`Already spent ${props.spent} of`}</Text> */}
            
            <Text style={[styles.budgetTotal]}>{props.spent}</Text>
        </View>
        {props.spentPercent ? <View style={[styles.budgetBar, styles.spent, {width: `${props.spentPercent}%`}]}></View> : null}
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
        alignSelf: "flex-end",
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
})