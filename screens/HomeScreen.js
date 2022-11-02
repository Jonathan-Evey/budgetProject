import { StyleSheet, Modal, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { doc, getDoc } from "firebase/firestore/lite"
import { auth, db } from '../firebase'
import BudgetCard from "../component/BudgetCard"
import StartBudgetModal from '../component/StartBudgetModal'

const HomeScreen = ({ navigation }) => {

  const [userData, setUsereData] = useState(null)
  const [totalBudgetAmount, setTotalBudgetAmount] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const openBudgetModal = () => {
    setModalVisible(true)
  }
  const closeBudgetModal = () => {
    setModalVisible(false)
  }

  const checkForExtraIncome = (budgetData) => {
    let date = new Date()
    let month = date.getMonth() + 1;
    let year = date.getFullYear()
    console.log(budgetData)
    console.log(budgetData.additionalIncome.month)
    console.log(budgetData.additionalIncome.year)
    if (budgetData.additionalIncome.month === month && budgetData.additionalIncome.year === year) {
      setTotalBudgetAmount(budgetData.additionalIncome.amount + budgetData.main)
    } else {
      return setTotalBudgetAmount(budgetData.main)
    }
  }
  
  useEffect(() => {
    const checkForData = async () => {
      let docRef = doc(db, "users", auth.currentUser.uid);
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let data = docSnap.data()
        checkForExtraIncome(data.budget)
        return setUsereData(data)
      } else {
        console.log("No such document!");
      }
    }
    checkForData()
  }, [])

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
      {userData ? <BudgetCard budget={totalBudgetAmount} openBudgetModal={openBudgetModal} /> : null}
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
        style={styles.modal}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeBudgetModal}
        transparent={true}
      >
        <StartBudgetModal closeBudgetModal={closeBudgetModal} />
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
    modal:{
      justifyContent: "center",
      alignItems: 'center',
      backgroundColor: "black",
    },
})