import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import React from 'react'
import CustomInputHeader from '../../components/CustomInputHeader'
import { SIZES } from '../../utils/theme'
import { launchImageLibrary, openPicker } from 'react-native-image-picker'
import { commonStyles } from '../../utils/styles'
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment'
import Custom_Auth_Btn from '../../components/Custom_Auth_Btn'
import { addNewOfferPostRequest } from '../../utils/API'
import Auth from '../../services/Auth'
import CustomLoader, { CustomPanel } from '../../components/CustomLoader'
import PersonalLeaveDatePicker from '../../components/CustomDatePicker'

export default function AddSaleOfferScreen({ navigation }) {

    const [imageError, setImageError] = React.useState(false);
    const [descriptionError, setDescriptionError] = React.useState(false);
    const [locationError, setLocationError] = React.useState(false);
    const [startDateError, setStartDateError] = React.useState(false);
    const [endDateError, setEndDateError] = React.useState(false);

    const [imageData, setImageData] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");

    const [loading, setLoading] = React.useState(false);

    const getImage = () => {
        ImagePicker.openPicker({
            width: 200,
            height: 200, compressImageMaxHeight: 400,
            compressImageMaxWidth: 400, cropping: true, multiple: true
        })
            .then(response => {
                let tempArray = []
                response.forEach((item) => {
                    let image = {
                        name: item?.name,
                        uri: item?.path,
                        type: item?.mime,
                    }
                    tempArray.push(image)
                })
                if (tempArray.length < 5) {
                    Alert.alert("Alert", "Please select atleast 5 images");
                } else {
                    setImageData(tempArray);
                }
            })
    }

    for (let i = 0; i < imageData.length; i++) {
        console.log("\n\n imageData: ", i, imageData[i])
    }

    const handleSubmit = () => {
        if (description.length === 0) {
            setDescriptionError(true);
        } else if (location.length === 0) {
            setLocationError(true)
        } else if (startDate.length === 0) {
            setStartDateError(true);
        } else if (endDate.length === 0) {
            setEndDateError(true)
        } else if (imageData.length === 0) {
            setImageError(true)
        } else {
            setLoading(true);
            Auth.getLocalStorageData("bearer").then((token) => {
                Auth.getAccount().then((userData) => {
                    addNewOfferPostRequest(
                        description,
                        location,
                        startDate,
                        endDate,
                        imageData,
                        userData._id,
                        null,
                        token,
                        (response) => {
                            setLoading(false);
                            if (response !== null) {
                                if (response?.message) {
                                    Alert.alert("Alert", response.message, [{
                                        text: 'OK',
                                        onPress: async () => {
                                            navigation.goBack();
                                        },
                                    }], { cancelable: false },)
                                }
                                if (response.errors) {
                                    Alert.alert("Alert", response.errors.offerImage.message)
                                }
                            }
                        }
                    );
                })
            })
        }
    }

    return (
        <>
            <ScrollView style={{ width: "100%", height: SIZES.height }}>
                <CustomInputHeader navigation={navigation} title="Add Sale Offer" />

                <View style={{ paddingHorizontal: 16 }}>
                    <RenderUpload
                        image={imageData} getImage={getImage}
                        imageError={imageError}
                        setImageError={setImageError}
                        setImageData={setImageData}
                    />

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 10 }}>Description</Text>
                        <TextInput
                            placeholder='Description'
                            placeholderTextColor="#999"
                            value={description}
                            numberOfLines={4}
                            multiline={true}
                            textAlignVertical="top"
                            onChangeText={(val) => { setDescription(val); setDescriptionError(false); }}
                            style={[styles.descriptionInput, { borderColor: descriptionError ? "red" : "#BDBDBD" }]}
                        />
                        {descriptionError
                            ? <Text style={{ ...commonStyles.fs12_400, color: "red" }}>Description is mandatory</Text>
                            : <></>}
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Add Location</Text>
                        <View>
                            <TextInput
                                placeholder='Location'
                                placeholderTextColor="#999"
                                value={location}
                                onChangeText={(val) => { setLocation(val); setLocationError(false); }}
                                style={[styles.locationInput, { borderColor: locationError ? "red" : "#BDBDBD" }]}
                            />
                            <Image
                                source={require("../../assets/img/location-track.png")}
                                style={{ width: 24, height: 24, position: "absolute", right: 16, top: 22 }}
                            />
                        </View>
                        {locationError
                            ? <Text style={{ ...commonStyles.fs12_400, color: "red" }}>Location is mandatory</Text>
                            : <></>}
                    </>

                    <View style={{ ...commonStyles.rowBetween, marginBottom: 20 }}>
                        <View>
                            <PersonalLeaveDatePicker
                                heading="Start Date"
                                placeholderText="Start Date"
                                minimumDate={''}
                                maximumDate={endDate === '' ? '' : endDate}
                                initialDate={startDate === '' ? endDate : startDate}
                                isStart="yes"
                                error={startDateError}
                                onDateSelected={function (selectedStartDate) {
                                    setStartDate(moment(selectedStartDate).format('DD-MMM-YYYY'));
                                    setStartDateError(false);
                                }}
                            />
                            {startDateError
                                ? <Text style={{ ...commonStyles.fs12_400, color: "red", marginTop: -15 }}>Startdate is mandatory</Text>
                                : <></>}
                        </View>

                        <View>
                            <PersonalLeaveDatePicker
                                heading="End Date"
                                placeholderText="End Date"
                                minimumDate={''}
                                maximumDate=""
                                error={endDateError}
                                initialDate={endDate === '' ? startDate : endDate}
                                onDateSelected={function (selectedStartDate) {
                                    setEndDate(moment(selectedStartDate).format('DD-MMM-YYYY'));
                                    setEndDateError(false);
                                }}
                            />
                            {endDateError
                                ? <Text style={{ ...commonStyles.fs12_400, color: "red", marginTop: -15 }}>Enddate is mandatory</Text>
                                : <></>}
                        </View>
                    </View>

                    <Custom_Auth_Btn
                        btnText="Upload"
                        onPress={handleSubmit}
                    />
                </View>
            </ScrollView>

            <CustomPanel loading={loading} />
            <CustomLoader loading={loading} />
        </>
    )
}

export const RenderUpload = ({ image, getImage, imageError, setImageError, setImageData }) => {
    return (
        <View>
            <View>
                {image.length === 0
                    ? <TouchableHighlight onPress={() => { getImage(); setImageError(false) }} style={{ paddingVertical: 16 }}>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
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
                    </TouchableHighlight>
                    : <View style={{ flex: 1 }}>
                        <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
                            {
                                image.map((res) => {
                                    console.log("\n\n \n\n image.map: ", res);
                                    return (
                                        <Image
                                            source={{ uri: res?.uri }}
                                            resizeMode="stretch"
                                            style={{ width: SIZES.width / 1.3, height: SIZES.width / 1.4, borderRadius: 9, marginRight: 20 }}
                                        />
                                    );
                                })
                            }
                        </ScrollView>
                        <TouchableHighlight onPress={() => setImageData("")}
                            style={{ position: "absolute", top: 6, right: 6, borderRadius: 100 }}
                            underlayColor="#f7f8f9"
                        >
                            <Image
                                source={require("../../assets/img/cross.png")}
                                style={{ width: 25, height: 25, tintColor: "#fff" }}
                            />
                        </TouchableHighlight>
                    </View>}
            </View>
            {imageError
                ? <Text style={{ ...commonStyles.fs12_400, color: "red", marginTop: -24 }}>Image is mandatory</Text>
                : <></>}
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
