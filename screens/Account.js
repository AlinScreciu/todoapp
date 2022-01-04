import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import globalStyles from "../styles/globalStyles";

const disableAutoLogin = async () => {

    try {
        const value = await AsyncStorage.getItem('@last_token');
        const jsonData = JSON.parse(value);
        const toSave = { "token": jsonData.token, "email": jsonData.email, "autoLogin": false };
        const jsonToSave = JSON.stringify(toSave);
        await AsyncStorage.setItem('@last_token', jsonToSave);
    }
    catch (e) {
        console.log(e);
    }
}
const enableAutoLogin = async () => {

    try {
        const value = await AsyncStorage.getItem('@last_token');
        const jsonData = JSON.parse(value);
        const toSave = { "token": jsonData.token, "email": jsonData.email, "autoLogin": true };
        const jsonToSave = JSON.stringify(toSave);
        await AsyncStorage.setItem('@last_token', jsonToSave);
    }
    catch (e) {
        console.log(e);
    }
}

const Account = ({ navigation }) => {


    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}> Account page</Text>

            <TouchableOpacity onPress={enableAutoLogin} style={globalStyles.disableAutoLogin}>
                <Text style={globalStyles.disableAutoLoginText}>Enable autologin</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={disableAutoLogin} style={globalStyles.disableAutoLogin}>
                <Text style={globalStyles.disableAutoLoginText}>Disable autologin</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                navigation.navigate('Login',
                    {
                        "auth": false
                    });
            }}

                style={globalStyles.disableAutoLogin}>
                <Text style={globalStyles.disableAutoLoginText}>Logout</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Account;