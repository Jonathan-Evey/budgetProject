import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" options={{headerShown: false}} component={LandingScreen} />
        <Stack.Screen name="Login" options={{headerTitleAlign: 'center', headerLargeTitleShadowVisible: false, headerTransparent: true}} component={LoginScreen} />
        <Stack.Screen name="Sign Up" options={{headerTitleAlign: 'center', headerLargeTitleShadowVisible: false, headerTransparent: true}} component={SignupScreen} />
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
      </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;
