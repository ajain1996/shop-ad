import { Alert, FlatList, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomInputHeader from '../../components/CustomInputHeader'
import { SIZES } from '../../utils/theme'
import { launchImageLibrary } from 'react-native-image-picker'
import { commonStyles } from '../../utils/styles'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import Custom_Auth_Btn from '../../components/Custom_Auth_Btn'
import LinearGradient from 'react-native-linear-gradient'
import DocumentPicker from 'react-native-document-picker'
import { addNewJobPostRequest } from '../../utils/API'
import Auth from '../../services/Auth'

export default function AddJobScreen({ navigation }) {

    const [showTick, setShowTick] = React.useState({
        tick1: true,
        tick2: false,
        tick3: false,
    });

    const [showNext, setShowNext] = React.useState({
        next1: true,
        next2: false,
        next3: false,
    });

    const [image, setImage] = React.useState("");
    const [shopName, setShopName] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [maritalStatus, setMaritalStatus] = React.useState("");
    const [gender, setGender] = React.useState("");

    const [areaOfWork, setAreaOfWork] = React.useState("");
    const [numberOfWorks, setNumberOfWork] = React.useState("");
    const [experience, setExperience] = React.useState("");
    const [manPower, setManPower] = React.useState("");
    const [workTiming, setWorkTiming] = React.useState("");
    const [salaryOffered, setSalaryOffered] = React.useState("");
    const [vehicleRequired, setVehicleRequired] = React.useState("");
    const [shift, setShift] = React.useState("");
    const [facilities, setFacilities] = React.useState("");
    const [incentive, setIncentive] = React.useState("");
    const [description, setDescription] = React.useState("");

    const [cvFile, setCvFile] = React.useState("");
    const [educationCertificate, setEducationCertificate] = React.useState("");
    const [experienceCertificate, setExperienceCertificate] = React.useState("");
    const [policyVerification, setPolicyVerification] = React.useState("");
    const [interviewTiming, setInterviewTiming] = React.useState("");
    const [contactNumber, setContactNumber] = React.useState("");
    const [contactPersonName, setContactPersonName] = React.useState("");
    const [message, setMessage] = React.useState("");


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
        if (description.length === 0) {
            Alert.alert("Alert", "Description is mandatory")
        } else if (shopName.length === 0) {
            Alert.alert("Alert", "Shop name is mandatory")
        } else if (facilities.length === 0) {
            Alert.alert("Alert", "Facility is mandatory")
        } else if (salaryOffered.length === 0) {
            Alert.alert("Alert", "Salary offered is mandatory")
        } else if (shift.length === 0) {
            Alert.alert("Alert", "Shift is mandatory")
        } else if (contactPersonName.length === 0) {
            Alert.alert("Alert", "Owner of Firm is mandatory")
        } else if (contactNumber.length === 0) {
            Alert.alert("Alert", "Contact number is mandatory")
        } else {
            Auth.getAccount().then((userData) => {
                addNewJobPostRequest(
                    description,
                    shopName,
                    facilities,
                    salaryOffered,
                    shift,
                    contactPersonName,
                    userData[0]._id,
                    contactNumber,
                    userData[0].email,
                    (response) => {
                        if (response !== null) {
                            console.log("\n\n Res addNewJobPostRequest: ", res);
                        }
                    }
                );
            })
        }
    }

    const selectPdfFile = async (text) => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
                mode: 'import',
                copyTo: 'cachesDirectory',
            });

            var realPath;
            if (Platform.OS === 'ios') {
                console.log('Got this ' + JSON.stringify(res));
                var RNFS = require('react-native-fs');
                // I STRONGLY RECOMMEND ADDING A SMALL SETTIMEOUT before uploading the url you just got.
                let url = res.uri;
                const split = url.split('/');
                const name = split.pop();
                const inbox = split.pop();
                realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
                // const realPath = `${RNFetchBlob.fs.dirs.DocumentDir}${inbox}/${name}`;
                console.log('This is real path ' + realPath);
            } else {
                realPath = res.uri;
            }
            console.log("\n\n res: ", res[0])
            if (text === "cv") {
                setCvFile(res[0]);
            } else if (text === "educationCertificate") {
                setEducationCertificate(res[0])
            } else if (text === "experienceCertificate") {
                setExperienceCertificate(res[0])
            } else if (text === "policyVerification") {
                setPolicyVerification(res[0])
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Canceled from single doc picker');
            } else {
                console.log('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };


    return (
        <>
            <CustomInputHeader navigation={navigation} title="Add Job" />
            <ScrollView>

                <View style={{ ...commonStyles.rowBetween, justifyContent: "space-around", marginTop: 30 }}>
                    <RenderTickComponent showNext={showTick.tick1} title="Basic" />
                    <RenderTickComponent showNext={showTick.tick2} title="Work" />
                    <RenderTickComponent showNext={showTick.tick3} title="Document" />
                </View>

                {showNext.next1 ? <View style={{ paddingHorizontal: 16 }}>
                    <RenderUpload image={image} getImage={getImage} />

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Add Title</Text>
                        <TextInput
                            placeholder='Title'
                            placeholderTextColor="#999"
                            value={title}
                            onChangeText={(val) => { setTitle(val) }}
                            style={[styles.titleInput]}
                        />
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Shop Name</Text>
                        <TextInput
                            placeholder='Shop name'
                            placeholderTextColor="#999"
                            value={shopName}
                            onChangeText={(val) => { setShopName(val) }}
                            style={[styles.titleInput]}
                        />
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Address of Firm</Text>
                        <TextInput
                            placeholder='Address'
                            placeholderTextColor="#999"
                            value={address}
                            onChangeText={(val) => { setAddress(val) }}
                            style={[styles.titleInput]}
                        />
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Marital Status</Text>
                        <TextInput
                            placeholder='Marital Status'
                            placeholderTextColor="#999"
                            value={maritalStatus}
                            onChangeText={(val) => { setMaritalStatus(val) }}
                            style={[styles.titleInput]}
                        />
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Gender</Text>
                        <TextInput
                            placeholder='Gender'
                            placeholderTextColor="#999"
                            value={gender}
                            onChangeText={(val) => { setGender(val) }}
                            style={[styles.titleInput]}
                        />
                    </>
                    <View style={{ marginTop: 20 }} />

                    <Custom_Auth_Btn
                        btnText="Next"
                        onPress={() => {
                            setShowNext({
                                next1: false,
                                next2: true,
                                next3: false,
                            })
                            setShowTick({
                                tick1: true,
                                tick2: true,
                                tick3: false,
                            })
                        }}
                    />
                    <View style={{ marginTop: 20 }} />
                </View> : <></>}

                {showNext.next2 ? <View style={{ paddingHorizontal: 16 }}>
                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Area of work</Text>
                        <TextInput
                            placeholder='Area of work'
                            placeholderTextColor="#999"
                            value={areaOfWork}
                            onChangeText={(val) => { setAreaOfWork(val) }}
                            style={[styles.titleInput]}
                        />
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Number of Works</Text>
                        <TextInput
                            placeholder='Number of Works'
                            placeholderTextColor="#999"
                            value={numberOfWorks}
                            onChangeText={(val) => { setNumberOfWork(val) }}
                            style={[styles.titleInput]}
                        />
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Experience Required</Text>
                        <TextInput
                            placeholder='Experience Required'
                            placeholderTextColor="#999"
                            value={experience}
                            onChangeText={(val) => { setExperience(val) }}
                            style={[styles.titleInput]}
                        />
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Number of Manpower Required</Text>
                        <TextInput
                            placeholder='Number of Manpower Required'
                            placeholderTextColor="#999"
                            value={manPower}
                            onChangeText={(val) => { setManPower(val) }}
                            style={[styles.titleInput]}
                        />
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Work Timing</Text>
                        <TextInput
                            placeholder='Work Timing'
                            placeholderTextColor="#999"
                            value={workTiming}
                            onChangeText={(val) => { setWorkTiming(val) }}
                            style={[styles.titleInput]}
                        />
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Salary Offered</Text>
                        <TextInput
                            placeholder='Salary Offered'
                            placeholderTextColor="#999"
                            value={salaryOffered}
                            onChangeText={(val) => { setSalaryOffered(val) }}
                            style={[styles.titleInput]}
                        />
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Vehicle Required</Text>
                        <TextInput
                            placeholder='Vehicle Required'
                            placeholderTextColor="#999"
                            value={vehicleRequired}
                            onChangeText={(val) => { setVehicleRequired(val) }}
                            style={[styles.titleInput]}
                        />
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Shift</Text>
                        <View style={{ ...commonStyles.rowBetween, marginBottom: 20 }}>
                            <RenderDatePicker
                                title="Start Date"
                                callback={(res) => { setShift(res) }}
                            />

                            <RenderDatePicker
                                title="End Date"
                                callback={(res) => { }}
                            />
                        </View>
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14, marginBottom: 10 }}>Facilities</Text>
                        <FlatList
                            data={["Indore, India", "Bhopal, India", "Nagpur, India", "Jabalpur, India", "Kashmir, India", "Goa, India"]}
                            numColumns={2}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        style={[styles.checkboxWrapper]}
                                        onPress={() => setFacilities(item)}
                                    >
                                        <View style={[styles.checkbox]}>
                                            <View style={{
                                                width: 13, height: 13, borderRadius: 100,
                                                backgroundColor: facilities === item ? "#000" : "#fff"
                                            }} />
                                        </View>
                                        <Text style={{ ...commonStyles.fs14_400, marginLeft: 10 }}>{item}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Incentive Offered</Text>
                        <TextInput
                            placeholder='Incentive Offered'
                            placeholderTextColor="#999"
                            value={incentive}
                            onChangeText={(val) => { setIncentive(val) }}
                            style={[styles.titleInput]}
                        />
                    </>

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
                    <View style={{ marginTop: 20 }} />

                    <Custom_Auth_Btn
                        btnText="Next"
                        onPress={() => {
                            setShowNext({
                                next1: false,
                                next2: false,
                                next3: true,
                            })
                            setShowTick({
                                tick1: true,
                                tick2: true,
                                tick3: true,
                            })
                        }}
                    />
                    <View style={{ marginTop: 20 }} />
                </View> : <></>}

                {showNext.next3
                    ? <View style={{ paddingHorizontal: 16 }}>
                        <>
                            <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Attach CV</Text>
                            {cvFile.length === 0
                                ? <TouchableHighlight
                                    style={[styles.attachCV]}
                                    onPress={() => { selectPdfFile("cv") }}
                                    underlayColor="#f7f8f9"
                                >
                                    <Image
                                        source={require("../../assets/img/attach.png")}
                                        style={{ width: 24, height: 24, tintColor: "#BDBDBD" }}
                                    />
                                </TouchableHighlight>
                                : <View style={[styles.attachCV, commonStyles.rowBetween]}>
                                    <Text style={{ ...commonStyles.fs14_500 }}>{cvFile.name}</Text>
                                    <TouchableHighlight onPress={() => setCvFile("")} underlayColor="#f7f8f9">
                                        <Image
                                            source={require("../../assets/img/cross.png")}
                                            style={{ width: 20, height: 20, tintColor: "#BDBDBD" }}
                                        />
                                    </TouchableHighlight>
                                </View>}
                        </>

                        <>
                            <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Education Certificate</Text>
                            {educationCertificate.length === 0
                                ? <TouchableHighlight
                                    style={[styles.attachCV]}
                                    onPress={() => { selectPdfFile("educationCertificate") }}
                                    underlayColor="#f7f8f9"
                                >
                                    <Image
                                        source={require("../../assets/img/upload.png")}
                                        style={{ width: 24, height: 24, tintColor: "#BDBDBD" }}
                                    />
                                </TouchableHighlight>
                                : <View style={[styles.attachCV, commonStyles.rowBetween]}>
                                    <Text style={{ ...commonStyles.fs14_500 }}>{educationCertificate.name}</Text>
                                    <TouchableHighlight onPress={() => setCvFile("")} underlayColor="#f7f8f9">
                                        <Image
                                            source={require("../../assets/img/cross.png")}
                                            style={{ width: 20, height: 20, tintColor: "#BDBDBD" }}
                                        />
                                    </TouchableHighlight>
                                </View>}
                        </>

                        <>
                            <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Experience Certificate</Text>
                            {educationCertificate.length === 0
                                ? <TouchableHighlight
                                    style={[styles.attachCV]}
                                    onPress={() => { selectPdfFile("experienceCertificate") }}
                                    underlayColor="#f7f8f9"
                                >
                                    <Image
                                        source={require("../../assets/img/upload.png")}
                                        style={{ width: 24, height: 24, tintColor: "#BDBDBD" }}
                                    />
                                </TouchableHighlight>
                                : <View style={[styles.attachCV, commonStyles.rowBetween]}>
                                    <Text style={{ ...commonStyles.fs14_500 }}>{experienceCertificate.name}</Text>
                                    <TouchableHighlight onPress={() => setCvFile("")} underlayColor="#f7f8f9">
                                        <Image
                                            source={require("../../assets/img/cross.png")}
                                            style={{ width: 20, height: 20, tintColor: "#BDBDBD" }}
                                        />
                                    </TouchableHighlight>
                                </View>}
                        </>

                        <>
                            <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Police Verification</Text>
                            {educationCertificate.length === 0
                                ? <TouchableHighlight
                                    style={[styles.attachCV]}
                                    onPress={() => { selectPdfFile("policyVerification") }}
                                    underlayColor="#f7f8f9"
                                >
                                    <Image
                                        source={require("../../assets/img/upload.png")}
                                        style={{ width: 24, height: 24, tintColor: "#BDBDBD" }}
                                    />
                                </TouchableHighlight>
                                : <View style={[styles.attachCV, commonStyles.rowBetween]}>
                                    <Text style={{ ...commonStyles.fs14_500 }}>{policyVerification.name}</Text>
                                    <TouchableHighlight onPress={() => setCvFile("")} underlayColor="#f7f8f9">
                                        <Image
                                            source={require("../../assets/img/cross.png")}
                                            style={{ width: 20, height: 20, tintColor: "#BDBDBD" }}
                                        />
                                    </TouchableHighlight>
                                </View>}
                        </>

                        <>
                            <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Interview Timing</Text>
                            <RenderDatePicker
                                title="Interview Timing"
                                callback={(res) => { }}
                            />
                        </>

                        <>
                            <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Contact Number</Text>
                            <TextInput
                                placeholder='Contact Number'
                                placeholderTextColor="#999"
                                value={contactNumber}
                                onChangeText={(val) => { setContactNumber(val) }}
                                style={[styles.titleInput]}
                            />
                        </>

                        <>
                            <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Contact Person Name/ Owner of Firm</Text>
                            <TextInput
                                placeholder='Contact Person Name/ Owner of Firm'
                                placeholderTextColor="#999"
                                value={contactPersonName}
                                onChangeText={(val) => { setContactPersonName(val) }}
                                style={[styles.titleInput]}
                            />
                        </>

                        <>
                            <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Message</Text>
                            <TextInput
                                placeholder='Message'
                                placeholderTextColor="#999"
                                value={message}
                                numberOfLines={4}
                                multiline={true}
                                textAlignVertical="top"
                                onChangeText={(val) => { setMessage(val) }}
                                style={[styles.descriptionInput]}
                            />
                        </>
                        <View style={{ marginTop: 20 }} />

                        <Custom_Auth_Btn
                            btnText="Submit"
                            onPress={() => { handleSubmit() }}
                        />
                        <View style={{ marginTop: 20 }} />
                    </View>
                    : <></>}
            </ScrollView>
        </>
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

const RenderTickComponent = ({ showNext, title }) => {
    return (
        <View style={{ alignItems: "center" }}>
            <LinearGradient style={{ width: 24, height: 24, borderRadius: 100, ...commonStyles.centerStyles }}
                colors={showNext ? ["#1572B9", "#0995C8"] : ["#D9D9D9", "#D9D9D9"]}
            >
                {showNext ? <Image
                    source={require("../../assets/img/tick.png")}
                    style={{ width: 10.5, height: 7.5, tintColor: "#fff" }}
                /> : <></>}
            </LinearGradient>
            <Text style={{ ...commonStyles.fs14_500 }}>{title}</Text>
            <View style={{
                width: SIZES.width / 3, height: 2, backgroundColor: showNext ? "#1572B9" : "#D9D9D9",
                position: "absolute", top: 12
            }} />
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
    titleInput: {
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
    },
    checkbox: {
        width: 19, height: 19, borderRadius: 100, borderWidth: 1,
        ...commonStyles.centerStyles
    },
    checkboxWrapper: {
        ...commonStyles.rowStart, alignItems: "center", marginVertical: 8, width: SIZES.width / 2
    },
    attachCV: {
        width: "100%", height: 67, borderWidth: 1, borderColor: "#BDBDBD",
        ...commonStyles.centerStyles, marginTop: 6, paddingHorizontal: 20
    }
})
