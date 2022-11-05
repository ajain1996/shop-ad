import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { commonStyles } from '../../utils/styles'

export default function HomeSearch({ width, onChange }) {
    return (
        <View style={{ width: width ? width : "100%", height: 58, ...commonStyles.rowStart, padding: 16, backgroundColor: "#EFEFEF", alignItems: 'center', padding: 20, elevation: 8, shadowColor: "#999" }}>
            <Image
                source={require('../../assets/img/location.png')}
                resizeMode="contain"
                style={{ width: 22, height: 24 }}
            />

            <TextInput
                placeholder='Near by location'
                placeholderTextColor="#999"
                onChangeText={onChange}
                style={{ ...commonStyles.fs14_500, height: 58, marginLeft: 12 }}
            />
        </View>
    )
}