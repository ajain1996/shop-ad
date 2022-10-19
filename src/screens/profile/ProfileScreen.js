import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import UserdetailsHeader from '../home/details/UserdetailsHeader';
import { commonStyles } from '../../utils/styles';
import { followersAndCount, followingAndCount } from '../../utils/API';
import Auth from '../../services/Auth';
import { RenderSingleWork } from '../works/WorksScreen';
import { SIZES } from '../../utils/theme';
import CustomLoader, { CustomPanel } from '../../components/CustomLoader';

export default function ProfileScreen({ navigation, route }) {
    const { offerData } = useSelector(state => state.Offer);
    const { jobsData } = useSelector(state => state.Job);
    const { workData } = useSelector(state => state.Work);

    const { userData } = useSelector(state => state.User);
    const [followerCount, setFollowerCount] = React.useState(0);
    const [followingCount, setFollowingCount] = React.useState(0);

    var userName = "";
    if (userData !== null && userData !== undefined) {
        userName = userData[0].name;
    }
    const userImage = require("../../assets/img/profile-tab.png")

    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        Auth.getLocalStorageData("bearer").then((token) => {
            followersAndCount(userData[0]?._id, token, (response) => {
                setLoading(false);
                if (response !== null) {
                    setFollowerCount(response?.count)
                    console.log('\n\n followersAndCount: count', response?.count)
                }
            });

            followingAndCount(userData[0]?._id, token, (response) => {
                setLoading(false);
                if (response !== null) {
                    setFollowingCount(response?.count)
                    console.log('\n\n followingAndCount: count', response?.count)
                }
            });
        })
    }, [])

    return (
        <ScrollView style={{ width: "100%", height: "100%" }}>
            <UserdetailsHeader
                navigation={navigation}
                title={userName}
            />

            <View style={{ marginBottom: 20 }}>
                <View style={{ paddingHorizontal: 14, paddingTop: 24, ...commonStyles.rowBetween, alignItems: 'flex-start' }}>
                    <View style={{ width: 75, ...commonStyles.centerStyles, height: 75, backgroundColor: "#dcdcdc", borderRadius: 100 }}>
                        {userData[0]?.userProfile ? <Image
                            source={{ uri: userData[0]?.userProfile }} resizeMode="contain"
                            style={{ width: 75, height: 75, borderRadius: 100 }}
                        /> : <Image
                            source={userImage} resizeMode="contain"
                            style={{ width: 60, height: 60, borderRadius: 100 }}
                        />}
                    </View>

                    <View style={{ ...commonStyles.rowEvenly, width: SIZES.width - 120, marginTop: 5 }}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ ...commonStyles.fs24_700 }}>{offerData?.length + jobsData?.length + workData?.length}</Text>
                            <Text style={{ ...commonStyles.fs14_500 }}>Post</Text>
                        </View>

                        <View style={{ alignItems: "center" }}>
                            {loading
                                ? <ActivityIndicator color="#000" size={34} />
                                : <Text style={{ ...commonStyles.fs24_700 }}>{followerCount}</Text>}
                            <Text style={{ ...commonStyles.fs14_500 }}>Followers</Text>
                        </View>

                        <View style={{ alignItems: "center" }}>
                            {loading
                                ? <ActivityIndicator color="#000" size={34} />
                                : <Text style={{ ...commonStyles.fs24_700 }}>{followingCount}</Text>}
                            <Text style={{ ...commonStyles.fs14_500 }}>Followings</Text>
                        </View>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 14, alignItems: "flex-start", marginTop: 5 }}>
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
                <Text style={{ ...commonStyles.fs18_500, marginBottom: 5 }}>All Offers</Text>
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
                                            source={{ uri: item?.offerImage ? item?.offerImage : "https://plus.unsplash.com/premium_photo-1661679026942-db5aef08c093?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" }}
                                            resizeMode="cover"
                                            style={{ width: SIZES.width / 1.2, height: SIZES.width / 1.2, borderRadius: 12 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            );
                        })
                    }
                </ScrollView>
            </View>

            <View style={{ padding: 9 }}>
                <Text style={{ ...commonStyles.fs18_500, marginBottom: 5, marginTop: 8 }}>All Jobs</Text>
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
                                            source={{ uri: item?.offerImage ? item?.offerImage : "https://plus.unsplash.com/premium_photo-1661679026942-db5aef08c093?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" }}
                                            resizeMode="cover"
                                            style={{ width: SIZES.width / 1.2, height: SIZES.width / 1.2, borderRadius: 12 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            );
                        })
                    }
                </ScrollView>
            </View>

            <View style={{ paddingVertical: 9 }}>
                <Text style={{ ...commonStyles.fs18_500, marginLeft: 9, marginTop: 2 }}>All Works</Text>
                <ScrollView horizontal>
                    {
                        workData.map((item, index) => {
                            return (
                                <View key={index} style={{ marginTop: -4 }}>
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

            <CustomPanel loading={loading} />
            <CustomLoader loading={loading} />

        </ScrollView>
    )
}