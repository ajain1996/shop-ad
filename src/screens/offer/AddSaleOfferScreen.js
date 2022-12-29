import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import CustomInputHeader from '../../components/CustomInputHeader';
import {SIZES} from '../../utils/theme';
import {launchImageLibrary, openPicker} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import {commonStyles} from '../../utils/styles';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import Custom_Auth_Btn from '../../components/Custom_Auth_Btn';
import {
  addNewOfferPostRequest,
  getAllCategoriesAPI,
  getOffersByOwnerIdPostRequest,
  monthsArray,
} from '../../utils/API';
import Auth from '../../services/Auth';
import CustomLoader, {CustomPanel} from '../../components/CustomLoader';
import PersonalLeaveDatePicker from '../../components/CustomDatePicker';
import AllCategoryModal from './AllCategoriesModal';
import {useSelector} from 'react-redux';
import {useState} from 'react';

export default function AddSaleOfferScreen({navigation}) {
  const {userData} = useSelector(state => state.User);
  const [imageError, setImageError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);
  const [locationError, setLocationError] = React.useState(false);
  const [startDateError, setStartDateError] = React.useState(false);
  const [endDateError, setEndDateError] = React.useState(false);
  const [price, setPrice] = useState(0);
  const [code, setCode] = useState('');

  const [imageData, setImageData] = React.useState('');
  const [priceError, setPriceError] = useState(false);
  const [docError, setdocError] = useState(false);
  const [description, setDescription] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [allCategory, setAllCategory] = useState([]);
  // const [, set] = useState(second)
  const [loading, setLoading] = React.useState(false);
  const [canApply, setCanApply] = useState(true);
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

  const [showCategoryModal, setShowCategoryModal] = React.useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = React.useState({
    name: '',
    id: '',
  });

  React.useEffect(() => {
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
      getOffersByOwnerIdPostRequest(userData[0]?._id, token, response => {
        setLoading(false);
        if (response !== null) {
          if (response?.message === 'Data From Database') {
            // setOfferData(response?.data);
            console.log(response, '<<<< this is sales offer screen');
            if (response.data.length > 0) {
              setCanApply(false);
            }
            // console.log(
            //   '\n\n\n\n\n\n\n\n\n\n\n',
            //   response.data,
            //   '\n\n\n\n\n\n\n\n\n\n offer data',
            // );
          }
        }
      });
    });
  }, []);

  const getCategoryId = () => {
    const checId = allCategory.filter(item => item.categoryName == category);
    if (checId.length) return checId[0]._id;
    else return category;
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
  const dayDiff = (startDate, endDate) => {
    const convertArr = d => {
      const a = d.replace('/', '-');
      const b = a.replace('/', '-');
      return b.split('-');
    };
    const diffInMs =
      moment(
        `${parseInt(convertArr(endDate)[0])}-${
          monthsArray[parseInt(convertArr(endDate)[1])]
        }-${parseInt(convertArr(endDate)[2])}`,
      ) -
      moment(
        `${parseInt(convertArr(startDate)[0])}-${
          monthsArray[parseInt(convertArr(startDate)[1])]
        }-${parseInt(convertArr(startDate)[2])}`,
      );

    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays + 1;
  };

  const handleSubmit = () => {
    // getCategoryId();
    var start1 = moment(startDate).format('DD/MM/YYYY');
    var end1 = moment(endDate).format('DD/MM/YYYY');
    var diffDays = dayDiff(start1, end1);
    // console.log(diffDays, '<<<this is deiff');
    console.log(getCategoryId());
    if (!canApply) {
      Toast.show('Please by membership to create more Offers!!');
      return null;
    }
    if (description.length === 0) {
      setDescriptionError(true);
    } else if (location.length === 0) {
      setLocationError(true);
    } else if (startDate.length === 0) {
      setStartDateError(true);
    } else if (endDate.length === 0) {
      setEndDateError(true);
    } else if (imageData.length === 0) {
      setImageError(true);
    } else {
      const getMonthShort = da => da.split('-');
      console.log(getMonthShort(startDate)[1]);

      const finalStartDate = `${
        getMonthShort(startDate)[0]
      }-${monthsArray.indexOf(getMonthShort(startDate)[1])}-${
        getMonthShort(startDate)[2]
      }`;
      const finalEndDate = `${getMonthShort(endDate)[0]}-${monthsArray.indexOf(
        getMonthShort(endDate)[1],
      )}-${getMonthShort(endDate)[2]}`;
      if (diffDays > 4) {
        Toast.show('Only Premium members can create job for more than 4 days');
        return null;
      }
      if (diffDays < 0) {
        Toast.show('Start date and end date is wrong!. (check dates again)');
        return null;
      }
      // return null;
      console.log('submit it \n\n\n\n\n\n\n', {
        description,
        startDate: finalStartDate,
        location,
        category: category.id,
        price: price,
        code: code,
        endDate: finalEndDate,
        imageData,
      });
      //   return null;
      setLoading(true);
      Auth.getLocalStorageData('bearer').then(token => {
        console.log(token, '<<<<< \n\n\n\n this is token');
        Auth.getAccount().then(userData => {
          console.log(userData, '<<< userdata');
          // return null;
          addNewOfferPostRequest(
            description,
            location,
            startDate,
            endDate,
            imageData,

            userData[0]._id,
            null,
            getCategoryId(),
            price,
            code,
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
                if (response.errors) {
                  Alert.alert('Alert', response.errors.offerImage.message);
                }
              }
            },
          );
        });
      });
    }
  };

  return (
    <>
      <ScrollView style={{width: '100%', height: SIZES.height}}>
        <CustomInputHeader navigation={navigation} title="Add Sale Offer" />

        <View style={{paddingHorizontal: 16}}>
          <RenderUpload
            image={imageData}
            getImage={getImage}
            imageError={imageError}
            setImageError={setImageError}
            setImageData={setImageData}
          />

          <>
            <Text style={{...commonStyles.fs16_500, marginTop: 10}}>
              Description <ReqField />
            </Text>
            <TextInput
              placeholder="Description"
              placeholderTextColor="#999"
              value={description}
              numberOfLines={4}
              multiline={true}
              textAlignVertical="top"
              onChangeText={val => {
                setDescription(val);
                setDescriptionError(false);
              }}
              style={[
                styles.descriptionInput,
                {borderColor: descriptionError ? 'red' : '#BDBDBD'},
              ]}
            />
            {descriptionError ? (
              <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                Description is mandatory
              </Text>
            ) : (
              <></>
            )}
          </>
          <>
            <Text style={{...commonStyles.fs16_500, marginTop: 10}}>
              Price <ReqField />
            </Text>
            <TextInput
              placeholder="Price"
              placeholderTextColor="#999"
              value={price}
              // numberOfLines={1}
              keyboardType="number-pad"
              multiline={true}
              textAlignVertical="top"
              onChangeText={val => {
                setPrice(val);
                setPriceError(false);
              }}
              style={[
                styles.locationInput,
                {borderColor: descriptionError ? 'red' : '#BDBDBD'},
              ]}
            />
            {priceError ? (
              <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                Price is mandatory
              </Text>
            ) : (
              <></>
            )}
          </>
          <>
            <Text style={{...commonStyles.fs16_500, marginTop: 10}}>
              Discount Code
            </Text>
            <TextInput
              placeholder="Discount"
              placeholderTextColor="#999"
              value={code}
              onChangeText={val => {
                setCode(val);
                setdocError(false);
              }}
              style={[
                styles.locationInput,
                {borderColor: locationError ? '#BDBDBD' : '#BDBDBD'},
              ]}
            />
          </>

          <>
            <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
              Location <ReqField />
            </Text>
            <View>
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
            {locationError ? (
              <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                Location is mandatory
              </Text>
            ) : (
              <></>
            )}
          </>

          <View style={{...commonStyles.rowBetween, marginBottom: 20}}>
            <View>
              <PersonalLeaveDatePicker
                heading="Start Date"
                placeholderText="Start Date"
                minimumDate={''}
                maximumDate={endDate === '' ? '' : endDate}
                initialDate={startDate === '' ? endDate : startDate}
                isStart="yes"
                error={startDateError}
                onDateSelected={function (selectedStartDate) {
                  setStartDate(moment(selectedStartDate).format('DD-MMM-YYYY'));
                  setStartDateError(false);
                }}
              />
              {startDateError ? (
                <Text
                  style={{
                    ...commonStyles.fs12_400,
                    color: 'red',
                    marginTop: -15,
                  }}>
                  Startdate is mandatory
                </Text>
              ) : (
                <></>
              )}
            </View>

            <View>
              <PersonalLeaveDatePicker
                heading="End Date"
                placeholderText="End Date"
                minimumDate={''}
                maximumDate=""
                error={endDateError}
                initialDate={endDate === '' ? startDate : endDate}
                onDateSelected={function (selectedStartDate) {
                  setEndDate(moment(selectedStartDate).format('DD-MMM-YYYY'));
                  setEndDateError(false);
                }}
              />
              {endDateError ? (
                <Text
                  style={{
                    ...commonStyles.fs12_400,
                    color: 'red',
                    marginTop: -15,
                  }}>
                  Enddate is mandatory
                </Text>
              ) : (
                <></>
              )}
            </View>
          </View>

          <>
            <Text style={{...commonStyles.fs16_500, marginTop: -20}}>
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

          <Custom_Auth_Btn btnText="Upload" onPress={handleSubmit} />
          <Text />
        </View>
      </ScrollView>

      <AllCategoryModal
        modalVisible={showCategoryModal}
        callback={(res, res2) => {
          setShowCategoryModal(!showCategoryModal);
          if (res !== 0) {
            setCategory({
              ...category,
              name: res2,
              id: res,
            });
            return true;
          }
        }}
        navigation={navigation}
      />

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

export const ReqField = () => {
  return <Text style={{color: '#FF0000'}}>*</Text>;
};

export const RenderUpload = ({
  image,
  getImage,
  imageError,
  setImageError,
  setImageData,
}) => {
  return (
    <View>
      <View>
        {image.length === 0 ? (
          <TouchableHighlight
            onPress={() => {
              getImage();
              setImageError(false);
            }}
            style={{paddingVertical: 16}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../assets/img/work_img.png')}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: SIZES.width / 1.36,
                  opacity: 0.8,
                }}
              />
              <View style={[styles.upload]}>
                <Image
                  source={require('../../assets/img/upload.png')}
                  resizeMode="contain"
                  style={{width: 23, height: 23, tintColor: '#000'}}
                />
              </View>
            </View>
          </TouchableHighlight>
        ) : (
          <View style={{flex: 1}}>
            <ScrollView horizontal={true} contentContainerStyle={{flexGrow: 1}}>
              {image.map(res => {
                return (
                  <Image
                    source={{uri: res?.uri}}
                    resizeMode="stretch"
                    style={{
                      width: SIZES.width / 1.3,
                      height: SIZES.width / 1.4,
                      borderRadius: 9,
                      marginRight: 20,
                    }}
                  />
                );
              })}
            </ScrollView>
            <TouchableHighlight
              onPress={() => setImageData('')}
              style={{
                position: 'absolute',
                top: 6,
                right: 6,
                borderRadius: 100,
              }}
              underlayColor="#f7f8f9">
              <Image
                source={require('../../assets/img/cross.png')}
                style={{width: 25, height: 25, tintColor: '#fff'}}
              />
            </TouchableHighlight>
          </View>
        )}
      </View>
      {imageError ? (
        <Text style={{...commonStyles.fs12_400, color: 'red', marginTop: -24}}>
          Image is mandatory
        </Text>
      ) : (
        <></>
      )}
    </View>
  );
};
