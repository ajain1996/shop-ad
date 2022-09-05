import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import RegisterLoginScreen from "../screens/RegisterLoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordPassword from "../screens/ForgotPasswordPassword";
import HomeScreen from "../screens/home/HomeScreen";
import { StatusBar } from "react-native";
import BottomTabs from "../bottom_tabs/BottomTabs";
import WorksScreen from "../screens/works/WorksScreen";
import AddSaleOfferScreen from "../screens/offer/AddSaleOfferScreen";
import AddJobScreen from "../screens/jobs/AddJobScreen";
import JobsScreen from "../screens/jobs/JobsScreen";

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
                initialRouteName={"SplashScreen"}
            >
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="RegisterLoginScreen" component={RegisterLoginScreen} />
                <Stack.Screen name="ForgotPasswordPassword" component={ForgotPasswordPassword} />
                <Stack.Screen name="Root" component={BottomTabs} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="WorksScreen" component={WorksScreen} />
                <Stack.Screen name="AddSaleOfferScreen" component={AddSaleOfferScreen} />
                <Stack.Screen name="JobsScreen" component={JobsScreen} />
                <Stack.Screen name="AddJobScreen" component={AddJobScreen} />
            </Stack.Navigator>
        </>
    );
}
