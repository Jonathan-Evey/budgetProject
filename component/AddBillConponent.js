import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

const AddBillConponent = (props) => {

  return (
    <View>
          <TouchableOpacity onPress={() => props.setAddMonthlyBills(false)}>
            <Text>X</Text>
          </TouchableOpacity>
          <Text>Bill type</Text>
          <TextInput />
          <Text>Bill amount</Text>
          <TextInput />
          <Text>Date bill is due</Text>
          <TextInput />
        </View>
  )
}

export default AddBillConponent

const styles = StyleSheet.create({})