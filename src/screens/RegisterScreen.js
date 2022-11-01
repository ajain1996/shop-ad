import { View, Text, TouchableHighlight, StatusBar, Alert, Image } from 'react-native'
import React from 'react'
import { SIZES } from '../utils/theme'
import Auth_BG_Component from '../components/Auth_BG_Component'
import { commonStyles } from '../utils/styles'
import Custom_Auth_Btn from '../components/Custom_Auth_Btn'
import CustomTextInput from '../components/CustomTextInput'
import { mobileRegisterPostRequest } from '../utils/API'
import Toast from 'react-native-simple-toast'
import Auth from '../services/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/reducer/user'
import CustomLoader, { CustomPanel } from '../components/CustomLoader'
import { launchImageLibrary } from 'react-native-image-picker'

export default function RegisterScreen({ navigation }) {
    const dispatch = useDispatch();
    const { userType } = useSelector(state => state.UserType);

    const [nameError, setNameError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [phoneError, setPhoneError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [password, setPassword] = React.useState("");

    // const [imageData, setImageData] = React.useState("");

    const handleRegister = () => {
        if (name.length === 0) {
            setNameError(true)
        } else if (email.length === 0) {
            setEmailError(true)
        } else if (password.length === 0) {
            setPasswordError(true)
        } else if (phone.length === 0) {
            setPhoneError(true);
        }
        // else if (image.length === 0) {
        //     Alert.alert("Alert", "Image is mandatory!");
        // }
        else {
            setLoading(true);
            mobileRegisterPostRequest(email, password, name, phone, userType, async (response) => {
                setLoading(false);
                if (response !== null) {
                    if (response?.message !== undefined) {
                        if (response?.message === "Mail exists") {
                            Alert.alert("Alert", response?.message);
                        } else {
                            const userData = response?.user;
                            const email_password = [];
                            email_password.push(email);
                            email_password.push(password);
                            await Auth.setLocalStorageData("email_password", email_password)

                            Toast.show('Register Successfully!');
                            setName("")
                            setEmail("")
                            setPassword("")
                            navigation.navigate("LoginScreen")
                        }
                    }
                }
            })
        }
    }

    // let options = {
    //     storageOptions: {
    //         skipBackup: true,
    //         path: 'images',
    //     },
    // };

    // const [image, setImage] = React.useState("");

    // const getImage = () => {
    //     launchImageLibrary(options, (response) => {
    //         if (response?.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response?.error) {
    //             console.log('ImagePicker Error: ', response?.error);
    //         } else if (response?.customButton) {
    //             console.log('User tapped custom button: ', response?.customButton);
    //         } else {
    //             setImage(response?.assets[0].uri);
    //             setImageData(response);
    //             // setImageData(response);
    //             console.log("\n\n Image Picked: ", response)
    //             // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    //         }
    //     });
    // }

    var btnText = "";
    if (userType === "user") {
        btnText = "User"
    } else if (userType === "shop") {
        btnText = "Shop Owner"
    }

    return (
        <Auth_BG_Component>
            <StatusBar barStyle="light-content" backgroundColor="#1572B9" />
            <View style={{ justifyContent: 'center', height: SIZES.height, paddingHorizontal: 20, justifyContent: "space-between", paddingVertical: "28%" }}>

                <View>
                    <Text style={{ fontSize: 32, fontWeight: "900", color: "#fff" }}>{btnText}</Text>
                    <Text style={{ ...commonStyles.fs18_400, color: "#fff", marginTop: 8, marginBottom: 20 }}>
                        Register Now to access all the features of ShopAd!
                    </Text>

                    {/* <TouchableHighlight
                        style={{ alignItems: "center", marginBottom: 30, marginTop: 10 }}
                        onPress={getImage} underlayColor="transparent"
                    >
                        {image.length === 0 ? <View style={{ width: 120, height: 120, borderRadius: 100, backgroundColor: "#f7f8f9", ...commonStyles.centerStyles }}>
                            <Image
                                source={require("../assets/img/camera.png")}
                                style={{ width: "75%", height: "75%", tintColor: "#999" }}
                            />
                        </View> : <Image
                            source={{ uri: image }}
                            style={{ width: 120, height: 120, borderRadius: 100 }}
                        />}
                    </TouchableHighlight> */}

                    <CustomTextInput
                        placeholder='Name'
                        value={name}
                        keyboardType="default"
                        icon={require("../assets/img/name.png")}
                        onChange={(val) => { setName(val); setNameError(false); }}
                    />
                    {nameError ? <Text style={{ ...commonStyles.fs13_400, color: "red" }}>Name is required</Text> : <></>}
                    <View style={{ height: 14 }} />

                    <CustomTextInput
                        placeholder='shopad@gmail.com'
                        value={email}
                        keyboardType={'email-address'}
                        autoCapitalize='none'
                        icon={require("../assets/img/email.png")}
                        onChange={(val) => { setEmail(val); setEmailError(false); }}
                    />
                    {emailError ? <Text style={{ ...commonStyles.fs13_400, color: "red" }}>Email is required</Text> : <></>}
                    <View style={{ height: 14 }} />

                    <CustomTextInput
                        placeholder='Mobile'
                        value={phone}
                        keyboardType={"number-pad"}
                        icon={require("../assets/img/phone.png")}
                        onChange={(val) => { setPhone(val); setPhoneError(false); }}
                    />
                    {phoneError ? <Text style={{ ...commonStyles.fs13_400, color: "red", zIndex: 1 }}>
                        Mobile number is required
                    </Text> : <></>}
                    <View style={{ height: 14 }} />

                    <CustomTextInput
                        placeholder='Password'
                        value={password}
                        secureTextEntry={true}
                        icon={require("../assets/img/password.png")}
                        onChange={(val) => { setPassword(val); setPasswordError(false); }}
                    />
                    {passwordError ? <Text style={{ ...commonStyles.fs13_400, color: "red", zIndex: 1 }}>
                        Password is required
                    </Text> : <></>}
                    <View style={{ height: 14 }} />

                    <Custom_Auth_Btn
                        btnText={"Register as " + btnText}
                        onPress={() => { handleRegister(); /*navigation.navigate("Root")*/ }}
                    />
                </View>

                <View style={{ alignItems: "center", zIndex: 1, marginTop: 40 }}>
                    <View style={{ ...commonStyles.row }}>
                        <Text style={{ ...commonStyles.fs18_500, color: "#fff" }}>Already have an account? </Text>
                        <TouchableHighlight onPress={() => { navigation.navigate("LoginScreen") }} underlayColor="#1572B9">
                            <Text style={{ ...commonStyles.fs18_500, color: "#EDAA26" }}>Login</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
            <CustomPanel loading={loading} />

            <CustomLoader loading={loading} />
        </Auth_BG_Component>
    )
}