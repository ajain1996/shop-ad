import { View, Text, TouchableHighlight, StatusBar, Image, Alert } from 'react-native'
import React from 'react'
import { SIZES } from '../utils/theme'
import Auth_BG_Component from '../components/Auth_BG_Component'
import { commonStyles } from '../utils/styles'
import Custom_Auth_Btn from '../components/Custom_Auth_Btn'
import CustomTextInput from '../components/CustomTextInput'
import { mobileLoginPostRequest } from '../utils/API'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/reducer/user'
import Toast from 'react-native-simple-toast'
import Auth from '../services/Auth'
import CustomLoader, { CustomPanel } from '../components/CustomLoader'

export default function LoginScreen({ navigation }) {
    const dispatch = useDispatch();
    const { userType } = useSelector(state => state.UserType);

    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = () => {
        if (email.length === 0) {
            setEmailError(true)
        } if (password.length === 0) {
            setPasswordError(true)
        } else {
            setLoading(true);
            mobileLoginPostRequest(email, password, userType, async (response) => {
                setLoading(false);
                if (response !== null) {
                    if (response?.message !== undefined) {
                        if (response?.message === "Mail exists") {
                            Alert.alert("Alert", response?.message);
                        } else if (response?.message === "Auth failed") {
                            Alert.alert("Alert", response?.message);
                        } else {
                            const userData = response?.user;
                            dispatch(setUser(userData));
                            await Auth.setAccount(userData);
                            await Auth.setLocalStorageData("bearer", response.token)
                            const email_password = [];
                            const userEmail = email;
                            const userPassword = password;
                            email_password.push(userEmail);
                            email_password.push(userPassword);
                            await Auth.setLocalStorageData("email_password", email_password?.toString())
                            Toast.show('Login Successfully!');
                            setEmail("")
                            setPassword("")
                            // navigation.navigate("Root")
                        }
                    }
                }
            })
        }
    }

    var btnText = "";
    if (userType === "user") {
        btnText = "User"
    } else if (userType === "shop") {
        btnText = "Shop Owner"
    }

    return (
        <Auth_BG_Component>
            <StatusBar barStyle="light-content" backgroundColor="#1572B9" />
            <View style={{ justifyContent: 'center', height: SIZES.height, paddingHorizontal: 20, justifyContent: "space-between", paddingVertical: "28%" }}>

                <View>
                    <Text style={{ fontSize: 32, fontWeight: "900", color: "#fff" }}>{btnText}</Text>
                    <Text style={{ ...commonStyles.fs18_400, color: "#fff", marginTop: 8, marginBottom: 20 }}>
                        Login now to track all your expenses and income at a place!
                    </Text>

                    <CustomTextInput
                        placeholder='shopad@gmail.com'
                        value={email}
                        keyboardType={'email-address'}
                        autoCapitalize='none'
                        icon={require("../assets/img/email.png")}
                        onChange={(val) => { setEmail(val); setEmailError(false); }}
                    />
                    {emailError ? <Text style={{ ...commonStyles.fs13_400, color: "red" }}>Email is required</Text> : <></>}
                    <View style={{ height: 14 }} />

                    <CustomTextInput
                        placeholder='Password'
                        value={password}
                        secureTextEntry={true}
                        icon={require("../assets/img/password.png")}
                        onChange={(val) => { setPassword(val); setPasswordError(false); }}
                    />
                    {passwordError ? <Text style={{ ...commonStyles.fs13_400, color: "red" }}>Password is required</Text> : <></>}
                    <View style={{ alignItems: "flex-end" }}>
                        <TouchableHighlight underlayColor="#1572B9"
                            onPress={() => {
                                navigation.navigate("ForgotPasswordPassword", {
                                    email: email,
                                })
                            }}
                        >
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
                        btnText={"Login as " + btnText}
                        onPress={() => { handleLogin(); }}
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

            <CustomPanel loading={loading} />

            <CustomLoader loading={loading} />
        </Auth_BG_Component>
    )
}