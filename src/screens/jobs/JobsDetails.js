import { View, Text } from 'react-native'
import React from 'react'
import { commonStyles } from '../../utils/styles'

export function JobsDetails({ text, item }) {
    return (
        <View style={{ ...commonStyles.rowStart, paddingHorizontal: 12 }}>
            <Text style={{ ...commonStyles.fs12_500, marginLeft: 9 }}>
                {text}
            </Text>
            <Text style={{ ...commonStyles.fs12_400, marginLeft: 9 }}>
                {item?.toString()}
            </Text>
        </View>
    )
}