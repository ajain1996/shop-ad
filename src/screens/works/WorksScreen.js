import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import HomeHeader from '../home/HomeHeader'
import HomeSearch from '../home/HomeSearch'
import { commonStyles } from '../../utils/styles'
import { SIZES } from '../../utils/theme'

export default function WorksScreen() {
    return (
        <View style={{ backgroundColor: "#f7f8f9" }}>
            <HomeHeader />
            <HomeSearch onChange={() => { }} />

            <FlatList
                data={[1, 2, 3, 4, 5, 6]}
                renderItem={({ }) => {
                    return (
                        <View style={{ margin: 15, padding: 9, backgroundColor: "#fff", borderWidth: 1, borderColor: "#D8D8D8", borderRadius: 4 }}>
                            <View style={{ ...commonStyles.rowBetween, alignItems: "flex-start" }}>
                                <Image
                                    source={require('../../assets/img/work_img.png')}
                                    style={{ width: 101, height: 61 }}
                                />
                                <View style={{ width: SIZES.width / 1.5, marginHorizontal: 10 }}>
                                    <Text style={{ ...commonStyles.fs18_700 }}>ZaraMan Clothing Brand</Text>
                                    <Text style={{ ...commonStyles.fs16_700, marginTop: 12 }}>Designation: </Text>
                                    <Text style={{ ...commonStyles.fs14_400 }}>
                                        New user need to get membership to continue to use ShopAd.
                                    </Text>

                                    <Text style={{ ...commonStyles.fs16_700, marginTop: 12 }}>Contact Info: </Text>
                                    <Text style={{ ...commonStyles.fs14_400 }}>
                                        +31 1548784658
                                    </Text>
                                </View>
                            </View>
                        </View>
                    );
                }}
                ListFooterComponent={
                    <View style={{ height: 200 }} />
                }
            />
        </View>
    )
}