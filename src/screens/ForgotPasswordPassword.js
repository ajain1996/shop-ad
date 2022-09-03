import { View, Text, TouchableHighlight } from 'react-native'
import React from 'react'
import { SIZES } from '../utils/theme'
import Auth_BG_Component from '../components/Auth_BG_Component'
import { commonStyles } from '../utils/styles'
import Custom_Auth_Btn from '../components/Custom_Auth_Btn'
import CustomTextInput from '../components/CustomTextInput'

export default function ForgotPasswordPassword() {
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
                        onChange={(val) => { }}
                    />
                    <View style={{ height: 14 }} />

                    <CustomTextInput
                        placeholder='Confirm Password'
                        onChange={(val) => { }}
                    />
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