import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import UserdetailsHeader from '../home/details/UserdetailsHeader';
import {commonStyles} from '../../utils/styles';
import {
  followersAndCount,
  followingAndCount,
  getJobByApplicantId,
  getJobDetailByID,
  getJobsByOwnerIdPostRequest,
  getOffersByOwnerIdPostRequest,
  getUserDataById,
  getWorksByOwnerIdPostRequest,
} from '../../utils/API';
import Auth from '../../services/Auth';
import {RenderSingleWork} from '../works/WorksScreen';
import {SIZES} from '../../utils/theme';
import CustomLoader, {CustomPanel} from '../../components/CustomLoader';
import {TouchableHighlight} from 'react-native';
import {Modal} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {setUserType} from '../../redux/reducer/userType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {JobsDetails} from '../jobs/JobsDetails';
import {useState} from 'react';
import {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {setUser} from '../../redux/reducer/user';

export default function ProfileScreen({navigation, route}) {
  const [offerData, setOfferData] = React.useState([]);
  const [jobsData, setJobsData] = React.useState([]);
  const [workData, setWorkData] = React.useState([]);
  const [userTypeModalVisible, setUserTypeModalVisible] = React.useState(false);
  const dispatch = useDispatch();
  const [savedJob, setSavedJob] = useState([]);
  const {userData} = useSelector(state => state.User);
  const {userType} = useSelector(state => state.UserType);
  const [savedOffers, setSavedOffers] = React.useState([]);
  const isFocused = useIsFocused();
  const [followerCount, setFollowerCount] = React.useState(0);
  const [countLike, setCountLike] = useState(0);
  const [followingCount, setFollowingCount] = React.useState(0);
  const [showJobProfile, setShowJobProfile] = useState(false);

  var userName = '';

  if (userData !== null && userData !== undefined) {
    userName = userData[0]?.name;
  }
  const userImage = require('../../assets/img/profile-tab.png');

  const [loading, setLoading] = React.useState(false);
  const [totalSaved, settotalSaved] = React.useState(0);
  const getToken = async () => {
    const token = await Auth.getLocalStorageData('bearer');
    console.log('\n\n\n\n\n----> ', token, '\n\n\n\n', userData[0]);

    return null;
  };

  console.log(userData, '<<<<<<<userdatafinal');
  React.useEffect(() => {
    setLoading(true);
    getToken();
    if (userType == 'shop') {
      // Alert.alert('shop');
      Auth.getLocalStorageData('bearer').then(token => {
        getOffersByOwnerIdPostRequest(userData[0]?._id, token, response => {
          setLoading(false);
          if (response !== null) {
            if (response?.message === 'Data From Database') {
              setOfferData(response?.data);
              // console.log(
              //   '\n\n\n\n\n\n\n\n\n\n\n',
              //   response.data,
              //   '\n\n\n\n\n\n\n\n\n\n offer data',
              // );
            }
          }
        });

        getJobsByOwnerIdPostRequest(userData[0]?._id, token, response => {
          setLoading(false);
          if (response !== null) {
            if (response?.message === 'Item Found') {
              setJobsData(response?.data);
              console.log('these are jobdata', response.data);
            }
          }
        });

        getWorksByOwnerIdPostRequest(userData[0]?._id, token, response => {
          setLoading(false);
          if (response !== null) {
            if (response?.message === 'Item Found') {
              setWorkData(response?.data);
            }
          }
        });

        followersAndCount(userData[0]?._id, token, response => {
          setLoading(false);
          if (response !== null) {
            setFollowerCount(response?.count);
          }
        });

        followingAndCount(userData[0]?._id, token, response => {
          setLoading(false);
          if (response !== null) {
            setFollowingCount(response?.count);
          }
        });
      });
    } else {
      (async () => {
        const token = await Auth.getLocalStorageData('bearer');
        console.log('calling jobs by applicant idprofile');
        getJobByApplicantId(token, userData[0]._id, res => {
          console.log(res, '<<<<< applied jobs by user');
          setJobsData(res.data);
        });
        getUserDataById(userData[0]?._id, token, async res => {
          console.log('thisisuserdata', res.data, '\n\n\n\n');
          dispatch(setUser(res.data));
        });
        const data = await AsyncStorage.getItem('SAVED_OFFER');
        // Alert.alert(data);

        if (data != null) {
          const parsedata = JSON.parse(data);
          setOfferData(parsedata);
          console.log(parsedata, '<<<< Tehsearesavedoffers');
        } else setOfferData([]);
        const data2 = await AsyncStorage.getItem('SAVED_JOBS');
        if (data2 != null) {
          const parsedata2 = JSON.parse(data2);
          console.log(parsedata2, '<<<this is for saved jobs');
          setSavedJob(parsedata2);
        } else setSavedJob([]);
        // Alert.alert(data);
        const alllike = await AsyncStorage.getItem('LIKED_OFFER');
        if (alllike == 'null' || alllike == null || alllike == 'NaN') {
          setCountLike(0);
        } else {
          setCountLike(alllike);
        }

        // ---

        const data3 = await AsyncStorage.getItem('SAVED_WORK');
        if (data3 != null) {
          const parsedata3 = JSON.parse(data3);
          setWorkData(parsedata3);
        } else setWorkData([]);

        const count = await AsyncStorage.getItem('TOTAL_SHARED');
        if (count == 'null' || count == null || count == 'NaN') {
          setFollowingCount(0);
        } else {
          setFollowingCount(count);
        }
        setLoading(false);
        // Alert.alert(data);
        // console.log(
        //   '\n\n\n\n\n',
        //   setSavedOffers(JSON.parse(data)),
        //   '<<<<<< \n\n\n\n this is saved item',
        // );
      })();
    }
  }, [isFocused, userType]);
  React.useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('Saved_Item');
      // Alert.alert(data);
      console.log(
        '\n\n\n\n\n',
        // setSavedOffers(JSON.parse(data)),
        '<<<<<< \n\n\n\n this is saved item',
      );
    })();
  }, [isFocused]);

  return (
    <>
      <ScrollView
        style={{width: '100%', height: SIZES.height, backgroundColor: '#fff'}}>
        <UserdetailsHeader navigation={navigation} title={userName} />

        <View style={{marginBottom: 20}}>
          <View
            style={{
              paddingHorizontal: 14,
              paddingTop: 24,
              ...commonStyles.rowBetween,
              alignItems: 'flex-start',
            }}>
            <View
              style={{
                width: 75,
                ...commonStyles.centerStyles,
                height: 75,
                backgroundColor: '#dcdcdc',
                borderRadius: 100,
              }}>
              {userData?.length && userData[0]?.userProfile ? (
                <Image
                  source={{uri: userData[0]?.userProfile}}
                  resizeMode="contain"
                  style={{width: 75, height: 75, borderRadius: 100}}
                />
              ) : (
                <Image
                  source={userImage}
                  resizeMode="contain"
                  style={{width: 60, height: 60, borderRadius: 100}}
                />
              )}
            </View>

            {userType == 'shop' && (
              <View
                style={{
                  ...commonStyles.rowEvenly,
                  width: SIZES.width - 120,
                  marginTop: 5,
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text style={{...commonStyles.fs24_700}}>
                    {offerData?.length + jobsData?.length + workData?.length}
                  </Text>
                  <Text style={{...commonStyles.fs14_500}}>Post</Text>
                </View>

                <View style={{alignItems: 'center'}}>
                  {loading ? (
                    <ActivityIndicator color="#000" size={34} />
                  ) : (
                    <Text style={{...commonStyles.fs24_700}}>
                      {followerCount}
                    </Text>
                  )}
                  <Text style={{...commonStyles.fs14_500}}>Followers</Text>
                </View>

                <View style={{alignItems: 'center'}}>
                  {loading ? (
                    <ActivityIndicator color="#000" size={34} />
                  ) : (
                    <Text style={{...commonStyles.fs24_700}}>
                      {followingCount}
                    </Text>
                  )}
                  <Text style={{...commonStyles.fs14_500}}>Followings</Text>
                </View>
              </View>
            )}
            {userType == 'user' && (
              <View
                style={{
                  ...commonStyles.rowEvenly,
                  width: SIZES.width - 120,
                  marginTop: 5,
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text style={{...commonStyles.fs24_700}}>
                    {/* {offerData?.length + jobsData?.length + workData?.length} */}
                    {countLike}
                  </Text>
                  <Text style={{...commonStyles.fs14_500}}>Liked</Text>
                </View>

                <View style={{alignItems: 'center'}}>
                  {loading ? (
                    <ActivityIndicator color="#000" size={34} />
                  ) : (
                    <Text style={{...commonStyles.fs24_700}}>
                      {(() => {
                        let count = 0;
                        if (
                          offerData == 'null' ||
                          offerData == null ||
                          offerData == 'NaN'
                        ) {
                        } else {
                          count = count + offerData?.length;
                        }
                        if (
                          savedJob != 'null' ||
                          savedJob != null ||
                          savedJob != 'NaN'
                        ) {
                          count = count + savedJob.length;
                        }
                        return count;
                      })()}
                      {/* {offerData == 'null' ||
                      offerData == null ||
                      offerData == 'NaN'
                        ? 0
                        : offerData?.length} */}
                    </Text>
                  )}
                  <Text style={{...commonStyles.fs14_500}}>Saved</Text>
                </View>

                <View style={{alignItems: 'center'}}>
                  {loading ? (
                    <ActivityIndicator color="#000" size={34} />
                  ) : (
                    <Text style={{...commonStyles.fs24_700}}>
                      {followingCount}
                    </Text>
                  )}
                  <Text style={{...commonStyles.fs14_500}}>Shared</Text>
                </View>
              </View>
            )}
          </View>

          <View
            style={{
              paddingHorizontal: 14,
              alignItems: 'flex-start',
              marginTop: 5,
            }}>
            <Text style={{...commonStyles.fs16_700, textAlign: 'center'}}>
              {userName}
            </Text>
            {userData != null && userData[0]?.location ? (
              <View style={{...commonStyles.rowStart}}>
                <Image
                  source={require('../../assets/img/location.png')}
                  resizeMode="contain"
                  style={{width: 22, height: 28, tintColor: '#0073FF'}}
                />
                <Text style={{...commonStyles.fs16_500, color: '#0073FF'}}>
                  {userData[0]?.location}
                </Text>
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>
        <View
          style={{
            marginLeft: 9,
            marginTop: -5,
            flexDirection: 'row',
            // gap: '2rem',
            justifyContent: 'flex-start',
          }}>
          <TouchableHighlight
            style={{...styles.switchAccount}}
            underlayColor="#eee"
            onPress={async () => {
              setShowJobProfile(false);
              setUserTypeModalVisible(true);
            }}>
            <View style={{...commonStyles.rowBetween}}>
              <Text style={{...commonStyles.fs13_400}}>
                {' '}
                {userType == 'shop' ? 'Shop Owner' : 'User'}
              </Text>
              <Image
                source={require('../../assets/img/caret-down.png')}
                resizeMode="contain"
                style={{width: 11, height: 11, marginLeft: 6}}
              />
            </View>
          </TouchableHighlight>
          {userType != 'shop' && (
            <TouchableOpacity
              style={{marginLeft: 10, marginTop: 7}}
              onPress={() => {
                setShowJobProfile(true);
              }}>
              <Text
                style={{
                  borderWidth: 1,
                  padding: 8,
                  borderRadius: 10,
                  backgroundColor: showJobProfile ? 'orange' : 'white',
                  color: showJobProfile ? 'white' : 'black',
                }}>
                Job Profile
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {!showJobProfile && (
          <>
            <View style={{padding: 9, paddingHorizontal: 12}}>
              <Text style={{...commonStyles.fs18_500, marginBottom: 5}}>
                {userType == 'user' ? 'Saved Offers' : 'All Offers'}
              </Text>

              {offerData?.length !== 0 ? (
                <ScrollView horizontal>
                  {offerData?.map((item, index) => {
                    return (
                      <View key={index} style={{marginRight: 20}}>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() => {
                            navigation.navigate('OfferDetail', {
                              item: item,
                              userName: userName,
                            });
                          }}
                          style={{
                            borderWidth: 1,
                            borderColor: '#dcdcdc',
                            backgroundColor: '#fff',
                            borderRadius: 10,
                            padding: 12,
                          }}>
                          <Image
                            source={{
                              uri: item?.offerImage
                                ? item?.offerImage
                                : 'https://plus.unsplash.com/premium_photo-1661679026942-db5aef08c093?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                            }}
                            resizeMode="cover"
                            style={{
                              width: SIZES.width / 1.4,
                              height: SIZES.width / 1.4,
                              borderRadius: 12,
                            }}
                          />

                          <Text
                            style={{...commonStyles.fs16_500, marginTop: 8}}>
                            {item?.description}
                          </Text>
                          <Text style={{...commonStyles.fs13_400}}>
                            Location: {item?.location}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </ScrollView>
              ) : (
                <Text style={{...commonStyles.fs13_500}}>No Offers Found</Text>
              )}
              <Text style={{...commonStyles.fs18_500, marginBottom: 5}}>
                Saved Jobs
              </Text>
              <ScrollView horizontal>
                {savedJob.map((item, index) => {
                  return (
                    <ShowSingJobSaved
                      userType={userType}
                      item={item}
                      index={index}
                      navigation={navigation}
                    />
                  );
                })}
              </ScrollView>
            </View>

            <View style={{padding: 9, paddingHorizontal: 12}}>
              <Text
                style={{
                  ...commonStyles.fs18_500,
                  marginBottom: 5,
                  marginTop: 8,
                }}>
                {userType == 'user' ? 'Applied Jobs' : 'All Jobs'}
              </Text>
              {jobsData?.length !== 0 ? (
                <ScrollView horizontal>
                  {jobsData.map((item, index) => {
                    return (
                      <SingleJob
                        userType={userType}
                        item={item}
                        index={index}
                        navigation={navigation}
                      />
                    );
                    // return (
                    //   <View
                    //     style={{
                    //       elevation: 9,
                    //       shadowColor: '#999',
                    //       backgroundColor: '#fff',
                    //       width: SIZES.width / 1.3,
                    //       borderRadius: 9,
                    //       paddingVertical: 12,
                    //       margin: 12,
                    //     }}>
                    //     <JobsDetails text="Title:" item={item?.title} />
                    //     <JobsDetails text="Description:" item={item?.description} />
                    //     <JobsDetails text="Shop Name:" item={item?.shopName} />
                    //     <JobsDetails
                    //       text="Contact Number:"
                    //       item={item?.contactNumber}
                    //     />
                    //     <JobsDetails
                    //       text="Contact Email:"
                    //       item={item?.contactEmail}
                    //     />
                    //     <JobsDetails
                    //       text="Designation Name:"
                    //       item={item?.designationName}
                    //     />
                    //     <JobsDetails
                    //       text="Experience Required:"
                    //       item={item?.experienceRequired}
                    //     />
                    //     <JobsDetails
                    //       text="Incentive Offered:"
                    //       item={item?.incentiveOffered}
                    //     />
                    //     <JobsDetails
                    //       text="Interview Timing:"
                    //       item={item?.interviewTiming}
                    //     />
                    //     <JobsDetails text="Location:" item={item?.Location} />
                    //     <JobsDetails
                    //       text="Experience Required:"
                    //       item={item?.experienceRequired}
                    //     />
                    //     {showJobData ? (
                    //       <View>
                    //         <JobsDetails
                    //           text="Incentive Offered:"
                    //           item={item?.incentiveOffered}
                    //         />
                    //         <JobsDetails
                    //           text="Interview Timing:"
                    //           item={item?.interviewTiming}
                    //         />
                    //         <JobsDetails
                    //           text="Area of work:"
                    //           item={item?.areaWork}
                    //         />
                    //         <JobsDetails
                    //           text="Facilities:"
                    //           item={item?.facilities}
                    //         />
                    //         <JobsDetails text="Gender:" item={item?.gender} />
                    //         <JobsDetails
                    //           text="Man power Number:"
                    //           item={item?.manpowerNumber}
                    //         />
                    //         <JobsDetails
                    //           text="Number of work:"
                    //           item={item?.numberWork}
                    //         />
                    //         <JobsDetails
                    //           text="Vechile Required:"
                    //           item={item?.vechileRequired}
                    //         />
                    //         <JobsDetails
                    //           text="Work Timing:"
                    //           item={item?.workTiming}
                    //         />
                    //         <JobsDetails text="Salary:" item={item?.salary} />
                    //         <JobsDetails text="Message:" item={item?.message} />
                    //         <JobsDetails text="StartDate:" item={item?.startDate} />
                    //         <JobsDetails text="EndDate:" item={item?.endDate} />
                    //         <Text style={{height: 8}} />
                    //         {userType === 'user' ? (
                    //           <LinearGradient
                    //             colors={['#EDAA26', '#E27127']}
                    //             style={{
                    //               width: 160,
                    //               height: 48,
                    //               ...commonStyles.centerStyles,
                    //               borderRadius: 5,
                    //               marginLeft: 20,
                    //             }}>
                    //             <TouchableHighlight
                    //               onPress={() => {
                    //                 handleApplyJob(item);
                    //               }}
                    //               underlayColor="#EDAA26"
                    //               style={{
                    //                 width: '100%',
                    //                 height: '100%',
                    //                 ...commonStyles.centerStyles,
                    //                 borderRadius: 5,
                    //               }}>
                    //               <Text
                    //                 style={{
                    //                   ...commonStyles.fs15_600,
                    //                   color: '#fff',
                    //                 }}>
                    //                 Apply Job
                    //               </Text>
                    //             </TouchableHighlight>
                    //           </LinearGradient>
                    //         ) : (
                    //           <></>
                    //         )}
                    //         <Text
                    //           style={{
                    //             backgroundColor: '#EDAA26',
                    //             width: '50%',
                    //             borderRadius: 5,
                    //             alignSelf: 'center',
                    //             color: '#ffff',
                    //             height: 30,
                    //             textAlign: 'center',
                    //           }}
                    //           onPress={() => {
                    //             // Alert.alert('hello');
                    //             navigation.navigate('GetAllCandidatesScreen', {
                    //               item,
                    //             });
                    //           }}>
                    //           {' '}
                    //           View Candidate
                    //         </Text>
                    //         {/* <Text style={{...commonStyles.fs12_400}}>Expand</Text> */}
                    //       </View>
                    //     ) : (
                    //       <></>
                    //     )}

                    //     <TouchableHighlight
                    //       underlayColor="#f7f8f9"
                    //       style={{
                    //         width: SIZES.width / 1.5,
                    //         height: 32,
                    //         ...commonStyles.centerStyles,
                    //         backgroundColor: '#eee',
                    //         marginVertical: 8,
                    //         marginLeft: 22,
                    //       }}
                    //       onPress={() => {
                    //         setshowJobData(!showJobData);
                    //       }}>
                    //       {showJobData ? (
                    //         <Text style={{...commonStyles.fs12_400}}>Collapse</Text>
                    //       ) : (
                    //         <Text style={{...commonStyles.fs12_400}}>Expand</Text>
                    //       )}
                    //     </TouchableHighlight>
                    //   </View>

                    // );
                  })}
                </ScrollView>
              ) : (
                <Text style={{...commonStyles.fs13_500}}>No Jobs Found</Text>
              )}
            </View>

            {userType == 'shop' && (
              <View style={{paddingVertical: 10, paddingHorizontal: 3}}>
                <Text
                  style={{
                    ...commonStyles.fs18_500,
                    marginLeft: 9,
                    marginTop: 2,
                  }}>
                  All Works
                </Text>
                {workData != 'null' &&
                workData != null &&
                workData?.length !== 0 ? (
                  <ScrollView horizontal>
                    {workData.map((item, index) => {
                      return (
                        <View key={index} style={{marginTop: -4}}>
                          <RenderSingleWork
                            item={item}
                            showDot={false}
                            navigation={navigation}
                          />
                        </View>
                      );
                    })}
                  </ScrollView>
                ) : (
                  <Text
                    style={{
                      ...commonStyles.fs13_500,
                      marginLeft: 9,
                      marginTop: 2,
                    }}>
                    No Works Found
                  </Text>
                )}
              </View>
            )}
          </>
        )}
        {showJobProfile && (
          <View>
            {[
              {
                key: 'Education',
                value:
                  userData[0]?.eduction == '' ? 'NA' : userData[0]?.eduction,
              },
              {
                key: 'Experience',
                value:
                  userData[0]?.experienceYears == ''
                    ? 'NA'
                    : userData[0]?.experienceYears + ' Years',
              },
              {
                key: 'Mobile',
                value: userData[0]?.mobile == '' ? 'NA' : userData[0]?.mobile,
              },
              {
                key: 'Certified Course',
                value:
                  userData[0]?.certifiedCourse == ''
                    ? 'NA'
                    : userData[0]?.certifiedCourse,
              },
              {
                key: 'Marital Status',
                value:
                  userData[0]?.martialStatus == ''
                    ? 'NA'
                    : userData[0]?.martialStatus,
              },
            ].map((item, key) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      width: '40%',
                      fontWeight: 'bold',
                    }}>
                    {item?.key}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    : {item?.value}
                  </Text>
                </View>
              );
            })}
            <View
              style={{
                width: '60%',
                paddingHorizontal: 20,

                // alignSelf: 'center',
              }}>
              {userData[0]?.certificate && (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    padding: 5,
                    borderRadius: 10,
                    textAlign: 'center',
                  }}
                  onPress={() => {
                    Linking.openURL(userData[0]?.certificate);
                  }}>
                  <Text style={{textAlign: 'center'}}> Open Certificate</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        <View>
          <View style={{height: 60}} />
        </View>
      </ScrollView>

      <CustomPanel loading={loading} />
      <CustomLoader loading={loading} />

      <UserTypeModal
        modalVisible={userTypeModalVisible}
        callback2={async type => {
          // Alert.alert('click');
          if (type === 'user') {
            dispatch(setUserType('user'));
            Auth.setLocalStorageData('userType', 'user').then(() => {
              setUserTypeModalVisible(!userTypeModalVisible);
              Toast.show('User successfully changed');
            });
          } else if (type === 'shop') {
            dispatch(setUserType('shop'));
            Auth.setLocalStorageData('userType', 'shop').then(() => {
              setUserTypeModalVisible(!userTypeModalVisible);
              Toast.show('User successfully changed to Shop owner');
            });
          }
        }}
        setUserTypeModalVisible={setUserTypeModalVisible}
      />
    </>
  );
}

export const SingleJob = ({item, index, userType, navigation}) => {
  const [showJobData, setshowJobData] = useState(false);
  const [jobData, setjobData] = useState({});
  const [jobDetails, setJobDetails] = useState({});
  useEffect(() => {
    (async () => {
      if (userType == 'shop') {
        console.log(item, '<<<thisissinglejobdata----shop');
        setJobDetails(item);
      } else {
        const token = await Auth.getLocalStorageData('bearer');
        // console.log(item, '<<<thisissinglejobdata----');
        getJobDetailByID(token, item.jobId, res => {
          console.log(res.data[0], item, '<<<thisissinglejobdata----user');
          setJobDetails(res.data[0]);
        });
      }
    })();
  }, []);

  return (
    <View
      style={{
        elevation: 9,
        shadowColor: '#999',
        backgroundColor: '#fff',
        width: SIZES.width / 1.3,
        borderRadius: 9,
        paddingVertical: 12,
        margin: 12,
      }}>
      {/* <JobsDetails text="Title:" item={jobDetails?.title} /> */}
      <JobsDetails text="Shop Name:" item={jobDetails?.shopName} />
      <JobsDetails text="Description:" item={jobDetails?.description} />
      <JobsDetails text="Contact Number:" item={jobDetails?.contactNumber} />
      <JobsDetails text="Contact Email:" item={jobDetails?.contactEmail} />
      <JobsDetails
        text="Designation Name:"
        item={jobDetails?.designationName}
      />
      <JobsDetails
        text="Experience Required:"
        item={jobDetails?.experienceRequired + ' Years '}
      />
      <JobsDetails
        text="Incentive Offered:"
        item={jobDetails?.incentiveOffered}
      />
      <JobsDetails
        text="Interview Timing:"
        item={jobDetails?.interviewTiming}
      />
      <JobsDetails text="Location:" item={jobDetails?.location} />
      <JobsDetails
        text="Experience Required:"
        item={jobDetails?.experienceRequired + 'Years'}
      />
      {showJobData ? (
        <View>
          <JobsDetails
            text="Incentive Offered:"
            item={'Rs ' + jobDetails?.incentiveOffered}
          />
          <JobsDetails
            text="Interview Timing:"
            item={jobDetails?.interviewTiming}
          />
          <JobsDetails text="Area of work:" item={jobDetails?.areaWork} />
          <JobsDetails text="Facilities:" item={jobDetails?.facilities} />
          <JobsDetails text="Gender:" item={jobDetails?.gender} />

          <JobsDetails text="Number of work:" item={jobDetails?.numberWork} />
          <JobsDetails
            text="Vechile Required:"
            item={jobDetails?.vechileRequired}
          />
          <JobsDetails text="Work Timing:" item={jobDetails?.workTiming} />
          <JobsDetails text="Salary:" item={'RS ' + jobDetails?.salary} />
          <JobsDetails text="Message:" item={jobDetails?.message} />
          <JobsDetails text="StartDate:" item={jobDetails?.startDate} />
          <JobsDetails text="EndDate:" item={jobDetails?.endDate} />
          <Text style={{height: 8}} />
          {/* {userType === 'user' ? <> </> : <></>} */}
          {userType == 'shop' && (
            <Text
              style={{
                backgroundColor: '#EDAA26',
                width: '50%',
                borderRadius: 5,
                alignSelf: 'center',
                color: '#ffff',
                height: 30,
                textAlign: 'center',
              }}
              onPress={() => {
                // Alert.alert('hello');
                navigation.navigate('GetAllCandidatesScreen', {
                  item,
                });
              }}>
              {' '}
              View Candidate
            </Text>
          )}
          {/* <Text style={{...commonStyles.fs12_400}}>Expand</Text> */}
        </View>
      ) : (
        <></>
      )}

      <TouchableHighlight
        underlayColor="#f7f8f9"
        style={{
          width: SIZES.width / 1.5,
          height: 32,
          ...commonStyles.centerStyles,
          backgroundColor: '#eee',
          marginVertical: 8,
          marginLeft: 22,
        }}
        onPress={() => {
          setshowJobData(!showJobData);
        }}>
        {showJobData ? (
          <Text style={{...commonStyles.fs12_400}}>Collapse</Text>
        ) : (
          <Text style={{...commonStyles.fs12_400}}>Expand</Text>
        )}
      </TouchableHighlight>
    </View>
  );
};
export const ShowSingJobSaved = ({item, index, userType, navigation}) => {
  const [showJobData, setshowJobData] = useState(false);
  const [jobData, setjobData] = useState({});
  const [jobDetails, setJobDetails] = useState({});
  useEffect(() => {
    (async () => {
      console.log(item, '<<<show users----shop');
      setJobDetails(item);
    })();
  }, []);

  return (
    <View
      style={{
        elevation: 9,
        shadowColor: '#999',
        backgroundColor: '#fff',
        width: SIZES.width / 1.3,
        borderRadius: 9,
        paddingVertical: 12,
        margin: 12,
      }}>
      <JobsDetails text="Shop Name:" item={jobDetails?.shopName} />
      <JobsDetails text="Description:" item={jobDetails?.description} />
      <JobsDetails text="Contact Number:" item={jobDetails?.contactNumber} />
      <JobsDetails text="Contact Email:" item={jobDetails?.contactEmail} />
      <JobsDetails
        text="Designation Name:"
        item={jobDetails?.designationName}
      />
      <JobsDetails
        text="Experience Required:"
        item={jobDetails?.experienceRequired}
      />
      <JobsDetails
        text="Incentive Offered:"
        item={jobDetails?.incentiveOffered}
      />
      <JobsDetails
        text="Interview Timing:"
        item={jobDetails?.interviewTiming}
      />
      <JobsDetails text="Location:" item={jobDetails?.Location} />
      <JobsDetails
        text="Experience Required:"
        item={jobDetails?.experienceRequired}
      />
      {showJobData ? (
        <View>
          <JobsDetails
            text="Incentive Offered:"
            item={jobDetails?.incentiveOffered}
          />
          <JobsDetails
            text="Interview Timing:"
            item={jobDetails?.interviewTiming}
          />
          <JobsDetails text="Area of work:" item={jobDetails?.areaWork} />
          <JobsDetails text="Facilities:" item={jobDetails?.facilities} />
          <JobsDetails text="Gender:" item={jobDetails?.gender} />
          <JobsDetails
            text="Man power Number:"
            item={jobDetails?.manpowerNumber}
          />
          <JobsDetails text="Number of work:" item={jobDetails?.numberWork} />
          <JobsDetails
            text="Vechile Required:"
            item={jobDetails?.vechileRequired}
          />
          <JobsDetails text="Work Timing:" item={jobDetails?.workTiming} />
          <JobsDetails text="Salary:" item={jobDetails?.salary} />
          <JobsDetails text="Message:" item={jobDetails?.message} />
          <JobsDetails text="StartDate:" item={jobDetails?.startDate} />
          <JobsDetails text="EndDate:" item={jobDetails?.endDate} />
          <Text style={{height: 8}} />
          {/* {userType === 'user' ? <> </> : <></>} */}
          {userType == 'shop' && (
            <Text
              style={{
                backgroundColor: '#EDAA26',
                width: '50%',
                borderRadius: 5,
                alignSelf: 'center',
                color: '#ffff',
                height: 30,
                textAlign: 'center',
              }}
              onPress={() => {
                // Alert.alert('hello');
                navigation.navigate('GetAllCandidatesScreen', {
                  item,
                });
              }}>
              {' '}
              View Candidate
            </Text>
          )}
          {/* <Text style={{...commonStyles.fs12_400}}>Expand</Text> */}
        </View>
      ) : (
        <></>
      )}

      <TouchableHighlight
        underlayColor="#f7f8f9"
        style={{
          width: SIZES.width / 1.5,
          height: 32,
          ...commonStyles.centerStyles,
          backgroundColor: '#eee',
          marginVertical: 8,
          marginLeft: 22,
        }}
        onPress={() => {
          setshowJobData(!showJobData);
        }}>
        {showJobData ? (
          <Text style={{...commonStyles.fs12_400}}>Collapse</Text>
        ) : (
          <Text style={{...commonStyles.fs12_400}}>Expand</Text>
        )}
      </TouchableHighlight>
    </View>
  );
};

const UserTypeModal = ({modalVisible, callback2, setUserTypeModalVisible}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setUserTypeModalVisible(!modalVisible)}>
      <TouchableHighlight
        style={styles.centeredView2}
        onPress={() => setUserTypeModalVisible(!modalVisible)}
        underlayColor="transparent">
        <View style={styles.modalView2}>
          <TouchableHighlight
            style={[styles.button2]}
            underlayColor="#dcdcdc"
            onPress={() => callback2('shop')}>
            <Text style={styles.textStyle}>Shop Owner</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={[styles.button2]}
            underlayColor="#dcdcdc"
            onPress={() => callback2('user')}>
            <Text style={styles.textStyle}>User</Text>
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: SIZES.width,
    height: SIZES.height,
  },
  centeredView2: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: SIZES.width,
    height: SIZES.height,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: SIZES.width / 1.3,
    height: SIZES.height + 80,
    marginTop: 80,
  },
  modalView2: {
    backgroundColor: '#f7f8f9',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 12,
    width: SIZES.width,
  },
  button: {
    padding: 20,
    width: SIZES.width / 1.6,
    backgroundColor: '#f7f8f9',
    marginTop: 8,
  },
  button2: {
    padding: 15,
    width: '100%',
    backgroundColor: '#dcdcdc',
    marginTop: 8,
    alignItems: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: '#000',
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  switchAccount: {
    width: 120,
    height: 38,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: '#000',
    ...commonStyles.centerStyles,
    marginTop: 6,
  },
});
