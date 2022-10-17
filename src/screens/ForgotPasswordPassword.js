import { View, Text, TouchableHighlight } from 'react-native'
import React from 'react'
import { SIZES } from '../utils/theme'
import Auth_BG_Component from '../components/Auth_BG_Component'
import { commonStyles } from '../utils/styles'
import Custom_Auth_Btn from '../components/Custom_Auth_Btn'
import CustomTextInput from '../components/CustomTextInput'
import { updatePasswordPostRequest } from '../utils/API'

export default function ForgotPasswordPassword({ route }) {

    const [passwordError, setPasswordError] = React.useState(false);
    const [cpasswordError, setCPasswordError] = React.useState(false);

    const [password, setPassword] = React.useState("");
    const [cpassword, setCPassword] = React.useState("");

    const { email } = route.params;

    const handleSubmit = () => {
        if (password.length === 0) {
            setPasswordError(true)
        } if (cpassword.length === 0) {
            setCPasswordError(true)
        } else {
            updatePasswordPostRequest(email, "resetToken", password, async (response) => {
                if (response !== null) {
                    if (response.message !== undefined) {
                        var userData = response.user[0];
                        dispatch(setUser(userData));
                        await Auth.setAccount(userData);
                        Toast.show("Login Successfully!");
                        navigation.navigate("Root");
                    }
                }
            })
        }
    }

    return (
        <Auth_BG_Component>
            <View style={{ justifyContent: 'center', height: SIZES.height, paddingHorizontal: 20, justifyContent: "space-between", paddingVertical: "28%" }}>

                <View>
                    <Text style={{ fontSize: 32, fontWeight: "900", color: "#fff" }}>Forgot Password</Text>
                    <Text style={{ ...commonStyles.fs18_400, color: "#fff", marginTop: 8, marginBottom: 20 }}>
                        Enter your mail and we sent OTP on your mail
                    </Text>

                    <CustomTextInput
                        placeholder='Enter new password'
                        onChange={(val) => { setPassword(val) }}
                    />
                    {passwordError ? <Text style={{ ...commonStyles.fs13_400, color: "red" }}>Password is required</Text> : <></>}
                    <View style={{ height: 14 }} />

                    <CustomTextInput
                        placeholder='Confirm Password'
                        onChange={(val) => { setCPassword(val) }}
                    />
                    {cpasswordError ? <Text style={{ ...commonStyles.fs13_400, color: "red" }}>Password is required</Text> : <></>}
                    <View style={{ height: 100 }} />

                    <Custom_Auth_Btn
                        btnText="Send"
                        onPress={() => { }}
                    />
                </View>
            </View>
        </Auth_BG_Component>
    )
}