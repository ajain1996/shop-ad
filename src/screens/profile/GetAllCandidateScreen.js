import { View, Text, Modal, Image, ScrollView, TouchableOpacity, TouchableHighlight, TextInput, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { commonStyles } from '../../utils/styles';
import { COLORS, SIZES } from '../../utils/theme';

export default function GetAllCandidatesScreen({ navigation }) {

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
            {/* {membersHeader(navigation, setSearchInput, searchInput)} */}
            <View style={styles.headerContainer}>
                <TouchableHighlight
                    onPress={() => navigation.goBack()}
                    underlayColor="#eee">
                    <Image
                        source={require('../../assets/img/left-arrow.png')}
                        resizeMode="contain"
                        style={{ width: 25, height: 25 }}
                    />
                </TouchableHighlight>

                <TextInput
                    placeholder="Search Members"
                    placeholderTextColor="#999"
                    onChangeText={text => {
                        console.log(text);
                    }}
                    style={styles.searchInput}
                />
            </View>
            <ScrollView>
                {[1, 2, 3, 4]?.map((item, index) => {
                    return (
                        <TouchableOpacity
                            style={styles.itemWrapper}
                            key={index}
                            activeOpacity={0.9}
                            onPress={() => {
                                navigation.navigate('MemberDetailScreen', {
                                    item: item,
                                });
                            }}>
                            <View style={styles.itemContent}>
                                <Image
                                    source={{
                                        uri: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
                                    }}
                                    style={styles.itemImg}
                                />
                                <View style={styles.memberNameBlock}>
                                    <Text style={[styles.memberName, { color: "#000" }]}>
                                        User name
                                    </Text>
                                    <Text style={styles.conpanyName}>
                                        Phone Number
                                    </Text>
                                    <Text style={styles.conpanyName}>
                                        Phone Number
                                    </Text>
                                    <Text style={styles.conpanyName}>
                                        Phone Number
                                    </Text>
                                    <Text style={styles.conpanyName}>
                                        Phone Number
                                    </Text>
                                    <Text style={styles.conpanyName}>
                                        Phone Number
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}

                <View style={{ height: 20 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    itemWrapper: {
        elevation: 9,
        shadowColor: '#999',
        borderRadius: 8,
        marginTop: 16,
        marginHorizontal: 16,
    },
    itemContent: {
        ...commonStyles.rowStart,
        paddingHorizontal: 24,
        paddingVertical: 6,
        backgroundColor: '#fff',
    },
    itemImg: {
        width: 90,
        height: 90,
        borderRadius: 100,
        marginTop: 20
    },
    memberNameBlock: {
        width: '100%',
        padding: 16,
        width: '80%',
        // marginTop
    },
    memberName: {
        ...commonStyles.fs18_500,
        color: '#fff',
    },
    conpanyName: {
        ...commonStyles.fs12_400,
        color: "#000",
    },
    memberAddress: {
        ...commonStyles.fs18_500,
        marginTop: 14,
    },
    companywebsite: {
        ...commonStyles.fs12_400,
        color: COLORS.theme,
        marginTop: 5,
    },
    headerContainer: {
        ...commonStyles.rowStart,
        width: '100%',
        height: 62,
        ...commonStyles.elevation9,
        paddingHorizontal: 20,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#999',
        width: '88%',
        marginLeft: 20,
        height: 45,
        borderRadius: 6,
        paddingHorizontal: 14,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
