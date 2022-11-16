import React from 'react';
import {Text, TouchableOpacity, UIManager} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import ExpensesScreen from './screens/ExpensesScreen';
import BudgetScreen from './screens/BudgetScreen';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          options={{headerShown: false}}
          component={LandingScreen}
        />
        <Stack.Screen
          name="Login"
          options={{
            headerTitleAlign: 'center',
            headerLargeTitleShadowVisible: false,
            headerTransparent: true,
            headerTintColor: '#223252',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 28,
            },
          }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Sign Up"
          options={{
            headerTitleAlign: 'center',
            headerLargeTitleShadowVisible: false,
            headerTransparent: true,
            headerTintColor: '#223252',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 28,
            },
          }}
          component={SignupScreen}
        />
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Expenses"
          options={{
            headerTitleAlign: 'center',
            headerLargeTitleShadowVisible: false,
            headerTransparent: true,
            headerTintColor: '#223252',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 28,
            },
            headerRight: () => (
              <TouchableOpacity title="Add expense">
                <Text>Add Expense</Text>
              </TouchableOpacity>
            ),
          }}
          component={ExpensesScreen}
        />
        <Stack.Screen
          name="Budget"
          options={{
            headerTitleAlign: 'center',
            headerLargeTitleShadowVisible: false,
            headerTransparent: true,
            headerTintColor: '#223252',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 28,
            },
          }}
          component={BudgetScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
