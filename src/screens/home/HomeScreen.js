import { View, Text, Image, StatusBar, TouchableHighlight, FlatList } from 'react-native'
import React from 'react'
import { commonStyles } from '../../utils/styles'
import HomeHeader from './HomeHeader'
import HomeSearch from './HomeSearch'
import { SIZES } from '../../utils/theme'
import { useEffect } from 'react'
import { getAllOffersPostRequest } from '../../utils/API'
import { useState } from 'react'

export default function HomeScreen({ navigation }) {

    const [allOffers, setAllOffers] = useState([]);

    useEffect(() => {
        getAllOffersPostRequest((response) => {
            console.log("\n\n getAllOffersPostRequest: ", response);
        })
    }, [])

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <HomeHeader navigation={navigation} onPress={() => { navigation.navigate("AddSaleOfferScreen") }} />

            <HomeSearch onChange={(val) => { }} />

            <FlatList
                data={[1, 2, 3, 4, 5, 6]}
                renderItem={({ }) => {
                    return (
                        <View style={{ borderBottomColor: "#D8D8D8", borderBottomWidth: 1, backgroundColor: "#fff" }}>
                            <View style={{ ...commonStyles.rowBetween, height: 62, width: "100%", padding: 20 }}>
                                <View style={{ ...commonStyles.rowStart, alignItems: "center" }}>
                                    <Image
                                        source={require("../../assets/img/user_profile.png")}
                                        resizeMode="contain"
                                        style={{ width: 40, height: 40, borderRadius: 100 }}
                                    />

                                    <Text style={{ ...commonStyles.fs16_700, marginLeft: 10 }}>ZaraMan</Text>
                                </View>
                                <Image
                                    source={require("../../assets/img/3dots.png")}
                                    resizeMode="contain"
                                    style={{ width: 24, height: 24, borderRadius: 100 }}
                                />
                            </View>

                            <Image
                                source={require("../../assets/img/product_img.png")}
                                style={{ width: SIZES.width, height: 311 }}
                            />

                            <View style={{ ...commonStyles.rowBetween, padding: 20 }}>
                                <View style={{ ...commonStyles.rowStart }}>
                                    <View style={{ ...commonStyles.row }}>
                                        <TouchableHighlight onPress={() => { }} underlayColor="#fff">
                                            <Image
                                                source={require("../../assets/img/heart.png")}
                                                style={{ width: 24, height: 24, tintColor: "#FF0000" }}
                                            />
                                        </TouchableHighlight>
                                        <Text style={{ ...commonStyles.fs14_500, marginLeft: 9 }}>120 Likes</Text>
                                    </View>

                                    <View style={{ ...commonStyles.row, marginLeft: 34 }}>
                                        <TouchableHighlight onPress={() => { }} underlayColor="#fff">
                                            <Image
                                                source={require("../../assets/img/send.png")}
                                                style={{ width: 20, height: 20, tintColor: "#000000" }}
                                            />
                                        </TouchableHighlight>
                                        <Text style={{ ...commonStyles.fs14_500, marginLeft: 9 }}>20 Shares</Text>
                                    </View>
                                </View>
                                <TouchableHighlight onPress={() => { }} underlayColor="#fff">
                                    <Image
                                        source={require("../../assets/img/bookmark.png")}
                                        style={{ width: 24, height: 24, tintColor: "#000000" }}
                                    />
                                </TouchableHighlight>
                            </View>
                        </View>
                    );
                }}
            />

            <View style={{ height: 64 }} />
        </>
    )
}