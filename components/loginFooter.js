import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import globalStyles from '../styles/globalStyles'

const LoginFooter = ({navigation}) =>
{

    return (
        <View>
        <View  style={globalStyles.signup}  >
          <Text style={{color: '#777'}}>Don't have an account? </Text>
          <TouchableOpacity  onPress={ () => navigation.navigate('Signup')}>
            <Text style={globalStyles.fadedLink}>Sign up here.</Text>
          </TouchableOpacity>
        </View>
        <View  style={globalStyles.forgot}>
          <Text style={{color: '#777',}}>or</Text>
          <TouchableOpacity onPress = {() => navigation.navigate('Signup')}>
            <Text style={globalStyles.fadedLink}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        </View>
    )
}

export default LoginFooter;