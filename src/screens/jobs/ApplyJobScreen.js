import { View, Text, TouchableHighlight, Image, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { commonStyles } from '../../utils/styles';
import { SIZES } from '../../utils/theme';
import Custom_Auth_Btn from '../../components/Custom_Auth_Btn';
import DocumentPicker from 'react-native-document-picker'
import Auth from '../../services/Auth';
import CustomInputHeader from '../../components/CustomInputHeader';
import { applyJobPostAPI } from '../../utils/API';
import CustomLoader, { CustomPanel } from '../../components/CustomLoader';

export default function ApplyJobScreen({ navigation, route }) {
    // const { userData } = useSelector(state => state.User);

    const [cvFileError, setCvFileError] = React.useState(false);
    const [educationCertificateError, setEducationCertificateError] = React.useState(false);
    const [experienceCertificateError, setExperienceCertificateError] = React.useState(false);
    const [policyVerificationError, setPolicyVerificationError] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const [cvFile, setCvFile] = React.useState("");
    const [educationCertificate, setEducationCertificate] = React.useState("");
    const [experienceCertificate, setExperienceCertificate] = React.useState("");
    const [policyVerification, setPolicyVerification] = React.useState("");

    const { jobId } = route.params;

    const selectPdfFile = async (text) => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
                mode: 'import',
                copyTo: 'cachesDirectory',
            });

            var realPath;
            if (Platform.OS === 'ios') {
                var RNFS = require('react-native-fs');
                let url = res.uri;
                const split = url.split('/');
                const name = split.pop();
                const inbox = split.pop();
                realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
            } else {
                realPath = res.uri;
            }
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

    const handleSubmit = () => {
        if (cvFile.length === 0) {
            setCvFileError(true);
        } else if (educationCertificate.length === 0) {
            setEducationCertificateError(true);
        } else if (experienceCertificate.length === 0) {
            setExperienceCertificateError(true);
        } else if (policyVerification.length === 0) {
            setPolicyVerificationError(true);
        } else {
            setLoading(true);
            Auth.getAccount().then((userData) => {
                console.log("\n\n Auth Account: ", userData[0]);
                Auth.getLocalStorageData("bearer").then((token) => {
                    // {
                    //     "fileCopyUri": "file:/data/user/0/com.shopad/cache/a0d2f729-095c-4a9f-a88a-fed63acd3631/ankit.pdf",
                    //     "name": "ankit.pdf",
                    //     "size": 76800,
                    //     "type": "application/pdf",
                    //     "uri": "content://com.android.providers.media.documents/document/document%3A1000009914"
                    // }
                    const cv = {
                        name: cvFile?.name,
                        uri: cvFile?.uri,
                        type: cvFile?.type
                    }

                    const policy = {
                        name: policyVerification?.name,
                        uri: policyVerification?.uri,
                        type: policyVerification?.type
                    }

                    const experience = {
                        name: experienceCertificate?.name,
                        uri: experienceCertificate?.uri,
                        type: experienceCertificate?.type
                    }

                    const education = {
                        name: educationCertificate?.name,
                        uri: educationCertificate?.uri,
                        type: educationCertificate?.type
                    }
                    applyJobPostAPI(
                        jobId,
                        userData[0]._id,
                        userData[0].email,
                        userData[0].name,
                        userData[0].mobile,
                        cv,
                        policy,
                        experience,
                        education,
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
                                    Alert.alert("Alert", "Oops, Something went wrong!!")
                                }
                            }
                        }
                    );
                });
            });
        }
    }

    return (
        <View style={{ width: "100%", height: "100%" }}>
            <CustomInputHeader navigation={navigation} title="Apply Job" />
            <View style={{ paddingHorizontal: 16, width: "100%", height: "114%", justifyContent: "space-between" }}>
                <View>
                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Attach CV</Text>
                        {cvFile.length === 0
                            ? <TouchableHighlight
                                style={[styles.attachCV]}
                                onPress={() => { selectPdfFile("cv"); setCvFileError(false); }}
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
                        {cvFileError
                            ? <Text style={{ ...commonStyles.fs12_400, color: "red" }}>CV is mandatory</Text>
                            : <></>}
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Education Certificate</Text>
                        {educationCertificate.length === 0
                            ? <TouchableHighlight
                                style={[styles.attachCV]}
                                onPress={() => { selectPdfFile("educationCertificate"); setEducationCertificateError(false) }}
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
                        {educationCertificateError
                            ? <Text style={{ ...commonStyles.fs12_400, color: "red" }}>Education certificate is mandatory</Text>
                            : <></>}
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Experience Certificate</Text>
                        {experienceCertificate.length === 0
                            ? <TouchableHighlight
                                style={[styles.attachCV]}
                                onPress={() => { selectPdfFile("experienceCertificate"); setExperienceCertificateError(false); }}
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
                        {experienceCertificateError
                            ? <Text style={{ ...commonStyles.fs12_400, color: "red" }}>Experience certificate is mandatory</Text>
                            : <></>}
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Police Verification</Text>
                        {policyVerification.length === 0
                            ? <TouchableHighlight
                                style={[styles.attachCV]}
                                onPress={() => { selectPdfFile("policyVerification"); setPolicyVerificationError(false) }}
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
                        {policyVerificationError
                            ? <Text style={{ ...commonStyles.fs12_400, color: "red" }}>Policy verification is mandatory</Text>
                            : <></>}
                    </>
                    <View style={{ marginTop: 20 }} />
                </View>

                <Custom_Auth_Btn
                    btnText="Submit"
                    onPress={handleSubmit}
                />
                <View style={{ marginTop: 20 }} />
            </View>

            <CustomPanel loading={loading} />
            <CustomLoader loading={loading} />
        </View>
    )
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
