import { View, Text, Image, StatusBar, TouchableHighlight, FlatList, Share } from 'react-native'
import React from 'react'
import { commonStyles } from '../../utils/styles'
import { SIZES } from '../../utils/theme'
import HomeHeader from '../home/HomeHeader'
import HomeSearch from '../home/HomeSearch'
import { useEffect } from 'react'
import { addLikesByIDPostAPI, getAllJobsPostRequest, getCommentsCountByIDPostAPI, getJobsByLocationPostRequest, getLikesCountByIDPostAPI, getUserByIDPostAPI, unLikesByIDPostAPI } from '../../utils/API'
import { useState } from 'react'
import Auth from '../../services/Auth'
import CustomLoader, { CustomPanel } from '../../components/CustomLoader'
import PTRView from 'react-native-pull-to-refresh';
import { useDispatch, useSelector } from 'react-redux'
import { setJob } from '../../redux/reducer/jobs'
import Toast from 'react-native-simple-toast'
import HomeModal from '../home/HomeModal'

export default function JobsScreen({ navigation }) {
    const dispatch = useDispatch();
    const { jobsData } = useSelector(state => state.Job);

    const [bearerToken, setBearerToken] = useState("");
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            const unsubscribe = navigation.addListener('focus', () => {
                Auth.getLocalStorageData("bearer").then((token) => {
                    setBearerToken(token);
                    getAllJobsPostRequest(token, (response) => {
                        if (response !== null) {
                            dispatch(setJob(response?.data));
                        }
                    })
                })
            });
            return unsubscribe;
        })()
    }, [navigation]);

    useEffect(() => {
        setLoading(true);
        Auth.getLocalStorageData("bearer").then((token) => {
            setLoading(false);
            setBearerToken(token);
            getAllJobsPostRequest(token, (response) => {
                if (response !== null) {
                    dispatch(setJob(response?.data));
                }
            })
        })
    }, [])

    function _refresh() {
        setLoading(true);
        Auth.getLocalStorageData("bearer").then((token) => {
            setLoading(false);
            setBearerToken(token);
            getAllJobsPostRequest(token, (response) => {
                if (response !== null) {
                    dispatch(setJob(response?.data));
                }
            })
        })
    }

    return (
        <>
            <PTRView onRefresh={_refresh}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <HomeHeader navigation={navigation} onPress={() => navigation.navigate("AddJobScreen")} />

                <HomeSearch onChange={(val) => {
                    setLoading(true);
                    Auth.getLocalStorageData("bearer").then((token) => {
                        setLoading(false);
                        getJobsByLocationPostRequest(val, token, (response) => {
                            if (response !== null) {
                                dispatch(setJob(response?.data));
                            }
                        })
                    })
                }} />

                <FlatList
                    data={jobsData}
                    renderItem={({ item }) => {
                        return (
                            <RenderSingleJob
                                item={item}
                                bearerToken={bearerToken}
                                navigation={navigation}
                            />
                        );
                    }}
                />

                <View style={{ height: 64 }} />

                <CustomPanel loading={loading} />
                <CustomLoader loading={loading} />
            </PTRView>
        </>
    )
}

const RenderSingleJob = ({ item, bearerToken, navigation }) => {
    const { userType } = useSelector(state => state.UserType);
    const { userData } = useSelector(state => state.User);

    const [user, setUser] = useState([]);
    const [likesCount, setLikesCount] = useState(0);
    const [isLike, setIsLike] = useState(false);
    const [commentsCount, setCommentsCount] = useState(0);

    React.useEffect(() => {
        (async () => {
            const unsubscribe = navigation.addListener('focus', () => {
                getUserByIDPostAPI(item?.ownerId, bearerToken, (response) => {
                    if (response !== null) {
                        setUser(response?.data[0])
                    }
                })

                getLikesCountByIDPostAPI(item?._id, bearerToken, (response) => {
                    if (response !== null) {
                        if (response.data) {
                            setLikesCount(response?.count)
                            const data = response?.data;
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].likedBy === userData[0]?._id) {
                                    setIsLike(true);
                                }
                            }
                        }
                    }
                })

                getCommentsCountByIDPostAPI(item?._id, bearerToken, (response) => {
                    if (response !== null) {
                        if (response.data) {
                            setCommentsCount(response?.count)
                        }
                    }
                })
            });
            return unsubscribe;
        })()
    }, [navigation, item]);

    useEffect(() => {
        (async () => {
            getUserByIDPostAPI(item?.ownerId, bearerToken, (response) => {
                if (response !== null) {
                    setUser(response?.data[0])
                }
            })

            getLikesCountByIDPostAPI(item?._id, bearerToken, (response) => {
                if (response !== null) {
                    if (response.data) {
                        setLikesCount(response?.count)
                        const data = response?.data;
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].likedBy === userData[0]?._id) {
                                setIsLike(true);
                            }
                        }
                    }
                }
            })

            getCommentsCountByIDPostAPI(item?._id, bearerToken, (response) => {
                if (response !== null) {
                    if (response.data) {
                        setCommentsCount(response?.count)
                    }
                }
            })
        })()
    }, [item])

    const handleLike = () => {
        if (isLike) {
            setLikesCount(prev => prev - 1);
            setIsLike(false);
            unLikesByIDPostAPI(item?._id, userData[0]?._id, bearerToken, (response) => {
                if (response !== null) {
                    if (response?.message) {
                        Toast.show('Un Liked Successfully!');
                    }
                }
            })
        } else if (!isLike) {
            setLikesCount(prev => prev + 1);
            setIsLike(true);
            addLikesByIDPostAPI(item?._id, userData[0]?._id, bearerToken, (response) => {
                if (response !== null) {
                    if (response?.message === "Already Liked") {
                        Toast.show(response?.message);
                    } else if (response?.status.toString().toLowerCase() === "true") {
                        Toast.show('Liked Successfully!');
                    }
                }
            })
        }
    }

    const handleComment = () => {
        navigation.navigate("CommentScreen", {
            userData: user,
            bearerToken: bearerToken,
            offerItem: item
        })
    }

    var email = user?.email?.split("@")[0]

    const [homeModalVisible, setHomeModalVisible] = useState(false);

    const handleApplyJob = () => {
        navigation.navigate("ApplyJobScreen", {
            jobId: item?._id,
            item: item,
        });
    }

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: "https://plus.unsplash.com/premium_photo-1661679026942-db5aef08c093?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) { } else { }
            } else if (result.action === Share.dismissedAction) { }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <View style={{ borderBottomColor: "#D8D8D8", borderBottomWidth: 1, backgroundColor: "#fff" }}>
            <View style={{ ...commonStyles.rowBetween, height: 62, width: "100%", padding: 20 }}>
                <View style={{ ...commonStyles.rowStart, alignItems: "center" }}>
                    <TouchableHighlight underlayColor="#f7f8f9" onPress={() => {
                        navigation.navigate("UserDetailsScreen", {
                            user: user,
                            userId: item?.ownerId,
                        })
                    }}>
                        {user?.userProfile !== undefined ? <Image
                            source={{ uri: user?.userProfile }} resizeMode="contain"
                            style={{ width: 40, height: 40, borderRadius: 100, marginTop: 6, borderWidth: 2, borderColor: "#E27127" }}
                        /> : <View style={{ width: 40, height: 40, borderRadius: 100, marginTop: 6, borderWidth: 2, borderColor: "#E27127" }}>
                            <Image
                                source={require("../../assets/img/profile-tab.png")} resizeMode="contain"
                                style={{ width: 28, height: 28, borderRadius: 100, marginHorizontal: 4, marginVertical: 3 }}
                            />
                        </View>}
                    </TouchableHighlight>

                    <View style={{ marginLeft: 6 }}>
                        <TouchableHighlight underlayColor="#f7f8f9" onPress={() => {
                            navigation.navigate("UserDetailsScreen", {
                                user: user,
                                userId: item?.ownerId,
                            })
                        }}>
                            <Text style={{ ...commonStyles.fs14_700 }}>{user?.name}</Text>
                        </TouchableHighlight>
                        <View style={{ ...commonStyles.rowStart, alignItems: "center" }}>
                            <Image
                                source={require("../../assets/img/location.png")}
                                resizeMode="contain"
                                style={{ width: 18, height: 16 }}
                            />
                            <TouchableHighlight
                                onPress={() => { navigation.navigate("LocationScreen") }}
                                underlayColor="#f7f8f9"
                            >
                                <Text style={{ ...commonStyles.fs12_400, marginLeft: 2 }}>{item?.location}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <TouchableHighlight onPress={() => setHomeModalVisible(true)} underlayColor="#f7f8f9">
                    <Image
                        source={require("../../assets/img/3dots.png")}
                        resizeMode="contain"
                        style={{ width: 24, height: 24, borderRadius: 100 }}
                    />
                </TouchableHighlight>
            </View>

            <View>
                <Image
                    source={{ uri: item?.offerImage ? item?.offerImage : "https://plus.unsplash.com/premium_photo-1661679026942-db5aef08c093?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" }}
                    style={{ width: SIZES.width, height: 311 }}
                />
                {userType === "user" ? <TouchableHighlight
                    style={{ width: "100%", height: 52, backgroundColor: "rgba(0,0,0,0.3)", position: "absolute", bottom: 0, ...commonStyles.centerStyles }}
                    onPress={handleApplyJob}
                    underlayColor="rgba(0,0,0,0.4)"
                >
                    <Text>Apply Job</Text>
                </TouchableHighlight> : <></>}
            </View>

            <View style={{ ...commonStyles.rowBetween, padding: 20 }}>
                <View style={{ ...commonStyles.rowStart }}>
                    <TouchableHighlight onPress={handleLike} underlayColor="#eee" style={{ padding: 5 }}>
                        <View style={{ ...commonStyles.row }}>
                            <Image
                                source={isLike ? require("../../assets/img/heart.png") : require("../../assets/img/hearto.png")}
                                style={{ width: 24, height: 24, tintColor: isLike ? "#FF0000" : "#000" }}
                            />
                            <Text style={{ ...commonStyles.fs14_500, marginLeft: 9 }}>{likesCount} Likes</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={handleComment} underlayColor="#eee" style={{ padding: 5, marginLeft: 34 }}>
                        <View style={{ ...commonStyles.row }}>
                            <Image
                                source={require("../../assets/img/comment.png")}
                                style={{ width: 26, height: 26, tintColor: "#000000" }}
                            />
                            <Text style={{ ...commonStyles.fs14_500, marginLeft: 9 }}>{commentsCount} Comments</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight onPress={handleShare} underlayColor="#eee">
                    <Image
                        source={require("../../assets/img/share.png")}
                        style={{ width: 22, height: 22, tintColor: "#000000" }}
                    />
                </TouchableHighlight>
            </View>

            <View style={{ ...commonStyles.rowStart, marginLeft: 20, marginTop: -16 }}>
                <Text style={{ ...commonStyles.fs14_500, marginBottom: 12 }}>@{email}</Text>
                <Text style={{ ...commonStyles.fs12_400, marginLeft: 8, marginBottom: 10, marginTop: 2 }}>{item?.description}</Text>
            </View>
            <View style={{ ...commonStyles.rowStart, marginLeft: 20, marginTop: -10 }}>
                <Text style={{ ...commonStyles.fs13_500, marginBottom: 12 }}>Days left:</Text>
                <Text style={{ ...commonStyles.fs12_400, marginLeft: 8, marginBottom: 12 }}>{item?.date}</Text>
            </View>

            <HomeModal
                modalVisible={homeModalVisible}
                setModalVisible={setHomeModalVisible}
                feedbackFor="job"
                feedbackNumber={item?.ownerId}
                callback={() => setHomeModalVisible(!homeModalVisible)}
            />
        </View>
    );
}