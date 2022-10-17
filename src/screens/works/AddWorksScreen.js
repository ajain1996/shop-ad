import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import CustomInputHeader from '../../components/CustomInputHeader'
import { SIZES } from '../../utils/theme'
import { commonStyles } from '../../utils/styles'
import Custom_Auth_Btn from '../../components/Custom_Auth_Btn'
import { addNewWorkPostRequest } from '../../utils/API'
import Auth from '../../services/Auth'
import CustomLoader, { CustomPanel } from '../../components/CustomLoader'

export default function AddWorksScreen({ navigation }) {

    const [nameError, setNameError] = React.useState(false);
    const [designationError, setDesignationError] = React.useState(false);
    const [contactError, setContactError] = React.useState(false);

    const [name, setName] = React.useState("");
    const [designation, setDesignation] = React.useState("");
    const [contact, setContact] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = () => {
        if (name.length === 0) {
            setNameError(true);
        } else if (designation.length === 0) {
            setDesignationError(true);
        } else if (contact.length === 0) {
            setContactError(true);
        } else {
            Auth.getLocalStorageData("bearer").then((token) => {
                addNewWorkPostRequest(
                    "Software Company",
                    name,
                    "Mumbai",
                    "30,000",
                    "Day",
                    designation,
                    "6310986978bdedcb4e68b948",
                    contact,
                    "ankitjain11@gmail.com",
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
            });
        }
    }

    return (
        <View>
            <CustomInputHeader navigation={navigation} title="Add Work" />

            <View style={{ paddingHorizontal: 16, height: "90%", justifyContent: 'space-between' }}>
                <View>
                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Your Name</Text>
                        <TextInput
                            placeholder='Your Name'
                            placeholderTextColor="#999"
                            value={name}
                            onChangeText={(val) => { setName(val); setNameError(false) }}
                            style={[styles.descriptionInput, { borderColor: nameError ? "red" : "#BDBDBD" }]}
                        />
                        {nameError
                            ? <Text style={{ ...commonStyles.fs12_400, color: "red" }}>Name is mandatory</Text>
                            : <></>}
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Designation</Text>
                        <TextInput
                            placeholder='Designation'
                            placeholderTextColor="#999"
                            value={designation}
                            onChangeText={(val) => { setDesignation(val); setDesignationError(false) }}
                            style={[styles.descriptionInput, { borderColor: designationError ? "red" : "#BDBDBD" }]}
                        />
                        {designationError
                            ? <Text style={{ ...commonStyles.fs12_400, color: "red" }}>Designation is mandatory</Text>
                            : <></>}
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Contact</Text>
                        <TextInput
                            placeholder='Contact'
                            placeholderTextColor="#999"
                            value={contact}
                            keyboardType="number-pad"
                            maxLength={10}
                            onChangeText={(val) => { setContact(val); setContactError(false) }}
                            style={[styles.descriptionInput, { borderColor: contactError ? "red" : "#BDBDBD" }]}
                        />
                        {contactError
                            ? <Text style={{ ...commonStyles.fs12_400, color: "red" }}>Contact is mandatory</Text>
                            : <></>}
                    </>
                </View>

                <Custom_Auth_Btn
                    btnText="Sumbit"
                    onPress={() => { handleSubmit() }}
                />
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
