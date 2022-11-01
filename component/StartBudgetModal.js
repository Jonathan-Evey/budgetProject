import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const StartBudgetModal = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.backDrop}></View>
      <View style={styles.budgetFormContainer}>
        <TouchableOpacity onPress={props.closeBudgetModal}>
            <Text>Close</Text>
        </TouchableOpacity>
        <Text>StartBudgetModal</Text>
      </View>
    </View>
  )
}

export default StartBudgetModal

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    backDrop: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        opacity: 0.75,
    },
    budgetFormContainer: {
        width: "85%",
        height: "90%",
        backgroundColor: "#EAF1EE",
        opacity: 1,
    }
})