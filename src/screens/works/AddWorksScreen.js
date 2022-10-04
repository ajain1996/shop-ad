import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import CustomInputHeader from '../../components/CustomInputHeader'
import { SIZES } from '../../utils/theme'
import { commonStyles } from '../../utils/styles'
import Custom_Auth_Btn from '../../components/Custom_Auth_Btn'
import { addNewWorkPostRequest } from '../../utils/API'

export default function AddWorksScreen({ navigation }) {

    const [name, setName] = React.useState("");
    const [designation, setDesignation] = React.useState("");
    const [contact, setContact] = React.useState("Indore, India");

    const handleSubmit = () => {
        addNewWorkPostRequest(
            "description",
            name,
            "location",
            "salary",
            "shiftTime",
            designation,
            "ownerId",
            contact,
            "contactEmail",
            (res) => { }
        );
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
                            onChangeText={(val) => { setName(val) }}
                            style={[styles.locationInput]}
                        />
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Designation</Text>
                        <TextInput
                            placeholder='Designation'
                            placeholderTextColor="#999"
                            value={designation}
                            onChangeText={(val) => { setDesignation(val) }}
                            style={[styles.locationInput]}
                        />
                    </>

                    <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Contact</Text>
                        <TextInput
                            placeholder='Contact'
                            placeholderTextColor="#999"
                            value={contact}
                            onChangeText={(val) => { setContact(val) }}
                            style={[styles.locationInput]}
                        />
                    </>
                </View>

                <Custom_Auth_Btn
                    btnText="Sumbit"
                    onPress={() => { handleSubmit() }}
                />
            </View>
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
