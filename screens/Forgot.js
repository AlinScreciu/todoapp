import React, { useState } from "react";
import { View } from "react-native";
import globalStyles from "../styles/globalStyles";
import EmailForm from "../components/ForgotForms/EmailForm";
import CodeForm from "../components/ForgotForms/CodeForm";
import PasswordChangeForm from "../components/ForgotForms/PasswordChangeForm";

const Forgot = ({navigation}) => {

    const [sent, setSent] = useState(false);
    const [verified, setVerified] = useState(false);
    const [lastMail, setMail] = useState("");
    if (!sent)
        return (
            <View style={globalStyles.forgotForm}>
                <EmailForm setSent={setSent} setMail={setMail} />
            </View>
        )
    else if (sent && !verified) return (
        <View style={globalStyles.forgotForm}>
            <CodeForm setVerified={setVerified} lastMail={lastMail} />
        </View>
    )
    else if (verified)
        return (
            <View style={globalStyles.forgotForm}>
                <PasswordChangeForm navigation={navigation} lastMail={lastMail} />
            </View>
        )
}

export default Forgot;