import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../firebase'
import React, {useState, useEffect } from 'react'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isSignedIn, setIsSignedIn] = useState(false)

  const signInUser = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      console.log(result)
      setIsSignedIn(true)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    if(isSignedIn) {
        navigation.replace("Home")
    }
  }, [isSignedIn])

  return (
    <KeyboardAvoidingView style={styles.container}>

        <View style={styles.containerHalf}>
            <Text style={styles.title}>Welcome back!</Text>
            <Text style={styles.subTitle}>Please sign in to continue your buget and saving journey with Allotment.</Text>
        </View>
      
      <View style={[styles.containerHalf, styles.marginTop50]}>
        <TextInput 
            style={styles.textInput}
            placeholder='Email' 
            value={email} 
            onChangeText={text => setEmail(text)} 
        />
        <TextInput 
            style={styles.textInput}
            placeholder='Password' 
            value={password} 
            onChangeText={text => setPassword(text)} 
            secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={signInUser}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton}>
            <Text style={styles.resetText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#EAF1EE",
    },
    containerHalf: {
        flex: 0.5,
        width: "80%",
        justifyContent: "center",
    }, 
    title: {
        color: "#223252",
        fontWeight: "bold",
        fontSize: 32,
    },
    subTitle: {
        color: "#223252",
        fontSize: 16,
    },
    textInput: {
        borderBottomWidth: 2,
        borderBottomColor: "#223252",
        color: "#223252",
        fontSize: 24,
    },
    button: {
        justifyContent: "center",
        backgroundColor: "#B58C7E",
        alignSelf: "center",
        width: "90%",
        paddingVertical: 5,
        borderColor: "#223252",
        borderWidth: 1.5,
        borderRadius: 12.5,
        marginTop: 50,
    },
    buttonText: {
        color: "#EAF1EE",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    resetButton: {
        alignSelf: "flex-end",
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 8,
    },
    resetText: {
        color: "#223252",
        fontSize: 12,
    },
    marginTop50: {
        marginTop: 50,
    }
})