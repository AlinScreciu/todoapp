import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import globalStyles from "../../styles/globalStyles";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Formik } from "formik";
import * as yup from 'yup'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const API_URL = 'https://todobackend123.herokuapp.com';

const EmailForm = ({ setSent, setMail }) => {
    const [result, setResult] = useState({ message: '', success: false });

    const emailValidationSchema = yup.object().shape(
        {
            email: yup
                .string()
                .email("Please enter valid email")
                .required('Email Address is required'),
        }
    )
    const getCode = (value) => {

        setMail(value.email);
        fetch(`${API_URL}/makecode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        },
        ).then(async res => {
            try {

                const jsonRes = await res.json();
                if (res.status == 200) {
                    setSent(true);

                }
                else {

                    if (!jsonRes.success) setResult({ message: jsonRes.message, success: false });
                }
            }
            catch (err) { console.log(err); }

        }).catch(err => {
            console.log(err);
        })
    };
    return (<Formik
        initialValues={{ email: '' }}
        onSubmit={getCode}
        validateOnMount={false}
        validationSchema={emailValidationSchema}
    >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
                keyboardShouldPersistTaps={"handled"}
            >
                {!result.success &&
                    <Text style={globalStyles.issueNotif}>{result.message}</Text>}
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
                        onChangeText={e => {
                            setResult({ message: '', success: false });
                            values.email = e;
                        }}
                        onBlur={handleBlur('email')}
                        keyboardType={'email-address'}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <TouchableOpacity style={globalStyles.button} onPress={(values) => {
                    handleSubmit(values);
                }}>
                    <Text style={globalStyles.buttonText}>Send code</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        )}
    </Formik>
    );
}

export default EmailForm;
