import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { doc, setDoc } from "firebase/firestore/lite"
import AddBillConponent from "./AddBillConponent"
import { auth, db } from "../firebase";

const StartBudgetModal = (props) => {
  const [mainBudget, setMainBudget] = useState("")
  const [additionalIncome, setAdditionalIncome] = useState("")
  //const [monthlyBillAmount, setMonthlyBillAmount] = useState("")

  const [addMainBudgetError, setAddMainBudgetError] = useState(false)
  const [addAdditionalIncomeError, setAddAdditionalIncomeError] = useState(false)

  const [addAdditionalIncome, setAddAdditionalIncome] = useState(false)
  //const [addMonthlyBills, setAddMonthlyBills] = useState(false)

  const checkData = () => {
    if (mainBudget !== "") {
      if(addAdditionalIncome) {
        setAddMainBudgetError(false)
        if(additionalIncome !== "") {
          let date = new Date()
          let month = date.getMonth() + 1;
          let year = date.getFullYear()
          console.log("Send Monthly Data")
          console.log("Send One Time Add Data")
          return saveBudgetDataAdditionalIncome(auth.currentUser.uid, month, year)
        } else {
          console.log("Add One Time")
          return setAddAdditionalIncomeError(true)
        }
      } else {
        console.log("Send Monthly Data")
        return saveBudgetData(auth.currentUser.uid)
      }
    } else {
      console.log("Add Monthly")
      return setAddMainBudgetError(true)
    }
  }

  const saveBudgetData = async (userID) => {
    await setDoc(doc(db, 'users', userID), {
      mainBudget: parseInt(mainBudget)
    }).then(() => {
      console.log("data added")
    }).catch((error) =>  {
      console.log(error)
    })
  }
  const saveBudgetDataAdditionalIncome = async (userID, monthData, yearData) => {
    await setDoc(doc(db, 'users', userID), {
      mainBudget: parseInt(mainBudget), 
      additionalIncome: {amount: parseInt(additionalIncome), month: monthData, year: yearData }
    }).then(() => {
      console.log("data added")
    }).catch((error) =>  {
      console.log(error)
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.budgetFormContainer}>
        <TouchableOpacity onPress={props.closeBudgetModal}>
            <Text>Close</Text>
        </TouchableOpacity>
        <Text>Start your plan</Text>
        <View>
          <Text>Set your fixed amount for each month</Text>
          <TextInput value={mainBudget} onChangeText={text => setMainBudget(text)}/>
          {addMainBudgetError ? <Text>Please add your budget amount</Text> : null}
        </View>
        {addAdditionalIncome ? 
        <View>
          <TouchableOpacity onPress={() => setAddAdditionalIncome(!addAdditionalIncome)}>
            <Text>X</Text>
          </TouchableOpacity>
          <Text>Add to this month's budget</Text>
          <TextInput value={additionalIncome} onChangeText={text => setAdditionalIncome(text)}/>
          {addAdditionalIncomeError ? <Text>Please include the amount to add</Text> : null}
        </View> : 
        <TouchableOpacity onPress={() => setAddAdditionalIncome(!addAdditionalIncome)}>
          <Text>Add extra income to budget this month</Text>
        </TouchableOpacity>}
        {/* {addMonthlyBills ? 
        <AddBillConponent setAddMonthlyBills={setAddMonthlyBills} monthlyBill={monthlyBill} setMonthlyBill={setMonthlyBill}/> : 
        <TouchableOpacity onPress={() => setAddMonthlyBills(!addMonthlyBills)}>
          <Text>Add your first monthly bill</Text>
        </TouchableOpacity>} */}
        <TouchableOpacity onPress={checkData}>
          <Text>Save Budget</Text>
        </TouchableOpacity>
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
    budgetFormContainer: {
        width: "85%",
        height: "90%",
        backgroundColor: "#EAF1EE",
        opacity: 1,
    }
})