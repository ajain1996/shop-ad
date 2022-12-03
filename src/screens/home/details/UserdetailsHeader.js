import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { commonStyles } from '../../../utils/styles';
import { useSelector } from 'react-redux';

export default function UserdetailsHeader({ navigation, title }) {
    const { userData } = useSelector(state => state.User);

    return (
        <View
            style={{
                ...commonStyles.rowBetween,
                width: '100%',
                height: 58,
                alignItems: 'center',
                paddingHorizontal: 20,
                backgroundColor: '#fff',
            }}>
            <View style={{ ...commonStyles.rowStart, alignItems: 'center' }}>
                <TouchableHighlight
                    onPress={() => {
                        navigation.goBack();
                    }}
                    underlayColor="#f7f8f9">
                    <Image
                        source={require('../../../assets/img/left-arrow.png')}
                        resizeMode="contain"
                        style={{ width: 28, height: 28 }}
                    />
                </TouchableHighlight>
                <Text style={{ ...commonStyles.fs22_600, marginLeft: 20 }}>{title}</Text>
            </View>
            {userData[0]?.name === title
                ? <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('UpdateProfileScreen');
                    }}>
                    <Image
                        source={require('../../../assets/img/edit.png')}
                        resizeMode="contain"
                        style={{ width: 24, height: 24, marginLeft: 8 }}
                    />
                </TouchableOpacity>
                : <></>}
        </View>
    );
}
