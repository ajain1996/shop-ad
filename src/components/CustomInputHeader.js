import { View, Text, TouchableHighlight, Image } from 'react-native'
import React from 'react'
import { commonStyles } from '../utils/styles'

export default function CustomInputHeader({ navigation, title }) {
    return (
        <View style={{ ...commonStyles.rowStart, width: "100%", height: 58, alignItems: "center", paddingHorizontal: 20, backgroundColor: "#fff" }}>
            <TouchableHighlight onPress={() => { navigation.goBack() }} underlayColor="#f7f8f9">
                <Image
                    source={require("../assets/img/left-arrow.png")}
                    resizeMode="contain"
                    style={{ width: 28, height: 28 }}
                />
            </TouchableHighlight>
            <Text style={{ ...commonStyles.fs22_600, marginLeft: 20 }}>{title}</Text>
        </View>
    )
}