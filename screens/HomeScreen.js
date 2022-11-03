import { StyleSheet, Modal, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { doc, getDoc } from "firebase/firestore/lite"
import { auth, db } from '../firebase'
import BudgetCard from "../component/BudgetCard"
import StartBudgetModal from '../component/StartBudgetModal'
import AddIncomeModal from '../component/AddIncomeModal'

const HomeScreen = ({ navigation }) => {

  const [userData, setUsereData] = useState(null)
  const [updateUserData, setUpdateUserData] = useState(false)
  const [isAdditionalIncome, setIsAdditionalIncome] = useState(false)
  const [totalBudgetAmount, setTotalBudgetAmount] = useState(null);
  const [isNewBudgetModal, setIsNewBudgetModal] = useState(false);
  const [isAddIncomeModal, setIsAddIncomeModal] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPaidExpenses, setCurrentPaidExpense] = useState(null)
  const [budgetUsedPercent, setBudgetUsedPercent] = useState(null)

  const handleSignOut = () => {
      auth.signOut(auth)
      .then(() => {
          navigation.replace("Landing")
      })
      .catch(error => alert(error.message))
  }
  
  const checkBudget = () => {
    console.log(userData)
  }

  const openAddIncomeModal = () => {
    setIsAddIncomeModal(true)
    setModalVisible(true)
  }
  const closeAddIncomeModal = () => {
    setIsAddIncomeModal(false)
    setModalVisible(false)
  }

  const openBudgetModal = () => {
    setIsNewBudgetModal(true)
    setModalVisible(true)
  }
  const closeBudgetModal = () => {
    setIsNewBudgetModal(false)
    setModalVisible(false)
  }

  const setBudgetData = (budgetData) => {
    let date = new Date()
    let month = date.getMonth() + 1;
    let year = date.getFullYear()
    console.log(budgetData)
    console.log(budgetData.additionalIncome.month)
    console.log(budgetData.additionalIncome.year)
    if (budgetData.additionalIncome.month === month && budgetData.additionalIncome.year === year) {
      let budgetTotal = budgetData.additionalIncome.amount + budgetData.mainBudget
      setIsAdditionalIncome(true)
      setTotalBudgetAmount(budgetTotal)
      checkBudgetUsedPercent(budgetTotal)
    } else {
      setTotalBudgetAmount(budgetData.mainBudget)
      checkBudgetUsedPercent(budgetData.mainBudget)
      return setIsAdditionalIncome(false)
    }
  }

  const checkForExpenses = (data) => {
    return setCurrentPaidExpense(data)
  } 

  const checkBudgetUsedPercent = (total) => {
    let percent = (700 / total) * 100
    return setBudgetUsedPercent(percent)
  }

  const checkForData = async () => {
    let docRef = doc(db, "users", auth.currentUser.uid);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data()
      setBudgetData(data)
      return setUsereData(data)
    } else {
      console.log("No such document!");
    }
  }
  
  useEffect(() => {
    checkForData()
  }, [updateUserData])


  return (
    <View style={styles.container}>
      <View style={styles.userNav}>
        <Text style={styles.userName}>Allotment</Text>
        <TouchableOpacity 
          style={styles.userMainMenu}
        >
          <View style={[styles.bar, styles.midBar]}></View>
          <View style={[styles.bar, styles.longBar]}></View>
          <View style={[styles.bar, styles.shortBar]}></View>
        </TouchableOpacity>
      </View>
      {/* <BudgetCard budget={0} openBudgetModal={openBudgetModal} /> */}
      {userData ? <BudgetCard userData={userData} isAdditionalIncome={isAdditionalIncome} budgetUsedPercent={budgetUsedPercent} budget={totalBudgetAmount} openBudgetModal={openBudgetModal} openAddIncomeModal={openAddIncomeModal} /> : null}
      <TouchableOpacity 
        onPress={checkBudget}
      ><Text>Add</Text></TouchableOpacity>

      <TouchableOpacity 
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign Out</Text> 
      </TouchableOpacity>
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        
      >
       <View style={styles.bgModal}></View> 
      </Modal>
      <Modal
        style={styles.modal}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeBudgetModal}
        transparent={true}
      >
        {isNewBudgetModal ? <StartBudgetModal closeBudgetModal={closeBudgetModal} /> : null}
        {isAddIncomeModal ? <AddIncomeModal isAdditionalIncome={isAdditionalIncome} userData={userData} closeAddIncomeModal={closeAddIncomeModal} setUpdateUserData={setUpdateUserData} updateUserData={updateUserData}/> : null}
      </Modal>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#EAF1EE",
    },
    userNav: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: "10%",
      width: "100%",
      paddingHorizontal: 25,
    },
    userMainMenu: {
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "flex-end",
      height: 50,
      width: 50,
    },
    bar: {
      height: 4, 
      backgroundColor: "#DE2555",
      borderRadius: 250,
    },
    shortBar: {
      width: "55%",
    },
    midBar: {
      width: "75%",
    },
    longBar: {
      width: "95%",
    },
    userName: {
      color: "#223252",
      fontWeight: "bold",
      fontSize: 32,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    bgModal: {
      height: "100%",
      width: "100%",
      backgroundColor: "black",
      opacity: 0.85,
      zIndex: 1,
    },
    modal:{
      justifyContent: "center",
      alignItems: 'center',
      backgroundColor: "black",
      zIndex: 2,
    },
})