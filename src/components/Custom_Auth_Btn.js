import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { SIZES } from '../utils/theme'
import { commonStyles } from '../utils/styles'

export default function Custom_Auth_Btn({ btnText, onPress, style, colors, textStyle }) {
    return (
        <LinearGradient colors={colors ? colors : ['#E27127', '#EDAA26']} style={{ zIndex: 1, borderRadius: 4, ...style }}>
            <TouchableHighlight style={[styles.btnWrapper]} onPress={onPress} underlayColor="E27127">
                <Text style={{ ...commonStyles.fs14_500, color: "#fff", ...textStyle }}>{btnText}</Text>
            </TouchableHighlight>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    btnWrapper: {
        width: SIZES.width - 40,
        height: 55,
        ...commonStyles.centerStyles,
    }
})