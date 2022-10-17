import { View, Text, Image, StatusBar, TouchableHighlight, FlatList, Share } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import UserdetailsHeader from './UserdetailsHeader'
import CustomLoader, { CustomPanel } from '../../../components/CustomLoader'
import { commonStyles } from '../../../utils/styles'
import { SIZES } from '../../../utils/theme'
import { addLikesByIDPostAPI, getUserByIDPostAPI, unLikesByIDPostAPI } from '../../../utils/API'
import Auth from '../../../services/Auth'
import Toast from 'react-native-simple-toast'

export default function UserPostScreen({ navigation, route }) {

    const { item, userName } = route.params;

    const [bearerToken, setBearerToken] = useState("");
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        Auth.getLocalStorageData("bearer").then((token) => {
            setBearerToken(token);
        })
    }, [])

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <UserdetailsHeader
                navigation={navigation}
                title={"Post"}
            />

            <RenderSingleOffer
                item={item}
                bearerToken={bearerToken}
                navigation={navigation}
                userName={userName}
            />

            <CustomPanel loading={loading} />
            <CustomLoader loading={loading} />
        </>
    )
}

const RenderSingleOffer = ({ item, userName, bearerToken, navigation }) => {
    const [user, setUser] = useState([]);
    const [likesCount, setLikesCount] = useState(0);
    const [isLike, setIsLike] = useState(false);

    const [commentsCount, setCommentsCount] = useState(0);

    useEffect(() => {
        getUserByIDPostAPI(item?._id, bearerToken, (response) => {
            if (response !== null) {
                setUser(response?.data[0])
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

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <View style={{ borderBottomColor: "#D8D8D8", borderBottomWidth: 1, backgroundColor: "#fff" }}>
            <View style={{ ...commonStyles.rowBetween, height: 62, width: "100%", padding: 20 }}>
                <View style={{ ...commonStyles.rowStart, alignItems: "center" }}>
                    <Image
                        source={require("../../../assets/img/user_profile.png")}
                        resizeMode="contain"
                        style={{ width: 40, height: 40, borderRadius: 100 }}
                    />

                    <TouchableHighlight underlayColor="#f7f8f9" onPress={() => {
                        navigation.navigate("UserDetailsScreen", {
                            userName: userName,
                            userImage: require("../../../assets/img/user_profile.png"),
                        })
                    }}>
                        <Text style={{ ...commonStyles.fs16_700, marginLeft: 10 }}>{userName}</Text>
                    </TouchableHighlight>
                </View>
                <Image
                    source={require("../../../assets/img/3dots.png")}
                    resizeMode="contain"
                    style={{ width: 24, height: 24, borderRadius: 100 }}
                />
            </View>

            <Image
                source={{ uri: item?.offerImage }}
                style={{ width: SIZES.width, height: 311 }}
            />

            <View style={{ ...commonStyles.rowBetween, padding: 20 }}>
                <View style={{ ...commonStyles.rowStart }}>
                    <TouchableHighlight onPress={handleLike} underlayColor="#eee" style={{ padding: 5 }}>
                        <View style={{ ...commonStyles.row }}>
                            <Image
                                source={isLike ? require("../../../assets/img/heart.png") : require("../../../assets/img/hearto.png")}
                                style={{ width: 24, height: 24, tintColor: isLike ? "#FF0000" : "#000" }}
                            />
                            <Text style={{ ...commonStyles.fs14_500, marginLeft: 9 }}>{likesCount} Likes</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={handleShare} underlayColor="#eee" style={{ padding: 5, marginLeft: 34 }}>
                        <View style={{ ...commonStyles.row }}>
                            <Image
                                source={require("../../../assets/img/share.png")}
                                style={{ width: 21, height: 21, tintColor: "#000000" }}
                            />
                            <Text style={{ ...commonStyles.fs14_500, marginLeft: 9 }}>Share</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight onPress={() => { }} underlayColor="#fff">
                    <Image
                        source={require("../../../assets/img/bookmark.png")}
                        style={{ width: 24, height: 24, tintColor: "#000000" }}
                    />
                </TouchableHighlight>
            </View>
        </View>
    );
}