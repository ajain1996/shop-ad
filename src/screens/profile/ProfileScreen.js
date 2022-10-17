import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import UserdetailsHeader from '../home/details/UserdetailsHeader';
import { commonStyles } from '../../utils/styles';
import { followersAndFollowingCount } from '../../utils/API';
import Auth from '../../services/Auth';
import { RenderSingleWork } from '../works/WorksScreen';
import { SIZES } from '../../utils/theme';

export default function ProfileScreen({ navigation, route }) {
    const { offerData } = useSelector(state => state.Offer);
    const { jobsData } = useSelector(state => state.Job);
    const { workData } = useSelector(state => state.Work);

    // const { userName, userImage } = route.params;
    const { userData } = useSelector(state => state.User);
    const [followerCount, setFollowerCount] = React.useState(0);
    var userName = "";
    if (userData[0] !== null && userData[0] !== undefined) {
        userName = userData[0].email?.split("@")[0];
    }
    const userImage = require("../../assets/img/auth-svg.png")

    React.useEffect(() => {
        Auth.getLocalStorageData("bearer").then((token) => {
            followersAndFollowingCount(userData[0]._id, token, (response) => {
                if (response !== null) {
                    setFollowerCount(response?.count)
                }
            })
        })
    }, [])

    return (
        <ScrollView style={{ width: "100%", height: "100%" }}>
            <UserdetailsHeader
                navigation={navigation}
                title={userName}
            />

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
                            <Text style={{ ...commonStyles.fs24_700 }}>{followerCount}</Text>
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
                            source={require("../../assets/img/location.png")}
                            resizeMode="contain"
                            style={{ width: 22, height: 28, tintColor: "#0073FF" }}
                        />
                        <Text style={{ ...commonStyles.fs16_500, color: '#0073FF' }}>Gumasta Nagar, Indore</Text>
                    </View>
                </View>
            </View>

            <View style={{ padding: 9 }}>
                <Text style={{ ...commonStyles.fs18_500 }}>All Offers</Text>
                <ScrollView horizontal>
                    {
                        offerData.map((item, index) => {
                            return (
                                <View key={index} style={{ marginRight: 20 }}>
                                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                        navigation.navigate("UserPostScreen", {
                                            item: item,
                                            userName: userName,
                                        })
                                    }}>
                                        <Image
                                            source={{ uri: item?.offerImage }}
                                            resizeMode="cover"
                                            style={{ width: SIZES.width / 1.2, height: SIZES.width / 1.2 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            );
                        })
                    }
                </ScrollView>
            </View>

            <View style={{ padding: 9 }}>
                <Text style={{ ...commonStyles.fs18_500 }}>All Jobs</Text>
                <ScrollView horizontal>
                    {
                        jobsData.map((item, index) => {
                            return (
                                <View key={index} style={{ marginRight: 20 }}>
                                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                        navigation.navigate("UserPostScreen", {
                                            item: item,
                                            userName: userName,
                                        })
                                    }}>
                                        <Image
                                            source={{ uri: item?.offerImage }}
                                            resizeMode="cover"
                                            style={{ width: SIZES.width / 1.2, height: SIZES.width / 1.2 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            );
                        })
                    }
                </ScrollView>
            </View>

            <View style={{ padding: 9 }}>
                <Text style={{ ...commonStyles.fs18_500 }}>All Works</Text>
                <ScrollView horizontal>
                    {
                        workData.map((item, index) => {
                            return (
                                <View key={index}>
                                    <RenderSingleWork
                                        item={item}
                                    />
                                </View>
                            );
                        })
                    }
                </ScrollView>
            </View>

            <View>
                <View style={{ height: 60 }} />
            </View>

        </ScrollView>
    )
}