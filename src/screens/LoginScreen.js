import {
  View,
  Text,
  TouchableHighlight,
  StatusBar,
  Image,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { SIZES } from '../utils/theme';
import Auth_BG_Component from '../components/Auth_BG_Component';
import { commonStyles } from '../utils/styles';
import Custom_Auth_Btn from '../components/Custom_Auth_Btn';
import CustomTextInput from '../components/CustomTextInput';
import { mobileLoginPostRequest } from '../utils/API';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/reducer/user';
import Toast from 'react-native-simple-toast';
import Auth from '../services/Auth';
import CustomLoader, { CustomPanel } from '../components/CustomLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const { userType } = useSelector(state => state.UserType);

  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    if (email.length === 0) {
      setEmailError(true);
    }
    if (password.length === 0) {
      setPasswordError(true);
    } else {
      setLoading(true);
      mobileLoginPostRequest(email, password, userType, async response => {
        // console.log('\n\n mobileLoginPostRequest api response: ', response);
        setLoading(false);
        if (response !== null) {
          if (response?.message !== undefined) {
            if (response?.message === 'Mail exists') {
              Alert.alert('Alert', response?.message);
            } else if (response?.message === 'Auth failed') {
              Alert.alert('Alert', response?.message);
            } else {
              const userData = response?.user;
              dispatch(setUser(userData));
              await Auth.setAccount(userData);
              await Auth.setLocalStorageData('bearer', response.token);
              const email_password = [];
              const userEmail = email;
              const userPassword = password;
              email_password.push(userEmail);
              email_password.push(userPassword);
              await Auth.setLocalStorageData(
                'email_password',
                email_password?.toString(),
              );
              await AsyncStorage.setItem('LIKED_OFFER', `0`);
              await AsyncStorage.setItem('SAVED_OFFER', `[]`);
              await AsyncStorage.setItem('TOTAL_SHARED', `0`);
              Toast.show('Login Successfully!');
              setEmail('');
              setPassword('');
            }
          }
        }
      });
    }
  };

  var btnText = '';
  if (userType === 'user') {
    btnText = 'User';
  } else if (userType === 'shop') {
    btnText = 'Shop Owner';
  }

  return (
    <Auth_BG_Component>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>
            Login Account{/* {btnText} */}
          </Text>
          <Text style={styles.subHeading}>
            Hello, welcome back to our account
          </Text>

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
            <Text style={{ ...commonStyles.fs13_400, color: 'red' }}>
              Email is required
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
            <Text style={{ ...commonStyles.fs13_400, color: 'red' }}>
              Password is required
            </Text>
          ) : (
            <></>
          )}
          <View style={{ alignItems: 'flex-end', marginTop: 8 }}>
            <TouchableHighlight
              underlayColor="#1572B9"
              onPress={() => {
                navigation.navigate('ForgotPasswordPassword', {
                  email: email,
                });
              }}>
              <Text
                style={{
                  ...commonStyles.fs12_400,
                  color: '#1178BB',
                  textDecorationColor: '#1178BB',
                  textDecorationLine: 'underline',
                }}>
                Forgot Password?
              </Text>
            </TouchableHighlight>
          </View>
          <View style={{ height: 60 }} />

          <Custom_Auth_Btn
            btnText={'Login'}
            onPress={() => {
              handleLogin();
            }}
            colors={["#E68927", "#E68927"]}
            style={{ borderRadius: 14 }}
          />
        </View>

        <View style={styles.orBlock}>
          <View style={styles.orBorder} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.orBorder} />
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require("../assets/img/google.png")}
            style={{ width: 30, height: 30 }}
          />
          <Text style={styles.googleButtonText}>Login With Google</Text>
          <Text />
        </TouchableOpacity>

        <View style={{ alignItems: 'center', zIndex: 1 }}>
          <View style={{ ...commonStyles.row }}>
            <Text style={{ ...commonStyles.fs14_500, color: '#000' }}>
              Not Registered yet?{' '}
            </Text>
            <TouchableHighlight
              onPress={() => {
                navigation.navigate('RegisterScreen');
              }}
              underlayColor="#1572B9">
              <Text style={{ ...commonStyles.fs14_600, color: '#1178BB' }}>
                Create an Account
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>

      <CustomPanel loading={loading} />

      <CustomLoader loading={loading} />
    </Auth_BG_Component>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: SIZES.height,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: '28%',
  },
  heading: {
    fontSize: 24, fontWeight: '600', color: '#FF800B'
  },
  subHeading: {
    ...commonStyles.fs14_400,
    color: '#000',
    marginTop: 8,
    marginBottom: 20,
  },
  orBlock: {
    flexDirection: "row", alignItems: "center", justifyContent: "center"
  },
  orBorder: {
    width: "40%", height: 1, backgroundColor: "#B6B6B6"
  },
  orText: {
    fontSize: 12, fontWeight: "600", color: "#000", marginHorizontal: 20
  },
  googleButton: {
    borderRadius: 14,
    elevation: 8,
    shadowColor: "#999",
    borderColor: "#595959",
    borderWidth: 0.4,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    height: 56,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  googleButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginLeft: 20
  }
})
