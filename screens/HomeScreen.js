import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { doc, getDoc } from "firebase/firestore/lite"
import { auth, db } from '../firebase'

const HomeScreen = ({ navigation }) => {

  const [userData, setUsereData] = useState(null)

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
  
  useEffect(() => {
    const checkForData = async () => {
      let docRef = doc(db, "users", auth.currentUser.uid);
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return setUsereData(docSnap.data())
      } else {
        console.log("No such document!");
      }
    }
    checkForData()
  }, [])

  return (
    <View style={styles.container}>
      <Text> Welcome, {auth.currentUser.displayName ? auth.currentUser.displayName : null}</Text>
      {userData ? <Text style={styles.budget}>{userData.budget}</Text> : null}
      <TouchableOpacity 
        onPress={checkBudget}
      ><Text>Add</Text></TouchableOpacity>

      <TouchableOpacity 
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign Out</Text> 
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    budget: {
      backgroundColor: "red",
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
})