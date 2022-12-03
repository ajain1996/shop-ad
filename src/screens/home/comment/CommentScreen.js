import { View, Text, TouchableOpacity, TextInput, Image, StatusBar, TouchableHighlight, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import { commonStyles } from '../../../utils/styles';
import { SIZES } from '../../../utils/theme';
import { addCommentPostAPI, deleteCommentPostAPI, getCommentsCountByIDPostAPI, getUserByIDPostAPI } from '../../../utils/API';
import Toast from 'react-native-simple-toast'
import Auth from '../../../services/Auth';
import { useSelector } from 'react-redux';

export default function CommentScreen({ navigation, route }) {
    const { userData } = useSelector(state => state.User);

    const { postUserData, bearerToken, offerItem, ownerId } = route.params;
    const [commentBody, setCommentBody] = useState("");
    const [commentsData, setCommentsData] = useState([]);
    const [user, setUser] = useState([]);

    React.useEffect(() => {
        getCommentsCountByIDPostAPI(offerItem?._id, bearerToken, (response) => {
            if (response !== null) {
                setCommentsData(response?.data)
            }
        })

        Auth.getLocalStorageData("bearer").then((token) => {
            getUserByIDPostAPI(ownerId, bearerToken, (response) => {
                if (response !== null) {
                    setUser(response?.data[0])
                }
            })
        })
    }, [commentsData])

    const submitComment = () => {
        addCommentPostAPI(offerItem?._id, userData[0]?._id, commentBody, bearerToken, (response) => {
            if (response !== null) {
                if (response?.created_feedback) {
                    Toast.show('Comment added successfully!');
                    setCommentBody("")
                }
            }
        })
    }

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            {renderCommentsHeader(navigation)}
            <View style={{ width: SIZES.height, height: "100%", backgroundColor: "#fff" }}>

                <FlatList
                    data={commentsData}
                    renderItem={({ item, index }) => {
                        var commentUser = postUserData?.email;
                        commentUser = commentUser?.split("@")[0];

                        return (
                            <View key={index} style={{ ...commonStyles.rowBetween, width: SIZES.width }}>
                                <RenderSingleComment
                                    item={item}
                                    navigation={navigation}
                                    bearerToken={bearerToken}
                                    userData={userData}
                                />
                            </View>
                        );
                    }}
                    ListFooterComponent={
                        <View style={{ height: 126 }} />
                    }
                />

                <View style={[styles.postComment]}>
                    <View style={{ ...commonStyles.rowStart, alignItems: "center" }}>
                        {userData[0]?.userProfile ? <Image
                            source={{ uri: userData[0]?.userProfile }}
                            resizeMode="contain"
                            style={{ width: 40, height: 40, borderRadius: 100, borderWidth: 2, borderColor: "#0073FF" }}
                        /> : <Image
                            source={require("../../../assets/img/auth-svg.png")}
                            resizeMode="contain"
                            style={{ width: 40, height: 40, borderRadius: 100, borderWidth: 2, borderColor: "#0073FF" }}
                        />}

                        <TextInput
                            placeholder={'Comment as ' + "username"}
                            placeholderTextColor="#999"
                            value={commentBody}
                            style={{ paddingLeft: 16, color: "#000" }}
                            onChangeText={val => setCommentBody(val)}
                        />
                    </View>
                    <TouchableHighlight
                        underlayColor="#999"
                        style={{ borderRadius: 2, backgroundColor: "#fff" }}
                        onPress={submitComment}
                    >
                        <Text style={{ fontSize: 14, color: "#000", marginHorizontal: 10, marginVertical: 6 }}>
                            Post
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        </>
    )
}

const RenderSingleComment = ({ item, navigation, bearerToken, userData }) => {
    const [user, setUser] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const unsubscribe = navigation.addListener('focus', () => {
                Auth.getLocalStorageData("bearer").then((token) => {
                    getUserByIDPostAPI(item?.commentBy, token, (response) => {
                        if (response !== null) {
                            setUser(response?.data[0])
                        }
                    })
                })
            });
            return unsubscribe;
        })()
    }, [navigation]);

    React.useEffect(() => {
        (async () => {
            Auth.getLocalStorageData("bearer").then((token) => {
                getUserByIDPostAPI(item?.commentBy, token, (response) => {
                    if (response !== null) {
                        setUser(response?.data[0])
                    }
                })
            })
        })()
    }, [navigation]);

    const userEmail = user?.email?.split("@")[0];

    const deleteComment = () => {
        deleteCommentPostAPI(item?._id, bearerToken, (response) => {
            if (response !== null) {
                if (response?.message === "Uncomment Sucessfully") {
                    Toast.show('Comment deleted successfully!');
                }
            }
        })
    }

    return (

        <View style={{ paddingHorizontal: 12, paddingTop: 14, ...commonStyles.rowBetween, width: SIZES.width, alignItems: "center" }}>
            <View style={{ ...commonStyles.rowStart, alignItems: "center" }}>
                <TouchableHighlight underlayColor="#f7f8f9" onPress={() => {
                    navigation.navigate("UserDetailsScreen", {
                        userId: user?._id,
                        user: user,
                    })
                }}>
                    {user?.userProfile !== undefined ? <Image
                        source={{ uri: user?.userProfile }}
                        resizeMode="contain"
                        style={{ width: 46, height: 46, borderRadius: 100, borderWidth: 2, borderColor: "#0073FF" }}
                    /> : <Image
                        source={require("../../../assets/img/profile-tab.png")}
                        style={{ width: 46, height: 46, borderRadius: 100, borderWidth: 2, borderColor: "#0073FF" }}
                    />}
                </TouchableHighlight>
                <View style={{ marginLeft: 12 }}>
                    <TouchableHighlight underlayColor="#f7f8f9" onPress={() => {
                        navigation.navigate("UserDetailsScreen", {
                            userId: user?._id,
                            user: user,
                        })
                    }}>
                        <Text style={{ fontSize: 14, color: "#000", fontWeight: "700" }}>
                            @{userEmail}
                        </Text>
                    </TouchableHighlight>
                    <Text style={{ fontSize: 13, color: "#000" }}>
                        {item?.comment}
                    </Text>
                </View>
            </View>

            {item?.commentBy === userData[0]?._id
                ? <TouchableHighlight onPress={deleteComment} underlayColor="#eee">
                    <Image
                        source={require("../../../assets/img/delete.png")}
                        style={{ width: 25, height: 25, borderRadius: 100 }}
                    />
                </TouchableHighlight>
                : <></>}
        </View>
    );
}

const renderCommentsHeader = (navigation) => {
    return (
        <View style={{ width: "100%", height: 56, ...commonStyles.center, backgroundColor: "#fff", elevation: 8, shadowColor: "#999", ...commonStyles.rowStart, alignItems: "center", paddingHorizontal: 20 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    source={require("../../../assets/img/left-arrow.png")}
                    resizeMode="contain"
                    style={{ width: 24, height: 24, tintColor: "#000" }}
                />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, color: "#000", marginLeft: 25, fontWeight: "600" }}>Comments</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    postComment: {
        backgroundColor: "#f7f8f9",
        elevation: 20, shadowColor: "#999",
        ...commonStyles.rowBetween,
        height: 60, paddingLeft: 15,
        paddingRight: 10,
        position: "absolute",
        bottom: 54, width: SIZES.width
    }
})
