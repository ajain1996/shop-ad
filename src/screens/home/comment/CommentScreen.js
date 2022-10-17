import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, StatusBar, TouchableHighlight, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { commonStyles } from '../../../utils/styles';
import { SIZES } from '../../../utils/theme';
import { addCommentPostAPI, getCommentsCountByIDPostAPI } from '../../../utils/API';
import Toast from 'react-native-simple-toast'

export default function CommentScreen({ navigation, route }) {


    const { userData, bearerToken, offerItem } = route.params;
    const [commentBody, setCommentBody] = useState("");
    const [commentsData, setCommentsData] = useState([]);

    React.useEffect(() => {
        getCommentsCountByIDPostAPI(offerItem?.ownerId, bearerToken, (response) => {
            if (response !== null) {
                setCommentsData(response?.data)
            }
        })
    }, [])

    const submitComment = () => {
        addCommentPostAPI(offerItem?._id, userData._id, commentBody, bearerToken, (response) => {
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
            <ScrollView contentContainerStyle={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
                {renderCommentsHeader(navigation)}

                {commentsData.map((item, index) => {
                    var commentUser = userData?.email;
                    commentUser = commentUser?.split("@")[0];

                    return (
                        <View key={index} style={{ ...commonStyles.rowBetween, width: SIZES.width }}>
                            <View style={{ paddingHorizontal: 12, paddingTop: 14, ...commonStyles.rowStart }}>
                                {userData?.userImg ? <Image
                                    source={{ uri: userData?.userImg }}
                                    resizeMode="contain"
                                    style={{ width: 46, height: 46, borderRadius: 100, borderWidth: 2, borderColor: "#0073FF" }}
                                /> : <Image
                                    source={require("../../../assets/img/auth-svg.png")}
                                    resizeMode="contain"
                                    style={{ width: 46, height: 46, borderRadius: 100, borderWidth: 2, borderColor: "#0073FF" }}
                                />}
                                <View style={{ marginLeft: 12 }}>
                                    <Text style={{ fontSize: 14, color: "#000", fontWeight: "700" }}>
                                        @{commentUser}
                                    </Text>
                                    <Text style={{ fontSize: 13, color: "#000" }}>
                                        {item?.comment}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>

            <View style={[styles.postComment]}>
                <View style={{ ...commonStyles.rowStart, alignItems: "center" }}>
                    {userData?.userImg ? <Image
                        source={{ uri: userData?.img }}
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
        </>
    )
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
    }
})
