import { View, Text, Image, TouchableHighlight, StatusBar } from 'react-native';
import React from 'react';
import { SIZES } from '../utils/theme';
import Auth_BG_Component from '../components/Auth_BG_Component';
import { commonStyles } from '../utils/styles';
import Custom_Auth_Btn from '../components/Custom_Auth_Btn';
import { useDispatch } from 'react-redux';
import { setUserType } from '../redux/reducer/userType';
import Auth from '../services/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterLoginScreen({ navigation }) {
  const dispatch = useDispatch();

  return (
    <View style={{}}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: SIZES.height + 40,
          backgroundColor: "#fff"
        }}>
        <Image
          source={require('../assets/img/auth-svg.png')}
          resizeMode="contain"
          style={{ width: SIZES.width / 1.3, height: SIZES.width / 1.3 }}
        />
        <View style={{ height: 40 }} />

        <Text style={{ ...commonStyles.fs24_700, color: '#FF800B' }}>Register to ShopAd</Text>
        <View style={{ height: 33 }} />

        <View style={{ width: "100%", padding: 20, paddingVertical: 60, backgroundColor: "#E68927" }}>
          <Custom_Auth_Btn
            btnText="Register as Shop Owner"
            onPress={async () => {
              navigation.navigate('RegisterScreen');
              dispatch(setUserType('shop'));
              await Auth.setLocalStorageData('userType', 'shop');
            }}
            colors={["#fff", "#fff"]}
            textStyle={{ color: "#000", fontWeight: "700" }}
            style={{ borderRadius: 14, height: 60 }}
          />
          <View style={{ height: 14 }} />

          <Custom_Auth_Btn
            btnText="Register as User"
            onPress={async () => {
              navigation.navigate('RegisterScreen');
              dispatch(setUserType('user'));
              await Auth.setLocalStorageData('userType', 'user');
              await AsyncStorage.setItem('LIKED_OFFER', `0`);
              await AsyncStorage.setItem('SAVED_OFFER', `[]`);
              await AsyncStorage.setItem('TOTAL_SHARED', `0`);
            }}
            colors={["#000", "#000"]}
            textStyle={{ color: "#fff", fontWeight: "700" }}
            style={{ borderRadius: 14, height: 60 }}
          />

          <View style={{ alignItems: 'center', zIndex: 1, marginTop: 30 }}>
            <View style={{ ...commonStyles.row }}>
              <Text style={{ ...commonStyles.fs14_500, color: '#fff' }}>
                Already have an account? {' '}
              </Text>
              <TouchableHighlight
                onPress={() => {
                  navigation.navigate('RegisterScreen');
                }}
                underlayColor="#1572B9">
                <Text style={{ ...commonStyles.fs14_500, color: '#000' }}>
                  Login here
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>


        {/* <View style={{ ...commonStyles.row, marginTop: 33, zIndex: 1 }}>
                    <Text style={{ ...commonStyles.fs18_500, color: "#fff" }}>Already have an account? </Text>
                    <TouchableHighlight onPress={() => { navigation.navigate("LoginScreen") }} underlayColor="#1572B9">
                    <Text style={{ ...commonStyles.fs18_500, color: "#EDAA26" }}>Login</Text>
                    </TouchableHighlight>
                  </View> */}
      </View>
      <View style={{ marginBottom: -40 }} />
    </View>
  );
}
