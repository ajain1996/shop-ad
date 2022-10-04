import { View, Image, StatusBar } from 'react-native'
import React from 'react'
import { SIZES } from '../utils/theme';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { mobileLoginPostRequest } from '../utils/API';
import Auth from '../services/Auth';
import Toast from 'react-native-simple-toast'
import { setUser } from '../redux/reducer/user';

export default function SplashScreen({ navigation }) {
    const dispatch = useDispatch();

    const { userData, login } = useSelector(state => state.User);

    console.log("\n\n userData: ", userData, login)

    setTimeout(() => {
        if (login) {
            navigation.navigate("AppStack")
        } else {
            navigation.navigate("Auth")
        }
    }, 2000);

    useEffect(() => {
        Auth.getLocalStorageData("email_password").then((email_password) => {
            console.log("\n\n email_password: ", email_password.split(",")[0])
            mobileLoginPostRequest(email_password.split(",")[0], email_password.split(",")[1], "user", async (response) => {
                if (response !== null) {
                    console.log("\n\n Response mobileLoginPostRequest: ", response);
                    if (response?.message !== undefined) {
                        if (response?.message === "Mail exists") {
                            Alert.alert("Alert", response?.message);
                        } else {
                            const userData = response?.user;
                            dispatch(setUser(userData));
                            await Auth.setAccount(userData);
                            await Auth.setLocalStorageData("bearer", response.token.toString())
                            Toast.show('Register Successfully!');
                        }
                    }
                }
            })
        })
    }, [])


    return (
        <View>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <Image
                source={require("../assets/img/splash-bg.png")}
                resizeMode="contain"
                style={{ width: "100%", height: SIZES.height / 2 }}
            />
            <View style={{ alignItems: "center", position: "absolute", width: "100%", height: SIZES.height, justifyContent: "center" }}>
                {/* <SvgUri source={SHOPADLogo} width="213" height="251" /> */}
                <Image
                    source={require("../assets/img/shopad-logo.png")}
                    resizeMode="contain"
                    style={{ width: SIZES.width / 1.8, height: SIZES.width / 1.6 }}
                />
            </View>
        </View>
    )
}