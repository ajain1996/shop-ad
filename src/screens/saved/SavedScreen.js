import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonStyles } from '../../utils/styles';
import CustomHeader from '../../components/CustomHeader';
import Auth from '../../services/Auth';

export const menuItems = [
    {
        image: require("../../assets/img/prod/i1.webp"),
        name: "Turkey Hill",
    },
    {
        image: require("../../assets/img/prod/i2.webp"),
        name: "Magnum",
    },
    {
        image: require("../../assets/img/prod/i3.webp"),
        name: "Vadilal",
    },
    {
        image: require("../../assets/img/prod/i4.webp"),
        name: "Breyers",
    },

    {
        image: require("../../assets/img/prod/i5.webp"),
        name: "Amul",
    },
    {
        image: require("../../assets/img/prod/i6.webp"),
        name: "Kwality Walls",
    },
]


export default function SavedScreen() {

    const [savedItems, setSavedItems] = useState([])

    useEffect(() => {
        Auth.getLocalStorageData("Saved_Item").then((localData) => {
            setSavedItems(JSON.parse(localData));
        })
    }, [])

    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
            <CustomHeader title="Saved Items" />

            <FlatList
                data={savedItems}
                contentContainerStyle={{}}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.productItem}
                            onPress={() => { }}
                        >
                            <View style={{ ...commonStyles.rowStart }}>
                                <Image
                                    source={{ uri: item?.offerImage }}
                                    resizeMode="stretch"
                                    style={{ width: 74, height: 74, borderRadius: 16 }}
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ ...commonStyles.fs15_600, color: "#000" }}>{item?.description}</Text>
                                    <View style={{ ...commonStyles.rowStart, marginTop: 4 }}>
                                        <Image
                                            source={require("../../assets/img/location.png")}
                                            style={{ width: 18, height: 18, marginRight: 5 }}
                                        />
                                        <Text style={{ ...commonStyles.fs12_400, color: "#000" }}>{item?.location}</Text>
                                    </View>
                                </View>
                            </View>
                            {/* <TouchableHighlight
                                onPress={() => { }}
                                underlayColor="#eee"
                                style={{ width: 42, height: 42, ...commonStyles.centerStyles, borderRadius: 100, marginTop: -8 }}
                            >
                                <Image
                                    source={require("../../assets/img/delete.png")}
                                    resizeMode="stretch"
                                    style={{ width: 24, height: 24, borderRadius: 16 }}
                                />
                            </TouchableHighlight> */}
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    productItem: {
        ...commonStyles.rowBetween,
        width: "100%", padding: 16,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        alignItems: "flex-start"
    }
})
