import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import React from 'react';
import CustomInputHeader from '../../components/CustomInputHeader';
import ImagePicker from 'react-native-image-crop-picker';
import {SIZES} from '../../utils/theme';
import {commonStyles} from '../../utils/styles';
import Custom_Auth_Btn from '../../components/Custom_Auth_Btn';
import {
  addNewWorkPostRequest,
  getWorksByOwnerIdPostRequest,
} from '../../utils/API';
import Auth from '../../services/Auth';
import CustomLoader, {CustomPanel} from '../../components/CustomLoader';
import {useState} from 'react';
import DayNightModal from '../home/DayNightModal';
import {useEffect} from 'react';
import Toast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import {RenderUpload, ReqField} from '../offer/AddSaleOfferScreen';

export default function AddWorksScreen({navigation}) {
  const [nameError, setNameError] = React.useState(false);
  const [descError, setDescError] = React.useState(false);
  const [locationError, setLocationError] = React.useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const {userData} = useSelector(state => state.User);

  const [shiftError, setShiftError] = useState(false);
  // const [salaryError, setSalaryError] = React.useState(false);
  // const [shiftError, setShiftError] = React.useState("");
  const [designationError, setDesignationError] = React.useState(false);
  const [contactError, setContactError] = React.useState(false);
  const [categoryId, setCategoryId] = useState('day'); // day night values

  const [name, setName] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [salary, setSalary] = React.useState(false);
  const [imageData, setImageData] = React.useState('');
  //   const [shift, setshift] = useState(second)
  const [shift, setShift] = React.useState(false);
  const [designation, setDesignation] = React.useState('');
  const [contact, setContact] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const [imageError, setImageError] = useState(false);
  const [canApply, setCanApply] = useState(true);

  useEffect(() => {
    Auth.getLocalStorageData('bearer').then(token => {
      getWorksByOwnerIdPostRequest(userData[0]?._id, token, response => {
        setLoading(false);
        if (response !== null) {
          if (response?.message === 'Item Found') {
            // setWorkData(response?.data);
            console.log('this is work data', response);
            if (response.data.length > 0) {
              setCanApply(false);
            }
          }
        }
      });
    });
  }, []);

  const handleSubmit = () => {
    if (!canApply) {
      Toast.show('Please by membership to Add more Work!!');
      return null;
    }

    // console.log(imageData, '<<<<<');
    // return null;
    if (desc.length === 0) {
      setDescError(true);
    } else if (name.length === 0) {
      setNameError(true);
    } else if (location.length === 0) {
      setLocationError(true);
    } else if (designation.length === 0) {
      setDesignationError(true);
    } else if (contact.length === 0) {
      setContactError(true);
    } else if (imageData.length == 0) {
      setImageError(true);
      return true;
    } else {
      Auth.getAccount().then(userData => {
        Auth.getLocalStorageData('bearer').then(token => {
          addNewWorkPostRequest(
            desc,
            name,
            location,
            salary,
            categoryId,
            designation,
            userData[0]._id,
            contact,
            userData[0].email,
            imageData,
            token,
            response => {
              setLoading(false);
              if (response !== null) {
                if (response?.message) {
                  Alert.alert(
                    'Alert',
                    response.message,
                    [
                      {
                        text: 'OK',
                        onPress: async () => {
                          navigation.goBack();
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                }
                if (response?.message?.includes('Work validation failed')) {
                  Alert.alert('Alert', response?.message);
                }
              }
            },
          );
        });
      });
    }
  };

  const getImage = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      compressImageMaxHeight: 400,
      compressImageMaxWidth: 400,
      cropping: true,
      multiple: true,
    }).then(response => {
      let tempArray = [];
      response.forEach(item => {
        console.log(item);
        let image = {
          name: item?.path,
          uri: item?.path,
          type: item?.mime,
        };
        tempArray.push(image);
      });
      if (tempArray.length < 1) {
        Alert.alert('Alert', 'Please select atleast an images');
      } else if (tempArray.length > 5) {
        Alert.alert('Alert', 'Selected images cannot be greater then 5');
      } else {
        setImageData(tempArray);
      }
    });
  };

  return (
    <>
      <CustomInputHeader navigation={navigation} title="Add Work" />
      <ScrollView
        style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
        <View
          style={{
            paddingHorizontal: 16,
            height: '90%',
            justifyContent: 'space-between',
          }}>
          {/*  */}
          <RenderUpload
            image={imageData}
            getImage={getImage}
            imageError={false}
            setImageError={() => {}}
            setImageData={setImageData}
          />
          {/*  */}

          <View>
            {imageError && (
              <Text style={{color: '#FF0000'}}>Image is mandatory</Text>
            )}
            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Your Name <ReqField />
              </Text>
              <TextInput
                placeholder="Your Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={val => {
                  setName(val);
                  setNameError(false);
                }}
                style={[
                  styles.descriptionInput,
                  {borderColor: nameError ? 'red' : '#BDBDBD'},
                ]}
              />
              {nameError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Name is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>

            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Work Description <ReqField />
              </Text>
              <TextInput
                placeholder="Description"
                placeholderTextColor="#999"
                value={desc}
                onChangeText={val => {
                  setDesc(val);
                  setDescError(false);
                }}
                style={[
                  styles.descriptionInput,
                  {borderColor: descError ? 'red' : '#BDBDBD'},
                ]}
              />
              {descError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Description is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>

            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Relationship <ReqField />
              </Text>
              <TextInput
                placeholder="Relationship"
                placeholderTextColor="#999"
                value={designation}
                onChangeText={val => {
                  setDesignation(val);
                  setDesignationError(false);
                }}
                style={[
                  styles.descriptionInput,
                  {borderColor: designationError ? 'red' : '#BDBDBD'},
                ]}
              />
              {designationError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Relationship is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>

            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Location <ReqField />
              </Text>
              <TextInput
                placeholder="Location"
                placeholderTextColor="#999"
                value={userData[0].pAddress}
                onChangeText={val => {
                  Toast.show('Please contact admin to change location');
                  // setLocation(val);
                  // setLocationError(false);
                }}
                style={[
                  styles.descriptionInput,
                  {borderColor: locationError ? 'red' : '#BDBDBD'},
                ]}
              />
              {locationError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Location is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>
            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Shift
              </Text>
            </>
            {/* <TouchableHighlight
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '16%',
                height: 58,
              }}
              underlayColor="#f7f8f9"
              onPress={() => {
                setShowCategoryModal(true);
              }}>
              <Image
                source={require('../../assets/img/filter2.png')}
                style={{width: 36, height: 36}}
              />
            </TouchableHighlight> */}

            {/* ----------- */}

            <View
              style={{
                ...commonStyles.rowBetween,
                height: 62,
                width: '100%',
                padding: 20,
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                borderColor: '#bbb',
              }}>
              <View style={{...commonStyles.rowStart, alignItems: 'center'}}>
                <View style={{marginLeft: 6}}>
                  <TouchableHighlight
                    underlayColor="#f7f8f9"
                    // onPress={() => {
                    //   navigation.navigate('UserDetailsScreen', {
                    //     userId: item?.ownerId,
                    //     user: user,
                    //   });
                    // }}
                  >
                    <Text style={{...commonStyles.fs14_700}}>{categoryId}</Text>
                  </TouchableHighlight>
                  <View
                    style={{...commonStyles.rowStart, alignItems: 'center'}}>
                    <TouchableHighlight
                      onPress={() => {
                        // navigation.navigate('LocationScreen');
                      }}
                      underlayColor="#f7f8f9">
                      <Text style={{...commonStyles.fs12_400, marginLeft: 2}}>
                        {/* {item?.location} */}
                      </Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>

              <TouchableHighlight
                onPress={() => setShowCategoryModal(true)}
                underlayColor="#f7f8f9">
                <Image
                  source={require('../../assets/img/3dots.png')}
                  resizeMode="contain"
                  style={{width: 24, height: 24, borderRadius: 100}}
                />
              </TouchableHighlight>
            </View>

            <DayNightModal
              modalVisible={showCategoryModal}
              navigation={navigation}
              setCategoryId={setCategoryId}
              callback={() => {
                setShowCategoryModal(!showCategoryModal);
              }}
            />
            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Contact <ReqField />
              </Text>
              <TextInput
                placeholder="Contact"
                placeholderTextColor="#999"
                value={contact}
                keyboardType="number-pad"
                maxLength={10}
                onChangeText={val => {
                  setContact(val);
                  setContactError(false);
                }}
                style={[
                  styles.descriptionInput,
                  {borderColor: contactError ? 'red' : '#BDBDBD'},
                ]}
              />
              {contactError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Contact is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>
          </View>
          <Text />

          <Custom_Auth_Btn
            btnText="Preview Work"
            // style={{width: '50%'}}
            onPress={() => {
              navigation.navigate('PreviewWork', {
                name,
                desc,
                contact,
                designation,
                image: imageData[0].uri,
              });
            }}
          />
          <View
            style={{
              marginTop: 20,
            }}></View>
          <Custom_Auth_Btn btnText="Sumbit" onPress={handleSubmit} />
          <Text />
        </View>

        <CustomPanel loading={loading} />

        <CustomLoader loading={loading} />
      </ScrollView>
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
    height: 50,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 4,
    color: '#000',
    padding: 10,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  locationInput: {
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
});
