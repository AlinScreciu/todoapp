import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import globalStyles from "../styles/globalStyles";
import Icon from 'react-native-vector-icons/MaterialIcons'
import Eyecon from 'react-native-vector-icons/Octicons'
import { Formik } from "formik";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const API_URL = 'https://todobackend123.herokuapp.com';

const SignupForm = () => {
    const [result, setResult] = useState({message: '', success: false});
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    }
    const [show1, setShow1] = useState(false);
    const handleShow1 = () => {
        setShow1(!show1);
    }

    const onSubmitHandler = ({ email, name, password }) => {
        const payload = { email, name, password };
        fetch(`${API_URL}/signup` ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(async res => {
            try 
            {
                const jsonRes = await res.json();
                if(res.status !== 200)
                {
                    //console.log('status != 200 from signupform', res.status);
                    //console.log(jsonRes);
                    setResult(jsonRes)
                } else {
                    //console.log(jsonRes);
                    setResult(jsonRes);
                }
            }
            catch (err)
            {
                console.log(err);
            }
        })
        .catch(err => console.log(err))
    };

    const signupValidationSchema = yup.object().shape(
        {
            email: yup
                .string()
                .email("Please enter valid email")
                .required('Email Address is required'),
            password: yup
                .string()
                .min(8, ({ min }) => `Password must be at least ${min} characters`)
                .required('Password is required'),
            passwordConfirmation: yup.string()
                .oneOf([yup.ref('password'), null], 'Passwords must match'),
            name: yup
                .string()
                .min(2, ({ min }) => `Name has to be at least ${min} characters`)
                .required('Name is required')

        }
    )

    

    return result.success ?
    (
        <View>
            <Text style={{alignSelf: 'center',fontSize: 30, fontWeight: 'bold'}}>{result.message}</Text>
        </View>
    )
    :
     (
        <View style={globalStyles.root} >
            <Formik
                initialValues={{ email: '', password: '', name: '', passwordConfirmation: '' }}
                onSubmit={values => onSubmitHandler(values)}
                validateOnMount
                validationSchema={signupValidationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                    <View>
                        <Text style={globalStyles.issueNotif }>{result.message}</Text>
                        <KeyboardAwareScrollView
                            resetScrollToCoords={{ x: 0, y: 0 }}
                            scrollEnabled={true}
                        >
                            <Text style={globalStyles.label}>Email</Text>
                            {
                                touched.email && errors.email &&
                                <Text style={globalStyles.issueNotif}>
                                    {errors.email}
                                </Text>
                            }
                            <View style={globalStyles.inputArea}>
                                <Icon style={globalStyles.Icon} name="mail" size={30} color="#6D28D9" />
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
                            <Text style={globalStyles.label}>Name</Text>
                            {
                                touched.name && errors.name &&
                                <Text style={globalStyles.issueNotif}>
                                    {errors.name}
                                </Text>
                            }
                            <View style={globalStyles.inputArea}>
                                <Icon style={globalStyles.Icon} name="person" size={30} color="#6D28D9" />
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder="John Doe"
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            <Text style={globalStyles.label}>Password</Text>

                            {
                                touched.password && errors.password &&
                                <Text style={globalStyles.issueNotif}>
                                    {errors.password}
                                </Text>
                            }

                            <View style={globalStyles.inputArea}>
                                <Icon style={globalStyles.Icon} name="lock" size={30} color="#6D28D9" />
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder="Password"
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    underlineColorAndroid="transparent"
                                    autoCorrect={false}
                                    secureTextEntry={!show}
                                />
                                <Eyecon style={globalStyles.showIcon} name={show ? "eye-closed" : "eye"} size={25} color="grey" onPress={handleShow} />
                            </View>
                            <Text style={globalStyles.label}>Confirm Password</Text>

                            {
                                touched.passwordConfirmation && errors.passwordConfirmation &&
                                <Text style={globalStyles.issueNotif}>
                                    {errors.passwordConfirmation}
                                </Text>
                            }

                            <View style={globalStyles.inputArea}>
                                <Icon style={globalStyles.Icon} name="lock" size={30} color="#6D28D9" />
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder="Password"
                                    value={values.passwordConfirmation}
                                    onChangeText={handleChange('passwordConfirmation')}
                                    onBlur={handleBlur('passwordConfirmation')}
                                    underlineColorAndroid="transparent"
                                    autoCorrect={false}
                                    secureTextEntry={!show1}
                                />
                                <Eyecon style={globalStyles.showIcon} name={show1 ? "eye-closed" : "eye"} size={25} color="grey" onPress={handleShow1} />
                            </View>
                            <TouchableOpacity style={globalStyles.button} onPress={(values) => {
                                handleSubmit(values);
                            }}>
                                <Text style={globalStyles.buttonText}>Sign up</Text>
                            </TouchableOpacity>
                        </KeyboardAwareScrollView>
                    </View>
                )}
            </Formik>
        </View>
    )
};

export default SignupForm;