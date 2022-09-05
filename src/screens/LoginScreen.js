import { View, Text, TouchableHighlight, StatusBar } from 'react-native'
import React from 'react'
import { SIZES } from '../utils/theme'
import Auth_BG_Component from '../components/Auth_BG_Component'
import { commonStyles } from '../utils/styles'
import Custom_Auth_Btn from '../components/Custom_Auth_Btn'
import CustomTextInput from '../components/CustomTextInput'

export default function LoginScreen({ navigation }) {
    return (
        <Auth_BG_Component>
            <StatusBar barStyle="light-content" backgroundColor="#1572B9" />
            <View style={{ justifyContent: 'center', height: SIZES.height, paddingHorizontal: 20, justifyContent: "space-between", paddingVertical: "28%" }}>

                <View>
                    <Text style={{ fontSize: 32, fontWeight: "900", color: "#fff" }}>Shop Owner</Text>
                    <Text style={{ ...commonStyles.fs18_400, color: "#fff", marginTop: 8, marginBottom: 20 }}>
                        Login now to track all your expenses and income at a place!
                    </Text>

                    <CustomTextInput
                        placeholder='shopad@gmail.com'
                        onChange={(val) => { }}
                    />
                    <View style={{ height: 14 }} />

                    <CustomTextInput
                        placeholder='Password'
                        onChange={(val) => { }}
                    />
                    <View style={{ alignItems: "flex-end" }}>
                        <TouchableHighlight onPress={() => { navigation.navigate("ForgotPasswordPassword") }} underlayColor="#1572B9">
                            <Text
                                style={{
                                    ...commonStyles.fs15_500, color: "#303030",
                                    textDecorationColor: "#303030",
                                    textDecorationLine: "underline"
                                }}
                            >
                                Forgot Password?
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ height: 60 }} />

                    <Custom_Auth_Btn
                        btnText="Register as Shop Owner"
                        onPress={() => { navigation.navigate("Root") }}
                    />
                </View>

                <View style={{ alignItems: "center", zIndex: 1 }}>
                    <View style={{ ...commonStyles.row }}>
                        <Text style={{ ...commonStyles.fs18_500, color: "#fff" }}>Don’t have an account? </Text>
                        <TouchableHighlight onPress={() => { navigation.navigate("RegisterScreen") }} underlayColor="#1572B9">
                            <Text style={{ ...commonStyles.fs18_500, color: "#EDAA26" }}>Register</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </Auth_BG_Component>
    )
}