import { View, Text, Image, TouchableHighlight, StatusBar } from 'react-native'
import React from 'react'
import { SIZES } from '../utils/theme'
import Auth_BG_Component from '../components/Auth_BG_Component'
import { commonStyles } from '../utils/styles'
import Custom_Auth_Btn from '../components/Custom_Auth_Btn'
import { useDispatch } from 'react-redux'
import { setUserType } from '../redux/reducer/userType'
import Auth from '../services/Auth'

export default function RegisterLoginScreen({ navigation }) {
    const dispatch = useDispatch();

    return (
        <Auth_BG_Component>
            <StatusBar barStyle="light-content" backgroundColor="#1572B9" />
            <View style={{ alignItems: "center", justifyContent: 'center', height: SIZES.height, paddingHorizontal: 20 }}>
                <Image
                    source={require("../assets/img/auth_svg.png")}
                    resizeMode="contain"
                    style={{ width: SIZES.width / 1.3, height: SIZES.width / 1.3 }}
                />
                <View style={{ height: 40 }} />

                <Text style={{ ...commonStyles.fs24_700, color: "#fff" }}>Register to ShopAd</Text>
                <View style={{ height: 33 }} />

                <Custom_Auth_Btn
                    btnText="Register as Shop Owner"
                    onPress={async () => {
                        navigation.navigate("RegisterScreen");
                        dispatch(setUserType("shop"));
                        await Auth.setLocalStorageData("userType", "shop");
                    }}
                />
                <View style={{ height: 14 }} />

                <Custom_Auth_Btn
                    btnText="Register as User"
                    onPress={async () => {
                        navigation.navigate("RegisterScreen");
                        dispatch(setUserType("user"));
                        await Auth.setLocalStorageData("userType", "user");
                    }}
                />

                <View style={{ ...commonStyles.row, marginTop: 33, zIndex: 1 }}>
                    <Text style={{ ...commonStyles.fs18_500, color: "#fff" }}>Already have an account? </Text>
                    <TouchableHighlight onPress={() => { navigation.navigate("LoginScreen") }} underlayColor="#1572B9">
                        <Text style={{ ...commonStyles.fs18_500, color: "#EDAA26" }}>Login</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Auth_BG_Component>
    )
}