import { View, Text, TouchableHighlight, StatusBar, Alert } from 'react-native'
import React from 'react'
import { SIZES } from '../utils/theme'
import Auth_BG_Component from '../components/Auth_BG_Component'
import { commonStyles } from '../utils/styles'
import Custom_Auth_Btn from '../components/Custom_Auth_Btn'
import CustomTextInput from '../components/CustomTextInput'
import { mobileRegisterPostRequest } from '../utils/API'
import Toast from 'react-native-simple-toast'
import Auth from '../services/Auth'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/reducer/user'
import CustomLoader, { CustomPanel } from '../components/CustomLoader'

export default function RegisterScreen({ navigation }) {
    const dispatch = useDispatch();
    const [nameError, setNameError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleRegister = () => {
        if (email.length === 0) {
            setEmailError(true)
        } if (name.length === 0) {
            setNameError(true)
        } if (password.length === 0) {
            setPasswordError(true)
        } else {
            mobileRegisterPostRequest(email, password, name, "user", async (response) => {
                if (response !== null) {
                    console.log("\n\n Response mobileLoginPostRequest: ", response?.message);
                    if (response?.message !== undefined) {
                        if (response?.message === "Mail exists") {
                            Alert.alert("Alert", response?.message);
                        } else {
                            const userData = response?.user;
                            dispatch(setUser(userData));
                            await Auth.setAccount(userData);
                            Toast.show('Register Successfully!');
                            setName("")
                            setEmail("")
                            setPassword("")
                            navigation.navigate("LoginScreen")
                        }
                    }
                }
            })
        }
    }

    return (
        <Auth_BG_Component>
            <StatusBar barStyle="light-content" backgroundColor="#1572B9" />
            <View style={{ justifyContent: 'center', height: SIZES.height, paddingHorizontal: 20, justifyContent: "space-between", paddingVertical: "28%" }}>

                <View>
                    <Text style={{ fontSize: 32, fontWeight: "900", color: "#fff" }}>Shop Owner</Text>
                    <Text style={{ ...commonStyles.fs18_400, color: "#fff", marginTop: 8, marginBottom: 20 }}>
                        Register Now to access all the features of ShopAd!
                    </Text>

                    <CustomTextInput
                        placeholder='shopad@gmail.com'
                        value={email}
                        keyboardType={'email-address'}
                        autoCapitalize='none'
                        onChange={(val) => { setEmail(val); setEmailError(false); }}
                    />
                    {emailError ? <Text style={{ ...commonStyles.fs13_400, color: "red" }}>Email is required</Text> : <></>}
                    <View style={{ height: 14 }} />

                    <CustomTextInput
                        placeholder='Name'
                        value={name}
                        keyboardType="default"
                        onChange={(val) => { setName(val); setNameError(false); }}
                    />
                    {nameError ? <Text style={{ ...commonStyles.fs13_400, color: "red" }}>Name is required</Text> : <></>}
                    <View style={{ height: 14 }} />

                    <CustomTextInput
                        placeholder='Password'
                        value={password}
                        secureTextEntry={true}
                        onChange={(val) => { setPassword(val); setPasswordError(false); }}
                    />
                    {passwordError ? <Text style={{ ...commonStyles.fs13_400, color: "red" }}>Password is required</Text> : <></>}
                    <View style={{ height: 14 }} />

                    <Custom_Auth_Btn
                        btnText="Register as Shop Owner"
                        onPress={() => { handleRegister(); /*navigation.navigate("Root")*/ }}
                    />
                </View>

                <View style={{ alignItems: "center", zIndex: 1 }}>
                    <View style={{ ...commonStyles.row }}>
                        <Text style={{ ...commonStyles.fs18_500, color: "#fff" }}>Already have an account? </Text>
                        <TouchableHighlight onPress={() => { navigation.navigate("LoginScreen") }} underlayColor="#1572B9">
                            <Text style={{ ...commonStyles.fs18_500, color: "#EDAA26" }}>Login</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
            <CustomPanel loading={loading} />

            <CustomLoader loading={loading} />
        </Auth_BG_Component>
    )
}