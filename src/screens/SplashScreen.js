import { View, Image, StatusBar } from 'react-native'
import React from 'react'
import { SIZES } from '../utils/theme';
import { useSelector } from 'react-redux';

export default function SplashScreen({ navigation }) {

    const { userData, login } = useSelector(state => state.User);

    console.log("\n\n userData: ", userData, login)

    setTimeout(() => {
        if (login) {
            navigation.navigate("AppStack")
        } else {
            navigation.navigate("Auth")
        }
    }, 2000);

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