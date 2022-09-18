import { Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import React from 'react'
import CustomInputHeader from '../../components/CustomInputHeader'
import { SIZES } from '../../utils/theme'
import { launchImageLibrary } from 'react-native-image-picker'
import { commonStyles } from '../../utils/styles'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import Custom_Auth_Btn from '../../components/Custom_Auth_Btn'
import { addNewOfferPostRequest } from '../../utils/API'

export default function AddSaleOfferScreen({ navigation }) {

    const [image, setImage] = React.useState("");
    const [description, setDescription] = React.useState("New user need to get membership to continue to use ShopAd.");
    const [location, setLocation] = React.useState("Indore, India");
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");

    let options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    const getImage = () => {
        launchImageLibrary(options, (response) => {
            if (response?.didCancel) {
                console.log('User cancelled image picker');
            } else if (response?.error) {
                console.log('ImagePicker Error: ', response?.error);
            } else if (response?.customButton) {
                console.log('User tapped custom button: ', response?.customButton);
            } else {
                setImage(response?.assets[0].uri);
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            }
        });
    }

    const handleSubmit = () => {
        addNewOfferPostRequest(
            description,
            location,
            startDate,
            endDate,
            image,
            "6310986978bdedcb4e68b948",
            null,
            (response) => {
                console.log("\n\n Response: ", response)
            }
        );
    }

    return (
        <View>
            <CustomInputHeader navigation={navigation} title="Add Sale Offer" />

            <View style={{ paddingHorizontal: 16 }}>
                <RenderUpload image={image} getImage={getImage} />

                <>
                    <Text style={{ ...commonStyles.fs16_500, marginTop: 10 }}>Description</Text>
                    <TextInput
                        placeholder=''
                        placeholderTextColor="#999"
                        value={description}
                        numberOfLines={4}
                        multiline={true}
                        textAlignVertical="top"
                        onChangeText={(val) => { setDescription(val) }}
                        style={[styles.descriptionInput]}
                    />
                </>

                <>
                    <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Add Location</Text>
                    <View>
                        <TextInput
                            placeholder='Location'
                            placeholderTextColor="#999"
                            value={location}
                            onChangeText={(val) => { setLocation(val) }}
                            style={[styles.locationInput]}
                        />
                        <Image
                            source={require("../../assets/img/location-track.png")}
                            style={{ width: 24, height: 24, position: "absolute", right: 16, top: 22 }}
                        />
                    </View>
                </>

                <View style={{ ...commonStyles.rowBetween, marginBottom: 20 }}>
                    <RenderDatePicker
                        title="Start Date"
                        callback={(res) => { setStartDate(res) }}
                    />

                    <RenderDatePicker
                        title="End Date"
                        callback={(res) => { setEndDate(res) }}
                    />
                </View>

                <Custom_Auth_Btn
                    btnText="Upload"
                    onPress={() => { handleSubmit() }}
                />
            </View>
        </View>
    )
}

const RenderUpload = ({ image, getImage }) => {
    return (
        <TouchableHighlight onPress={getImage} style={{ paddingVertical: 16 }}>
            {image.length === 0
                ? <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Image
                        source={require("../../assets/img/work_img.png")}
                        resizeMode="contain"
                        style={{ width: "100%", height: SIZES.width / 1.36, opacity: 0.8 }}
                    />
                    <View style={[styles.upload]}>
                        <Image
                            source={require("../../assets/img/upload.png")}
                            resizeMode="contain"
                            style={{ width: 23, height: 23, tintColor: "#000" }}
                        />
                    </View>
                </View>
                : <Image
                    source={{ uri: image }}
                    resizeMode="contain"
                    style={{ width: "100%", height: SIZES.width / 1.36 }}
                />}
        </TouchableHighlight>
    );
}

const RenderDatePicker = ({ title, callback }) => {
    const [date, setDate] = React.useState("")
    const [open, setOpen] = React.useState(false)

    return (
        <View>
            <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>{title}</Text>
            <TouchableHighlight onPress={() => setOpen(true)} underlayColor="#f7f8f9">
                <View style={[styles.datePicker]}>
                    <Image
                        source={require("../../assets/img/date.png")}
                        style={{ width: 20, height: 20, marginRight: 14 }}
                    />
                    {date.length === 0
                        ? <Text style={{ ...commonStyles.fs14_500 }}>{title}</Text>
                        : <Text style={{ ...commonStyles.fs14_500 }}>{moment(date).format("DD-MM-YYYY").toString()}</Text>}
                    {/* new Date() */}
                </View>
            </TouchableHighlight>
            <DatePicker
                modal
                theme='dark'
                open={open}
                date={date.length === 0 ? new Date() : date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    console.log('\n\n date: ', moment(date).format("DD-MM-YYYY"))
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    upload: {
        width: 56, height: 56,
        borderRadius: 100,
        backgroundColor: "#fff",
        position: "absolute",
        ...commonStyles.centerStyles
    },
    descriptionInput: {
        width: "100%", height: 77,
        borderWidth: 1,
        borderColor: "#BDBDBD",
        borderRadius: 4,
        color: "#000",
        padding: 10,
        fontSize: 14,
        lineHeight: 20,
        marginTop: 6
    },
    locationInput: {
        width: "100%", height: 55,
        borderWidth: 1,
        borderColor: "#BDBDBD",
        borderRadius: 4,
        color: "#000",
        padding: 16,
        fontSize: 14,
        lineHeight: 20,
        marginTop: 6
    },
    datePicker: {
        width: SIZES.width / 2.24,
        borderWidth: 1, height: 55,
        borderColor: "#BDBDBD",
        ...commonStyles.rowStart,
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: 6
    }
})
