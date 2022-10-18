import { View, Text, Image, TouchableOpacity, ScrollView, TouchableHighlight, ActivityIndicator } from 'react-native'
import React from 'react'
import UserdetailsHeader from './UserdetailsHeader'
import { commonStyles } from '../../../utils/styles';
import { SIZES } from '../../../utils/theme';
import { useSelector } from 'react-redux';
import { followersAndCount, followingAndCount, followUserPostAPI } from '../../../utils/API';
import Auth from '../../../services/Auth';
import { RenderSingleWork } from '../../works/WorksScreen';
import Toast from 'react-native-simple-toast'

export default function UserDetailsScreen({ navigation, route }) {
    const { offerData } = useSelector(state => state.Offer);
    const { jobsData } = useSelector(state => state.Job);
    const { workData } = useSelector(state => state.Work);

    const { userName, userImage } = route.params;
    const { userData } = useSelector(state => state.User);
    const [followerCount, setFollowerCount] = React.useState(0);
    const [followingCount, setFollowingCount] = React.useState(0);
    const [isFollowed, setIsFollowed] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        Auth.getLocalStorageData("bearer").then((token) => {
            followersAndCount(userData[0]?._id, token, (response) => {
                setLoading(false);
                if (response !== null) {
                    setFollowerCount(response?.count)
                    const data = response?.data;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i]?.follwedId === userData[0]?._id) {
                            setIsFollowed(true);
                        }
                    }
                }
            });

            followingAndCount(userData[0]?._id, token, (response) => {
                if (response !== null) {
                    setFollowingCount(response?.count)
                }
            });
        })
    }, [followerCount, followingCount])

    const handleFollow = () => {
        setIsFollowed(true);
        Auth.getLocalStorageData("bearer").then((token) => {
            followUserPostAPI(userData[0]?._id, route?.params?.userId, token, (response) => {
                if (response !== null) {
                    if (response?.message === "Follwed Sucessfully.") {
                        Toast.show('Followed Successfully!');
                    } else if (response?.message === "Already Follwed") {
                        Toast.show('Already Follwed');
                    }
                }
            })
        })
    }

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
                            source={require("../../../assets/img/location.png")}
                            resizeMode="contain"
                            style={{ width: 22, height: 28, tintColor: "#0073FF" }}
                        />
                        <Text style={{ ...commonStyles.fs16_500, color: '#0073FF' }}>Gumasta Nagar, Indore</Text>
                    </View>

                    <TouchableHighlight style={{ width: 80, height: 35, borderRadius: 9, borderWidth: 1, borderColor: "#999", ...commonStyles.centerStyles, marginTop: 12 }} underlayColor="#eee" onPress={handleFollow}>
                        <Text style={{ ...commonStyles.fs13_400 }}>{isFollowed ? "Following" : "Follow"}</Text>
                    </TouchableHighlight>
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
                <Text style={{ ...commonStyles.fs18_500, marginLeft: 10 }}>All Works</Text>
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
                <View style={{ height: 4 }} />
            </View>

            {/* <CustomPanel loading={loading} />
            <CustomLoader loading={loading} /> */}

        </ScrollView>
    )
}