import {
  View,
  Text,
  TouchableHighlight,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import React from 'react';
import { SIZES } from '../utils/theme';
import Auth_BG_Component from '../components/Auth_BG_Component';
import { commonStyles } from '../utils/styles';
import Custom_Auth_Btn from '../components/Custom_Auth_Btn';
import CustomTextInput from '../components/CustomTextInput';
import { mobileRegisterPostRequest } from '../utils/API';
import Toast from 'react-native-simple-toast';
import Auth from '../services/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/reducer/user';
import CustomLoader, { CustomPanel } from '../components/CustomLoader';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const { userType } = useSelector(state => state.UserType);

  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');

  // const [imageData, setImageData] = React.useState("");

  const handleRegister = () => {
    if (name.length === 0) {
      setNameError(true);
    } else if (email.length === 0) {
      setEmailError(true);
    } else if (password.length === 0) {
      setPasswordError(true);
    } else if (phone.length === 0) {
      setPhoneError(true);
    }
    // else if (image.length === 0) {
    //     Alert.alert("Alert", "Image is mandatory!");
    // }
    else {
      setLoading(true);
      mobileRegisterPostRequest(
        email,
        password,
        name,
        phone,
        userType,
        async response => {
          // console.log('\n\n mobileRegisterPostRequest api response: ', response);
          setLoading(false);
          if (response !== null) {
            if (response?.message !== undefined) {
              if (response?.message === 'Mail exists') {
                Alert.alert('Alert', response?.message);
              } else {
                const userData = response?.user;
                const email_password = [];
                email_password.push(email);
                email_password.push(password);
                await Auth.setLocalStorageData(
                  'email_password',
                  email_password,
                );

                Toast.show('Register Successfully!');
                await AsyncStorage.setItem('LIKED_OFFER', `0`);
                await AsyncStorage.setItem('SAVED_OFFER', `[]`);
                await AsyncStorage.setItem('TOTAL_SHARED', `0`);
                setName('');
                setEmail('');
                setPassword('');
                navigation.navigate('LoginScreen');
              }
            }
          }
        },
      );
    }
  };

  var btnText = '';
  if (userType === 'user') {
    btnText = 'User';
  } else if (userType === 'shop') {
    btnText = 'Shop Owner';
  }

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View
        style={{
          justifyContent: 'center',
          height: SIZES.height,
          paddingHorizontal: 20,
          justifyContent: 'space-between',
          paddingVertical: '28%',
        }}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: '600', color: '#FF800B' }}>
            {btnText}
          </Text>
          <Text
            style={{
              ...commonStyles.fs14_400,
              color: '#000',
              marginTop: 8,
              marginBottom: 40,
              width: "90%"
            }}>
            Register Now to access all the features of ShopAd!
          </Text>

          <CustomTextInput
            placeholder="Name"
            value={name}
            keyboardType="default"
            icon={require('../assets/img/name.png')}
            onChange={val => {
              setName(val);
              setNameError(false);
            }}
          />
          {nameError ? (
            <Text style={{ ...commonStyles.fs12_400, color: 'red' }}>
              Name is required
            </Text>
          ) : (
            <></>
          )}
          <View style={{ height: 14 }} />

          <CustomTextInput
            placeholder="shopad@gmail.com"
            value={email}
            keyboardType={'email-address'}
            autoCapitalize="none"
            icon={require('../assets/img/email.png')}
            onChange={val => {
              setEmail(val);
              setEmailError(false);
            }}
          />
          {emailError ? (
            <Text style={{ ...commonStyles.fs12_400, color: 'red' }}>
              Email is required
            </Text>
          ) : (
            <></>
          )}
          <View style={{ height: 14 }} />

          <CustomTextInput
            placeholder="Mobile"
            value={phone}
            keyboardType={'number-pad'}
            icon={require('../assets/img/phone.png')}
            onChange={val => {
              setPhone(val);
              setPhoneError(false);
            }}
          />
          {phoneError ? (
            <Text style={{ ...commonStyles.fs13_400, color: 'red', zIndex: 1 }}>
              Mobile number is required
            </Text>
          ) : (
            <></>
          )}
          <View style={{ height: 14 }} />

          <CustomTextInput
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            icon={require('../assets/img/password.png')}
            onChange={val => {
              setPassword(val);
              setPasswordError(false);
            }}
          />
          {passwordError ? (
            <Text style={{ ...commonStyles.fs13_400, color: 'red', zIndex: 1 }}>
              Password is required
            </Text>
          ) : (
            <></>
          )}
          <View style={{ height: "20%" }} />

          <Custom_Auth_Btn
            btnText={'Register as ' + btnText}
            onPress={() => {
              handleRegister(); /*navigation.navigate("Root")*/
            }}
            colors={["#E68927", "#E68927"]}
            style={{ borderRadius: 14 }}
          />
        </View>

        <View style={{ alignItems: 'center', zIndex: 1, marginTop: 20 }}>
          <View style={{ ...commonStyles.row }}>
            <Text style={{ ...commonStyles.fs14_400, color: '#000' }}>
              Already have an account?{' '}
            </Text>
            <TouchableHighlight
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}
              underlayColor="transparent">
              <Text style={{ ...commonStyles.fs14_400, color: '#1178BB' }}>
                Login here
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
      <CustomPanel loading={loading} />

      <CustomLoader loading={loading} />
    </View>
  );
}
