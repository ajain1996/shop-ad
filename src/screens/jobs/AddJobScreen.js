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
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';
import {addNewJobPostRequest} from '../../utils/API';
import Auth from '../../services/Auth';
import PersonalLeaveDatePicker from '../../components/CustomDatePicker';
import CustomLoader, {CustomPanel} from '../../components/CustomLoader';
import {useSelector} from 'react-redux';

export default function AddJobScreen({navigation}) {
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

  const handleSubmit = () => {
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
              'salaryOffered',
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
    } else {
      if (cvFile.length === 0) {
        setCvFileError(true);
      } else if (educationCertificate.length === 0) {
        setEducationCertificateError(true);
      } else if (experienceCertificate.length === 0) {
        setExperienceCertificateError(true);
      } else if (policyVerification.length === 0) {
        setPolicyVerificationError(true);
      } else if (interviewTiming.length === 0) {
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
              'salaryOffered',
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
          <RenderTickComponent showNext={showTick.tick1} title="Basic" />
          <RenderTickComponent showNext={showTick.tick2} title="Work" />
          <RenderTickComponent showNext={showTick.tick3} title="Document" />
        </View>

        {showNext.next1 ? (
          <View style={{paddingHorizontal: 16}}>
            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Add Title
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
                  Description is mandatory
                </Text>
              ) : (
                <></>
              )}
            </>

            <>
              <Text style={{...commonStyles.fs16_500, marginTop: 14}}>
                Shop Name
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
                Address of Firm
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
                Marital Status
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
                Gender
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
                Location
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
                  Gender is mandatory
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
                Experience Required
              </Text>
              <TextInput
                placeholder="Experience Required"
                placeholderTextColor="#999"
                value={experience}
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
                Work Timing
              </Text>
              <TextInput
                placeholder="Work Timing"
                placeholderTextColor="#999"
                value={workTiming}
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
                  Work Timing is mandatory
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
                heading="Shift"
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

              <PersonalLeaveDatePicker
                // heading="End Date"
                placeholderText="End Date"
                minimumDate={''}
                maximumDate=""
                initialDate={endDate === '' ? startDate : endDate}
                onDateSelected={function (selectedStartDate) {
                  setEndDate(moment(selectedStartDate).format('DD-MMM-YYYY'));
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

const RenderTickComponent = ({showNext, title}) => {
  return (
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
