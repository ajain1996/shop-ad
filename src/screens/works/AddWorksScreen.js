import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
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
    const [descError, setDescError] = React.useState(false);
    const [locationError, setLocationError] = React.useState(false);
    const [salaryError, setSalaryError] = React.useState(false);
    const [shiftError, setShiftError] = React.useState("");
    const [designationError, setDesignationError] = React.useState(false);
    const [contactError, setContactError] = React.useState(false);

    const [name, setName] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [salary, setSalary] = React.useState(false);
    const [shift, setShift] = React.useState(false);
    const [designation, setDesignation] = React.useState("");
    const [contact, setContact] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = () => {
        if (desc.length === 0) {
            setDescError(true);
        } else if (name.length === 0) {
            setNameError(true);
        } else if (location.length === 0) {
            setLocationError(true);
        } else if (salary.length === 0) {
            setSalaryError(true);
        } else if (shift.length === 0) {
            setShiftError("Shift Time is mandatory");
        } else if (designation.length === 0) {
            setDesignationError(true);
        } else if (contact.length === 0) {
            setContactError(true);
        } else {
            Auth.getLocalStorageData("bearer").then((token) => {
                addNewWorkPostRequest(
                    desc,
                    name,
                    location,
                    salary,
                    shift,
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
                            if (response?.message?.includes("Work validation failed")) {
                                console.log("\n\n response?.message: ", response?.message)
                                Alert.alert("Alert", response?.message)
                            }
                        }
                    }
                );
            });
        }
    }

    return (
        <>
            <CustomInputHeader navigation={navigation} title="Add Work" />
            <ScrollView>
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
                            <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Description</Text>
                            <TextInput
                                placeholder='Description'
                                placeholderTextColor="#999"
                                value={desc}
                                onChangeText={(val) => { setDesc(val); setDescError(false) }}
                                style={[styles.descriptionInput, { borderColor: descError ? "red" : "#BDBDBD" }]}
                            />
                            {descError
                                ? <Text style={{ ...commonStyles.fs12_400, color: "red" }}>Description is mandatory</Text>
                                : <></>}
                        </>

                        <>
                            <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Relationship</Text>
                            <TextInput
                                placeholder='Relationship'
                                placeholderTextColor="#999"
                                value={designation}
                                onChangeText={(val) => { setDesignation(val); setDesignationError(false) }}
                                style={[styles.descriptionInput, { borderColor: designationError ? "red" : "#BDBDBD" }]}
                            />
                            {designationError
                                ? <Text style={{ ...commonStyles.fs12_400, color: "red" }}>Relationship is mandatory</Text>
                                : <></>}
                        </>

                        <>
                            <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Location</Text>
                            <TextInput
                                placeholder='Location'
                                placeholderTextColor="#999"
                                value={location}
                                onChangeText={(val) => { setLocation(val); setLocationError(false) }}
                                style={[styles.descriptionInput, { borderColor: locationError ? "red" : "#BDBDBD" }]}
                            />
                            {locationError
                                ? <Text style={{ ...commonStyles.fs12_400, color: "red" }}>Location is mandatory</Text>
                                : <></>}
                        </>

                        <>
                            <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Salary</Text>
                            <TextInput
                                placeholder='Salary'
                                placeholderTextColor="#999"
                                value={salary}
                                onChangeText={(val) => { setSalary(val); setSalaryError(false) }}
                                style={[styles.descriptionInput, { borderColor: salaryError ? "red" : "#BDBDBD" }]}
                            />
                            {salaryError
                                ? <Text style={{ ...commonStyles.fs12_400, color: "red" }}>Salary is mandatory</Text>
                                : <></>}
                        </>

                        <>
                            <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Shift Time</Text>
                            <TextInput
                                placeholder='Shift Time'
                                placeholderTextColor="#999"
                                value={shift}
                                autoCapitalize={false}
                                keyboardType="email-address"
                                onChangeText={(val) => {
                                    setShift(val.toLocaleLowerCase());
                                    console.log("\n\n val", val)
                                    if (val !== "day" && val !== "night") {
                                        setShiftError('Shift can only be "day" or "night"')
                                    } else {
                                        setShiftError("")
                                    }
                                }}
                                style={[styles.descriptionInput, { borderColor: shiftError ? "red" : "#BDBDBD" }]}
                            />
                            {shiftError.length !== 0
                                ? <Text style={{ ...commonStyles.fs12_400, color: "red" }}>{shiftError}</Text>
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
                    <Text />

                    <Custom_Auth_Btn
                        btnText="Sumbit"
                        onPress={handleSubmit}
                    />
                    <Text />
                </View>

                <CustomPanel loading={loading} />

                <CustomLoader loading={loading} />
            </ScrollView>
        </>
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
        width: "100%", height: 50,
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
