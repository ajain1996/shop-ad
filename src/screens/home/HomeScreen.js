import { View, Text, Image, StatusBar, TouchableHighlight, FlatList } from 'react-native'
import React from 'react'
import { commonStyles } from '../../utils/styles'
import HomeHeader from './HomeHeader'
import HomeSearch from './HomeSearch'
import { SIZES } from '../../utils/theme'
import { addLikesByIDPostAPI, getAllJobsPostRequest, getAllOffersPostRequest, getAllWorksPostRequest, getCommentsCountByIDPostAPI, getLikesCountByIDPostAPI, getOffersByLocationPostRequest, getUserByIDPostAPI, unLikesByIDPostAPI } from '../../utils/API'
import { useState } from 'react'
import Auth from '../../services/Auth'
import CustomLoader, { CustomPanel } from '../../components/CustomLoader'
import Toast from 'react-native-simple-toast'
import PTRView from 'react-native-pull-to-refresh';
import HomeModal from './HomeModal'
import { useDispatch, useSelector } from 'react-redux'
import { setOffer } from '../../redux/reducer/offer'
import { setJob } from '../../redux/reducer/jobs'
import { setWork } from '../../redux/reducer/work'

export default function HomeScreen({ navigation }) {
    const dispatch = useDispatch();
    const { offerData } = useSelector(state => state.Offer);

    const [bearerToken, setBearerToken] = useState("");
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            const unsubscribe = navigation.addListener('focus', () => {
                Auth.getLocalStorageData("bearer").then((token) => {
                    setLoading(false);
                    setBearerToken(token);
                    getAllOffersPostRequest(token, (response) => {
                        if (response !== null) {
                            dispatch(setOffer(response?.data));
                        }
                    })
                })
            });
            return unsubscribe;
        })()
    }, [navigation]);

    React.useEffect(() => {
        setLoading(true);
        Auth.getLocalStorageData("bearer").then((token) => {
            setLoading(false);
            setBearerToken(token);
            getAllOffersPostRequest(token, (response) => {
                if (response !== null) {
                    dispatch(setOffer(response?.data));
                }
            })

            getAllJobsPostRequest(token, (response) => {
                if (response !== null) {
                    dispatch(setJob(response?.data));
                }
            })

            getAllWorksPostRequest(token, (response) => {
                if (response !== null) {
                    dispatch(setWork(response?.data));
                }
            })
        })
    }, [])

    function _refresh() {
        // return new Promise((resolve) => {
        setLoading(true);
        Auth.getLocalStorageData("bearer").then((token) => {
            setLoading(false);
            setBearerToken(token);
            getAllOffersPostRequest(token, (response) => {
                if (response !== null) {
                    dispatch(setOffer(response?.data));
                }
            })
        })
        // });
    }

    return (
        <>
            <PTRView onRefresh={_refresh}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <HomeHeader navigation={navigation} onPress={() => { navigation.navigate("AddSaleOfferScreen") }} />

                <HomeSearch onChange={(val) => {
                    setLoading(true);
                    Auth.getLocalStorageData("bearer").then((token) => {
                        setLoading(false);
                        setBearerToken(token);
                        getOffersByLocationPostRequest(val, token, (response) => {
                            if (response !== null) {
                                dispatch(setOffer(response?.data));
                            }
                        })
                    })
                }} />

                <FlatList
                    data={offerData}
                    renderItem={({ item }) => {
                        return (
                            <RenderSingleOffer
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

const RenderSingleOffer = ({ item, bearerToken, navigation }) => {
    const [user, setUser] = useState([]);
    const [likesCount, setLikesCount] = useState(0);
    const [isLike, setIsLike] = useState(false);

    const [commentsCount, setCommentsCount] = useState(0);

    React.useEffect(() => {
        getUserByIDPostAPI(item?.ownerId, bearerToken, (response) => {
            if (response !== null) {
                setUser(response?.data[0])
            }
        })

        getLikesCountByIDPostAPI(item?.ownerId, bearerToken, (response) => {
            if (response !== null) {
                setLikesCount(response?.count)
            }
        })

        getCommentsCountByIDPostAPI(item?.ownerId, bearerToken, (response) => {
            if (response !== null) {
                setCommentsCount(response?.count)
            }
        })
    }, [])

    const handleLike = () => {
        if (isLike) {
            setLikesCount(prev => prev - 1);
            setIsLike(false);
            unLikesByIDPostAPI(item?._id, item?.ownerId, bearerToken, (response) => {
                if (response !== null) {
                    if (response?.message) {
                        Toast.show('Un Liked Successfully!');
                    }
                }
            })
        } else if (!isLike) {
            setLikesCount(prev => prev + 1);
            setIsLike(true);
            addLikesByIDPostAPI(item?._id, item?.ownerId, bearerToken, (response) => {
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

    const [homeModalVisible, setHomeModalVisible] = useState(false);

    var email = user?.email?.split("@")[0];

    return (
        <View style={{ borderBottomColor: "#D8D8D8", borderBottomWidth: 1, backgroundColor: "#fff" }}>
            <View style={{ ...commonStyles.rowBetween, height: 62, width: "100%", padding: 20 }}>
                <View style={{ ...commonStyles.rowStart, alignItems: "center" }}>
                    <Image
                        source={require("../../assets/img/user_profile.png")}
                        resizeMode="contain"
                        style={{ width: 40, height: 40, borderRadius: 100 }}
                    />

                    <View>
                        <TouchableHighlight underlayColor="#f7f8f9" onPress={() => {
                            navigation.navigate("UserDetailsScreen", {
                                userName: user?.name,
                                userImage: require("../../assets/img/user_profile.png"),
                                userId: user?._id,
                            })
                        }}>
                            <Text style={{ ...commonStyles.fs16_700, marginLeft: 10 }}>{user?.name}</Text>
                        </TouchableHighlight>
                        <View style={{ ...commonStyles.rowStart, marginLeft: 8, alignItems: "center", marginTop: 3 }}>
                            <Image
                                source={require("../../assets/img/location.png")}
                                style={{ width: 20, height: 18 }}
                            />
                            <TouchableHighlight
                                onPress={() => { navigation.navigate("LocationScreen") }}
                                underlayColor="#f7f8f9"
                            >
                                <Text style={{ ...commonStyles.fs13_400, marginLeft: 2 }}>{item?.location}</Text>
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

            <Image
                source={{ uri: item?.offerImage }}
                style={{ width: SIZES.width, height: 311 }}
            />

            <View style={{ ...commonStyles.rowBetween, padding: 15 }}>
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
                <TouchableHighlight onPress={() => { }} underlayColor="#fff">
                    <Image
                        source={require("../../assets/img/bookmark.png")}
                        style={{ width: 24, height: 24, tintColor: "#000000" }}
                    />
                </TouchableHighlight>
            </View>
            <View style={{ ...commonStyles.rowStart, marginLeft: 20, marginTop: -16 }}>
                <Text style={{ ...commonStyles.fs15_600, marginBottom: 12 }}>@{email}</Text>
                <Text style={{ ...commonStyles.fs14_400, marginLeft: 8, marginBottom: 12 }}>{item?.description}</Text>
            </View>
            <Text style={{ ...commonStyles.fs14_400, marginLeft: 8, marginBottom: 12 }}>{item?.date}</Text>

            <HomeModal
                modalVisible={homeModalVisible}
                setModalVisible={setHomeModalVisible}
                feedbackFor="offer"
                feedbackNumber={item?.ownerId}
                callback={() => setHomeModalVisible(!homeModalVisible)}
            />
        </View>
    );
}