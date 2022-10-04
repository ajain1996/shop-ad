import { View, Text, Image, StatusBar, TouchableHighlight, FlatList } from 'react-native'
import React from 'react'
import { commonStyles } from '../../utils/styles'
import { SIZES } from '../../utils/theme'
import HomeHeader from '../home/HomeHeader'
import HomeSearch from '../home/HomeSearch'
import { useEffect } from 'react'
import { getAllJobsPostRequest, getUserByIDPostAPI } from '../../utils/API'
import { useState } from 'react'
import Auth from '../../services/Auth'
import CustomLoader, { CustomPanel } from '../../components/CustomLoader'

export default function JobsScreen({ navigation }) {

    const [allJobs, setAllJobs] = useState([]);
    const [bearerToken, setBearerToken] = useState("");
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        setLoading(true);
        Auth.getLocalStorageData("bearer").then((token) => {
            setLoading(false);
            setBearerToken(token);
            getAllJobsPostRequest(token, (response) => {
                if (response !== null) {
                    setAllJobs(response?.data)
                }
            })
        })
    }, [])

    // console.log("\n\n Res getAllJobsPostRequest allJobs: ", allJobs);

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <HomeHeader navigation={navigation} onPress={() => navigation.navigate("AddJobScreen")} />

            <HomeSearch onChange={(val) => { }} />

            <FlatList
                data={allJobs}
                renderItem={({ item }) => {
                    return (
                        <RenderSingleJob
                            item={item}
                            bearerToken={bearerToken}
                        />
                    );
                }}
            />

            <View style={{ height: 64 }} />

            <CustomPanel loading={loading} />
            <CustomLoader loading={loading} />
        </>
    )
}

const RenderSingleJob = ({ item, bearerToken }) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUserByIDPostAPI(item?.ownerId, bearerToken, (response) => {
            console.log("\n\n getUserByIDPostAPI response: ", response?.data[0]);
            if (response !== null) {
                setUser(response?.data[0])
            }
        })
    }, [])

    return (
        <View style={{ borderBottomColor: "#D8D8D8", borderBottomWidth: 1, backgroundColor: "#fff" }}>
            <View style={{ ...commonStyles.rowBetween, height: 62, width: "100%", padding: 20 }}>
                <View style={{ ...commonStyles.rowStart, alignItems: "center" }}>
                    <Image
                        source={require("../../assets/img/user_profile.png")}
                        resizeMode="contain"
                        style={{ width: 40, height: 40, borderRadius: 100 }}
                    />

                    <Text style={{ ...commonStyles.fs16_700, marginLeft: 10 }}>
                        {user?.name !== undefined ? user?.name : "User Name"}
                    </Text>
                </View>
                <Image
                    source={require("../../assets/img/3dots.png")}
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
                    <View style={{ ...commonStyles.row }}>
                        <TouchableHighlight onPress={() => { }} underlayColor="#fff">
                            <Image
                                source={require("../../assets/img/heart.png")}
                                style={{ width: 24, height: 24, tintColor: "#FF0000" }}
                            />
                        </TouchableHighlight>
                        <Text style={{ ...commonStyles.fs14_500, marginLeft: 9 }}>120 Likes</Text>
                    </View>

                    <View style={{ ...commonStyles.row, marginLeft: 34 }}>
                        <TouchableHighlight onPress={() => { }} underlayColor="#fff">
                            <Image
                                source={require("../../assets/img/send.png")}
                                style={{ width: 20, height: 20, tintColor: "#000000" }}
                            />
                        </TouchableHighlight>
                        <Text style={{ ...commonStyles.fs14_500, marginLeft: 9 }}>20 Shares</Text>
                    </View>
                </View>
                <TouchableHighlight onPress={() => { }} underlayColor="#fff">
                    <Image
                        source={require("../../assets/img/bookmark.png")}
                        style={{ width: 24, height: 24, tintColor: "#000000" }}
                    />
                </TouchableHighlight>
            </View>
        </View>
    );
}