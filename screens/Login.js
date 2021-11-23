import React, {useEffect, useState} from "react";
import {View, Text, Keyboard, Platform, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import globalStyles from "../styles/globalStyles";
import LoginHeader from "../components/loginHeader";
import LoginForm from "../components/loginForm";
import LoginFooter from "../components/loginFooter";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://todobackend123.herokuapp.com';

// lastuser = {token, autologin}

const getLastToken = async() => {
    
    try {
        const value = await AsyncStorage.getItem('@last_token');
        return value;
    }
    catch(e)
    {
        console.log(e);
    }
  }

// asyncstoragekey = email->(data) data = {list: item w/e}
const storeLastUser = async (data) =>
{
    try {
        const jsonData = JSON.stringify(data);
        await AsyncStorage.setItem('@last_token',jsonData);
    }
    catch (e)
    {
        console.log(e);
    }
}
const Login = ({navigation}) =>
{
    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState(null);
    const [autoLogin, setAutoLogin] = useState(false);
    const [mail,setMail] = useState('');
    useEffect(() => {
        getLastToken()
          .then(data => {
            if(data!==null){
              const jsonData = (JSON.parse(data));
              setAutoLogin(jsonData.autoLogin);
              console.log(jsonData);
              setToken(jsonData.token);
              setMail(jsonData.email);
              //console.log(jsonData);
              //console.log("^ login.js 50");
            }
          })
          .catch(err => console.log(err));
      }, []);
    useEffect(() => {
        if(autoLogin)
        {
            //console.log(token+" "+autoLogin);
            //console.log("^ login.js 61");
            verifyAuth(token);
        }
    }, [token])
    const verifyAuth = (aToken) => 
    {
        
        fetch(`${API_URL}/private`, 
            {
                method: 'GET',
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${aToken}`, 
                },
            })
            .then(async res => 
                { 
                try 
                {
                    const jsonRes = await res.json();
                    if (res.status == 200) {
                        //console.log(jsonRes);
                        //console.log("^ login.js 84");
        
                        setAuth(true);
                    }
                    
                } 
                catch (err) 
                {
                    console.log(err);
                };
            })
            .catch(err => 
                {
                console.log(err);
            });
    }
    const onSubmitHandler = (values) =>
    {
        fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        }).then(async res => {
            try
            {
                const jsonRes = await res.json();
                if (res.status != 200)
                {
                    console.log(jsonRes);
                    setAuth(jsonRes.auth);
                }
                else 
                {
                    console.log(jsonRes);
                    //console.log(autoLogin);
                    storeLastUser({token:jsonRes.token,"autoLogin": autoLogin,"email":values.email}).catch(err=>console.log(err));
                    setToken(jsonRes.token);
                    verifyAuth(jsonRes.token);
                    setMail(values.email);
                }
            }
            catch (err)
            {
                console.log('err');
            }
        }).catch(err => console.log(err))
    }

    return !auth ? 
     (
        <TouchableWithoutFeedback onPress={() =>{if (Platform.OS != 'web') Keyboard.dismiss();} }>
        <View style={globalStyles.root}>
            <LoginHeader />
            <LoginForm onSubmitHandler={onSubmitHandler} setAutoLogin={setAutoLogin} autoLogin={autoLogin}/>
            <LoginFooter navigation={navigation} />
        </View>
        </TouchableWithoutFeedback>
    )
    :
    (
        <TouchableWithoutFeedback onPress={() =>{if (Platform.OS != 'web') Keyboard.dismiss();} }>
        <View style={globalStyles.root}>
            <LoginHeader auth = {auth}/>
            <TouchableOpacity  
            style={globalStyles.button} 
            onPress={() => navigation.navigate('Home',{email: mail})}
            >
                <Text style={globalStyles.buttonText}>Continue</Text>
            </TouchableOpacity>
            
            </View>
        </TouchableWithoutFeedback>
        
    )
}

export default Login;