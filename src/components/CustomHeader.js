import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { commonStyles } from '../utils/styles'
import { COLORS } from '../utils/theme'

const CustomHeader = ({ title, navigation }) => {
    return (
        <TouchableOpacity style={styles.main} onPress={() => navigation.back()}>
            <Image
                source={require("../assets/img/left-arrow.png")}
                resizeMode="contain"
                style={{ width: 25, height: 25 }}
            />
            <Text style={styles.logo}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomHeader;

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: 15,
        backgroundColor: COLORS.white,
        elevation: 9, shadowColor: "#999",
        ...commonStyles.containerStyle,
        height: 62,
        ...commonStyles.rowStart,
        alignItems: 'center'
    },
    logo: {
        fontFamily: "bold",
        color: "#000",
        fontSize: 20,
        marginLeft: 16,
        fontWeight: "700"
    },
})
