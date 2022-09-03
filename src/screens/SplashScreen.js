import { View, Image } from 'react-native'
import React from 'react'
import { SHOPADLogo } from '../utils/imageManager'
import SvgUri from '../utils/Svg';
import { SIZES } from '../utils/theme';

export default function SplashScreen({ navigation }) {

    setTimeout(() => {
        navigation.navigate("RegisterLoginScreen")
    }, 2000);

    return (
        <View>
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