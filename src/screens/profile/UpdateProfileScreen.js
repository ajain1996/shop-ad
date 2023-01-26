import {
  View,
  Text,
  TouchableHighlight,
  StatusBar,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {SIZES} from '../../utils/theme';
import {commonStyles} from '../../utils/styles';
import Custom_Auth_Btn from '../../components/Custom_Auth_Btn';
import CustomTextInput from '../../components/CustomTextInput';
import {SelectList} from 'react-native-dropdown-select-list';
import Auth from '../../services/Auth';
import {useDispatch, useSelector} from 'react-redux';
import CustomLoader, {CustomPanel} from '../../components/CustomLoader';
import {launchImageLibrary} from 'react-native-image-picker';
import {Linking} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

import {
  getUserDataById,
  mobileLoginPostRequest,
  updateUserPostRequest,
} from '../../utils/API';
import {setUser} from '../../redux/reducer/user';
import Toast from 'react-native-simple-toast';
import {TouchableOpacity} from 'react-native-gesture-handler';

const initialValues = {
  religion: '',
  physicalDisablity: '',
  martialStatus: '',
  experineceCertificate: null,
  eduction: '',
  experienceYears: '',
  certifiedCourse: '',
  pAddress: '',

  rAddress: '',
  fathername: '',
  mothername: '',
  shopCategory: '',
  certificate: null,
};

const purposeData = [
  {key: '1', value: 'Ads'},
  {key: '2', value: 'Recruitment'},
  {key: '3', value: 'Work'},
  {key: '4', value: 'All'},
];
const shopCategoryData = [
  {key: '1', value: 'Fast food'},
  {key: '2', value: 'Groceries'},
  {key: '3', value: 'Kirana Store'},
  {key: '4', value: 'Sari  Shop'},
  {key: '5', value: 'Readymade Garments'},
  {key: '6', value: 'Stationery'},
  {key: '8', value: 'Printing Shop'},
  {key: '9', value: 'Shoes store  '},
  {key: '10', value: 'Repairing Shop'},
  {key: '11', value: 'Bakeries'},
  {key: '12', value: 'Namkeen Shop'},
  {key: '13', value: 'Restaurants'},
  {key: '14', value: 'Sweets Shop'},
  {key: '15', value: 'Purse Shop'},
  {key: '16', value: 'Wedding Suit Shop'},
  {key: '17', value: 'Hardware Shop'},
  {key: '18', value: 'Crockery Shop'},
  {key: '19', value: 'Fancy Item Shop'},
  {key: '20', value: 'Bag Shop'},
  {key: '21', value: 'Mens Accessories Shop'},
  {key: '22', value: "Woman's Accessories Shop"},
  {key: '23', value: 'Tailor Shop'},
  {key: '24', value: 'Jewellery Shop'},
  {key: '25', value: 'Novell Shop'},
  {key: '26', value: 'Metal Shop'},
  {key: '27', value: 'Paint Shop'},
  {key: '28', value: 'Curtain Shop'},
];
export default function UpdateProfileScreen({navigation}) {
  const dispatch = useDispatch();

  const {userData} = useSelector(state => state.User);
  const {userType} = useSelector(state => state.UserType);
  const [nameError, setNameError] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState(false);
  const [isCertificateUploaded, setIsCertificateUploaded] = useState(false);
  const [shopCategory, setShopCategory] = useState('');
  const [emailId, setemailId] = useState(userData[0].email);
  const [purposeOfRegistration, setpurposeOfRegistration] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [imageChanged, setImageChanged] = React.useState(false);
  const [imageData, setImageData] = React.useState({uri: ''});
  const [canChangeAddress, setCanChangeAddress] = useState(true);
  const [formData, setFormData] = useState(initialValues);
  const [errors, seterrors] = useState({});

  React.useEffect(() => {
    setName(userData[0].name);
    setPhone(userData[0].mobile);
    setImageData({uri: userData[0].userProfile});
    console.log(userData, '<<<<<  this is userData');
    const {pAddress, rAddress} = userData[0];
    if (pAddress == '' || pAddress == null || pAddress == undefined) {
      setCanChangeAddress(true);
    } else {
      if (pAddress?.trim().length > 0) {
        setCanChangeAddress(false);
      }
    }

    setFormData({
      ...formData,
      ...userData[0],
      certificate: {name: 'View certificate'},
    });
  }, []);

  // console.log(imageData, '\n\n\n\n<<<this is userdata');
  const handleUpdateUser = () => {
    // return null;
    if (name.length === 0) {
      setNameError(true);
    }

    if (phone.length === 0) {
      setPhoneError(true);
    }
    if (imageData?.uri?.length === 0) {
      // Alert.alert('Alert', 'Image is mandatory!');
    } else {
      setLoading(true);
      let allValid = true;
      let validArr = [];
      if (userType == 'user') {
        validArr = [
          'martialStatus',
          'name',
          'phone',
          'religion',
          'pAddress',
          'rAddress',
          'eduction',
        ];
      } else {
        validArr = [
          // 'martialStatus',
          'name',
          'phone',
          // 'religion',
          'pAddress',
          'rAddress',
          // 'eduction',
        ];
      }

      validArr.map(item => {
        if (formData[item]?.trim() === '' && allValid) {
          // Alert.alert(item + ' is required');
          allValid = false;
        }
      });
      console.log(allValid, '<<<allvalid');
      if (allValid == false) {
        setLoading(false);
        return null;
      }

      console.log(imageData, '<<<< this is formdata');
      // return null;
      Auth.getLocalStorageData('bearer').then(token => {
        updateUserPostRequest(
          userData[0]?._id,
          emailId,
          name,
          phone,
          userType,
          imageData,
          token,
          imageChanged,
          formData,
          isCertificateUploaded,
          shopCategory,
          purposeOfRegistration,
          async response => {
            console.log(response, '<<<< this is response of image update');
            // return null;
            if (response.status == false) {
              setLoading(false);
              return Alert.alert(response.message);
            }
            setLoading(false);
            if (response !== null) {
              if (response?.message !== undefined) {
                if (response?.message === 'User Updated') {
                  // Alert.alert('here');

                  getUserDataById(userData[0]?._id, token, async res => {
                    console.log(
                      '\n\n\n\n updated data user',
                      res.data,
                      '\n\n\n\n',
                    );
                    Toast.show('Profile successfully updated');
                    await Auth.setAccount(res.data);
                    dispatch(setUser(res.data));

                    // await Auth.setLocalStorageData(
                    //   'bearer',
                    //   res.token,
                    // );
                    let email_password = [];
                    const userEmail = email_password[0];
                    const userPassword = email_password[1];
                    email_password.push(res.data[0].email);
                    email_password.push(res.data[0].password);
                    await Auth.setLocalStorageData(
                      'email_password',
                      email_password?.toString(),
                    );
                  });
                  navigation.navigate('ProfileScreen');
                  return null;
                }
              }
            }
          },
        );
      });
    }
  };

  const selectPdfFile = async text => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        mode: 'import',
        copyTo: 'cachesDirectory',
      });

      // var realPath;
      if (Platform.OS === 'ios') {
        var RNFS = require('react-native-fs');
        let url = res.uri;
        const split = url.split('/');
        const name = split.pop();
        const inbox = split.pop();
        realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
      } else {
        realPath = res.uri;
      }
      if (text === 'certificate') {
        setIsCertificateUploaded(true);
        // setCvFile(res[0]);
        setFormData({...formData, certificate: res[0]});
      } else if (text === 'educationCertificate') {
        setEducationCertificate(res[0]);
      } else if (text === 'experienceCertificate') {
        setExperienceCertificate(res[0]);
      } else if (text === 'policyVerification') {
        setPolicyVerification(res[0]);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const handleChange = (name, value) => {
    setFormData({...formData, [name]: value});
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
        console.log(response, '<<<<thisis  response');
        setImage(response?.assets[0].uri);
        setImageChanged(true);
        setImageData({
          name: response?.assets[0].fileName,
          uri: response?.assets[0].uri,
          type: response?.assets[0].type,
        });
      }
    });
  };
  const userImage = require('../../assets/img/profile-tab.png');
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1572B9" />

      <View
        style={{
          justifyContent: 'center',
          height: SIZES.height,
          // paddingHorizontal: 20,
          justifyContent: 'space-between',
          // paddingVertical: '22%',
        }}>
        <View>
          <KeyboardAvoidingView behavior="padding">
            <ScrollView
              style={{
                width: '100%',
                height: '100%',
                // marginTop: 20,
                // marginBottom: 40,
                backgroundColor: '#fff',
                paddingHorizontal: 10,
              }}
              keyboardShouldPersistTaps="always">
              <Text
                style={{
                  ...commonStyles.fs22_600,
                  color: '#000',
                  marginTop: 8,
                  marginBottom: 20,
                }}>
                Edit Profile
              </Text>

              <TouchableHighlight
                style={{
                  alignItems: 'center',
                  marginBottom: 30,
                  marginTop: '20%',
                }}
                onPress={getImage}
                underlayColor="transparent">
                {/* {!userData?.userProfile ? ( */}
                {!imageData?.uri ? (
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 100,
                      backgroundColor: '#f7f8f9',
                      ...commonStyles.centerStyles,
                    }}>
                    <Image
                      // source={require('../../assets/img/camera.png')}
                      source={userImage}
                      style={{width: '75%', height: '75%', tintColor: '#999'}}
                    />
                  </View>
                ) : (
                  <Image
                    source={{uri: imageData?.uri}}
                    style={{width: 120, height: 120, borderRadius: 100}}
                  />
                )}
              </TouchableHighlight>
              <Text style={{color: '#000', fontSize: 17}}>
                Name <Text style={{color: '#FF0000'}}>*</Text>
              </Text>
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
                <Text style={{...commonStyles.fs13_400, color: 'red'}}>
                  Name is required
                </Text>
              ) : (
                <></>
              )}
              <View style={{height: 14}} />
              <Text style={{color: '#000', fontSize: 17}}>
                Phone <Text style={{color: '#FF0000'}}>*</Text>
              </Text>
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
                <Text style={{...commonStyles.fs13_400, color: 'red'}}>
                  Phone is required
                </Text>
              ) : (
                <></>
              )}
              <View style={{height: 14}} />
              <Text style={{color: '#000', fontSize: 17}}>
                Email <Text style={{color: '#FF0000'}}>*</Text>
              </Text>
              <CustomTextInput
                placeholder="Email"
                value={emailId}
                // maxLength={10}
                // icon={require('../../assets/img/phone.png')}
                onChange={val => {
                  setemailId(val);
                  // setPhoneError(false);
                }}
              />

              <View style={{height: 14}} />
              {userType == 'shop' && (
                <>
                  <Text style={{color: '#000', fontSize: 17}}>
                    Shop Category <Text style={{color: '#FF0000'}}>*</Text>
                  </Text>
                  <SelectList
                    setSelected={val => {
                      // console.log(val, '<<<< sdfcategory');
                      setShopCategory(val);
                    }}
                    data={shopCategoryData}
                    save="value"
                  />
                </>
              )}
              <View style={{height: 14}} />
              {userType == 'shop' && (
                <>
                  <Text style={{color: '#000', fontSize: 17}}>
                    Purpose of Registration
                  </Text>
                  <SelectList
                    setSelected={val => {
                      // console.log(val, '<<<< sdfcategory');
                      setpurposeOfRegistration(val);
                    }}
                    data={purposeData}
                    save="value"
                  />
                </>
              )}
              <View style={{height: 14}} />

              {userType == 'user' && (
                <>
                  <Text style={{color: '#000', fontSize: 17}}>Mother name</Text>
                  <CustomTextInput
                    placeholder="Mother Name"
                    value={formData.mothername}
                    // keyboardType="number-pad"
                    maxLength={30}
                    // icon={require('../../assets/img/phone.png')}
                    onChange={val => {
                      // setPhone(val);
                      handleChange('mothername', val);
                      setPhoneError(false);
                    }}
                  />
                </>
              )}

              {userType == 'user' && formData.mothername?.trim() == '' ? (
                <Text style={{...commonStyles.fs13_400, color: 'red'}}>
                  Mother name is required
                </Text>
              ) : (
                <></>
              )}

              {userType == 'user' && (
                <>
                  <View style={{height: 14}} />
                  <Text style={{color: '#000', fontSize: 17}}>Father name</Text>
                  <CustomTextInput
                    placeholder="Father Name"
                    value={formData.fathername}
                    // keyboardType="number-pad"
                    maxLength={30}
                    // icon={require('../../assets/img/phone.png')}
                    onChange={val => {
                      // setPhone(val);
                      handleChange('fathername', val);
                      setPhoneError(false);
                    }}
                  />
                  {formData.fathername?.trim() == '' ? (
                    <Text style={{...commonStyles.fs13_400, color: 'red'}}>
                      Father name is required
                    </Text>
                  ) : (
                    <></>
                  )}
                </>
              )}

              <View style={{height: 14}} />
              <Text style={{color: '#000', fontSize: 17}}>
                {userType == 'user' ? 'Permanent Address' : 'Shop Address'}
                <Text style={{color: '#FF0000'}}>*</Text>
                <Text style={{fontSize: 10, color: '#FF0000'}}>
                  {`${
                    !canChangeAddress ? '(Contact Admin To change Address)' : ''
                  }`}
                </Text>
              </Text>
              {!canChangeAddress && (
                <Text style={{fontSize: 14}}>{formData.pAddress}</Text>
              )}
              {canChangeAddress && (
                <CustomTextInput
                  placeholder={
                    userType == 'user'
                      ? 'Permanent Address'
                      : 'shop no, area, city, state, country, pin code'
                  }
                  value={formData.pAddress}
                  // keyboardType="number-pad"
                  maxLength={30}
                  // icon={require('../../assets/img/phone.png')}
                  onChange={val => {
                    // setPhone(val);
                    if (canChangeAddress) {
                      handleChange('pAddress', val);

                      // setPhoneError(false);
                    } else {
                      Toast.show('Please contact admin to change address');
                    }
                  }}
                />
              )}

              {formData.pAddress?.trim() == '' ? (
                <Text style={{...commonStyles.fs13_400, color: 'red'}}>
                  Permanenet Address is required
                </Text>
              ) : (
                <></>
              )}

              <View style={{height: 14}} />
              <Text style={{color: '#000', fontSize: 17}}>
                Residential Address <Text style={{color: '#FF0000'}}>*</Text>
                <Text style={{fontSize: 10, color: '#FF0000'}}>
                  {`${
                    !canChangeAddress ? '(Contact Admin To change Address)' : ''
                  }`}
                </Text>
              </Text>
              {canChangeAddress ? (
                <CustomTextInput
                  placeholder="Residential Address"
                  value={formData.rAddress}
                  // keyboardType="number-pad"
                  maxLength={30}
                  // icon={require('../../assets/img/phone.png')}
                  onChange={val => {
                    // setPhone(val);
                    handleChange('rAddress', val);
                    setPhoneError(false);
                  }}
                />
              ) : (
                <Text>{formData.rAddress}</Text>
              )}

              {formData.rAddress?.trim() == '' ? (
                <Text style={{...commonStyles.fs13_400, color: 'red'}}>
                  Redential Address is required
                </Text>
              ) : (
                <></>
              )}
              <View style={{height: 14}} />
              {userType == 'user' && (
                <>
                  <Text style={{color: '#000', fontSize: 17}}>
                    Marital Status <Text style={{color: '#FF0000'}}>*</Text>
                  </Text>
                  {['Married', 'Not-Married'].map((item, key) => {
                    return (
                      <TouchableOpacity
                        key={key}
                        style={[styles.checkboxWrapper]}
                        onPress={() => {
                          setFormData({
                            ...formData,
                            martialStatus: item.toLocaleLowerCase(),
                          });
                        }}>
                        <View style={[styles.checkbox]}>
                          <View
                            style={{
                              width: 13,
                              height: 13,
                              borderRadius: 100,
                              backgroundColor:
                                formData.martialStatus ==
                                item.toLocaleLowerCase()
                                  ? '#000'
                                  : '#fff',
                            }}
                          />
                        </View>
                        <Text
                          style={{...commonStyles.fs14_400, marginLeft: 10}}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </>
              )}

              {userType == 'user' && (
                <>
                  <View style={{height: 14}} />
                  <Text style={{color: '#000', fontSize: 17}}>
                    {' '}
                    Certified Course Name
                  </Text>
                  <CustomTextInput
                    placeholder="Certified Course Name"
                    value={formData?.certifiedCourse}
                    // keyboardType="number-pad"
                    maxLength={30}
                    // icon={require('../../assets/img/phone.png')}
                    onChange={val => {
                      // setPhone(val);
                      handleChange('certifiedCourse', val);
                      setPhoneError(false);
                    }}
                  />
                </>
              )}

              {userType == 'user' && (
                <>
                  <View style={{height: 14}} />
                  <Text style={{color: '#000', fontSize: 17}}>
                    {' '}
                    Upload Certificate
                  </Text>
                  {formData.certificate == null ? (
                    <TouchableHighlight
                      style={[styles.attachCV]}
                      onPress={() => {
                        selectPdfFile('certificate');

                        // handleChange("certificate",)
                        // setCvFileError(false);
                      }}
                      underlayColor="#f7f8f9">
                      <Image
                        source={require('../../assets/img/attach.png')}
                        style={{width: 24, height: 24, tintColor: '#BDBDBD'}}
                      />
                    </TouchableHighlight>
                  ) : (
                    <View style={[styles.attachCV, commonStyles.rowBetween]}>
                      <Text
                        style={{...commonStyles.fs14_500}}
                        onPress={() => {
                          // console.log(userData, '<<this is userdata');
                          Linking.openURL(userData[0].certificate);
                        }}>
                        {formData?.certificate?.name}
                      </Text>
                      <TouchableHighlight
                        onPress={() =>
                          setFormData({...formData, certificate: null})
                        }
                        underlayColor="#f7f8f9">
                        <Image
                          source={require('../../assets/img/cross.png')}
                          style={{width: 20, height: 20, tintColor: '#BDBDBD'}}
                        />
                      </TouchableHighlight>
                    </View>
                  )}
                </>
              )}
              {userType == 'user' && (
                <>
                  <View style={{height: 14}} />
                  <Text style={{color: '#000', fontSize: 17}}>
                    Experience Years
                  </Text>
                  <CustomTextInput
                    placeholder="Experience Years"
                    value={formData.experienceYears}
                    keyboardType="number-pad"
                    maxLength={30}
                    // icon={require('../../assets/img/phone.png')}
                    onChange={val => {
                      // setPhone(val);
                      handleChange('experienceYears', val);
                      setPhoneError(false);
                    }}
                  />
                  {formData.experienceYears?.trim() == '' ? (
                    <Text style={{...commonStyles.fs13_400, color: 'red'}}>
                      Experience Year is required
                    </Text>
                  ) : (
                    <></>
                  )}
                </>
              )}

              <View style={{height: 14}} />
              {userType == 'user' && (
                <>
                  <Text style={{color: '#000', fontSize: 17}}>
                    Religion <Text style={{color: '#FF0000'}}>*</Text>
                  </Text>
                  <CustomTextInput
                    placeholder="Religion"
                    value={formData.religion}
                    // keyboardType="number-pad"
                    maxLength={30}
                    // icon={require('../../assets/img/phone.png')}
                    onChange={val => {
                      // setPhone(val);
                      handleChange('religion', val);
                      setPhoneError(false);
                    }}
                  />
                  {formData.religion?.trim() == '' ? (
                    <Text style={{...commonStyles.fs13_400, color: 'red'}}>
                      Religion is required
                    </Text>
                  ) : (
                    <></>
                  )}
                </>
              )}

              {userType == 'user' && (
                <>
                  <View style={{height: 14}} />
                  <Text style={{color: '#000', fontSize: 17}}>
                    Educational Details
                  </Text>
                  <CustomTextInput
                    placeholder="Educational Details"
                    value={formData.eduction}
                    // keyboardType="number-pad"
                    maxLength={30}
                    // icon={require('../../assets/img/phone.png')}
                    onChange={val => {
                      // setPhone(val);
                      handleChange('eduction', val);
                      setPhoneError(false);
                    }}
                  />

                  {formData.eduction?.trim() == '' ? (
                    <Text style={{...commonStyles.fs13_400, color: 'red'}}>
                      Education Details is required
                    </Text>
                  ) : (
                    <></>
                  )}
                </>
              )}

              {/* <View style={{height: 14}} />
          <CustomTextInput
            placeholder="Physical Disablity Address"
            value={formData.physicalDisablity}
            // keyboardType="number-pad"
            maxLength={30}
            // icon={require('../../assets/img/phone.png')}
            onChange={val => {
              // setPhone(val);
              handleChange('physicalDisablity', val);
              setPhoneError(false);
            }}
          />

          {formData.physicalDisablity?.trim() == '' ? (
            <Text style={{...commonStyles.fs13_400, color: 'red'}}>
              Physical Disablity is required
            </Text>
          ) : (
            <></>
          )} */}

              <View style={{height: 14}} />
              <Custom_Auth_Btn
                btnText="Update Profile"
                onPress={() => {
                  handleUpdateUser(); /*navigation.navigate("Root")*/
                }}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>
      <CustomPanel loading={loading} />

      <CustomLoader loading={loading} />
    </>
  );
}
const styles = StyleSheet.create({
  upload: {
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: '#fff',
    position: 'absolute',
    ...commonStyles.centerStyles,
  },
  descriptionInput: {
    width: '100%',
    height: 77,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 4,
    color: '#000',
    padding: 10,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  titleInput: {
    width: '100%',
    height: 55,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 4,
    color: '#000',
    padding: 16,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  datePicker: {
    width: SIZES.width / 2.24,
    borderWidth: 1,
    height: 55,
    borderColor: '#BDBDBD',
    ...commonStyles.rowStart,
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 6,
  },
  checkbox: {
    width: 19,
    height: 19,
    borderRadius: 100,
    borderWidth: 1,
    ...commonStyles.centerStyles,
  },
  checkboxWrapper: {
    ...commonStyles.rowStart,
    alignItems: 'center',
    marginVertical: 8,
    width: SIZES.width / 2,
  },
  attachCV: {
    width: '100%',
    height: 67,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    ...commonStyles.centerStyles,
    marginTop: 6,
    paddingHorizontal: 20,
  },
});
