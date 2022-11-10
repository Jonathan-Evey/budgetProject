import React from 'react';
import {UIManager} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import ExpensesScreen from './screens/ExpensesScreen';

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
          }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Sign Up"
          options={{
            headerTitleAlign: 'center',
            headerLargeTitleShadowVisible: false,
            headerTransparent: true,
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
          }}
          component={ExpensesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
