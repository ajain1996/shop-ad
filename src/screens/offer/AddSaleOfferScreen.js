import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import React from 'react'
import CustomInputHeader from '../../components/CustomInputHeader'
import { SIZES } from '../../utils/theme'
import { launchImageLibrary } from 'react-native-image-picker'
import { commonStyles } from '../../utils/styles'
import DatePicker from 'react-native-date-picker'
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

    const [image, setImage] = React.useState("");
    const [imageData, setImageData] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");

    const [loading, setLoading] = React.useState(false);

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
                setImageData(response);
                console.log("\n\n Image Picked: ", response)
            }
        });
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
        } else if (image.length === 0) {
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
        <ScrollView>
            <CustomInputHeader navigation={navigation} title="Add Sale Offer" />

            <View style={{ paddingHorizontal: 16 }}>
                <RenderUpload image={image} getImage={getImage} imageError={imageError} setImageError={setImageError} />

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

            <CustomPanel loading={loading} />
            <CustomLoader loading={loading} />
        </ScrollView>
    )
}

export const RenderUpload = ({ image, getImage, imageError, setImageError }) => {
    return (
        <View>
            <TouchableHighlight onPress={() => { getImage(); setImageError(false) }} style={{ paddingVertical: 16 }}>
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
