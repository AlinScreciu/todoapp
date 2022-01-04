import React, { useEffect, useState } from "react";
import { View, Text, Keyboard, Platform, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import globalStyles from "../styles/globalStyles";
import LoginHeader from "../components/loginHeader";
import LoginForm from "../components/loginForm";
import LoginFooter from "../components/loginFooter";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'

const API_URL = 'https://todobackend123.herokuapp.com';

// lastuser = {token, autologin}

const getLastToken = async () => {

    try {
        const value = await AsyncStorage.getItem('@last_token');
        return value;
    }
    catch (e) {
        console.log(e);
    }
}

// asyncstoragekey = email->(data) data = {list: item w/e}
const storeLastUser = async (data) => {
    try {
        const jsonData = JSON.stringify(data);
        await AsyncStorage.setItem('@last_token', jsonData);
    }
    catch (e) {
        console.log(e);
    }
}

const Login = ({ navigation, route }) => {

    const [message, setMessage] = useState('');
    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState(null);
    const [autoLogin, setAutoLogin] = useState(false);
    const [mail, setMail] = useState('');
    const isFocused = useIsFocused();
    useEffect(() => {
        getLastToken()
            .then(data => {
                if (data !== null) {
                    const jsonData = (JSON.parse(data));
                    setAutoLogin(jsonData.autoLogin);

                    setToken(jsonData.token);
                    setMail(jsonData.email);


                }
            })
            .catch(err => console.log(err));
    }, []);
    useEffect(() => {
        if (autoLogin) {


            verifyAuth(token);
        }
    }, [token])
    useEffect(() => {
        if (route.params != undefined) {
            setAuth(route.params.auto);

        }
    }, [isFocused]);
    const verifyAuth = (aToken) => {

        fetch(`${API_URL}/private`,
            {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${aToken}`,
                },
            })
            .then(async res => {
                try {
                    if (res.status == 200) {



                        setAuth(true);
                    }

                }
                catch (err) {
                    console.log(err);
                };
            })
            .catch(err => {
                console.log(err);
            });
    }
    const onSubmitHandler = (values) => {
        fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        }).then(async res => {
            try {
                const jsonRes = await res.json();
                setMessage('');
                if (res.status != 200) {

                    if (jsonRes.message) {
                        setMessage(jsonRes.message);
                    }
                    setAuth(jsonRes.auth);
                }
                else {



                    storeLastUser({ token: jsonRes.token, "autoLogin": autoLogin, "email": values.email }).catch(err => console.log(err));
                    setToken(jsonRes.token);
                    verifyAuth(jsonRes.token);
                    setMail(values.email);
                }
            }
            catch (err) {
                console.log(err)
            }
        }).catch(err => console.log(err))
    }

    return !auth ?
        (
            <TouchableWithoutFeedback onPress={() => { if (Platform.OS != 'web') Keyboard.dismiss(); }}>
                <View style={globalStyles.root}>
                    <LoginHeader />
                    <Text style={globalStyles.issueNotif}>{message}</Text>
                    <LoginForm onSubmitHandler={onSubmitHandler} setAutoLogin={setAutoLogin} autoLogin={autoLogin} />
                    <LoginFooter navigation={navigation} />
                </View>
            </TouchableWithoutFeedback>
        )
        :
        (
            <TouchableWithoutFeedback onPress={() => { if (Platform.OS != 'web') Keyboard.dismiss(); }}>
                <View style={globalStyles.root}>
                    <LoginHeader auth={auth} />
                    <TouchableOpacity
                        style={globalStyles.button}
                        onPress={() => navigation.navigate('Home', { email: mail })}
                    >
                        <Text style={globalStyles.buttonText}>Continue</Text>
                    </TouchableOpacity>

                </View>
            </TouchableWithoutFeedback>

        )
}

export default Login;