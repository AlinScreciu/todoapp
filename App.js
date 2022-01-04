import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Forgot from './screens/Forgot';
import globalStyles from './styles/globalStyles';
import Account from './screens/Account';



const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <NavigationContainer style={globalStyles.root}>
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen
          name="Signup"
          options={{
            title: 'Sign up'
          }}>
          {props => <Signup {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name='Home'
          options={{
            headerShown: false
          }}>
          {props => <Home {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name='Account'>
          {props => <Account {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name='Login'
          options={{
            headerShown: false,
            title: 'Login'
          }}
        >
          {props => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name='Forgot'
          options={{
            headerShown: true,
            title: 'Forgot Password'
          }}>
          {props => <Forgot {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


