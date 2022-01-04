import React from "react";
import { View } from 'react-native';
import SignupForm from "../components/signupForm";
import globalStyles from "../styles/globalStyles";
const Signup = () => {
    return (
        <View style={globalStyles.root}>
            <SignupForm />
        </View>
    )
}

export default Signup;