import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { SIZES } from '../utils/theme'
import { commonStyles } from '../utils/styles'

export default function Custom_Auth_Btn({ btnText, onPress }) {
    return (
        <LinearGradient colors={['#E27127', '#EDAA26']} style={{ zIndex: 1, borderRadius: 4, }}>
            <TouchableHighlight style={[styles.btnWrapper]} onPress={onPress} underlayColor="E27127">
                <Text style={{ ...commonStyles.fs18_500, color: "#fff" }}>{btnText}</Text>
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