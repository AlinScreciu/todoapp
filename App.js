import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import globalStyles from './styles/globalStyles';
import Account from './screens/Account';



const Stack = createNativeStackNavigator();

export default function App() {
  const [autoLogin, setAutoLogin] = useState(false);
  
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

      </Stack.Navigator>
    </NavigationContainer>
  );
}


