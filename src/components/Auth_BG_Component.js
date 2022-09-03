import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import { SIZES } from '../utils/theme'

export default function Auth_BG_Component({ children }) {
    return (
        <View>
            <ImageBackground
                source={require("../assets/img/auth-bg.png")}
                style={{ width: SIZES.width, height: SIZES.height }}
            >
                <Image
                    source={require("../assets/img/auth-top.png")}
                    style={{ position: "absolute", top: 0, width: SIZES.width, height: 233 }}
                />

                {children}

                <Image
                    source={require("../assets/img/auth-top.png")}
                    style={{ position: "absolute", bottom: 0, width: SIZES.width, height: 233, transform: [{ rotate: '180deg' }] }}
                />
            </ImageBackground>
        </View>
    )
}