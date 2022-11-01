import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}></View>
        <Text style={styles.logoText}>Allotment</Text>
        <View style={styles.message}></View>
        <Text style={styles.messageText}>Home of your budget and saving plans</Text>


      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={[styles.button, styles.buttonAccent]}
        onPress={() => navigation.navigate('Sign Up')}
      >
          <Text style={[styles.buttonText, styles.buttonAccentText]}>Get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LandingScreen

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'space-around',
    backgroundColor: "#EAF1EE",
   },
   logoContainer: {
    position: 'relative',
    flex: 0.6,
    width: "80%",
    alignItems: 'center', 
    justifyContent: 'center',
   },
   logo: {
    position: 'absolute',
    backgroundColor: '#223252',
    height: 105,
    width: 100,
    borderRadius: 250,
    transform: [{ scaleX: 1.75 }, {translateY: -60},  {translateX: -50}],
    zIndex: 1,
   },
  logoText: {
    position: 'absolute',
    color: "#EAF1EE",
    fontSize: 30, 
    fontWeight: "bold", 
    transform: [{translateY: -62.5},  {translateX: -90}],
    zIndex: 2,
  },
  message: {
    position: 'absolute',
    height: 180,
    width: 175,
    backgroundColor: '#B58C7E',
    borderRadius: 250,
    transform: [{ scaleX: 1.75 }],
  },
  messageText: {
    position: 'absolute',
    color: "#EAF1EE",
    fontSize: 24, 
    fontWeight: "bold", 
    textAlign: "center",
    paddingTop: 50,
    paddingHorizontal: 25,
  },
  btnContainer: {
    width: "70%",
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#EAF1EE",
    paddingVertical: 5,
    borderColor: "#223252",
    borderWidth: 1.5,
    borderRadius: 12.5,
  },
  buttonAccent: {
    marginTop: 10,
    backgroundColor: "#B58C7E",
    borderColor: "#223252",
  },
  buttonText: {
    color: "#223252",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  buttonAccentText: {
    color: "#EAF1EE",
  }
})