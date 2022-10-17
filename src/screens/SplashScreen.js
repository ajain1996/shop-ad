import { View, Image, StatusBar } from 'react-native'
import React from 'react'
import { SIZES } from '../utils/theme';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { mobileLoginPostRequest } from '../utils/API';
import Auth from '../services/Auth';

export default function SplashScreen({ navigation }) {
    const { login } = useSelector(state => state.User);
    const { userType } = useSelector(state => state.UserType);

    setTimeout(() => {
        if (login) {
            navigation.navigate("AppStack")
        } else {
            navigation.navigate("Auth")
        }
    }, 2000);


    useEffect(() => {
        Auth.getLocalStorageData("email_password").then((email_password) => {
            if (email_password !== null) {
                mobileLoginPostRequest(email_password[0], email_password[1], userType, async (response) => {
                    if (response !== null) {
                        if (response?.message !== undefined) {
                            await Auth.setLocalStorageData("bearer", response?.token)
                        }
                    }
                })
            }
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
                <Image
                    source={require("../assets/img/shopad-logo.png")}
                    resizeMode="contain"
                    style={{ width: SIZES.width / 1.8, height: SIZES.width / 1.6 }}
                />
            </View>
        </View>
    )
}