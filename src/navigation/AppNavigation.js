import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Auth from "../services/Auth";
import { setUser } from '../redux/reducer/user';
import { useDispatch, useSelector } from 'react-redux';
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { useState } from "react";
import SplashScreen from "../screens/SplashScreen";
import { StatusBar } from "react-native";

export default function AppNavigation() {

    const dispatch = useDispatch();

    const { userData, login } = useSelector(state => state.User);

    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
    };

    const [loginChk, setLoginChk] = useState(true);

    const getUser = async () => {
        let data = await Auth.getAccount();
        console.log('data fetched: ', data);
        if (data !== null) {
            dispatch(setUser(data));
            setLoginChk(false);
        } else {
            setLoginChk(false);
        }
    }

    useEffect(() => {
        getUser()
    }, []);

    if (loginChk) {
        return null;
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#1572B9" />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="SplashScreen"
                    screenOptions={screenOptions}
                >
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />
                    {!login
                        ? <Stack.Screen name="Auth" component={AuthStack} />
                        : <Stack.Screen name="AppStack" component={AppStack} />}
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}