import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import globalStyles from "../../styles/globalStyles";
import Barcode from 'react-native-vector-icons/Ionicons'
import { Formik } from "formik";
import * as yup from 'yup'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const API_URL = 'https://todobackend123.herokuapp.com';

const CodeForm = ({ setVerified, lastMail }) => {
    const [result, setResult] = useState({ message: '', success: false });

    const codeValidationSchema = yup.object().shape(
        {
            code: yup
                .string()
                .min(6, "Code must be at least 6 chars long")
                .max(6, "Code must be at most 6 chars long")
                .required('Email Address is required'),
        }
    )
    const getCode = (value) => {

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
                    setResult({message: jsonRes.message, success: true});
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
    const codeSubmitHandler = (values) => {
        const pack = { "code": values.code, "email": lastMail };


        fetch(`${API_URL}/verifyCode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pack)
        }).then(async res => {
            try {
                const jsonRes = await res.json();
                if (res.status == 200) {
                    setVerified(true);

                }
                else {

                    if (!jsonRes.success) setResult({ message: jsonRes.message, success: false });
                }
            }
            catch (err) { console.log(err); }
        })
    }
    return (
        <Formik
            initialValues={{ code: '' }}
            onSubmit={codeSubmitHandler}
            validateOnMount={false}
            validationSchema={codeValidationSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (


                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={false}
                    keyboardShouldPersistTaps={"handled"}
                >
                    {!result.success &&
                        <Text style={globalStyles.issueNotif}>{result.message}</Text>}
                    {result.success &&
                        <Text style={globalStyles.notif}>{result.message}</Text>}

                    {
                        touched.code && errors.code &&
                        <Text style={globalStyles.issueNotif}>
                            {errors.code}
                        </Text>
                    }


                    <View style={globalStyles.inputArea}>
                        <Barcode style={globalStyles.Icon} name="code" size={30} color="#6D28D9" />
                        <TextInput
                            style={globalStyles.input}
                            placeholder="code"
                            value={values.code}
                            onChangeText={(e) => {
                                values.code = e;
                                setResult({ message: '', success: false })
                            }
                            }
                            onBlur={handleBlur('code')}
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                        />
                    </View>
                    <TouchableOpacity style={globalStyles.button} onPress={(values) => {
                        handleSubmit(values);
                    }}>
                        <Text style={globalStyles.buttonText}>Verify code</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
                        getCode({ email: lastMail });
                    }}>
                        <Text style={globalStyles.fadedLink}>Resend code?</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            )}
        </Formik>
    )
}

export default CodeForm;