import React, {useState, useEffect} from "react";
import { View, TextInput,TouchableOpacity, Text, Check} from "react-native";
import globalStyles from "../styles/globalStyles";
import Icon from 'react-native-vector-icons/MaterialIcons'
import Eyecon from 'react-native-vector-icons/Octicons'
import { Formik } from "formik";
import * as yup from 'yup'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BouncyCheckbox from "react-native-bouncy-checkbox";


const LoginForm = ({onSubmitHandler,setAutoLogin, autoLogin}) => {
    const [message,setMessage] = useState('');
    const [show, setShow] = useState( false );
    const handleShow = () =>
    {
        setShow(!show);
    }

    const loginValidationSchema = yup.object().shape(
        {
            email: yup
              .string()
              .email("Please enter valid email")
              .required('Email Address is required'),
            password: yup
              .string()
              .min(8, ({ min }) => `Password must be at least ${min} characters`)
              .required('Password is required'),
        } 
    )

    
    
        return(
          <Formik 
            initialValues={{email: '', password:''}}
            onSubmit = {values => onSubmitHandler(values)}
            validateOnMount
            validationSchema = {loginValidationSchema}
            >
                {({handleChange, handleBlur, handleSubmit, values, errors, touched, isValid}) => (
                <View>
                
                <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
                >
                {
                touched.email && errors.email && 
                <Text style={globalStyles.issueNotif}>
                    {errors.email}
                    </Text>
                }
                <View style={globalStyles.inputArea}>
                    <Icon style={globalStyles.Icon} name="mail" size={30} color="#6D28D9"/>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    keyboardType={'email-address'}
                    underlineColorAndroid="transparent"
                />
                </View>
                
                {
                touched.password && errors.password && 
                <Text style={globalStyles.issueNotif}>
                    {errors.password}
                    </Text>
                }
                
                <View style={globalStyles.inputArea}>
                  <Icon style={globalStyles.Icon} name="lock" size={30} color="#6D28D9"/>
                  <TextInput
                    style={globalStyles.input}
                    placeholder="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    underlineColorAndroid="transparent"
                    autoCorrect={false}
                    secureTextEntry = {!show}
                  />
                  <Eyecon style={globalStyles.showIcon} name={show ? "eye-closed" : "eye"} size={25} color="grey" onPress={handleShow}/>
                </View>
                
                <BouncyCheckbox 
                style={{alignSelf: 'center',marginTop: 20}}
                fillColor={"#6D28D9"}
                size = {20}
                text = {"Keep me signed in"}
                textStyle = {{textDecorationLine: 'none'}}
                bounceFriction={100}
                isChecked ={autoLogin}
                onPress={() => {
                  setAutoLogin(!autoLogin)
                  
                }}
                />
                <TouchableOpacity  style={globalStyles.button} onPress={(values)=>{
                    handleSubmit(values);
                }}>
                  <Text style={globalStyles.buttonText}>Login</Text>
                </TouchableOpacity>
                </KeyboardAwareScrollView>
                </View>
                )}
            </Formik>
)
};

export default LoginForm;