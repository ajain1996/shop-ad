import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import RegisterLoginScreen from "../screens/RegisterLoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordPassword from "../screens/ForgotPasswordPassword";
import { StatusBar } from "react-native";

const Stack = createStackNavigator();

export default function AuthStack() {

    const screenOptions = {
        headerShown: false,
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#1572B9" />
            <Stack.Navigator
                screenOptions={screenOptions}
                initialRouteName={"LoginScreen"}
            >
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="RegisterLoginScreen" component={RegisterLoginScreen} />
                <Stack.Screen name="ForgotPasswordPassword" component={ForgotPasswordPassword} />
            </Stack.Navigator>
        </>
    );
}
