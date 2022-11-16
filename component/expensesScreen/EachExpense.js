import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {doc, setDoc} from 'firebase/firestore/lite';
import {auth, db} from '../../firebase';
import formatExpenseInput from '../../functions/formatNumericInput';
import ExpenseCategoryContainer from '../modals/ExpenseCategoryContainer';
import AmountInput from '../../utility/AmountInput';

const EachExpense = ({
  userData,
  year,
  month,
  data,
  updateUserData,
  setUpdateUserData,
  deleteExpense,
  isEdit,
  isDelete,
}) => {
  const [isExpenseOnEdit, setIsExpenseOnEdit] = useState(false);
  const [isExpenseOnDelete, setIsExpenseOnDelete] = useState(false);
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseAmountText, setExpenseAmountText] = useState('');
  const [ifEditCancelAmount, setIfEditCancelAmount] = useState('');
  const [expenseDayText, setExpenseDayText] = useState('');
  const [expenseDescriptionText, setExpenseDescriptionText] = useState('');
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);

  const [noExpenseAmountError, setNoExpenseAmountError] = useState(false);

  const formatDate = (monthData, dateData) => {
    if (monthData > 9) {
      if (dateData.toString().length === 8) {
        return `${dateData.toString().split('')[2]}${
          dateData.toString().split('')[3]
        }`;
      }
      if (dateData.toString().length === 7) {
        return `${dateData.toString().split('')[2]}`;
      }
    } else {
      if (dateData.toString().length === 7) {
        return `${dateData.toString().split('')[1]}${
          dateData.toString().split('')[2]
        }`;
      }
      if (dateData.toString().length === 6) {
        return `${dateData.toString().split('')[1]}`;
      }
    }
  };

  const formatNewDate = (monthData, dateData) => {
    if (monthData > 9) {
      if (dateData.toString().length === 8) {
        return `${dateData.toString().split('')[0]}${
          dateData.toString().split('')[1]
        }${Number(expenseDayText)}${dateData.toString().split('')[4]}${
          dateData.toString().split('')[5]
        }${dateData.toString().split('')[6]}${
          dateData.toString().split('')[7]
        }`;
      }

      if (dateData.toString().length === 7) {
        return `${dateData.toString().split('')[0]}${
          dateData.toString().split('')[1]
        }${Number(expenseDayText)}${dateData.toString().split('')[3]}${
          dateData.toString().split('')[4]
        }${dateData.toString().split('')[5]}${
          dateData.toString().split('')[6]
        }`;
      }
    } else {
      if (dateData.toString().length === 7) {
        return `${dateData.toString().split('')[0]}${Number(expenseDayText)}${
          dateData.toString().split('')[3]
        }${dateData.toString().split('')[4]}${
          dateData.toString().split('')[5]
        }${dateData.toString().split('')[6]}`;
      }

      if (dateData.toString().length === 6) {
        return `${dateData.toString().split('')[0]}${Number(expenseDayText)}${
          dateData.toString().split('')[2]
        }${dateData.toString().split('')[3]}${
          dateData.toString().split('')[4]
        }${dateData.toString().split('')[5]}`;
      }
    }
  };

  const formatExpensesObj = newExpenseData => {
    let currentData = userData.expenses;
    let currentYearData = userData.expenses[year];
    let currentMonthData = userData.expenses[year][month];
    let index = currentMonthData.findIndex(
      each => each.id === newExpenseData.id,
    );
    let updatedMonthData = [
      ...currentMonthData.slice(0, index),
      newExpenseData,
      ...currentMonthData.slice(index + 1),
    ];
    return {
      ...currentData,
      [year]: {
        ...currentYearData,
        [month]: updatedMonthData,
      },
    };
  };

  const updateExpense = async originalExpenseData => {
    let newExpenseData = {
      date: Number(formatNewDate(month, data.date)),
      description: expenseDescriptionText,
      expenseAmount: Number(expenseAmountText),
      expenseName: expenseCategory,
      id: originalExpenseData.id,
    };
    let updatedExpenses = formatExpensesObj(newExpenseData);

    await setDoc(
      doc(db, 'users', auth.currentUser.uid),
      {
        expenses: updatedExpenses,
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

  const runFormatFunction = input => {
    formatExpenseInput(
      input,
      setExpenseAmountText,
      expenseAmountText,
      setNoExpenseAmountError,
    );
  };

  const toggleCategoryOptions = () => {
    setShowCategoryOptions(!showCategoryOptions);
  };

  const updateExpenseCategory = category => {
    setExpenseCategory(category);
    setShowCategoryOptions(false);
  };

  const setInputState = originalExpenseData => {
    setExpenseCategory(originalExpenseData.expenseName);
    setIfEditCancelAmount(expenseAmountText);
    setExpenseDayText(formatDate(month, data.date));
  };

  const checkIfUpdated = originalExpenseData => {
    if (expenseCategory !== originalExpenseData.expenseName) {
      return updateExpense(originalExpenseData);
    }
    if (Number(expenseAmountText) !== originalExpenseData.expenseAmount) {
      return updateExpense(originalExpenseData);
    }
    if (expenseDayText !== formatDate(month, data.date)) {
      return updateExpense(originalExpenseData);
    }
    if (expenseDescriptionText !== originalExpenseData.description) {
      return updateExpense(originalExpenseData);
    }
  };

  const setEdit = originalExpenseData => {
    if (isExpenseOnEdit) {
      setShowCategoryOptions(false);
      checkIfUpdated(originalExpenseData);
    }
    if (!isExpenseOnEdit) {
      setInputState(originalExpenseData);
    }
    setIsExpenseOnEdit(!isExpenseOnEdit);
  };

  const cancelEdit = data => {
    setIsExpenseOnEdit(false);
    setShowCategoryOptions(false);
    setExpenseCategory(data.expenseName);
    setExpenseAmountText(ifEditCancelAmount);
    setExpenseDayText(formatDate(month, data.date));
    setExpenseDescriptionText(data.description);
  };

  const toggleDeleteConfirm = () => {
    setIsExpenseOnDelete(!isExpenseOnDelete);
  };

  useEffect(() => {
    if (!isEdit) {
      setIsExpenseOnEdit(false);
      setShowCategoryOptions(false);
    }
  }, [isEdit]);

  const formatSpentAmount = amount => {
    let expenseAmount = amount.toString().replace(/[^0-9]/g, '');

    if (expenseAmount.length > 5) {
      return setExpenseAmountText(
        `${expenseAmount.slice(
          0,
          expenseAmount.length - 5,
        )},${expenseAmount.slice(
          expenseAmount.length - 5,
          expenseAmount.length - 2,
        )}.${expenseAmount.slice(
          expenseAmount.length - 2,
          expenseAmount.length,
        )}`,
      );
    } else {
      return setExpenseAmountText(
        `${expenseAmount.slice(
          0,
          expenseAmount.length - 2,
        )}.${expenseAmount.slice(
          expenseAmount.length - 2,
          expenseAmount.length,
        )}`,
      );
    }
  };

  useEffect(() => {
    setExpenseCategory(data.expenseName);
    formatSpentAmount(data.expenseAmount.toFixed(2));
    setExpenseDayText(formatDate(month, data.date));
    setExpenseDescriptionText(data.description);
  }, []);

  return (
    <View style={styles.card}>
      {showCategoryOptions && (
        <View
          style={{
            width: '100%',
            marginBottom: 10,
            marginLeft: -2,
            padding: 10,
            borderRadius: 25,
            borderWidth: 3,
            borderColor: '#223252',
            backgroundColor: '#bbc1be',
            zIndex: 9,
          }}>
          <View style={{marginLeft: -15}}>
            <ExpenseCategoryContainer
              expenseCategoryStateProp={expenseCategory}
              setExpenseCategoryStateProp={updateExpenseCategory}
            />
          </View>
        </View>
      )}
      <View style={styles.cardTop}>
        {isExpenseOnEdit ? (
          <>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                borderBottomWidth: 2,
                borderBottomColor: '#223252',
                paddingHorizontal: 12,
                paddingTop: 2,
                backgroundColor: '#d3d9d6',
                borderRadius: 250,
              }}
              onPress={() => {
                toggleCategoryOptions();
              }}>
              <Text
                style={{color: '#223252', fontSize: 16, fontWeight: 'bold'}}>
                {expenseCategory}
              </Text>
            </TouchableOpacity>
            <View style={{width: '33%', flexDirection: 'row'}}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#223252',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                $
              </Text>
              <AmountInput
                backgroundColorProp={'#d3d9d6'}
                placeholderProp="0.00"
                fontSizeProp={16}
                valueProp={expenseAmountText}
                onChangeProp={runFormatFunction}
              />
            </View>
            <View style={{width: '20%'}}>
              <AmountInput
                backgroundColorProp={'#d3d9d6'}
                placeholderProp="0"
                fontSizeProp={16}
                valueProp={expenseDayText}
                onChangeProp={setExpenseDayText}
              />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.cardText}>{expenseCategory}</Text>
            <Text
              style={[
                styles.cardText,
                {textAlign: 'center', marginLeft: 20},
              ]}>{`$${expenseAmountText}`}</Text>
            <Text
              style={[styles.cardText, {textAlign: 'right', paddingRight: 5}]}>
              {expenseDayText}
            </Text>
          </>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 5,
        }}>
        {expenseDescriptionText !== '' && !isExpenseOnEdit ? (
          <Text
            style={[
              styles.cardText,
              {fontSize: 14, color: '#384763', paddingLeft: 10},
            ]}>
            {`${expenseDescriptionText}`}
          </Text>
        ) : null}
        {expenseDescriptionText === '' && !isExpenseOnEdit ? (
          <View style={{flex: 1}}></View>
        ) : null}

        {isExpenseOnEdit && (
          <TextInput
            style={[
              styles.cardText,
              {
                flexGrow: 1,
                fontSize: 14,
                color: '#384763',
                paddingVertical: -5,
                paddingLeft: 15,
                paddingRight: 15,
                marginRight: 15,
                borderBottomColor: '#384763',
                borderBottomWidth: 2,
                borderRadius: 250,
                backgroundColor: '#d3d9d6',
              },
            ]}
            placeholder="Optional Description"
            value={expenseDescriptionText}
            onChangeText={text => {
              setExpenseDescriptionText(text);
            }}
          />
        )}
        {isEdit && !isExpenseOnEdit ? (
          <TouchableOpacity
            style={styles.updateBtn}
            onPress={() => {
              setEdit(data);
            }}>
            <Text style={styles.updateBtnText}>Edit</Text>
          </TouchableOpacity>
        ) : null}
        {isEdit && isExpenseOnEdit ? (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
            }}>
            <TouchableOpacity
              style={[styles.updateBtn, {marginRight: 15}]}
              onPress={() => {
                cancelEdit(data);
              }}>
              <Text style={styles.updateBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.updateBtn}
              onPress={() => {
                setEdit(data);
              }}>
              <Text style={styles.updateBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {isDelete && !isExpenseOnDelete ? (
          <TouchableOpacity
            style={[styles.updateBtn, styles.deleteBtn]}
            onPress={() => {
              toggleDeleteConfirm();
            }}>
            <Text style={[styles.updateBtnText, styles.deleteBtnText]}>
              Delete
            </Text>
          </TouchableOpacity>
        ) : null}
        {isDelete && isExpenseOnDelete ? (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
            }}>
            <TouchableOpacity
              style={[styles.updateBtn, styles.deleteBtn, {marginRight: 15}]}
              onPress={() => {
                toggleDeleteConfirm(data);
              }}>
              <Text style={[styles.updateBtnText, styles.deleteBtnText]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.updateBtn, styles.deleteBtn]}
              onPress={() => {
                deleteExpense(data);
              }}>
              <Text style={[styles.updateBtnText, styles.deleteBtnText]}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default EachExpense;

const styles = StyleSheet.create({
  card: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: '#dbe2e0',
    borderBottomWidth: 2,
    borderBottomColor: '#9199a9',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
    color: '#223252',
    fontSize: 16,
    fontWeight: 'bold',
  },
  updateBtn: {
    backgroundColor: '#384763',
    marginBottom: 2,
    borderRadius: 250,
    paddingHorizontal: 12,
    paddingVertical: 1,
    shadowColor: 'black',
    elevation: 3,
  },
  deleteBtn: {
    backgroundColor: '#9b1a3b',
    opacity: 0.9,
  },
  updateBtnText: {
    color: '#ced4d2',
    fontWeight: 'bold',
    fontSize: 14,
  },
  deleteBtnText: {
    opacity: 1,
  },
});
