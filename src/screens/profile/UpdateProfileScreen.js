import { View, Text, TouchableHighlight, StatusBar, Alert, Image, ScrollView } from 'react-native'
import React from 'react'
import { SIZES } from '../../utils/theme'
import { commonStyles } from '../../utils/styles'
import Custom_Auth_Btn from '../../components/Custom_Auth_Btn'
import CustomTextInput from '../../components/CustomTextInput'
import Toast from 'react-native-simple-toast'
import Auth from '../../services/Auth'
import { useSelector } from 'react-redux'
import CustomLoader, { CustomPanel } from '../../components/CustomLoader'
import { launchImageLibrary } from 'react-native-image-picker'
import { updateUserPostRequest } from '../../utils/API'

export default function UpdateProfileScreen({ navigation }) {
    const { userData } = useSelector(state => state.User);
    const { userType } = useSelector(state => state.UserType);

    const [nameError, setNameError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [phoneError, setPhoneError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");

    const [imageData, setImageData] = React.useState("");

    React.useEffect(() => {
        setName(userData[0].name);
        setEmail(userData[0].email)
        setPhone(userData[0].mobile)
    }, [])


    const handleUpdateUser = () => {
        if (email.length === 0) {
            setEmailError(true)
        } if (name.length === 0) {
            setNameError(true)
        } if (phone.length === 0) {
            setPhoneError(true);
        } if (image.length === 0) {
            Alert.alert("Alert", "Image is mandatory!");
        } else {
            setLoading(true);
            Auth.getLocalStorageData("bearer").then((token) => {
                updateUserPostRequest(userData[0]._id, email, name, phone, userType, imageData, token, (response) => {
                    setLoading(false);
                    if (response !== null) {
                        Alert.alert("Alert", "Image is mandatory!");
                    }
                })
            })
        }
    }

    let options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    const [image, setImage] = React.useState("");

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
                setImageData(response);
                console.log("\n\n Image Picked: ", response)
            }
        });
    }

    return (
        <ScrollView style={{ width: "100%", height: "100%", backgroundColor: "#1572B9" }}>
            <StatusBar barStyle="dark-content" backgroundColor="#1572B9" />
            <View style={{ justifyContent: 'center', height: SIZES.height, paddingHorizontal: 20, justifyContent: "space-between", paddingVertical: "22%" }}>

                <View>
                    <Text style={{ ...commonStyles.fs22_600, color: "#fff", marginTop: 8, marginBottom: 20 }}>
                        Edit Profile
                    </Text>

                    <TouchableHighlight
                        style={{ alignItems: "center", marginBottom: 30, marginTop: "20%" }}
                        onPress={getImage} underlayColor="transparent"
                    >
                        {image.length === 0 ? <View style={{ width: 120, height: 120, borderRadius: 100, backgroundColor: "#f7f8f9", ...commonStyles.centerStyles }}>
                            <Image
                                source={require("../../assets/img/camera.png")}
                                style={{ width: "75%", height: "75%", tintColor: "#999" }}
                            />
                        </View> : <Image
                            source={{ uri: image }}
                            style={{ width: 120, height: 120, borderRadius: 100 }}
                        />}
                    </TouchableHighlight>

                    <CustomTextInput
                        placeholder='Name'
                        value={name}
                        keyboardType="default"
                        icon={require("../../assets/img/name.png")}
                        onChange={(val) => { setName(val); setNameError(false); }}
                    />
                    {nameError ? <Text style={{ ...commonStyles.fs13_400, color: "red" }}>Name is required</Text> : <></>}
                    <View style={{ height: 14 }} />

                    <CustomTextInput
                        placeholder='shopad@gmail.com'
                        value={email}
                        keyboardType={'email-address'}
                        autoCapitalize='none'
                        icon={require("../../assets/img/email.png")}
                        onChange={(val) => { setEmail(val); setEmailError(false); }}
                    />
                    {emailError ? <Text style={{ ...commonStyles.fs13_400, color: "red" }}>Email is required</Text> : <></>}
                    <View style={{ height: 14 }} />

                    <CustomTextInput
                        placeholder='Phone'
                        value={phone}
                        keyboardType="number-pad"
                        maxLength={10}
                        icon={require("../../assets/img/phone.png")}
                        onChange={(val) => { setPhone(val); setPhoneError(false); }}
                    />
                    {phoneError ? <Text style={{ ...commonStyles.fs13_400, color: "red" }}>Phone is required</Text> : <></>}
                    <View style={{ height: 14 }} />

                    <Custom_Auth_Btn
                        btnText="Update Profile"
                        onPress={() => { handleUpdateUser(); /*navigation.navigate("Root")*/ }}
                    />
                </View>
            </View>
            <CustomPanel loading={loading} />

            <CustomLoader loading={loading} />
        </ScrollView>
    )
}