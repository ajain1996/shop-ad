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
import {commonStyles} from '../../utils/styles';
import {useEffect} from 'react';

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

import {useState} from 'react';
import Auth from '../../services/Auth';
import CustomLoader, {CustomPanel} from '../../components/CustomLoader';
import PTRView from 'react-native-pull-to-refresh';
import {useDispatch, useSelector} from 'react-redux';
import {setJob} from '../../redux/reducer/jobs';
import {SIZES} from '../../utils/theme';

export default function PreviewOffer({navigation, route}) {
  const dispatch = useDispatch();
  const item = route.params;

  const [loading, setLoading] = React.useState(false);

  //   useEffect(() => {
  //     setLoading(true);
  //     Auth.getLocalStorageData('bearer').then(token => {
  //       setLoading(false);
  //       setBearerToken(token);
  //       getAllJobsPostRequest(token, response => {
  //         if (response !== null) {
  //           dispatch(setJob([...response?.data].reverse()));
  //         }
  //       });
  //     });
  //   }, []);

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
      <PTRView>
        <ScrollView style={{marginTop: 20}}>
          <RenderSingleOffer item={item} />
          {/* {jobsData.map((item, index) => {
              return (
                <View key={index}>
                  <RenderSingleWork
                    item={item}
                    bearerToken={bearerToken}
                    navigation={navigation}
                  />
                </View>
              );
            })} */}
        </ScrollView>

        <View style={{height: 64}} />
      </PTRView>
      <CustomPanel loading={loading} />
      <CustomLoader loading={loading} />
    </>
  );
}

const RenderSingleOffer = ({
  item,
  bearerToken,
  navigation,
  setSavedItems,
  savedItems,
}) => {
  console.log(item, '<<<<<preview');
  const {userData} = useSelector(state => state.User);

  const [user, setUser] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  console.log(item, '<<<thisisitem');
  //   React.useEffect(() => {
  //     (async () => {
  //       const unsubscribe = navigation.addListener('focus', () => {
  //         getUserByIDPostAPI(item?.ownerId, bearerToken, response => {
  //           console.log(response, '<<<<<userDAta1');
  //           if (response !== null) {
  //             setUser(response?.data[0]);
  //             console.log(response?.data[0], '<<<<thisisitemofsingleoffer');
  //           }
  //         });

  //         getLikesCountByIDPostAPI(item?._id, bearerToken, response => {
  //           if (response !== null) {
  //             if (response.data) {
  //               setLikesCount(response?.count);
  //               const data = response?.data;
  //               for (let i = 0; i < data.length; i++) {
  //                 if (data[i].likedBy === userData[0]?._id) {
  //                   setIsLike(true);
  //                 }
  //               }
  //             }
  //           }
  //         });

  //         getCommentsCountByIDPostAPI(item?._id, bearerToken, response => {
  //           if (response !== null) {
  //             if (response.data) {
  //               setCommentsCount(response?.count);
  //             }
  //           }
  //         });
  //       });
  //       return unsubscribe;
  //     })();
  //   }, []);

  //   React.useEffect(() => {
  //     (async () => {
  //       getUserByIDPostAPI(item?.ownerId, bearerToken, response => {
  //         if (response !== null) {
  //           setUser(response?.data[0]);
  //         }
  //       });

  //       getLikesCountByIDPostAPI(item?._id, bearerToken, response => {
  //         if (response !== null) {
  //           if (response.data) {
  //             setLikesCount(response?.count);
  //             const data = response?.data;
  //             for (let i = 0; i < data.length; i++) {
  //               if (data[i]?.likedBy === userData[0]?._id) {
  //                 setIsLike(true);
  //               }
  //             }
  //           }
  //         }
  //       });

  //       getCommentsCountByIDPostAPI(item?._id, bearerToken, response => {
  //         if (response !== null) {
  //           if (response?.data) {
  //             setCommentsCount(response?.count);
  //           }
  //         }
  //       });
  //     })();
  //   }, []);

  // const handleLike = async () => {
  //   const totalPrev = await AsyncStorage.getItem('LIKED_OFFER');
  //   if (isLike) {
  //     console.log('going to unlike', totalPrev);
  //     setLikesCount(prev => prev - 1);
  //     setIsLike(false);
  //     unLikesByIDPostAPI(item?._id, userData[0]?._id, bearerToken, response => {
  //       if (response !== null) {
  //         if (response?.message) {
  //           Toast.show('Un Liked Successfully!');
  //         }
  //       }
  //     });

  //     const alllike = await AsyncStorage.getItem('LIKED_OFFER');
  //     console.log(alllike, '<<<thisislike');
  //     if (alllike == 'NaN') {
  //       await AsyncStorage.setItem('LIKED_OFFER', `1`);
  //     } else if (alllike && parseInt(alllike) > 0) {
  //       const d = parseInt(alllike) - +1;
  //       await AsyncStorage.setItem('LIKED_OFFER', `${d}`);
  //       console.log(d);
  //     }
  //     // const alllike=await AsyncStorage.getItem("LIKED_OFFER")
  //   } else if (!isLike) {
  //     console.log('going to like');

  //     setLikesCount(prev => prev + 1);
  //     setIsLike(true);
  //     addLikesByIDPostAPI(
  //       item?._id,
  //       userData[0]?._id,
  //       bearerToken,
  //       response => {
  //         if (response !== null) {
  //           if (response?.message === 'Already Liked') {
  //             Toast.show(response?.message);
  //           } else if (response?.status.toString().toLowerCase() === 'true') {
  //             Toast.show('Liked Successfully!');
  //           }
  //         }
  //       },
  //     );
  //     const alllike = await AsyncStorage.getItem('LIKED_OFFER');
  //     // console.log(alllike, 'plus');
  //     if (alllike == 'NaN') {
  //       await AsyncStorage.setItem('LIKED_OFFER', `1`);
  //     }
  //     if (alllike) {
  //       const d = parseInt(alllike) + +1;
  //       await AsyncStorage.setItem('LIKED_OFFER', `${d}`);
  //       console.log(d, 'minus');
  //     } else {
  //       console.log(1);
  //       await AsyncStorage.setItem('LIKED_OFFER', `1`);
  //     }
  //   }
  // };

  // const handleComment = () => {
  //   navigation.navigate('CommentScreen', {
  //     postUserData: user,
  //     bearerToken: bearerToken,
  //     offerItem: item,
  //     ownerId: item?.ownerId,
  //   });
  // };

  const [homeModalVisible, setHomeModalVisible] = useState(false);

  var email = user?.email?.split('@')[0];

  // const handleShare = async () => {
  //   try {
  //     const result = await Share.share({
  //       message: `Offer Details\nLocation: ${item.location}\n Description${item?.description}\n${item?.offerImage}`,
  //       url: 'https://play.google.com/store/apps',
  //     });
  //     if (result.action === Share.sharedAction) {
  //       // console.log('here');
  //       const sharedPost = await AsyncStorage.getItem('TOTAL_SHARED');
  //       if (sharedPost == null) {
  //         console.log(sharedPost, '<<<sharedpost if');
  //         await AsyncStorage.setItem('TOTAL_SHARED', '1');
  //       } else {
  //         const num = parseInt(sharedPost) + +1;
  //         console.log(num, '<<<sharedpost else');

  //         await AsyncStorage.setItem('TOTAL_SHARED', `${num}`);
  //       }
  //       if (result.activityType) {
  //       } else {
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  function dayDiff(startDate, endDate, des, id) {
    const convertArr = d => {
      const a = d.replace('/', '-');
      const b = a.replace('/', '-');
      return b.split('-');
    };

    // const diffInMs = moment(`12-Dec-2022`) - moment(`10-Dec-2022`);
    // const diffInMs =
    //   moment(
    //     `${parseInt(convertArr(endDate)[0])}-${
    //       monthsArray[parseInt(convertArr(endDate)[1])]
    //     }-${parseInt(convertArr(endDate)[2])}`,
    //   ) -
    //   moment(
    //     `${parseInt(convertArr(startDate)[0])}-${
    //       monthsArray[parseInt(convertArr(startDate)[1])]
    //     }-${parseInt(convertArr(startDate)[2])}`,
    //   );

    // const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays + 1;
  }

  // var startDate = moment(item?.startDate).format('DD/MM/YYYY');
  // var endDate = moment(item?.endDate).format('DD/MM/YYYY');
  // var diffDays = dayDiff(startDate, endDate, item.description, item._id);
  // const d = new Date();
  // const checkDaysFromCurrDate = dayDiff(
  //   `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
  //   endDate,
  //   'des',
  //   'id',
  // );
  // console.log(checkDaysFromCurrDate, '<<<<current date');
  // if (diffDays > 4) {
  //   return null;
  // }
  // if (diffDays < 0) {

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
        <View style={{...commonStyles.rowStart, alignItems: 'center'}}>
          <TouchableHighlight
            underlayColor="#f7f8f9"
            onPress={() => {
              // navigation.navigate('UserDetailsScreen', {
              //   userId: item?.ownerId,
              //   user: user,
              // });
            }}>
            {user?.userProfile !== undefined ? (
              <Image
                source={{uri: user?.userProfile}}
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

          <View style={{marginLeft: 6}}>
            <TouchableHighlight
              underlayColor="#f7f8f9"
              onPress={() => {
                navigation.navigate('UserDetailsScreen', {
                  userId: item?.ownerId,
                  user: user,
                });
              }}>
              <Text style={{...commonStyles.fs14_700}}>{user?.name}</Text>
            </TouchableHighlight>
            <View style={{...commonStyles.rowStart, alignItems: 'center'}}>
              <Image
                source={require('../../assets/img/location.png')}
                resizeMode="contain"
                style={{width: 18, height: 16}}
              />
              <TouchableHighlight
                onPress={() => {
                  navigation.navigate('LocationScreen');
                }}
                underlayColor="#f7f8f9">
                <Text style={{...commonStyles.fs12_400, marginLeft: 2}}>
                  {item?.location}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>

        <TouchableHighlight
          onPress={() => setHomeModalVisible(true)}
          underlayColor="#f7f8f9">
          <Image
            source={require('../../assets/img/3dots.png')}
            resizeMode="contain"
            style={{width: 24, height: 24, borderRadius: 100}}
          />
        </TouchableHighlight>
      </View>
      <TouchableHighlight
        onPress={() => {
          // Alert.alert('ok');
          // navigation.navigate('OfferDetail', {
          //   item,
          // });
        }}>
        <ScrollView horizontal={true}>
          {item?.offerImage && (
            <Image
              source={{uri: item?.offerImage}}
              style={{width: SIZES.width, height: 311}}
            />
          )}
          {/* {item?.offerImage && (
                <Image
                  source={{uri: item?.offerImage}}
                  style={{width: SIZES.width, height: 311}}
                />
              )} */}
          {item.imageData?.map(initem => {
            return (
              <Image
                source={{uri: initem?.uri}}
                style={{width: SIZES.width, height: 311}}
              />
            );
          })}
        </ScrollView>
      </TouchableHighlight>

      <View style={{...commonStyles.rowBetween, padding: 15}}>
        <View style={{...commonStyles.rowStart}}>
          <TouchableHighlight
            // onPress={handleLike}
            underlayColor="#eee"
            style={{padding: 5}}>
            <View style={{...commonStyles.row}}>
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
              <Text style={{...commonStyles.fs14_500, marginLeft: 9}}>
                {likesCount} Likes
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            // onPress={handleComment}
            underlayColor="#eee"
            style={{padding: 5, marginLeft: 34}}>
            <View style={{...commonStyles.row}}>
              <Image
                source={require('../../assets/img/comment.png')}
                style={{width: 26, height: 26, tintColor: '#000000'}}
              />
              <Text style={{...commonStyles.fs14_500, marginLeft: 9}}>
                {commentsCount} Comments
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <TouchableHighlight underlayColor="#fff">
          <Image
            source={require('../../assets/img/share.png')}
            style={{width: 22, height: 22, tintColor: '#000000'}}
          />
        </TouchableHighlight>
      </View>
      <View style={{...commonStyles.rowStart, marginLeft: 20, marginTop: -16}}>
        <Text
          style={{
            ...commonStyles.fs12_400,
            marginLeft: 8,
            marginBottom: 10,
            marginTop: 2,
            color: '#E27127',
          }}>
          {item?.description}
        </Text>
      </View>
      {item?.price && (
        <View style={{...commonStyles.rowStart, marginLeft: 20, marginTop: -5}}>
          <Text style={{...commonStyles.fs14_500, marginBottom: 12}}>
            Price
          </Text>
          <Text
            style={{
              ...commonStyles.fs12_400,
              marginLeft: 8,
              marginBottom: 10,
              marginTop: 2,
              color: '#E27127',
            }}>
            Rs {item?.price}
          </Text>
        </View>
      )}
      <View style={{...commonStyles.rowStart, marginLeft: 20, marginTop: -10}}>
        <Text style={{...commonStyles.fs13_500, marginBottom: 12}}>
          Days left:2
        </Text>
      </View>
    </View>
  );
};
