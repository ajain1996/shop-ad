import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableHighlight,
  Share,
  ScrollView,
} from 'react-native';

import React from 'react';
import { commonStyles } from '../../utils/styles';
import { SIZES } from '../../utils/theme';
import HomeHeader from '../home/HomeHeader';
import HomeSearch from '../home/HomeSearch';
import { useEffect } from 'react';

import {
  addLikesByIDPostAPI,
  getAllJobsPostRequest,
  getCommentsCountByIDPostAPI,
  getJobsByLocationPostRequest,
  getLikesCountByIDPostAPI,
  getUserByIDPostAPI,
  monthsArray,
  unLikesByIDPostAPI,
} from '../../utils/API';

import { useState } from 'react';
import Auth from '../../services/Auth';
import CustomLoader, { CustomPanel } from '../../components/CustomLoader';
import PTRView from 'react-native-pull-to-refresh';
import { useDispatch, useSelector } from 'react-redux';
import { setJob } from '../../redux/reducer/jobs';
import Toast from 'react-native-simple-toast';
import HomeModal from '../home/HomeModal';
import LinearGradient from 'react-native-linear-gradient';
import { JobsDetails } from './JobsDetails';
import moment from 'moment';

export default function PreviewJobScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const data = route.params;
  const [jobsData, setJobData] = useState([]);
  const [bearerToken, setBearerToken] = useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setJobData([data]);
      // const unsubscribe = navigation.addListener('focus', () => {
      //   Auth.getLocalStorageData('bearer').then(token => {
      //     setBearerToken(token);
      //     getAllJobsPostRequest(token, response => {
      //       if (response !== null) {
      //         dispatch(setJob([...response?.data].reverse()));
      //       }
      //     });
      //   });
      // });
      // return unsubscribe;
    })();
  }, [navigation]);

  useEffect(() => {
    setLoading(true);
    Auth.getLocalStorageData('bearer').then(token => {
      setLoading(false);
      setBearerToken(token);
      getAllJobsPostRequest(token, response => {
        if (response !== null) {
          dispatch(setJob([...response?.data].reverse()));
        }
      });
    });
  }, []);

  function _refresh() {
    setLoading(true);
    Auth.getLocalStorageData('bearer').then(token => {
      setLoading(false);
      setBearerToken(token);
      getAllJobsPostRequest(token, response => {
        if (response !== null) {
          dispatch(setJob(response?.data));
        }
      });
    });
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Text
        style={{
          ...commonStyles.fs14_700,
          height: 40,
          marginTop: 20,
          marginLeft: 20,
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        {/* <Text style={{fontSize: 40}}>{`<-`}</Text> */}
        Go Back
      </Text>
      {/* <HomeHeader
        navigation={navigation}
        // onPress={() => navigation.navigate('AddJobScreen')}
      /> */}
      {/* 
      <HomeSearch
        onChange={val => {
          setLoading(true);
          Auth.getLocalStorageData('bearer').then(token => {
            setLoading(false);
            getJobsByLocationPostRequest(val, token, response => {
              if (response !== null) {
                dispatch(setJob(response?.data));
              }
            });
          });
        }}
      /> */}
      <PTRView onRefresh={_refresh}>
        <ScrollView style={{ marginTop: 20 }}>
          {jobsData.map((item, index) => {
            return (
              <View key={index}>
                <RenderSingleJob
                  item={item}
                  bearerToken={bearerToken}
                  navigation={navigation}
                />
              </View>
            );
          })}
        </ScrollView>

        <View style={{ height: 64 }} />
      </PTRView>
      <CustomPanel loading={loading} />
      <CustomLoader loading={loading} />
    </>
  );
}

const RenderSingleJob = ({ item, bearerToken, navigation }) => {
  const { userType } = useSelector(state => state.UserType);
  const { userData } = useSelector(state => state.User);

  const [user, setUser] = useState(userData[0]);
  const [likesCount, setLikesCount] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  React.useEffect(() => {
    (async () => {
      const unsubscribe = navigation.addListener('focus', () => {
        getUserByIDPostAPI(item?.ownerId, bearerToken, response => {
          if (response !== null) {
            setUser(response?.data[0]);
          }
        });

        getLikesCountByIDPostAPI(item?._id, bearerToken, response => {
          if (response !== null) {
            if (response.data) {
              setLikesCount(response?.count);
              const data = response?.data;
              for (let i = 0; i < data.length; i++) {
                if (data[i].likedBy === userData[0]?._id) {
                  setIsLike(true);
                }
              }
            }
          }
        });

        getCommentsCountByIDPostAPI(item?._id, bearerToken, response => {
          if (response !== null) {
            if (response.data) {
              setCommentsCount(response?.count);
            }
          }
        });
      });
      return unsubscribe;
    })();
  }, [navigation, item]);

  useEffect(() => {
    (async () => {
      Auth.getLocalStorageData('bearer').then(token => {
        getUserByIDPostAPI(item?.ownerId, token, response => {
          if (response !== null) {
            // setUser(response?.data[0]);
          }
        });

        getLikesCountByIDPostAPI(item?._id, token, response => {
          if (response !== null) {
            if (response.data) {
              setLikesCount(response?.count);
              const data = response?.data;
              for (let i = 0; i < data.length; i++) {
                if (data[i].likedBy === userData[0]?._id) {
                  setIsLike(true);
                }
              }
            }
          }
        });

        getCommentsCountByIDPostAPI(item?._id, token, response => {
          if (response !== null) {
            if (response.data) {
              setCommentsCount(response?.count);
            }
          }
        });
      });
    })();
  }, [item]);

  const handleLike = () => {
    if (isLike) {
      setLikesCount(prev => prev - 1);
      setIsLike(false);
      unLikesByIDPostAPI(item?._id, userData[0]?._id, bearerToken, response => {
        if (response !== null) {
          if (response?.message) {
            Toast.show('Un Liked Successfully!');
          }
        }
      });
    } else if (!isLike) {
      setLikesCount(prev => prev + 1);
      setIsLike(true);
      addLikesByIDPostAPI(
        item?._id,
        userData[0]?._id,
        bearerToken,
        response => {
          if (response !== null) {
            if (response?.message === 'Already Liked') {
              Toast.show(response?.message);
            } else if (response?.status.toString().toLowerCase() === 'true') {
              Toast.show('Liked Successfully!');
            }
          }
        },
      );
    }
  };

  const handleComment = () => {
    navigation.navigate('CommentScreen', {
      userData: user,
      bearerToken: bearerToken,
      offerItem: item,
    });
  };

  var email = user?.email?.split('@')[0];

  const [homeModalVisible, setHomeModalVisible] = useState(false);

  const handleApplyJob = () => {
    navigation.navigate('ApplyJobScreen', {
      jobId: item?._id,
      item: item,
    });
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Job Details \n\nOwner: ${user.name}\nLocation:${item.location}\nDescription:${item.description}\nDesignation:${item.designationName}\nEmail: ${item.email}\nTitle:${item.title}\nShop Name: ${item.shopName}\n Contact Number: ${item.contactNumber}\n Start Date: ${item.startDate}\nEnd Date: ${item.endDate}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };
  function dayDiff(startDate, endDate, des, id) {
    const convertArr = d => {
      const a = d.replace('/', '-');
      const b = a.replace('/', '-');
      return b.split('-');
    };
    const today = new Date();
    const inlocal = today.toLocaleDateString();
    var currDate = moment(inlocal).format('DD/MM/YYYY');

    const diffInMs =
      moment(
        `${parseInt(convertArr(endDate)[0])}-${monthsArray[parseInt(convertArr(endDate)[1])]
        }-${parseInt(convertArr(endDate)[2])}`,
      ) -
      moment(
        `${parseInt(convertArr(currDate)[0])}-${monthsArray[parseInt(convertArr(currDate)[1])]
        }-${parseInt(convertArr(currDate)[2])}`,
      );

    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays + 1;
  }

  var startDate = moment(item?.startDate).format('DD/MM/YYYY');
  var endDate = moment(item?.endDate).format('DD/MM/YYYY');
  var diffDays = dayDiff(startDate, endDate, item.description, item._id);

  return (
    <View
      style={{
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          ...commonStyles.rowBetween,
          height: 62,
          width: '100%',
          padding: 20,
        }}>
        <View style={{ ...commonStyles.rowStart, alignItems: 'center' }}>
          <TouchableHighlight
            underlayColor="#f7f8f9"
            onPress={() => {
              // navigation.navigate('UserDetailsScreen', {
              //   user: user,
              //   userId: item?.ownerId,
              // });
            }}>
            {userData[0]?.userProfile !== undefined ? (
              <Image
                source={{ uri: userData[0]?.userProfile }}
                resizeMode="contain"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  marginTop: 6,
                  borderWidth: 2,
                  borderColor: '#E27127',
                }}
              />
            ) : (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  marginTop: 6,
                  borderWidth: 2,
                  borderColor: '#E27127',
                }}>
                <Image
                  source={require('../../assets/img/profile-tab.png')}
                  resizeMode="contain"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 100,
                    marginHorizontal: 4,
                    marginVertical: 3,
                  }}
                />
              </View>
            )}
          </TouchableHighlight>

          <View style={{ marginLeft: 6 }}>
            <TouchableHighlight
              underlayColor="#f7f8f9"
              onPress={() => {
                // navigation.navigate('UserDetailsScreen', {
                //   user: user,
                //   userId: item?.ownerId,
                // });
              }}>
              <Text style={{ ...commonStyles.fs14_700 }}>{user?.name}</Text>
            </TouchableHighlight>
            <View style={{ ...commonStyles.rowStart, alignItems: 'center' }}>
              <Image
                source={require('../../assets/img/location.png')}
                resizeMode="contain"
                style={{ width: 18, height: 16 }}
              />
              <TouchableHighlight
                // onPress={() => {
                //   navigation.navigate('LocationScreen');
                // }}
                underlayColor="#f7f8f9">
                <Text style={{ ...commonStyles.fs12_400, marginLeft: 2 }}>
                  {item?.location}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        {/* <TouchableHighlight
          onPress={() => setHomeModalVisible(true)}
          underlayColor="#f7f8f9">
          <Image
            source={require('../../assets/img/3dots.png')}
            resizeMode="contain"
            style={{width: 24, height: 24, borderRadius: 100}}
          />
        </TouchableHighlight> */}
      </View>

      <View>
        <JobsDetails text="Title:" item={item?.title} />
        <JobsDetails text="Description:" item={item?.description} />
        <JobsDetails text="Shop Name:" item={item?.shopName} />
        <JobsDetails text="Contact Number:" item={item?.contactNumber} />
        <JobsDetails text="Contact Email:" item={item?.email} />
        <JobsDetails text="Designation Name:" item={item?.contactPersonName} />
        <JobsDetails
          text="Experience Required:"
          item={item?.experience + ' Year'}
        />
        <JobsDetails text="Incentive Offered:" item={item?.incentive} />
        <JobsDetails
          text="Interview Timing:"
          item={item?.interviewTiming + '  ' + item?.workShift?.interview}
        />
        <JobsDetails text="Location:" item={item?.location} />

        <JobsDetails text="Incentive Offered:" item={item?.incentiveOffered} />
        <JobsDetails text="Area of work:" item={item?.areaOfWork} />
        {/* <JobsDetails text="Facilities:" item={item?.facilities} /> */}
        <JobsDetails text="Gender:" item={item?.gender} />
        <JobsDetails text="Number of workers:" item={item?.manPower} />
        <JobsDetails text="Vechile Required:" item={item?.vehicleRequired} />
        <JobsDetails
          text="Work Timing:"
          item={item?.workTiming + '  ' + item?.workShift?.start}
        />
        <JobsDetails text="Salary:" item={'Rs ' + item?.salaryOffered} />
        <JobsDetails text="Message:" item={item?.message} />
        <JobsDetails text="StartDate:" item={item?.startDate} />
        <JobsDetails text="EndDate:" item={item?.endDate} />
        <Text style={{ height: 8 }} />
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
              // onPress={handleApplyJob}
              underlayColor="#EDAA26"
              style={{
                width: '100%',
                height: '100%',
                ...commonStyles.centerStyles,
                borderRadius: 5,
              }}>
              <Text style={{ ...commonStyles.fs15_600, color: '#fff' }}>
                Apply Job
              </Text>
            </TouchableHighlight>
          </LinearGradient>
        ) : (
          <></>
        )}
      </View>

      <View style={{ ...commonStyles.rowBetween, padding: 20 }}>
        <View style={{ ...commonStyles.rowStart }}>
          <TouchableHighlight
            // onPress={handleLike}
            underlayColor="#eee"
            style={{ padding: 5 }}>
            <View style={{ ...commonStyles.row }}>
              <Image
                source={
                  isLike
                    ? require('../../assets/img/heart.png')
                    : require('../../assets/img/hearto.png')
                }
                style={{
                  width: 24,
                  height: 24,
                  tintColor: isLike ? '#FF0000' : '#000',
                }}
              />
              <Text style={{ ...commonStyles.fs14_500, marginLeft: 9 }}>
                {likesCount} Likes
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            // onPress={handleComment}
            underlayColor="#eee"
            style={{ padding: 5, marginLeft: 34 }}>
            <View style={{ ...commonStyles.row }}>
              <Image
                source={require('../../assets/img/comment.png')}
                style={{ width: 26, height: 26, tintColor: '#000000' }}
              />
              <Text style={{ ...commonStyles.fs14_500, marginLeft: 9 }}>
                {commentsCount} Comments
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <TouchableHighlight underlayColor="#eee">
          <Image
            source={require('../../assets/img/share.png')}
            style={{ width: 22, height: 22, tintColor: '#000000' }}
          />
        </TouchableHighlight>
      </View>

      {/* <View style={{...commonStyles.rowStart, marginLeft: 20, marginTop: -16}}>
        <Text style={{...commonStyles.fs14_500, marginBottom: 12}}>
          @{email}
        </Text>
        <Text
          style={{
            ...commonStyles.fs12_400,
            marginLeft: 8,
            marginBottom: 10,
            marginTop: 2,
          }}>
          {item?.description}
        </Text>
      </View> */}
      {/* <View style={{...commonStyles.rowStart, marginLeft: 20, marginTop: -10}}>
        <Text style={{...commonStyles.fs13_500, marginBottom: 12}}>
          Days left: {diffDays} Day(s)
        </Text>
        <Text
          style={{...commonStyles.fs12_400, marginLeft: 8, marginBottom: 12}}>
          {item?.date}
        </Text>
      </View> */}

      <HomeModal
        modalVisible={homeModalVisible}
        setModalVisible={setHomeModalVisible}
        feedbackFor="job"
        feedbackNumber={item?.ownerId}
        showSave={false}
        savedCallback={async () => {
          const oldData = await AsyncStorage.getItem('SAVED_JOBS');
          if (oldData == null) {
            await AsyncStorage.setItem('SAVED_JOBS', JSON.stringify([item]));
          } else {
            const parseIT = JSON.parse(oldData);
            await AsyncStorage.setItem(
              'SAVED_JOBS',
              JSON.stringify([...parseIT, item]),
            );
          }
          setHomeModalVisible(!homeModalVisible);
        }}
      />
    </View>
  );
};
