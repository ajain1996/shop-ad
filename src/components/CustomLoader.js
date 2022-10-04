import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../utils/theme'

export default function CustomLoader({ loading }) {
    return (
        loading
            ? <View style={{ ...styles.loaderStyle }}>
                <ActivityIndicator size={50} color={COLORS.primary} />
            </View>
            : <></>
    )
}

export const CustomPanel = ({ loading }) => {
    return (
        loading
            ? <View style={{
                justifyContent: 'center',
                height: '100%',
                paddingBottom: 10,
                backgroundColor: 'rgba(0,0,0,0.5)',
                position: 'absolute',
                top: 0, bottom: 0,
                right: 0, left: 0
            }} /> : <></>
    );
}

const styles = StyleSheet.create({
    loaderStyle: {
        backgroundColor: 'transparent',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
