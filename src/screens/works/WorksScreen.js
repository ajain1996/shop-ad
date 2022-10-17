import { View, Text, Image, FlatList, TouchableHighlight } from 'react-native'
import React from 'react'
import HomeHeader from '../home/HomeHeader'
import HomeSearch from '../home/HomeSearch'
import { commonStyles } from '../../utils/styles'
import { SIZES } from '../../utils/theme'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllWorksPostRequest, getWorksByLocationPostAPI } from '../../utils/API'
import Auth from '../../services/Auth'
import CustomLoader, { CustomPanel } from '../../components/CustomLoader'
import PTRView from 'react-native-pull-to-refresh';
import { useDispatch, useSelector } from 'react-redux'
import { setWork } from '../../redux/reducer/work'
import HomeModal from '../home/HomeModal'

export default function WorksScreen({ navigation }) {
    const dispatch = useDispatch();
    const { workData } = useSelector(state => state.Work);

    const [bearerToken, setBearerToken] = useState("");
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            const unsubscribe = navigation.addListener('focus', () => {
                Auth.getLocalStorageData("bearer").then((token) => {
                    setBearerToken(token);
                    getAllWorksPostRequest(token, (response) => {
                        if (response !== null) {
                            dispatch(setWork(response?.data));
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
            getAllWorksPostRequest(token, (response) => {
                if (response !== null) {
                    dispatch(setWork(response?.data));
                }
            })
        })
    }, [])

    function _refresh() {
        setLoading(true);
        Auth.getLocalStorageData("bearer").then((token) => {
            setLoading(false);
            setBearerToken(token);
            getAllWorksPostRequest(token, (response) => {
                if (response !== null) {
                    dispatch(setWork(response?.data));
                }
            })
        })
    }

    return (
        <View style={{ backgroundColor: "#f7f8f9" }}>
            <PTRView onRefresh={_refresh}>
                <HomeHeader navigation={navigation} onPress={() => { navigation.navigate("AddWorksScreen") }} />
                <HomeSearch onChange={(val) => {
                    setLoading(true);
                    Auth.getLocalStorageData("bearer").then((token) => {
                        setLoading(false);
                        getWorksByLocationPostAPI(val, token, (response) => {
                            if (response !== null) {
                                dispatch(setWork(response?.data));
                            }
                        })
                    })
                }} />

                <FlatList
                    data={workData}
                    renderItem={({ item }) => {
                        return (
                            <RenderSingleWork
                                item={item}
                            />
                        );
                    }}
                    ListFooterComponent={
                        <View style={{ height: 200 }} />
                    }
                />

                <CustomPanel loading={loading} />
                <CustomLoader loading={loading} />
            </PTRView>
        </View>
    )
}

export const RenderSingleWork = ({ item }) => {
    const [homeModalVisible, setHomeModalVisible] = useState(false);

    return (
        <View style={{ margin: 15, padding: 9, backgroundColor: "#fff", borderWidth: 1, borderColor: "#D8D8D8", borderRadius: 4 }}>
            <View style={{ ...commonStyles.rowBetween, alignItems: "flex-start" }}>
                <Image
                    source={require('../../assets/img/work_img.png')}
                    style={{ width: 101, height: 61 }}
                />
                <View style={{ width: SIZES.width / 1.85, marginHorizontal: 10 }}>
                    <Text style={{ ...commonStyles.fs18_700 }}>{item?.description}</Text>
                    <Text style={{ ...commonStyles.fs16_700, marginTop: 12 }}>Designation: </Text>
                    <Text style={{ ...commonStyles.fs14_400 }}>
                        {item?.designationName}
                    </Text>

                    <Text style={{ ...commonStyles.fs16_700, marginTop: 12 }}>Contact Info: </Text>
                    <Text style={{ ...commonStyles.fs14_400 }}>
                        {item?.contactNumber}
                    </Text>
                </View>
                <TouchableHighlight onPress={() => setHomeModalVisible(true)} underlayColor="#f7f8f9">
                    <Image
                        source={require("../../assets/img/3dots.png")}
                        resizeMode="contain"
                        style={{ width: 24, height: 24, borderRadius: 100 }}
                    />
                </TouchableHighlight>
            </View>

            <HomeModal
                modalVisible={homeModalVisible}
                setModalVisible={setHomeModalVisible}
                feedbackFor="work"
                feedbackNumber={item?.ownerId}
                callback={() => setHomeModalVisible(!homeModalVisible)}
            />
        </View>
    );
}