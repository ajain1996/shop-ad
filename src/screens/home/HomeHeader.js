import { View, Text, Image, TouchableHighlight } from 'react-native'
import React from 'react'
import { commonStyles } from '../../utils/styles'

export default function HomeHeader({ navigation, onPress }) {
    return (
        <View style={{ width: "100%", height: 70, ...commonStyles.rowBetween, padding: 20, backgroundColor: "#fff" }}>
            <TouchableHighlight onPress={() => { }} underlayColor="#f7f8f9">
                <Image
                    source={require("../../assets/img/menu.png")}
                    resizeMode="contain"
                    style={{ width: 27, height: 27 }}
                />
            </TouchableHighlight>

            <Image
                source={require("../../assets/img/shopad.png")}
                resizeMode="contain"
                style={{ width: 111, height: 48 }}
            />

            <TouchableHighlight onPress={() => {
                if (onPress) {
                    onPress()
                }
            }} underlayColor="#f7f8f9">
                <Image
                    source={require("../../assets/img/plus.png")}
                    resizeMode="contain"
                    style={{ width: 28, height: 28 }}
                />
            </TouchableHighlight>
        </View>
    )
}