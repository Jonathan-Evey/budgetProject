import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React from 'react';

const EachExpense = ({month, data}) => {
  const formatDate = (manthData, dateData) => {
    if (manthData > 9) {
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

  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>{formatDate(month, data.date)}</Text>
      <View style={{alignItems: 'center', paddingLeft: 10}}>
        <Text style={styles.cardText}>{data.expenseName}</Text>
        {data.description !== '' && (
          <Text style={[styles.cardText, {paddingTop: 10}]}>
            {data.description}
          </Text>
        )}
      </View>
      <Text style={styles.cardText}>{`$${data.expenseAmount}`}</Text>

      {/* {data.description !== '' && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 5,
            paddingLeft: 15,
          }}>
          <Text style={styles.cardText}>Description:</Text>
          <Text style={[styles.cardText, {paddingLeft: 10}]}>
            {data.description}
          </Text>
        </View>
      )} */}
    </View>
  );
};

export default EachExpense;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: '#dbe2e0',
    borderBottomWidth: 2,
    borderBottomColor: '#9199a9',
  },
  // cardTop: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingLeft: 5,
  // },
  cardText: {
    color: '#384763',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
