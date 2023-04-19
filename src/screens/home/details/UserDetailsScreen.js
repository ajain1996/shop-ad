import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import UserdetailsHeader from './UserdetailsHeader';
import {commonStyles} from '../../../utils/styles';
import {SIZES} from '../../../utils/theme';
import {useSelector} from 'react-redux';
import {
  followersAndCount,
  followingAndCount,
  followUserPostAPI,
  getJobsByOwnerIdPostRequest,
  getOffersByOwnerIdPostRequest,
  getUserByIDPostAPI,
  getWorksByOwnerIdPostRequest,
  unFollowPostAPI,
} from '../../../utils/API';
import Auth from '../../../services/Auth';
import {RenderSingleWork} from '../../works/WorksScreen';
import Toast from 'react-native-simple-toast';
import {JobsDetails} from '../../jobs/JobsDetails';
import {LinearGradient} from 'react-native-svg';
import {useState} from 'react';

export default function UserDetailsScreen({navigation, route}) {
  const [offerData, setOfferData] = React.useState([]);
  const [jobsData, setJobsData] = React.useState([]);
  const [workData, setWorkData] = React.useState([]);

  const {userId, user} = route.params;
  const [profileUserData, setProfileUserData] = useState({});
  const {userData} = useSelector(state => state.User);
  const [followerCount, setFollowerCount] = React.useState(0);
  const [followingCount, setFollowingCount] = React.useState(0);
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  console.log(user, '<<< this is user');
  React.useEffect(() => {
    (async () => {
      const unsubscribe = navigation.addListener('focus', () => {
        setLoading(true);
        Auth.getLocalStorageData('bearer').then(token => {
          followersAndCount(userData[0]?._id, token, response => {
            setLoading(false);
            if (response !== null) {
              setFollowerCount(response?.count);
              const data = response?.data;
              for (let i = 0; i < data.length; i++) {
                if (data[i]?.follwedId === userData[0]?._id) {
                  setIsFollowed(true);
                }
              }
            }
          });

          followingAndCount(userData[0]?._id, token, response => {
            if (response !== null) {
              setFollowingCount(response?.count);
            }
          });
        });
      });
      return unsubscribe;
    })();
  }, [navigation]);

  React.useEffect(() => {
    setLoading(true);
    Auth.getLocalStorageData('bearer').then(token => {
      getUserByIDPostAPI(userId, token, res => {
        console.log(res, '<<this is res');
        setProfileUserData(res?.data[0]);
      });
      getOffersByOwnerIdPostRequest(userId, token, response => {
        setLoading(false);
        if (response !== null) {
          if (response?.message === 'Data From Database') {
            setOfferData(response?.data);
          }
        }
      });

      getJobsByOwnerIdPostRequest(userId, token, response => {
        setLoading(false);
        if (response !== null) {
          if (response?.message === 'Item Found') {
            setJobsData(response?.data);
          }
        }
      });

      getWorksByOwnerIdPostRequest(userId, token, response => {
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
          const data = response?.data;
          for (let i = 0; i < data.length; i++) {
            if (data[i]?.follwedId === userData[0]?._id) {
              setIsFollowed(true);
            }
          }
        }
      });

      followingAndCount(userData[0]?._id, token, response => {
        if (response !== null) {
          setFollowingCount(response?.count);
        }
      });
    });
  }, [followerCount, followingCount, isFollowed]);

  const handleFollow = () => {
    // setIsFollowed(true);

    if (isFollowed) {
      console.log(' unfollowing');
      setFollowerCount(prev => prev + 1);
      Auth.getLocalStorageData('bearer').then(token => {
        unFollowPostAPI(
          {userId, follwedId: userData[0]?._id, bearerToken: token},
          response => {
            if (response !== null) {
              Toast.show(response.message);
              setIsFollowed(false);
            }
          },
        );
      });
    } else {
      console.log(' following');

      Auth.getLocalStorageData('bearer').then(token => {
        followUserPostAPI(userId, userData[0]?._id, token, response => {
          if (response !== null) {
            if (response?.message === 'Follwed Sucessfully.') {
              Toast.show('Followed Successfully!');
              setIsFollowed(true);
            } else if (response?.message === 'Already Follwed') {
              Toast.show('Already Follwed');
            }
          }
        });
      });
    }
  };

  const handleApplyJob = item => {
    navigation.navigate('ApplyJobScreen', {
      jobId: item?._id,
      item: item,
    });
  };

  const [showJobData, setshowJobData] = React.useState(false);

  return (
    <ScrollView
      style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      <UserdetailsHeader navigation={navigation} title={user?.name} />

      <View style={{marginBottom: 20}}>
        <View
          style={{
            paddingHorizontal: 24,
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
            {user?.userProfile !== undefined ? (
              <Image
                source={{uri: profileUserData?.userProfile}}
                resizeMode="contain"
                style={{width: 75, height: 75, borderRadius: 100}}
              />
            ) : (
              <Image
                source={require('../../../assets/img/profile-tab.png')}
                resizeMode="contain"
                style={{width: 60, height: 60, borderRadius: 100}}
              />
            )}
          </View>

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
                <Text style={{...commonStyles.fs24_700}}>{followerCount}</Text>
              )}
              <Text style={{...commonStyles.fs14_500}}>Followers</Text>
            </View>

            <View style={{alignItems: 'center'}}>
              {loading ? (
                <ActivityIndicator color="#000" size={34} />
              ) : (
                <Text style={{...commonStyles.fs24_700}}>{followingCount}</Text>
              )}
              <Text style={{...commonStyles.fs14_500}}>Followings</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: 14,
            alignItems: 'flex-start',
            marginTop: 5,
          }}>
          <Text style={{...commonStyles.fs16_700, textAlign: 'center'}}>
            {profileUserData?.name}
          </Text>
          <TouchableHighlight
            underlayColor="#dcdcdc"
            onPress={() => {
              navigation.navigate('LocationScreen');
            }}>
            {user[0]?.location ? (
              <View style={{...commonStyles.rowStart}}>
                <Image
                  source={require('../../../assets/img/location.png')}
                  resizeMode="contain"
                  style={{width: 22, height: 28, tintColor: '#0073FF'}}
                />
                <Text style={{...commonStyles.fs16_500, color: '#0073FF'}}>
                  {user[0]?.location}
                </Text>
              </View>
            ) : (
              <></>
            )}
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              width: 80,
              height: 35,
              borderRadius: 9,
              borderWidth: 1,
              borderColor: '#999',
              ...commonStyles.centerStyles,
              marginTop: 12,
            }}
            underlayColor="#eee"
            onPress={handleFollow}>
            <Text style={{...commonStyles.fs13_400}}>
              {isFollowed ? 'Following' : 'Follow'}
            </Text>
          </TouchableHighlight>
        </View>
      </View>

      <View style={{padding: 9}}>
        <Text style={{...commonStyles.fs18_500, marginBottom: 5}}>
          All Offers
        </Text>
        {offerData.length !== 0 ? (
          <ScrollView horizontal>
            {offerData.map((item, index) => {
              return (
                <View key={index} style={{marginRight: 20}}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      navigation.navigate('UserPostScreen', {
                        item: item,
                        userId: userId,
                        user: profileUserData,
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
                      resizeMode="contain"
                      style={{
                        width: SIZES.width / 1.4,
                        height: SIZES.width / 1.4,
                        borderRadius: 12,
                      }}
                    />

                    <Text style={{...commonStyles.fs16_500, marginTop: 8}}>
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
          <Text style={{...commonStyles.fs13_500}}>No Offer Found</Text>
        )}
      </View>

      <View style={{padding: 9}}>
        <Text style={{...commonStyles.fs18_500, marginBottom: 5}}>
          All Jobs
        </Text>
        {jobsData.length !== 0 ? (
          <ScrollView horizontal>
            {jobsData.map((item, index) => {
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
                  <JobsDetails text="Title:" item={item?.title} />
                  <JobsDetails text="Description:" item={item?.description} />
                  <JobsDetails text="Shop Name:" item={item?.shopName} />
                  <JobsDetails
                    text="Contact Number:"
                    item={item?.contactNumber}
                  />
                  <JobsDetails
                    text="Contact Email:"
                    item={item?.contactEmail}
                  />
                  <JobsDetails
                    text="Designation Name:"
                    item={item?.designationName}
                  />
                  <JobsDetails
                    text="Experience Required:"
                    item={item?.experienceRequired}
                  />
                  <JobsDetails
                    text="Incentive Offered:"
                    item={item?.incentiveOffered}
                  />
                  <JobsDetails
                    text="Interview Timing:"
                    item={item?.interviewTiming}
                  />
                  <JobsDetails text="Location:" item={item?.Location} />
                  <JobsDetails
                    text="Experience Required:"
                    item={item?.experienceRequired}
                  />
                  {showJobData ? (
                    <View>
                      <JobsDetails
                        text="Incentive Offered:"
                        item={item?.incentiveOffered}
                      />
                      <JobsDetails
                        text="Interview Timing:"
                        item={item?.interviewTiming}
                      />
                      <JobsDetails text="Area of work:" item={item?.areaWork} />
                      <JobsDetails text="Facilities:" item={item?.facilities} />
                      <JobsDetails text="Gender:" item={item?.gender} />
                      <JobsDetails
                        text="Man power Number:"
                        item={item?.manpowerNumber}
                      />
                      <JobsDetails
                        text="Number of work:"
                        item={item?.numberWork}
                      />
                      <JobsDetails
                        text="Vechile Required:"
                        item={item?.vechileRequired}
                      />
                      <JobsDetails
                        text="Work Timing:"
                        item={item?.workTiming}
                      />
                      <JobsDetails text="Salary:" item={item?.salary} />
                      <JobsDetails text="Message:" item={item?.message} />
                      <JobsDetails text="StartDate:" item={item?.startDate} />
                      <JobsDetails text="EndDate:" item={item?.endDate} />
                      <Text style={{height: 8}} />
                      {userType === 'user' ? (
                        <LinearGradient
                          colors={['#EDAA26', '#E27127']}
                          style={{
                            width: 160,
                            height: 48,
                            ...commonStyles.centerStyles,
                            borderRadius: 5,
                            marginLeft: 20,
                          }}>
                          <TouchableHighlight
                            onPress={() => {
                              handleApplyJob(item);
                            }}
                            underlayColor="#EDAA26"
                            style={{
                              width: '100%',
                              height: '100%',
                              ...commonStyles.centerStyles,
                              borderRadius: 5,
                            }}>
                            <Text
                              style={{...commonStyles.fs15_600, color: '#fff'}}>
                              Apply Job
                            </Text>
                          </TouchableHighlight>
                        </LinearGradient>
                      ) : (
                        <></>
                      )}
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
                // <View key={index} style={{ marginRight: 20 }}>
                //     <TouchableOpacity
                //         activeOpacity={0.5}
                //         onPress={() => {
                //             navigation.navigate('UserPostScreen', {
                //                 item: item,
                //                 userId: userId,
                //                 user: user,
                //             });
                //         }}
                //         style={{
                //             borderWidth: 1, borderColor: "#dcdcdc", backgroundColor: "#fff",
                //             borderRadius: 10, padding: 12,
                //         }}
                //     >
                //         <Image
                //             source={{
                //                 uri: item?.offerImage
                //                     ? item?.offerImage
                //                     : 'https://plus.unsplash.com/premium_photo-1661679026942-db5aef08c093?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                //             }}
                //             resizeMode="cover"
                //             style={{
                //                 width: SIZES.width / 1.4,
                //                 height: SIZES.width / 1.4,
                //                 borderRadius: 12,
                //             }}
                //         />

                //         <Text style={{ ...commonStyles.fs16_500, marginTop: 8 }}>{item?.description}</Text>
                //         <Text style={{ ...commonStyles.fs13_400 }}>Location: {item?.location}</Text>
                //     </TouchableOpacity>
                // </View>
              );
            })}
          </ScrollView>
        ) : (
          <Text style={{...commonStyles.fs13_500}}>No Jobs Found</Text>
        )}
      </View>

      <View style={{paddingVertical: 9}}>
        <Text style={{...commonStyles.fs18_500, marginLeft: 10}}>
          All Works
        </Text>
        {workData.length !== 0 ? (
          <ScrollView horizontal>
            {workData.map((item, index) => {
              return (
                <View key={index} style={{marginTop: -4}}>
                  <RenderSingleWork item={item} navigation={navigation} />
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <Text
            style={{...commonStyles.fs13_500, marginLeft: 10, marginTop: 4}}>
            No Works Found
          </Text>
        )}
      </View>

      <View>
        <View style={{height: 4}} />
      </View>

      {/* <CustomPanel loading={loading} />
            <CustomLoader loading={loading} /> */}
    </ScrollView>
  );
}
