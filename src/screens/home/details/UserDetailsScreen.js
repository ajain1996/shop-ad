import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import UserdetailsHeader from './UserdetailsHeader'
import { commonStyles } from '../../../utils/styles';
import { SIZES } from '../../../utils/theme';

export default function UserDetailsScreen({ navigation, route }) {
    const { userName, userImage } = route.params;
    return (
        <View style={{ width: "100%", height: "100%" }}>
            <UserdetailsHeader
                navigation={navigation}
                title={userName}
            />

            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
                numColumns={3}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity activeOpacity={0.5} onPress={() => {
                            navigation.navigate("UserPostScreen", {
                                item: item,
                            })
                        }}>
                            <Image
                                source={require("../../../assets/img/product_img.png")}
                                resizeMode="cover"
                                style={{ width: SIZES.width / 3, height: SIZES.width / 3 }}
                            />
                        </TouchableOpacity>
                    );
                }}
                ListHeaderComponent={
                    <View style={{ marginBottom: 20 }}>
                        <View style={{ paddingHorizontal: 24, paddingTop: 24, ...commonStyles.rowBetween, alignItems: 'flex-start' }}>
                            <View style={{ width: 90, alignItems: 'center' }}>
                                <Image
                                    source={userImage} resizeMode="contain"
                                    style={{ width: 85, height: 85, borderRadius: 100 }}
                                />
                            </View>

                            <View style={{ ...commonStyles.rowEvenly, width: SIZES.width - 120, marginTop: 20 }}>
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ ...commonStyles.fs24_700 }}>16</Text>
                                    <Text style={{ ...commonStyles.fs14_500 }}>Post</Text>
                                </View>

                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ ...commonStyles.fs24_700 }}>25k</Text>
                                    <Text style={{ ...commonStyles.fs14_500 }}>Followers</Text>
                                </View>

                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ ...commonStyles.fs24_700 }}>276</Text>
                                    <Text style={{ ...commonStyles.fs14_500 }}>Followings</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ paddingHorizontal: 24, alignItems: "flex-start", marginTop: 5 }}>
                            <Text style={{ ...commonStyles.fs16_700, textAlign: 'center' }}>{userName}</Text>
                            <View style={{ ...commonStyles.rowStart }}>
                                <Image
                                    source={require("../../../assets/img/location.png")}
                                    resizeMode="contain"
                                    style={{ width: 22, height: 28, tintColor: "#0073FF" }}
                                />
                                <Text style={{ ...commonStyles.fs16_500, color: '#0073FF' }}>Gumasta Nagar, Indore</Text>
                            </View>
                        </View>
                    </View>
                }
                ListFooterComponent={
                    <View>
                        <View style={{ height: 4 }} />
                    </View>
                }
            />

        </View>
    )
}