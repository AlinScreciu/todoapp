import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import globalStyles from "../../styles/globalStyles";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Formik } from "formik";
import * as yup from 'yup'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Eyecon from 'react-native-vector-icons/Octicons'

const API_URL = 'https://todobackend123.herokuapp.com';

const PasswordChangeForm = ({ navigation, lastMail }) => {
    const [show, setShow] = useState(false);
    const [result, setResult] = useState({ message: '', success: false });

    const handleShow = () => {
        setShow(!show);
    }
    const [show1, setShow1] = useState(false);
    const handleShow1 = () => {
        setShow1(!show1);
    }
    const updatePassword = (values) => {

        const pack = { "email": lastMail, password: values.password };


        fetch(`${API_URL}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pack),
        }).then(async res => {
            try {
                const jsonRes = await res.json();
                if (res.status == 200) {

                    setResult({ success: true, message: "Password changed" });
                } else {

                    if (!jsonRes.success)
                        setResult({ message: jsonRes.message, success: false });

                }
            }
            catch (err) {
                console.log(err);
            }
        }).catch(err => { console.log(err) })
    };
    const passValidationSchema = yup.object().shape(
        {

            password: yup
                .string()
                .min(8, ({ min }) => `Password must be at least ${min} characters`)
                .required('Password is required'),
            passwordConfirmation: yup.string()
                .oneOf([yup.ref('password'), null], 'Passwords must match')

        }
    )
    return (<Formik
        initialValues={{ password: '', passwordConfirmation: '' }}
        onSubmit={values => updatePassword(values)}
        validateOnMount={false}
        validationSchema={passValidationSchema}
    >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
            >

                {
                    touched.password && errors.password &&
                    <Text style={globalStyles.issueNotif}>
                        {errors.password}
                    </Text>
                }
                {!result.success &&
                    <Text style={globalStyles.issueNotif}>{result.message}</Text>}
                {result.success &&
                    <Text style={globalStyles.notif}>{result.message}</Text>}
                <Text style={globalStyles.label}>Password</Text>
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
                    <Text style={globalStyles.buttonText}>Change password</Text>
                </TouchableOpacity>
                {result.success &&
                    <TouchableOpacity style={globalStyles.button} onPress={() => navigation.goBack()}>
                        <Text style={globalStyles.buttonText}>Go back</Text>
                    </TouchableOpacity>
                }
            </KeyboardAwareScrollView>
        )}
    </Formik>)
}

export default PasswordChangeForm;