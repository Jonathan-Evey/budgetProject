import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {doc, updateDoc} from 'firebase/firestore/lite';
import {auth, db} from '../firebase';
import CloseBtn from '../utility/CloseBtn';

const AddIncomeModal = props => {
  const [ifAdditionalIncome, setIfAdditionalIncome] = useState(
    `${props.userData.additionalIncome.amount}`,
  );
  const [additionalIncome, setAdditionalIncome] = useState('');
  const [noAdditionalIncomeAddedError, setNoAdditionalIncomeAddedError] =
    useState(false);

  const validateData = () => {
    if (props.isAdditionalIncome) {
      if (ifAdditionalIncome !== '') {
        let date = new Date();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let amount = parseInt(ifAdditionalIncome);
        saveAdditionalIncome(auth.currentUser.uid, amount, month, year);
        props.setUpdateUserData(!props.updateUserData);
        props.closeAddIncomeModal();
      } else {
        return setNoAdditionalIncomeAddedError(true);
      }
    } else {
      if (additionalIncome !== '') {
        let date = new Date();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let amount = parseInt(additionalIncome);
        saveAdditionalIncome(auth.currentUser.uid, amount, month, year);
        props.setUpdateUserData(!props.updateUserData);
        props.closeAddIncomeModal();
      } else {
        return setNoAdditionalIncomeAddedError(true);
      }
    }
  };

  const saveAdditionalIncome = async (
    userID,
    amountData,
    monthData,
    yearData,
  ) => {
    await updateDoc(doc(db, 'users', userID), {
      additionalIncome: {amount: amountData, month: monthData, year: yearData},
    })
      .then(() => {
        console.log('data added');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.incomeFormContainer}>
        <View style={styles.flexEnd}>
          <CloseBtn closeProp={props.closeAddIncomeModal} />
        </View>
        <Text>Add Extra Income to Budget</Text>
        <View>
          <Text>Amount of extra income for this month's budget</Text>
          {props.isAdditionalIncome ? (
            <TextInput
              keyboardType="numeric"
              value={ifAdditionalIncome}
              onChangeText={text =>
                setIfAdditionalIncome(text.replace(/[^0-9]/g, ''))
              }
            />
          ) : (
            <TextInput
              keyboardType="numeric"
              value={additionalIncome}
              onChangeText={text =>
                setAdditionalIncome(text.replace(/[^0-9]/g, ''))
              }
            />
          )}

          {noAdditionalIncomeAddedError ? (
            <Text>Please add the amount of extra income for this month</Text>
          ) : null}
        </View>
        <TouchableOpacity onPress={validateData}>
          <Text>Save Budget</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddIncomeModal;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  incomeFormContainer: {
    width: '85%',
    height: '90%',
    backgroundColor: '#EAF1EE',
    opacity: 1,
  },
  flexEnd: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
