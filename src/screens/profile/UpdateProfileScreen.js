import {
    View,
    Text,
    TouchableHighlight,
    StatusBar,
    Alert,
    Image,
    ScrollView,
} from 'react-native';
import React from 'react';
import { SIZES } from '../../utils/theme';
import { commonStyles } from '../../utils/styles';
import Custom_Auth_Btn from '../../components/Custom_Auth_Btn';
import CustomTextInput from '../../components/CustomTextInput';
import Auth from '../../services/Auth';
import { useDispatch, useSelector } from 'react-redux';
import CustomLoader, { CustomPanel } from '../../components/CustomLoader';
import { launchImageLibrary } from 'react-native-image-picker';
import { mobileLoginPostRequest, updateUserPostRequest } from '../../utils/API';
import { setUser } from '../../redux/reducer/user';

export default function UpdateProfileScreen({ navigation }) {
    const dispatch = useDispatch();

    const { userData } = useSelector(state => state.User);
    const { userType } = useSelector(state => state.UserType);

    const [nameError, setNameError] = React.useState(false);
    const [phoneError, setPhoneError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const [imageData, setImageData] = React.useState('');

    React.useEffect(() => {
        setName(userData[0].name);
        setPhone(userData[0].mobile);
    }, []);

    const handleUpdateUser = () => {
        if (name.length === 0) {
            setNameError(true);
        }
        if (phone.length === 0) {
            setPhoneError(true);
        }
        if (image.length === 0) {
            Alert.alert('Alert', 'Image is mandatory!');
        } else {
            setLoading(true);
            Auth.getLocalStorageData('bearer').then(token => {
                updateUserPostRequest(
                    userData[0]?._id,
                    userData[0]?.email,
                    name,
                    phone,
                    userType,
                    imageData,
                    token,
                    async response => {
                        setLoading(false);
                        if (response !== null) {
                            if (response?.message !== undefined) {
                                if (response?.message === 'User Updated') {
                                    Auth.getLocalStorageData('email_password').then(
                                        email_password => {
                                            if (email_password !== null) {
                                                email_password = email_password.split(',');
                                                mobileLoginPostRequest(
                                                    email_password[0],
                                                    email_password[1],
                                                    userType,
                                                    async userResponse => {
                                                        if (userResponse !== null) {
                                                            if (userResponse?.message !== undefined) {
                                                                const userData = userResponse?.user;
                                                                dispatch(setUser(userData));
                                                                await Auth.setAccount(userData);
                                                                await Auth.setLocalStorageData(
                                                                    'bearer',
                                                                    userResponse.token,
                                                                );
                                                                const email_password = [];
                                                                const userEmail = email_password[0];
                                                                const userPassword = email_password[1];
                                                                email_password.push(userEmail);
                                                                email_password.push(userPassword);
                                                                await Auth.setLocalStorageData(
                                                                    'email_password',
                                                                    email_password?.toString(),
                                                                );
                                                                setName('');
                                                                setPhone('');
                                                                Alert.alert(
                                                                    'Alert',
                                                                    'Profile updated successfully!',
                                                                    [
                                                                        {
                                                                            text: 'OK',
                                                                            onPress: async () => {
                                                                                navigation.goBack();
                                                                            },
                                                                        },
                                                                    ],
                                                                    { cancelable: false },
                                                                );
                                                            }
                                                        }
                                                    },
                                                );
                                            }
                                        },
                                    );
                                }
                            }
                        }
                    },
                );
            });
        }
    };

    let options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    const [image, setImage] = React.useState('');

    const getImage = () => {
        launchImageLibrary(options, response => {
            if (response?.didCancel) {
            } else if (response?.error) {
            } else if (response?.customButton) {
            } else {
                setImage(response?.assets[0].uri);
                setImageData(response);
                setImageData(response);
            }
        });
    };

    return (
        <ScrollView
            style={{ width: '100%', height: '100%', backgroundColor: '#1572B9' }}>
            <StatusBar barStyle="light-content" backgroundColor="#1572B9" />
            <View
                style={{
                    justifyContent: 'center',
                    height: SIZES.height,
                    paddingHorizontal: 20,
                    justifyContent: 'space-between',
                    paddingVertical: '22%',
                }}>
                <View>
                    <Text
                        style={{
                            ...commonStyles.fs22_600,
                            color: '#fff',
                            marginTop: 8,
                            marginBottom: 20,
                        }}>
                        Edit Profile
                    </Text>

                    <TouchableHighlight
                        style={{ alignItems: 'center', marginBottom: 30, marginTop: '20%' }}
                        onPress={getImage}
                        underlayColor="transparent">
                        {image.length === 0 ? (
                            <View
                                style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: 100,
                                    backgroundColor: '#f7f8f9',
                                    ...commonStyles.centerStyles,
                                }}>
                                <Image
                                    source={require('../../assets/img/camera.png')}
                                    style={{ width: '75%', height: '75%', tintColor: '#999' }}
                                />
                            </View>
                        ) : (
                            <Image
                                source={{ uri: image }}
                                style={{ width: 120, height: 120, borderRadius: 100 }}
                            />
                        )}
                    </TouchableHighlight>

                    <CustomTextInput
                        placeholder="Name"
                        value={name}
                        keyboardType="default"
                        icon={require('../../assets/img/name.png')}
                        onChange={val => {
                            setName(val);
                            setNameError(false);
                        }}
                    />
                    {nameError ? (
                        <Text style={{ ...commonStyles.fs13_400, color: 'red' }}>
                            Name is required
                        </Text>
                    ) : (
                        <></>
                    )}
                    <View style={{ height: 14 }} />

                    <CustomTextInput
                        placeholder="Phone"
                        value={phone}
                        keyboardType="number-pad"
                        maxLength={10}
                        icon={require('../../assets/img/phone.png')}
                        onChange={val => {
                            setPhone(val);
                            setPhoneError(false);
                        }}
                    />
                    {phoneError ? (
                        <Text style={{ ...commonStyles.fs13_400, color: 'red' }}>
                            Phone is required
                        </Text>
                    ) : (
                        <></>
                    )}
                    <View style={{ height: 14 }} />

                    <Custom_Auth_Btn
                        btnText="Update Profile"
                        onPress={() => {
                            handleUpdateUser(); /*navigation.navigate("Root")*/
                        }}
                    />
                </View>
            </View>
            <CustomPanel loading={loading} />

            <CustomLoader loading={loading} />
        </ScrollView>
    );
}
