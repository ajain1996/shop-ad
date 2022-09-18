import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "../bottom_tabs/BottomTabs";
import HomeScreen from "../screens/home/HomeScreen";
import SplashScreen from "../screens/SplashScreen";
import { StatusBar } from "react-native";
import WorksScreen from "../screens/works/WorksScreen";
import AddSaleOfferScreen from "../screens/offer/AddSaleOfferScreen";
import JobsScreen from "../screens/jobs/JobsScreen";
import AddJobScreen from "../screens/jobs/AddJobScreen";
import GetMembershipScreen from "../screens/membership/GetMembershipScreen";
import AddWorksScreen from "../screens/works/AddWorksScreen";

export default function AppStack() {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#1572B9" />
            <Stack.Navigator initialRouteName="Root"
                screenOptions={screenOptions}
            >
                <Stack.Screen name="Root" component={BottomTabs} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="WorksScreen" component={WorksScreen} />
                <Stack.Screen name="AddSaleOfferScreen" component={AddSaleOfferScreen} />
                <Stack.Screen name="JobsScreen" component={JobsScreen} />
                <Stack.Screen name="AddJobScreen" component={AddJobScreen} />
                <Stack.Screen name="GetMembershipScreen" component={GetMembershipScreen} />
                <Stack.Screen name="AddWorksScreen" component={AddWorksScreen} />
            </Stack.Navigator>
        </>
    );
}