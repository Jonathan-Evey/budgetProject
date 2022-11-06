import {StyleSheet, Modal, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {doc, getDoc} from 'firebase/firestore/lite';
import {auth, db} from '../firebase';
import MainNav from '../component/MainNav';
import BudgetCard from '../component/BudgetCard';
import StartBudgetModal from '../component/StartBudgetModal';
import AddIncomeModal from '../component/AddIncomeModal';
import AddExpenseModal from '../component/AddExpenseModal';

const HomeScreen = ({navigation}) => {
  const [userData, setUsereData] = useState(null);
  const [updateUserData, setUpdateUserData] = useState(false);
  const [totalBudgetAmount, setTotalBudgetAmount] = useState(null);
  const [isAdditionalIncome, setIsAdditionalIncome] = useState(false);
  const [currentPaidExpenses, setCurrentPaidExpense] = useState(null);
  const [budgetUsedPercent, setBudgetUsedPercent] = useState(null);

  //-----------------main nav state----------------------//
  const [isMainNavOpen, setIsMainNavOpen] = useState(false);

  //-----------------------modal states----------------------//
  const [modalVisible, setModalVisible] = useState(false);
  const [isNewBudgetModal, setIsNewBudgetModal] = useState(false);
  const [isLogExpenseModal, setIsLogExpenseModal] = useState(false);
  const [isAddIncomeModal, setIsAddIncomeModal] = useState(false);

  const checkBudget = () => {
    console.log(userData);
  };

  //------Set up a new budget modal after first log in-----//
  const openBudgetModal = () => {
    setIsNewBudgetModal(true);
    setModalVisible(true);
  };
  const closeBudgetModal = () => {
    setIsNewBudgetModal(false);
    setModalVisible(false);
  };

  const openLogExpenseModal = () => {
    setIsLogExpenseModal(true);
    setModalVisible(true);
  };
  const closeLogExpenseModal = () => {
    setIsLogExpenseModal(false);
    setModalVisible(false);
  };

  const openAddIncomeModal = () => {
    setIsAddIncomeModal(true);
    setModalVisible(true);
  };
  const closeAddIncomeModal = () => {
    setIsAddIncomeModal(false);
    setModalVisible(false);
  };

  const setBudgetData = budgetData => {
    if (budgetData.additionalIncome) {
      let date = new Date();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      console.log(budgetData);
      console.log(budgetData.additionalIncome.month);
      console.log(budgetData.additionalIncome.year);
      if (
        budgetData.additionalIncome.month === month &&
        budgetData.additionalIncome.year === year
      ) {
        let budgetTotal =
          budgetData.additionalIncome.amount + budgetData.mainBudget;
        setIsAdditionalIncome(true);
        setTotalBudgetAmount(budgetTotal);
        checkBudgetUsedPercent(budgetTotal);
      } else {
        setTotalBudgetAmount(budgetData.mainBudget);
        checkBudgetUsedPercent(budgetData.mainBudget);
        return setIsAdditionalIncome(false);
      }
    } else {
      setTotalBudgetAmount(budgetData.mainBudget);
      checkBudgetUsedPercent(budgetData.mainBudget);
      return setIsAdditionalIncome(false);
    }
  };

  const checkForExpenses = data => {
    return setCurrentPaidExpense(data);
  };

  const checkBudgetUsedPercent = total => {
    let percent = (700 / total) * 100;
    return setBudgetUsedPercent(percent);
  };

  const checkForData = async () => {
    let docRef = doc(db, 'users', auth.currentUser.uid);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      setBudgetData(data);
      return setUsereData(data);
    } else {
      console.log('No such document!');
    }
  };

  const backToLanding = () => {
    navigation.replace('Landing');
  };

  useEffect(() => {
    checkForData();
  }, [updateUserData]);

  return (
    <View style={styles.container}>
      <View style={styles.userNav}>
        <Text style={styles.userName}>Allotment</Text>
        <TouchableOpacity
          style={styles.userMainMenu}
          onPress={() => {
            setIsMainNavOpen(!isMainNavOpen);
          }}>
          <View style={[styles.bar, styles.midBar]}></View>
          <View style={[styles.bar, styles.longBar]}></View>
          <View style={[styles.bar, styles.shortBar]}></View>
        </TouchableOpacity>
      </View>
      {/* <BudgetCard budget={0} openBudgetModal={openBudgetModal} /> */}
      {userData ? (
        <BudgetCard
          userData={userData}
          isAdditionalIncome={isAdditionalIncome}
          budgetUsedPercent={budgetUsedPercent}
          budget={totalBudgetAmount}
          openBudgetModal={openBudgetModal}
          openLogExpenseModal={openLogExpenseModal}
          openAddIncomeModal={openAddIncomeModal}
        />
      ) : null}
      <TouchableOpacity onPress={checkBudget}>
        <Text>Add</Text>
      </TouchableOpacity>

      <Modal animationType="fade" visible={modalVisible} transparent={true}>
        <View style={styles.bgModal}></View>
      </Modal>
      <Modal
        style={styles.modal}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeBudgetModal}
        transparent={true}>
        {isNewBudgetModal ? (
          <StartBudgetModal closeBudgetModal={closeBudgetModal} />
        ) : null}
        {isLogExpenseModal ? (
          <AddExpenseModal
            closeLogExpenseModal={closeLogExpenseModal}
            setUpdateUserData={setUpdateUserData}
            updateUserData={updateUserData}
          />
        ) : null}
        {isAddIncomeModal ? (
          <AddIncomeModal
            isAdditionalIncome={isAdditionalIncome}
            userData={userData}
            closeAddIncomeModal={closeAddIncomeModal}
            setUpdateUserData={setUpdateUserData}
            updateUserData={updateUserData}
          />
        ) : null}
      </Modal>
      <MainNav isMainNavOpen={isMainNavOpen} backToLanding={backToLanding} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EAF1EE',
  },
  userNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '10%',
    width: '100%',
    paddingHorizontal: 25,
  },
  userMainMenu: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    height: 50,
    width: 50,
    zIndex: 4,
  },
  bar: {
    height: 4,
    backgroundColor: '#DE2555',
    borderRadius: 250,
  },
  shortBar: {
    width: '55%',
  },
  midBar: {
    width: '75%',
  },
  longBar: {
    width: '95%',
  },
  userName: {
    color: '#223252',
    fontWeight: 'bold',
    fontSize: 32,
  },
  bgModal: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    opacity: 0.85,
    zIndex: 5,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    zIndex: 6,
  },
});
