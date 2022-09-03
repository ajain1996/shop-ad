import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { SIZES } from '../utils/theme'
import { commonStyles } from '../utils/styles'

export default function Custom_Auth_Btn({ btnText, onPress }) {
    return (
        <LinearGradient colors={['#E27127', '#EDAA26']} style={{ zIndex: 1 }}>
            <TouchableHighlight style={[styles.btnWrapper]} onPress={onPress}>
                <Text style={{ ...commonStyles.fs18_500, color: "#fff" }}>{btnText}</Text>
            </TouchableHighlight>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    btnWrapper: {
        width: SIZES.width - 40,
        height: 55,
        borderRadius: 4,
        ...commonStyles.centerStyles,
    }
})