import {StyleSheet, Modal, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  setDoc,
} from 'firebase/firestore/lite';
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
  const [spentPercent, setSpentPercent] = useState(null);
  const [spentOverBudget, setSpentOverBudget] = useState(null);

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
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentMonthExpenseData = checkForCurrentMonthExpenses(
      budgetData,
      month,
      year,
    );
    if (budgetData.additionalIncome) {
      if (
        budgetData.additionalIncome.month === month &&
        budgetData.additionalIncome.year === year
      ) {
        let budgetTotal =
          budgetData.additionalIncome.amount + budgetData.mainBudget;
        setIsAdditionalIncome(true);
        setTotalBudgetAmount(budgetTotal);
        checkBudgetUsedPercent(budgetTotal, currentMonthExpenseData);
      } else {
        setTotalBudgetAmount(budgetData.mainBudget);
        checkBudgetUsedPercent(budgetData.mainBudget, currentMonthExpenseData);
        return setIsAdditionalIncome(false);
      }
    } else {
      setTotalBudgetAmount(budgetData.mainBudget);
      checkBudgetUsedPercent(budgetData.mainBudget, currentMonthExpenseData);
      return setIsAdditionalIncome(false);
    }
  };

  const checkForCurrentMonthExpenses = (data, month, year) => {
    if (data.expenses) {
      if (objKeyValues(data.expenses, `${year}`)) {
        if (objKeyValues(data.expenses[year], `${month}`)) {
          let total = 0;
          data.expenses[year][month].map(each => {
            total = total + Number(each.expenseAmount.replace(/,/g, ''));
          });
          setCurrentPaidExpense(total);
          return total;
        }
      }
    }
    setCurrentPaidExpense(0);
    return 0;
  };

  const checkBudgetUsedPercent = (total, expenses) => {
    let percent = (expenses / total) * 100;
    let spentPercent = (expenses / total) * 100;
    let amountOverBudget = expenses - total;
    setSpentOverBudget(amountOverBudget);
    setSpentPercent(spentPercent);
    return setBudgetUsedPercent(percent);
  };

  const checkForData = async () => {
    let docRef = doc(db, 'users', auth.currentUser.uid);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      setBudgetData(data);
      console.log('data updated');
      return setUsereData(data);
    } else {
      console.log('No such document!');
    }
  };

  const objKeyValues = (obj, value) => {
    return Object.keys(obj).find(key => key === value);
  };

  const formatExpenceObj = (monthData, yearData, newObj) => {
    if (userData.expenses) {
      if (objKeyValues(userData.expenses, `${yearData}`)) {
        if (objKeyValues(userData.expenses[yearData], `${monthData}`)) {
          let currentData = userData.expenses;
          let currentYearData = userData.expenses[yearData];
          let currentMonthData = userData.expenses[yearData][monthData];
          return {
            ...currentData,
            [yearData]: {
              ...currentYearData,
              [monthData]: [newObj, ...currentMonthData],
            },
          };
        } else {
          let currentData = userData.expenses;
          let currentYearData = userData.expenses[yearData];
          return {
            ...currentData,
            [yearData]: {...currentYearData, [monthData]: [newObj]},
          };
        }
      } else {
        let currentData = userData.expenses;
        let newMonthData = {[monthData]: [newObj]};
        return {...currentData, [yearData]: newMonthData};
      }
    } else {
      let newMonthData = {[monthData]: [newObj]};
      return {[yearData]: newMonthData};
    }
  };

  const saveExpense = async (
    amountData,
    monthData,
    dayData,
    yearData,
    category,
    descriptionData,
  ) => {
    let fullDate = `${monthData}${dayData}${yearData}`;
    let newObj = {
      date: Number(fullDate),
      expenseAmount: amountData,
      expenseName: category,
      description: descriptionData,
    };
    let newExpenceObj = formatExpenceObj(monthData, yearData, newObj);

    await setDoc(
      doc(db, 'users', auth.currentUser.uid),
      {
        expenses: newExpenceObj,
      },
      {merge: true},
    )
      .then(() => {
        setUpdateUserData(!updateUserData);
        console.log('data added');
      })
      .catch(error => {
        console.log(error);
      });
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
          spentPercent={spentPercent}
          spentOverBudget={spentOverBudget}
          budget={totalBudgetAmount}
          currentPaidExpenses={currentPaidExpenses}
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
            saveExpense={saveExpense}
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
    alignItems: 'center',
    zIndex: 6,
  },
});
