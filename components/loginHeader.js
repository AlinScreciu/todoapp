import React from "react";
import { Text, Image, View } from 'react-native';
import globalStyles from "../styles/globalStyles";
const LoginHeader = ({ auth }) => {
    return (
        <View>
            <Image source={require('../assets/snelaIcon.png')} style={globalStyles.logo} />
            <Text style={globalStyles.title}>{auth ? 'Welcome back!' : 'Welcome!'}</Text>
        </View>
    )
}

export default LoginHeader;