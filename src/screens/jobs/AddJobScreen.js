import {
  Alert,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomInputHeader from '../../components/CustomInputHeader';
import {SIZES} from '../../utils/theme';
import {commonStyles} from '../../utils/styles';
import moment from 'moment';
import Custom_Auth_Btn from '../../components/Custom_Auth_Btn';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';
import {
  addNewJobPostRequest,
  getJobsByOwnerIdPostRequest,
  monthsArray,
} from '../../utils/API';
import Auth from '../../services/Auth';
import PersonalLeaveDatePicker from '../../components/CustomDatePicker';
import CustomLoader, {CustomPanel} from '../../components/CustomLoader';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useState} from 'react';
import {ReqField} from '../offer/AddSaleOfferScreen';

export default function AddJobScreen({navigation}) {
  const {userData} = useSelector(state => state.User);

  const [showTick, setShowTick] = React.useState({
    tick1: true,
    tick2: false,
    tick3: false,
  });

  const [showNext, setShowNext] = React.useState({
    next1: true,
    next2: false,
    next3: false,
  });

  const [shopNameError, setShopNameError] = React.useState(false);
  const [titleError, setTitleError] = React.useState(false);
  const [addressError, setAddressError] = React.useState(false);
  const [maritalStatusError, setMaritalStatusError] = React.useState(false);
  const [genderError, setGenderError] = React.useState(false);
  const [locationError, setLocationError] = React.useState(false);

  const [areaOfWorkError, setAreaOfWorkError] = React.useState(false);
  const [numberOfWorksError, setNumberOfWorkError] = React.useState(false);
  const [experienceError, setExperienceError] = React.useState(false);
  const [manPowerError, setManPowerError] = React.useState(false);
  const [workTimingError, setWorkTimingError] = React.useState(false);
  const [workTimingError2, setWorkTimingError2] = React.useState(false);
  const [salaryOfferedError, setSalaryOfferedError] = React.useState(false);
  const [vehicleRequiredError, setVehicleRequiredError] = React.useState(false);
  const [facilitiesError, setFacilitiesError] = React.useState(false);
  const [incentiveError, setIncentiveError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);

  const [cvFileError, setCvFileError] = React.useState(false);
  const [educationCertificateError, setEducationCertificateError] =
    React.useState(false);
  const [experienceCertificateError, setExperienceCertificateError] =
    React.useState(false);
  const [policyVerificationError, setPolicyVerificationError] =
    React.useState(false);
  const [interviewTimingError, setInterviewTimingError] = React.useState(false);
  const [contactNumberError, setContactNumberError] = React.useState(false);
  const [contactPersonNameError, setContactPersonNameError] =
    React.useState(false);
  const [messageError, setMessageError] = React.useState(false);
  const [startDateError, setStartDateError] = React.useState(false);

  const [shopName, setShopName] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [maritalStatus, setMaritalStatus] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [location, setLocation] = React.useState('');

  const [areaOfWork, setAreaOfWork] = React.useState('');
  const [numberOfWorks, setNumberOfWork] = React.useState('');
  const [experience, setExperience] = React.useState('');
  const [manPower, setManPower] = React.useState('');
  const [workTiming, setWorkTiming] = React.useState('');
  const [workTiming2, setWorkTiming2] = React.useState('');
  const [salaryOffered, setSalaryOffered] = React.useState('');
  const [vehicleRequired, setVehicleRequired] = React.useState('');
  const [facilities, setFacilities] = React.useState('');
  const [incentive, setIncentive] = React.useState('');
  const [description, setDescription] = React.useState('');

  const [cvFile, setCvFile] = React.useState('');
  const [educationCertificate, setEducationCertificate] = React.useState('');
  const [experienceCertificate, setExperienceCertificate] = React.useState('');
  const [policyVerification, setPolicyVerification] = React.useState('');
  const [interviewTiming, setInterviewTiming] = React.useState('');
  const [contactNumber, setContactNumber] = React.useState('');
  const [contactPersonName, setContactPersonName] = React.useState('');
  const [message, setMessage] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [canAppy, setCanAppy] = useState(true);

  useEffect(() => {
    // Alert.alert('hello');
    Auth.getLocalStorageData('bearer').then(token => {
      getJobsByOwnerIdPostRequest(userData[0]?._id, token, response => {
        setLoading(false);
        if (response !== null) {
          if (response.data.length > 0) {
            console.log(response, '<<<<this is response of get all job--- ');
            // Alert.alert('having job');
            setCanAppy(false);
          }
        }
      });
    });
  }, []);

  const dayDiff = (startDate, endDate) => {
    const convertArr = d => {
      const a = d.replace('/', '-');
      const b = a.replace('/', '-');
      return b.split('-');
    };

    // const diffInMs = moment(`12-Dec-2022`) - moment(`10-Dec-2022`);
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
    if (!canAppy) {
      Toast.show('Please buy membership to create more jobs!!');
      return null;
    }

    // var start1 = moment(startDate).format('DD/MM/YYYY');
    // var end1 = moment(endDate).format('DD/MM/YYYY');
    // var diffDays = dayDiff(start1, end1);

    // console.log(diffDays);
    // return null;

    if (userType === 'shop') {
      if (interviewTiming.length === 0) {
        setInterviewTimingError(true);
      } else if (contactNumber.length === 0) {
        setContactNumberError(true);
      } else if (contactPersonName.length === 0) {
        setContactPersonNameError(true);
      } else if (message.length === 0) {
        setMessageError(true);
      } else {
        setLoading(true);
        Auth.getAccount().then(userData => {
          Auth.getLocalStorageData('bearer').then(token => {
            addNewJobPostRequest(
              title,
              description,
              shopName,
              location,
              userData[0]?._id,
              salaryOffered,
              contactPersonName,
              startDate,
              endDate,
              contactNumber,
              userData[0]?.email,
              gender,
              areaOfWork,
              numberOfWorks,
              experience,
              manPower,
              `${workTiming} to ${workTiming2}`,
              facilities,
              incentive,
              interviewTiming,
              vehicleRequired,
              message,
              cvFile,
              policyVerification,
              educationCertificate,
              experienceCertificate,
              token,
              response => {
                setLoading(false);
                if (response !== null) {
                  if (
                    response?.message?.includes('Path `salary` is required')
                  ) {
                    Alert.alert(
                      'Alert',
                      'Oops! Something went wrong, please try again',
                    );
                    return true;
                  } else if (
                    response?.message === 'job is created successfully.'
                  ) {
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
                    return true;
                  }
                  if (response.errors) {
                    Alert.alert('Alert', response.errors.offerImage.message);
                    return true;
                  }
                }
              },
            );
          });
        });
      }
    }
  };

  const selectPdfFile = async text => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        mode: 'import',
        copyTo: 'cachesDirectory',
      });

      var realPath = '';
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
      if (text === 'cv') {
        setCvFile(res[0]);
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

  const {userType} = useSelector(state => state.UserType);

  return (
    <>
      <CustomInputHeader navigation={navigation} title="Add Job" />
      <ScrollView>
        <View
          style={{
            ...commonStyles.rowBetween,
            justifyContent: 'space-around',
            marginTop: 30,
          }}>
          <RenderTickComponent
            showNext={showTick.tick1}
            title="Basic"
            onPress={() => {
              setShowNext({
                next1: true,
                next2: false,
                next3: false,
              });
            }}
          />
          <RenderTickComponent
            showNext={showTick.tick2}
            title="Work"
            onPress={() => {
              setShowNext({
                next1: false,
                next2: true,
                next3: false,
              });
            }}
          />
          <RenderTickComponent
            showNext={showTick.tick3}
            title="Document"
            onPress={() => {
              setShowNext({
                next1: false,
                next2: false,
                next3: true,
              });
            }}
          />
        </View>

        {showNext.next1 ? (
          <View style={{paddingHorizontal: 16}}>
            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Add Title <ReqField />
              </Text>
              <TextInput
                placeholder="Title"
                placeholderTextColor="#999"
                value={title}
                onChangeText={val => {
                  setTitle(val);
                  setTitleError(false);
                }}
                style={[
                  styles.titleInput,
                  {borderColor: titleError ? 'red' : '#BDBDBD'},
                ]}
              />
              {titleError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Title is mandatory
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
                placeholder="Shop name"
                placeholderTextColor="#999"
                value={shopName}
                onChangeText={val => {
                  setShopName(val);
                  setShopNameError(false);
                }}
                style={[
                  styles.titleInput,
                  {borderColor: shopNameError ? 'red' : '#BDBDBD'},
                ]}
              />
              {shopNameError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Shop name is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>

            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Address of Firm <ReqField />
              </Text>
              <TextInput
                placeholder="Address"
                placeholderTextColor="#999"
                value={address}
                onChangeText={val => {
                  setAddress(val);
                  setAddressError(false);
                }}
                style={[
                  styles.titleInput,
                  {borderColor: addressError ? 'red' : '#BDBDBD'},
                ]}
              />
              {addressError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Address of firm is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>

            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Marital Status <ReqField />
              </Text>
              {['Married', 'Not-Married'].map(item => {
                return (
                  <TouchableOpacity
                    style={[styles.checkboxWrapper]}
                    onPress={() => {
                      setMaritalStatus(item.toLocaleLowerCase());
                      setMaritalStatusError(false);
                    }}>
                    <View style={[styles.checkbox]}>
                      <View
                        style={{
                          width: 13,
                          height: 13,
                          borderRadius: 100,
                          backgroundColor:
                            maritalStatus === item.toLocaleLowerCase()
                              ? '#000'
                              : '#fff',
                        }}
                      />
                    </View>
                    <Text style={{...commonStyles.fs14_400, marginLeft: 10}}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {/* <TextInput
                            placeholder='Marital Status'
                            placeholderTextColor="#999"
                            value={maritalStatus}
                            onChangeText={(val) => { setMaritalStatus(val); setMaritalStatusError(false) }}
                            style={[styles.titleInput, { borderColor: maritalStatusError ? "red" : "#BDBDBD" }]}
                        /> */}
              {maritalStatusError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Marital status is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>

            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Gender <ReqField />
              </Text>
              {['Men', 'Women', 'Others'].map(item => {
                return (
                  <TouchableOpacity
                    style={[styles.checkboxWrapper]}
                    onPress={() => {
                      setGender(item.toLocaleLowerCase());
                      setGenderError(false);
                    }}>
                    <View style={[styles.checkbox]}>
                      <View
                        style={{
                          width: 13,
                          height: 13,
                          borderRadius: 100,
                          backgroundColor:
                            gender === item.toLocaleLowerCase()
                              ? '#000'
                              : '#fff',
                        }}
                      />
                    </View>
                    <Text style={{...commonStyles.fs14_400, marginLeft: 10}}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {/* <TextInput
                            placeholder='Gender'
                            placeholderTextColor="#999"
                            value={gender}
                            onChangeText={(val) => { setGender(val); setGenderError(false) }}
                            style={[styles.titleInput, { borderColor: genderError ? "red" : "#BDBDBD" }]}
                        /> */}
              {genderError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Gender is mandatory
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
                value={location}
                onChangeText={val => {
                  setLocation(val);
                  setLocationError(false);
                }}
                style={[
                  styles.titleInput,
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
            <View style={{marginTop: 20}} />

            <Custom_Auth_Btn
              btnText="Next"
              onPress={() => {
                if (title.length === 0) {
                  setTitleError(true);
                } else if (shopName.length === 0) {
                  setShopNameError(true);
                } else if (address.length === 0) {
                  setAddressError(true);
                } else if (maritalStatus.length === 0) {
                  setMaritalStatusError(true);
                } else if (gender.length === 0) {
                  setGenderError(true);
                } else {
                  setShowNext({
                    next1: false,
                    next2: true,
                    next3: false,
                  });
                  setShowTick({
                    tick1: true,
                    tick2: true,
                    tick3: false,
                  });
                }
              }}
            />
            <View style={{marginTop: 20}} />
          </View>
        ) : (
          <></>
        )}

        {showNext.next2 ? (
          <View style={{paddingHorizontal: 16}}>
            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Area of work
              </Text>
              <TextInput
                placeholder="Area of work"
                placeholderTextColor="#999"
                value={areaOfWork}
                onChangeText={val => {
                  setAreaOfWork(val);
                  setAreaOfWorkError(false);
                }}
                style={[
                  styles.titleInput,
                  {borderColor: areaOfWorkError ? 'red' : '#BDBDBD'},
                ]}
              />
              {areaOfWorkError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Area of work is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>

            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Number of Workers
              </Text>
              <TextInput
                placeholder="Number of Workers"
                placeholderTextColor="#999"
                value={numberOfWorks}
                keyboardType="number-pad"
                onChangeText={val => {
                  setNumberOfWork(val);
                  setNumberOfWorkError(false);
                }}
                style={[
                  styles.titleInput,
                  {borderColor: numberOfWorksError ? 'red' : '#BDBDBD'},
                ]}
              />
              {numberOfWorksError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Number of Workers is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>

            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Experience Required (in years)
              </Text>
              <TextInput
                placeholder="Experience Required"
                placeholderTextColor="#999"
                value={experience}
                keyboardType="number-pad"
                onChangeText={val => {
                  setExperience(val);
                  setExperienceError(false);
                }}
                style={[
                  styles.titleInput,
                  {borderColor: experienceError ? 'red' : '#BDBDBD'},
                ]}
              />
              {experienceError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Experience Required is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>

            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Number of Manpower Required
              </Text>
              <TextInput
                placeholder="Number of Manpower Required"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                value={manPower}
                onChangeText={val => {
                  setManPower(val);
                  setManPowerError(false);
                }}
                style={[
                  styles.titleInput,
                  {borderColor: manPowerError ? 'red' : '#BDBDBD'},
                ]}
              />
              {manPowerError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Number of Manpower is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>

            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Work Start Timing
              </Text>
              <TextInput
                placeholder="Start hour (ex 13 for 1 PM)"
                placeholderTextColor="#999"
                value={workTiming}
                keyboardType="number-pad"
                onChangeText={val => {
                  setWorkTiming(val);
                  setWorkTimingError(false);
                }}
                style={[
                  styles.titleInput,
                  {borderColor: workTimingError ? 'red' : '#BDBDBD'},
                ]}
              />
              {workTimingError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Work Start Timing is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>
            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Work End Timing
              </Text>
              <TextInput
                placeholder="End hour (ex 20 for 8 PM)"
                placeholderTextColor="#999"
                value={workTiming2}
                keyboardType="number-pad"
                onChangeText={val => {
                  setWorkTiming2(val);
                  setWorkTimingError2(false);
                }}
                style={[
                  styles.titleInput,
                  {borderColor: workTimingError ? 'red' : '#BDBDBD'},
                ]}
              />
              {workTimingError2 ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Work End Timing is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>

            {/* <>
                        <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Salary Offered</Text>
                        <TextInput
                            placeholder='Salary Offered'
                            placeholderTextColor="#999"
                            value={salaryOffered}
                            onChangeText={(val) => { setSalaryOffered(val); setSalaryOfferedError(false); }}
                            style={[styles.titleInput, { borderColor: salaryOfferedError ? "red" : "#BDBDBD" }]}
                        />
                        {salaryOfferedError
                            ? <Text style={{ ...commonStyles.fs12_400, color: "red" }}>Salary Offered is mandatory</Text>
                            : <></>}
                    </> */}

            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Vehicle Required
              </Text>
              <TextInput
                placeholder="Vehicle Required"
                placeholderTextColor="#999"
                value={vehicleRequired}
                onChangeText={val => {
                  setVehicleRequired(val);
                  setVehicleRequiredError(false);
                }}
                style={[
                  styles.titleInput,
                  {borderColor: vehicleRequiredError ? 'red' : '#BDBDBD'},
                ]}
              />
              {vehicleRequiredError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Vehicle required is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>

            <>
              {/* <Text style={{ ...commonStyles.fs16_500, marginTop: 14 }}>Shift</Text> */}
              {/* <View style={{ ...commonStyles.rowBetween }}> */}
              {/* {
                                ["Day", "Night"].map((item) => {
                                    return (
                                        <TouchableOpacity
                                            style={[styles.checkboxWrapper]}
                                            onPress={() => setShift(item.toLocaleLowerCase())}
                                        >
                                            <View style={[styles.checkbox]}>
                                                <View style={{
                                                    width: 13, height: 13, borderRadius: 100,
                                                    backgroundColor: shift === item.toLocaleLowerCase() ? "#000" : "#fff"
                                                }} />
                                            </View>
                                            <Text style={{ ...commonStyles.fs14_400, marginLeft: 10 }}>{item}</Text>
                                        </TouchableOpacity>
                                    );
                                })
                            } */}
              <PersonalLeaveDatePicker
                heading="Job publish Start date"
                placeholderText="Start Date"
                minimumDate={''}
                maximumDate={endDate === '' ? '' : endDate}
                initialDate={startDate === '' ? endDate : startDate}
                isStart="yes"
                error={startDateError}
                onDateSelected={function (selectedStartDate) {
                  setStartDate(moment(selectedStartDate).format('DD-MMM-YYYY'));

                  const forStart =
                    moment(selectedStartDate).format('DD-MM-YYYY');
                  console.log(selectedStartDate);
                  setStartDateError(false);
                }}
              />

              <PersonalLeaveDatePicker
                heading="End Date"
                placeholderText="End Date"
                minimumDate={''}
                maximumDate=""
                initialDate={endDate === '' ? startDate : endDate}
                onDateSelected={function (selectedStartDate) {
                  setEndDate(moment(selectedStartDate).format('DD-MMM-YYYY'));
                  // handleSubmit();
                }}
              />
              {/* </View> */}
            </>

            <>
              <Text
                style={{
                  ...commonStyles.fs16_500,
                  marginBottom: 10,
                  marginTop: 10,
                }}>
                Facilities
              </Text>
              <FlatList
                data={[
                  'Indore, India',
                  'Bhopal, India',
                  'Nagpur, India',
                  'Jabalpur, India',
                  'Kashmir, India',
                  'Goa, India',
                ]}
                numColumns={2}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      style={[styles.checkboxWrapper]}
                      onPress={() => {
                        if (facilities?.length === 0) {
                          setFacilities(item);
                        } else {
                          setFacilities('');
                        }
                        setFacilitiesError(false);
                      }}>
                      <View style={[styles.checkbox]}>
                        <View
                          style={{
                            width: 13,
                            height: 13,
                            borderRadius: 100,
                            backgroundColor:
                              facilities === item ? '#000' : '#fff',
                          }}
                        />
                      </View>
                      <Text style={{...commonStyles.fs14_400, marginLeft: 10}}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
              {facilitiesError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Facility is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>

            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Incentive Offered
              </Text>
              <TextInput
                placeholder="Incentive Offered"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                value={incentive}
                onChangeText={val => {
                  setIncentive(val);
                  setIncentiveError(false);
                }}
                style={[
                  styles.titleInput,
                  {borderColor: incentiveError ? 'red' : '#BDBDBD'},
                ]}
              />
              {incentiveError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Incentive is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>
            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Salary Offered
              </Text>
              <TextInput
                placeholder="Salary Offered"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                value={salaryOffered}
                onChangeText={val => {
                  setSalaryOffered(val);
                  // setIncentiveError(false);
                }}
                style={[
                  styles.titleInput,
                  {borderColor: incentiveError ? 'red' : '#BDBDBD'},
                ]}
              />
              {/* { ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Incentive is mandatory
                </Text>
              ) : (
                <></>
              )} */}
            </>

            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 10}}>
                Description
              </Text>
              <TextInput
                placeholder=""
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
                  styles.titleInput,
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
            <View style={{marginTop: 20}} />

            <Custom_Auth_Btn
              btnText="Next"
              onPress={() => {
                if (areaOfWork.length === 0) {
                  setAreaOfWorkError(true);
                } else if (numberOfWorks.length === 0) {
                  setNumberOfWorkError(true);
                } else if (experience.length === 0) {
                  setExperienceError(true);
                } else if (manPower.length === 0) {
                  setManPowerError(true);
                } else if (workTiming.length === 0) {
                  setWorkTimingError(true);
                } else if (vehicleRequired.length === 0) {
                  setVehicleRequiredError(true);
                } else if (facilities.length === 0) {
                  setFacilitiesError(true);
                } else if (incentive.length === 0) {
                  setIncentiveError(true);
                } else if (description.length === 0) {
                  setDescriptionError(true);
                }
                var start1 = moment(startDate).format('DD/MM/YYYY');
                var end1 = moment(endDate).format('DD/MM/YYYY');
                var diffDays = dayDiff(start1, end1);
                if (diffDays > 4) {
                  Toast.show(
                    'Only Premium members can create job for more than 4 days',
                  );
                  return null;
                }
                if (diffDays < 0) {
                  Toast.show(
                    'Start date and end date is wrong!. (check dates again)',
                  );
                  return null;
                } else {
                  setShowNext({
                    next1: false,
                    next2: false,
                    next3: true,
                  });
                  setShowTick({
                    tick1: true,
                    tick2: true,
                    tick3: true,
                  });
                }
              }}
            />
            <View style={{marginTop: 20}} />
          </View>
        ) : (
          <></>
        )}

        {showNext.next3 ? (
          <View style={{paddingHorizontal: 16}}>
            {userType === 'user' ? (
              <>
                <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                  Attach CV
                </Text>
                {cvFile.length === 0 ? (
                  <TouchableHighlight
                    style={[styles.attachCV]}
                    onPress={() => {
                      selectPdfFile('cv');
                      setCvFileError(false);
                    }}
                    underlayColor="#f7f8f9">
                    <Image
                      source={require('../../assets/img/attach.png')}
                      style={{width: 24, height: 24, tintColor: '#BDBDBD'}}
                    />
                  </TouchableHighlight>
                ) : (
                  <View style={[styles.attachCV, commonStyles.rowBetween]}>
                    <Text style={{...commonStyles.fs14_500}}>
                      {cvFile.name}
                    </Text>
                    <TouchableHighlight
                      onPress={() => setCvFile('')}
                      underlayColor="#f7f8f9">
                      <Image
                        source={require('../../assets/img/cross.png')}
                        style={{width: 20, height: 20, tintColor: '#BDBDBD'}}
                      />
                    </TouchableHighlight>
                  </View>
                )}
                {cvFileError ? (
                  <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                    CV is mandatory
                  </Text>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            {userType === 'user' ? (
              <>
                <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                  Education Certificate
                </Text>
                {educationCertificate.length === 0 ? (
                  <TouchableHighlight
                    style={[styles.attachCV]}
                    onPress={() => {
                      selectPdfFile('educationCertificate');
                      setEducationCertificateError(false);
                    }}
                    underlayColor="#f7f8f9">
                    <Image
                      source={require('../../assets/img/upload.png')}
                      style={{width: 24, height: 24, tintColor: '#BDBDBD'}}
                    />
                  </TouchableHighlight>
                ) : (
                  <View style={[styles.attachCV, commonStyles.rowBetween]}>
                    <Text style={{...commonStyles.fs14_500}}>
                      {educationCertificate.name}
                    </Text>
                    <TouchableHighlight
                      onPress={() => setCvFile('')}
                      underlayColor="#f7f8f9">
                      <Image
                        source={require('../../assets/img/cross.png')}
                        style={{width: 20, height: 20, tintColor: '#BDBDBD'}}
                      />
                    </TouchableHighlight>
                  </View>
                )}
                {educationCertificateError ? (
                  <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                    Education certificate is mandatory
                  </Text>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            {userType === 'user' ? (
              <>
                <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                  Experience Certificate
                </Text>
                {experienceCertificate.length === 0 ? (
                  <TouchableHighlight
                    style={[styles.attachCV]}
                    onPress={() => {
                      selectPdfFile('experienceCertificate');
                      setExperienceCertificateError(false);
                    }}
                    underlayColor="#f7f8f9">
                    <Image
                      source={require('../../assets/img/upload.png')}
                      style={{width: 24, height: 24, tintColor: '#BDBDBD'}}
                    />
                  </TouchableHighlight>
                ) : (
                  <View style={[styles.attachCV, commonStyles.rowBetween]}>
                    <Text style={{...commonStyles.fs14_500}}>
                      {experienceCertificate.name}
                    </Text>
                    <TouchableHighlight
                      onPress={() => setCvFile('')}
                      underlayColor="#f7f8f9">
                      <Image
                        source={require('../../assets/img/cross.png')}
                        style={{width: 20, height: 20, tintColor: '#BDBDBD'}}
                      />
                    </TouchableHighlight>
                  </View>
                )}
                {experienceCertificateError ? (
                  <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                    Experience certificate is mandatory
                  </Text>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            {userType === 'user' ? (
              <>
                <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                  Police Verification
                </Text>
                {policyVerification.length === 0 ? (
                  <TouchableHighlight
                    style={[styles.attachCV]}
                    onPress={() => {
                      selectPdfFile('policyVerification');
                      setPolicyVerificationError(false);
                    }}
                    underlayColor="#f7f8f9">
                    <Image
                      source={require('../../assets/img/upload.png')}
                      style={{width: 24, height: 24, tintColor: '#BDBDBD'}}
                    />
                  </TouchableHighlight>
                ) : (
                  <View style={[styles.attachCV, commonStyles.rowBetween]}>
                    <Text style={{...commonStyles.fs14_500}}>
                      {policyVerification.name}
                    </Text>
                    <TouchableHighlight
                      onPress={() => setCvFile('')}
                      underlayColor="#f7f8f9">
                      <Image
                        source={require('../../assets/img/cross.png')}
                        style={{width: 20, height: 20, tintColor: '#BDBDBD'}}
                      />
                    </TouchableHighlight>
                  </View>
                )}
                {policyVerificationError ? (
                  <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                    Policy verification is mandatory
                  </Text>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Interview Timing
              </Text>
              <TextInput
                placeholder="Interview Timing"
                placeholderTextColor="#999"
                value={interviewTiming}
                keyboardType="default"
                maxLength={10}
                onChangeText={val => {
                  setInterviewTiming(val);
                  setInterviewTimingError(false);
                }}
                style={[
                  styles.titleInput,
                  {borderColor: interviewTimingError ? 'red' : '#BDBDBD'},
                ]}
              />
              {interviewTimingError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Interview timing is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>
            {/* <PersonalLeaveDatePicker
                            heading="Interview Timing"
                            placeholderText="Interview Timing"
                            maximumDate={interviewTiming === '' ? '' : interviewTiming}
                            onDateSelected={function (selectedStartDate) { }}
                        /> */}

            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Contact Number
              </Text>
              <TextInput
                placeholder="Contact Number"
                placeholderTextColor="#999"
                value={contactNumber}
                keyboardType="number-pad"
                maxLength={10}
                onChangeText={val => {
                  setContactNumber(val);
                  setContactNumberError(false);
                }}
                style={[
                  styles.titleInput,
                  {borderColor: contactNumberError ? 'red' : '#BDBDBD'},
                ]}
              />
              {contactNumberError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Contact number is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>

            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Contact Person Name/ Owner of Firm
              </Text>
              <TextInput
                placeholder="Contact Person Name/ Owner of Firm"
                placeholderTextColor="#999"
                value={contactPersonName}
                onChangeText={val => {
                  setContactPersonName(val);
                  setContactPersonNameError(false);
                }}
                style={[
                  styles.titleInput,
                  {borderColor: contactPersonNameError ? 'red' : '#BDBDBD'},
                ]}
              />
              {contactPersonNameError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Contact person name is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>

            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Message
              </Text>
              <TextInput
                placeholder="Message"
                placeholderTextColor="#999"
                value={message}
                numberOfLines={4}
                multiline={true}
                textAlignVertical="top"
                onChangeText={val => {
                  setMessage(val);
                  setMessageError(false);
                }}
                style={[
                  styles.descriptionInput,
                  {borderColor: messageError ? 'red' : '#BDBDBD'},
                ]}
              />
              {messageError ? (
                <Text style={{...commonStyles.fs12_400, color: 'red'}}>
                  Message is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>
            <View style={{marginTop: 20}} />

            <Custom_Auth_Btn
              btnText="Preview"
              // style={{width: '50%'}}
              onPress={() => {
                navigation.navigate('PreviewJob', {
                  title,
                  description,
                  shopName,
                  location,
                  userId: userData[0]?._id,
                  salaryOffered,
                  contactPersonName,
                  startDate,
                  endDate,
                  contactNumber,
                  email: userData[0]?.email,
                  gender,
                  areaOfWork,
                  numberOfWorks,
                  experience,
                  manPower,
                  workTiming,
                  facilities,
                  incentive,
                  interviewTiming,
                  vehicleRequired,
                  message,
                  cvFile,
                  policyVerification,
                  educationCertificate,
                  experienceCertificate,
                });
              }}
            />
            <View
              style={{
                height: 20,
              }}
            />
            <Custom_Auth_Btn btnText="Submit" onPress={handleSubmit} />
            <View style={{marginTop: 20}} />
          </View>
        ) : (
          <></>
        )}

        <CustomPanel loading={loading} />
        <CustomLoader loading={loading} />
      </ScrollView>
    </>
  );
}

const RenderTickComponent = ({showNext, title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{alignItems: 'center'}}>
        <LinearGradient
          style={{
            width: 24,
            height: 24,
            borderRadius: 100,
            ...commonStyles.centerStyles,
          }}
          colors={showNext ? ['#1572B9', '#0995C8'] : ['#D9D9D9', '#D9D9D9']}>
          {showNext ? (
            <Image
              source={require('../../assets/img/tick.png')}
              style={{width: 10.5, height: 7.5, tintColor: '#fff'}}
            />
          ) : (
            <></>
          )}
        </LinearGradient>
        <Text style={{...commonStyles.fs14_500}}>{title}</Text>
        <View
          style={{
            width: SIZES.width / 3,
            height: 2,
            backgroundColor: showNext ? '#1572B9' : '#D9D9D9',
            position: 'absolute',
            top: 12,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

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
