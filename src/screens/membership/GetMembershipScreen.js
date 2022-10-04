import { View, Text, Image, StyleSheet, ImageBackground, TouchableHighlight, ScrollView } from 'react-native'
import React from 'react'
import MembershipHeader from './MembershipHeader'
import { commonStyles } from '../../utils/styles'
import { SIZES } from '../../utils/theme'
import Custom_Auth_Btn from '../../components/Custom_Auth_Btn'
import Auth from '../../services/Auth'
import { useDispatch } from 'react-redux'
import { removeUser } from '../../redux/reducer/user'

export default function GetMembershipScreen({ navigation }) {
    const dispatch = useDispatch();

    return (
        <ScrollView style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
            <MembershipHeader navigation={navigation} title="Premium" />
            <View style={{ marginTop: 22, paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 28, color: "#1572B9", fontWeight: "900" }}>Get Membership Now</Text>

                <Text style={{ ...commonStyles.fs16_500, marginTop: 8 }}>
                    New user need to get membership to continue to use ShopAd.
                </Text>

                <View style={[styles.premiumContentWrapper]}>
                    <RenderPremiumContent
                        title="Premium Content"
                        subText="New user need to get membership to continue to use ShopAd."
                    />
                    <RenderPremiumContent
                        title="Premium Content"
                        subText="New user need to get membership to continue to use ShopAd."
                    />
                    <RenderPremiumContent
                        title="Premium Content"
                        subText="New user need to get membership to continue to use ShopAd."
                    />
                </View>

                <ImageBackground
                    source={require("../../assets/img/membership-bg.png")}
                    style={{ width: "100%", height: 200, marginTop: 18, borderRadius: 4, marginBottom: 20 }}
                >
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Image
                            source={require("../../assets/img/membership-bg2.png")}
                            style={{ width: "100%", height: 200, borderRadius: 4 }}
                        />
                        <View style={{ position: 'absolute', alignItems: "center" }}>
                            <View style={{ ...commonStyles.rowStart, alignItems: 'flex-end', marginBottom: 12 }}>
                                <Text style={{ fontSize: 28, color: "#fff", fontWeight: "900" }}>
                                    Rs 200/
                                </Text>
                                <Text style={{ fontSize: 20, color: "#fff", fontWeight: "400" }}>
                                    Month
                                </Text>
                            </View>
                            <View style={{ width: SIZES.width - 100, height: 1, backgroundColor: "#fff" }} />
                            <Text style={{ fontSize: 20, color: "#fff", fontWeight: "400", marginTop: 12 }}>
                                Rs 6000 billed annually
                            </Text>
                            <TouchableHighlight style={[styles.bestValueBtn]}>
                                <Text style={{ fontSize: 14, color: "#000", fontWeight: "500" }}>
                                    Best Value
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </ImageBackground>

                <Custom_Auth_Btn
                    btnText="Get Now"
                    onPress={async () => {
                        Auth.logout().then(() => {
                            dispatch(removeUser([]));
                        })
                    }}
                />
            </View>
        </ScrollView>
    )
}

const RenderPremiumContent = ({ title, subText }) => {
    return (
        <View style={{ ...commonStyles.rowStart, alignItems: 'center', marginVertical: 6 }}>
            <Image
                source={require("../../assets/img/badge.png")}
                style={{ width: 34, height: 36, marginRight: 14 }}
            />
            <View style={{ width: SIZES.width - 100 }}>
                <Text style={{ ...commonStyles.fs16_500 }}>{title}</Text>
                <Text style={{ ...commonStyles.fs14_400, marginTop: 2 }}>
                    {subText}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    premiumContentWrapper: {
        width: "100%",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: "#000",
        marginTop: 24
    },
    bestValueBtn: {
        width: 114, height: 32,
        backgroundColor: "#fff",
        borderRadius: 30,
        ...commonStyles.centerStyles,
        marginTop: 17
    }
})
