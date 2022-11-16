import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth, db} from '../firebase';
import {doc, setDoc} from 'firebase/firestore/lite';
import React, {useState, useEffect} from 'react';

const SignupScreen = ({navigation}) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordrror] = useState(false);

  const validateInputs = () => {
    validUserName();
    validEmail();
    validPassword();
    validConfirmPassword();
    return checkIfValidToRegister();
  };

  const validUserName = () => {
    if (userName.length < 3) {
      setNameError(true);
      return false;
    } else {
      setNameError(false);
      return true;
    }
  };

  const validEmail = () => {
    const emailRegex = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
    );
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return false;
    } else {
      setEmailError(false);
      return true;
    }
  };

  const validPassword = () => {
    if (password.length < 8) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
      return true;
    }
  };

  const validConfirmPassword = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordrror(true);
      return false;
    } else {
      setConfirmPasswordrror(false);
      return true;
    }
  };

  const checkIfValidToRegister = () => {
    if (validUserName()) {
      if (validEmail()) {
        if (validPassword()) {
          if (validConfirmPassword()) {
            return registerUser();
          }
        }
      }
    }
    return;
  };

  const registerUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log(auth.currentUser.uid);
        setNewUserDb(auth.currentUser.uid);
        setIsNewUser(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const setDisplayName = () => {
    updateProfile(auth.currentUser, {
      displayName: userName,
    })
      .then(() => {
        navigation.replace('Home');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const setNewUserDb = async userID => {
    await setDoc(doc(db, 'users', userID), {
      mainBudget: 0,
    })
      .then(() => {
        console.log('data added');
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isNewUser === true) {
      setDisplayName();
    }
  }, [isNewUser]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subTitle}>
          Please fill in the details below to start your buget and saving
          journey with Allotment.
        </Text>
      </View>
      <View style={styles.subContainer}>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="User Name"
            value={userName}
            onChangeText={text => setUserName(text)}
          />
          {nameError ? (
            <Text style={styles.error}>
              Name must be at least three characters
            </Text>
          ) : null}
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          {emailError ? (
            <Text style={styles.error}>Please enter a valid Email address</Text>
          ) : null}
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          {passwordError ? (
            <Text style={styles.error}>
              Password must be at least eight characters
            </Text>
          ) : null}
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry
          />
          {confirmPasswordError ? (
            <Text style={styles.error}>Passwords must match</Text>
          ) : null}
        </View>
        <TouchableOpacity style={styles.button} onPress={validateInputs}>
          <Text style={styles.buttonText}>Create account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EAF1EE',
  },
  subContainer: {
    flex: 0.5,
    width: '80%',
    justifyContent: 'center',
  },
  title: {
    color: '#223252',
    fontWeight: 'bold',
    fontSize: 36,
  },
  subTitle: {
    color: '#223252',
    paddingTop: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  textInput: {
    position: 'relative',
    borderBottomWidth: 2,
    borderBottomColor: '#223252',
    color: '#223252',
    fontSize: 24,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#B58C7E',
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 5,
    borderColor: '#223252',
    borderWidth: 1.5,
    borderRadius: 12.5,
    marginTop: 25,
  },
  buttonText: {
    color: '#EAF1EE',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  error: {
    position: 'absolute',
    bottom: -16,
    color: 'red',
  },
});
