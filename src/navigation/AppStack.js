import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "../bottom_tabs/BottomTabs";
import HomeScreen from "../screens/home/HomeScreen";
import SplashScreen from "../screens/SplashScreen";
import { StatusBar } from "react-native";

export default function AppStack() {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#1572B9" />
            <Stack.Navigator initialRouteName="SplashScreen"
                screenOptions={screenOptions}
            >
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Root" component={BottomTabs} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
            </Stack.Navigator>
        </>
    );
}