import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import HomeHeader from '../home/HomeHeader'
import HomeSearch from '../home/HomeSearch'
import { commonStyles } from '../../utils/styles'
import { SIZES } from '../../utils/theme'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllWorksPostRequest } from '../../utils/API'
import Auth from '../../services/Auth'
import CustomLoader, { CustomPanel } from '../../components/CustomLoader'

export default function WorksScreen({ navigation }) {

    const [allWorks, setAllWorks] = useState([]);
    const [bearerToken, setBearerToken] = useState("");
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        setLoading(true);
        Auth.getLocalStorageData("bearer").then((token) => {
            setLoading(false);
            setBearerToken(token);
            getAllWorksPostRequest(token, (response) => {
                if (response !== null) {
                    setAllWorks(response?.data)
                }
            })
        })
    }, [])

    return (
        <View style={{ backgroundColor: "#f7f8f9" }}>
            <HomeHeader navigation={navigation} onPress={() => { navigation.navigate("AddWorksScreen") }} />
            <HomeSearch onChange={() => { }} />

            <FlatList
                data={allWorks}
                renderItem={({ item }) => {
                    console.log("\n\n Res getAllWorksPostRequest item: ", item);
                    return (
                        <View style={{ margin: 15, padding: 9, backgroundColor: "#fff", borderWidth: 1, borderColor: "#D8D8D8", borderRadius: 4 }}>
                            <View style={{ ...commonStyles.rowBetween, alignItems: "flex-start" }}>
                                <Image
                                    source={require('../../assets/img/work_img.png')}
                                    style={{ width: 101, height: 61 }}
                                />
                                <View style={{ width: SIZES.width / 1.5, marginHorizontal: 10 }}>
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
                            </View>
                        </View>
                    );
                }}
                ListFooterComponent={
                    <View style={{ height: 200 }} />
                }
            />

            <CustomPanel loading={loading} />
            <CustomLoader loading={loading} />
        </View>
    )
}