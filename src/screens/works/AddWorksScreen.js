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
  getAllCategoriesAPI,
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
  const [shopNameError, setshopNameError] = React.useState(false);
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
  const [shopName, setshopName] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [location, setLocation] = React.useState();
  const [salary, setSalary] = React.useState(false);
  const [imageData, setImageData] = React.useState('');
  //   const [shift, setshift] = useState(second)
  const [shift, setShift] = React.useState(false);
  const [designation, setDesignation] = React.useState('');
  const [contact, setContact] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const [imageError, setImageError] = useState(false);
  const [canApply, setCanApply] = useState(true);
  const [category, setCategory] = React.useState('');
  const [emailId, setemailId] = React.useState('');
  const [emailIDError, setemailIDError] = React.useState(false);
  const [instaId, setinstaId] = React.useState('');
  const [facebookId, setfacebookId] = React.useState('');
  const [websiteAddress, setwebsiteAddress] = React.useState('');
  const [categories, setCategories] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  React.useEffect(() => {
    if (
      userData[0]?.pAddress == undefined ||
      userData[0].pAddress == 'undefined' ||
      userData[0].pAddress == null ||
      userData[0].pAddress == 'null'
    ) {
      Alert.alert('Alert', 'Update your profile to add offer', [
        {
          text: 'Redirect',
          onPress: () => {
            navigation.navigate('UpdateProfileScreen', {});
          },
        },
      ]);
    } else {
      setLocation(userData[0].pAddress);
    }
    Auth.getLocalStorageData('bearer').then(token => {
      getAllCategoriesAPI(token, response => {
        if (response !== null) {
          if (response?.data !== null || response?.data !== undefined) {
            setCategories(response?.data);
            setAllCategory(response.data);
            console.log(response, '<<<<<response');
          }
        }
      });
    });
  }, []);
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
    // if (!canApply) {
    //   Toast.show('Please buy membership to Add more Work!!');
    //   return null;
    // }
    // console.log(imageData, '<<<<<');
    // return null;
    if (desc.length < 3) {
      console.log('description');
      setDescError(true);
    } else if (name.length < 3) {
      console.log('name');
      setNameError(true);
    } else if (shopName.length < 3) {
      console.log('shop');
      setshopNameError(true);
    } else if (location.length < 3) {
      console.log('location');
      setLocationError(true);
    } else if (designation.length < 3) {
      console.log('designation');
      setDesignationError(true);
    } else if (contact.length != 10) {
      console.log('contact');
      setContactError(true);
    } else if (imageData.length == 0) {
      console.log('image');
      setImageError(true);
      return true;
    } else if (emailId.length > 0) {
      var emailRegex =
        /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
      const isCorrectEmailFormat = emailRegex.test(emailId);
      if (!isCorrectEmailFormat) {
        setemailIDError(true);
        return true;
      }
    } else {
      console.log('callin gapi');
      // return null;
      setLoading(true);
      Auth.getAccount().then(userData => {
        Auth.getLocalStorageData('bearer').then(token => {
          addNewWorkPostRequest(
            desc,
            shopName,
            name,
            location,
            salary,
            categoryId,
            designation,
            userData[0]._id,
            contact,
            userData[0].email,
            imageData,
            instaId,
            facebookId,
            emailId,
            websiteAddress,

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

  const filterSearch = text => {
    if (text.trim() == '') return setCategories(allCategory);
    else {
      const t1 = text.toLocaleLowerCase().trim();
      let filtered = allCategory.filter(item => {
        const t2 = item.categoryName.toLocaleLowerCase().trim();
        if (t2.match(t1)) return true;
        else false;
      });
      setCategories(filtered);
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
            setImageError={setImageError}
            setImageData={setImageData}
          />
          {/*  */}

          <View>
            {imageError && (
              <Text style={{color: '#FF0000'}}>Image is mandatory</Text>
            )}
            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Owner Name <ReqField />
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
                  Owner Name is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>
            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Shop Name <ReqField />
              </Text>
              <TextInput
                placeholder="Shop Name"
                placeholderTextColor="#999"
                value={shopName}
                onChangeText={val => {
                  setshopNameError(false);
                  setshopName(val);
                }}
                style={[
                  styles.descriptionInput,
                  {borderColor: nameError ? 'red' : '#BDBDBD'},
                ]}
              />
              {shopNameError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Shop Name is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>
            {/* <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Shop Name
              </Text>
              <TextInput
                placeholder="Shop Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={val => {
                  setshopName(val);
                  // setNameError(false);
                }}
                style={[
                  styles.descriptionInput,
                  {borderColor: nameError ? 'red' : '#BDBDBD'},
                ]}
              />
            </> */}

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
                Add Category
              </Text>
              {/* <TouchableOpacity onPress={() => setShowCategoryModal(true)}> */}
              <>
                <View>
                  <TextInput
                    placeholder="Category"
                    placeholderTextColor="#999"
                    value={category}
                    onChangeText={val => {
                      setCategory(val);
                      filterSearch(val);
                      // seter(false);
                    }}
                    style={[
                      styles.locationInput,
                      {borderColor: locationError ? 'red' : '#BDBDBD'},
                    ]}
                  />

                  <Image
                    source={require('../../assets/img/location-track.png')}
                    style={{
                      width: 24,
                      height: 24,
                      position: 'absolute',
                      right: 16,
                      top: 22,
                    }}
                  />
                </View>
              </>
              <Image
                source={require('../../assets/img/location-track.png')}
                style={{
                  width: 24,
                  height: 24,
                  position: 'absolute',
                  right: 16,
                  top: 22,
                }}
              />
              {/* </TouchableOpacity> */}
              {category != '' && (
                <View>
                  {categories.map(item => {
                    return (
                      <Text
                        style={{
                          width: '100%',
                          height: 30,
                          borderWidth: 0.5,
                          marginTop: 2,
                          paddingHorizontal: 10,
                        }}
                        onPress={() => {
                          setCategory(item?.categoryName);
                          setCategories([]);
                        }}>
                        {item.categoryName}
                      </Text>
                    );
                  })}
                </View>
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
                  Please enter correct contact number (10 digit)
                </Text>
              ) : (
                <></>
              )}
            </>
            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Email ID <ReqField />
              </Text>
              <TextInput
                placeholder="Contact"
                placeholderTextColor="#999"
                value={emailId}
                // keyboardType="number-pad"
                // maxLength={10}
                onChangeText={val => {
                  setemailId(val);
                  setemailIDError(false);
                }}
                style={[
                  styles.descriptionInput,
                  {borderColor: contactError ? 'red' : '#BDBDBD'},
                ]}
              />
              {emailIDError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Please enter correct email address
                </Text>
              ) : (
                <></>
              )}
            </>
            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Facebook Id
              </Text>
              <TextInput
                placeholder="Contact"
                placeholderTextColor="#999"
                value={facebookId}
                // keyboardType="number-pad"
                maxLength={10}
                onChangeText={val => {
                  setfacebookId(val);
                }}
                style={[
                  styles.descriptionInput,
                  {borderColor: contactError ? 'red' : '#BDBDBD'},
                ]}
              />
            </>
            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Instagram Id
              </Text>
              <TextInput
                placeholder="Contact"
                placeholderTextColor="#999"
                value={instaId}
                // keyboardType="number-pad"
                maxLength={10}
                onChangeText={val => {
                  setinstaId(val);
                }}
                style={[
                  styles.descriptionInput,
                  {borderColor: contactError ? 'red' : '#BDBDBD'},
                ]}
              />
            </>
            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Website address
              </Text>
              <TextInput
                placeholder="Contact"
                placeholderTextColor="#999"
                value={websiteAddress}
                // keyboardType="number-pad"
                maxLength={10}
                onChangeText={val => {
                  setwebsiteAddress(val);
                }}
                style={[
                  styles.descriptionInput,
                  {borderColor: contactError ? 'red' : '#BDBDBD'},
                ]}
              />
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
                image: imageData[0]?.uri,
              });
            }}
          />
          <View
            style={{
              marginTop: 20,
            }}></View>
          <Custom_Auth_Btn btnText="Submit" onPress={handleSubmit} />
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
