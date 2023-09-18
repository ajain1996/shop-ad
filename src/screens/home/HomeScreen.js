import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableHighlight,
  ScrollView,
  Share,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { commonStyles } from '../../utils/styles';
import HomeHeader from './HomeHeader';
import HomeSearch from './HomeSearch';
import { COLORS, SIZES } from '../../utils/theme';
import {
  addLikesByIDPostAPI,
  getAllJobsPostRequest,
  getAllOffersPostRequest,
  getAllWorksPostRequest,
  getCommentsCountByIDPostAPI,
  getLikesCountByIDPostAPI,
  monthsArray,
  unLikesByIDPostAPI,
} from '../../utils/API';
import { useState } from 'react';
import Auth from '../../services/Auth';
import CustomLoader, { CustomPanel } from '../../components/CustomLoader';
import Toast from 'react-native-simple-toast';
import PTRView from 'react-native-pull-to-refresh';
import HomeModal from './HomeModal';
import { useDispatch, useSelector } from 'react-redux';
import { setOffer } from '../../redux/reducer/offer';
import { setJob } from '../../redux/reducer/jobs';
import { setWork } from '../../redux/reducer/work';
import moment, { relativeTimeRounding } from 'moment';
import HomeFilterCategory from './HomeFilterCategory';
import HomeSearchData from './HomeSearchData';
import HomeCarousel from './HomeCarousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeFilterCategory2 from './FilterCategoryHome2';

const initialValue = [
  { location: 'Mumbai' },
  { location: 'Delhi' },
  { location: 'Kolkata' },
  { location: 'Indore' },
];

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const { offerData } = useSelector(state => state.Offer);
  const [allOffers, setAllOffers] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [bearerToken, setBearerToken] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [refreshScreen, setRefreshScreen] = useState(false);

  React.useEffect(() => {
    setLoading(true);
    Auth.getLocalStorageData('bearer').then(token => {
      setBearerToken(token);
      getAllOffersPostRequest(token, response => {
        if (response !== null) {
          dispatch(setOffer(response?.data));
          setAllOffers(response.data);
          setLoading(false);
        }
      });

      getAllJobsPostRequest(token, response => {
        if (response !== null) {
          dispatch(setJob([...response?.data].reverse()));
        }
      });

      getAllWorksPostRequest(token, response => {
        if (response !== null) {
          dispatch(setWork([...response?.data].reverse()));
        }
      });
    });
  }, [refreshScreen]);

  function _refresh() {
    setLoading(true);
    Auth.getLocalStorageData('bearer').then(token => {
      setBearerToken(token);
      getAllOffersPostRequest(token, response => {
        if (response !== null) {
          dispatch(setOffer(response?.data));
          setLoading(false);
        }
      });
    });
  }

  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestionTitleData, setSuggestionTitleData] = useState(initialValue);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [locationTitle, setLocationTitle] = useState('');

  const [loading2, setLoading2] = useState(false);
  const [savedItems, setSavedItems] = useState([]);

  const filterData = val => {
    let searchField = val.toLocaleLowerCase();

    const filteredDAta = suggestionTitleData.filter(item => {
      const loc = item.location.toLocaleLowerCase();
      if (loc.match(searchField)) {
        return true;
      } else return false;
    });
    setSuggestionTitleData(filteredDAta);
    setLoading2(false);
  };

  const filterIt = val => {
    const smallVal = val.toLocaleLowerCase();
    if (val.trim() == '') {
      dispatch(setOffer(allOffers));
    }
    const data = allOffers.filter(item => {
      const smallLoc = item?.location?.toLowerCase();
      const smallCode = item?.code?.toLowerCase();
      const smallCategory = item?.cateoryId?.categoryName?.toLowerCase();
      const smallDes = item?.description?.toLowerCase();
      const smallPrice = item?.price?.toLowerCase();
      const matchLoc = smallLoc?.match(smallVal);
      const matchPrice = smallPrice?.match(smallVal);
      const matchCate = smallCategory?.match(smallVal);
      const matchCode = smallCode?.match(smallVal);
      const matchDes = smallDes?.match(smallVal);
      if (matchLoc != null) {
        return true;
      }
      if (matchCate != null) {
        return true;
      }
      if (matchPrice != null) {
        return true;
      }
      if (item.ownerId) {
        const smallname = item.ownerId.name.toLocaleLowerCase();
        const matchLoc = smallname.match(smallVal);
        if (matchLoc != null || matchCode != null || matchDes != null) {
          return true;
        }
      }
    });
    dispatch(setOffer(data));
  };
  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <HomeHeader
        navigation={navigation}
        onPress={() => {
          navigation.navigate('AddSaleOfferScreen');
        }}
      />

      <View style={{ ...commonStyles.rowBetween }}>
        <HomeSearch
          width={SIZES.width / 1.3}
          defaultValue={locationTitle}
          onChange={val => {
            setLoading2(true);

            filterData(val);
            filterIt(val);

            Auth.getLocalStorageData('bearer').then(token => {
              setLoading2(false);
              setShowSuggestion(true);
              setBearerToken(token);
              if (val?.length === 0) {
                setSuggestionTitleData(initialValue);
                dispatch(setOffer(offerData));
                return true;
              }
            });
          }}
        />
        <HomeFilterCategory2
          modalVisible={showCategoryModal}
          refreshScreen={refreshScreen}
          setRefreshScreen={setRefreshScreen}
          navigation={navigation}
          setCategoryId={setCategoryId}
          callback={() => {
            setShowCategoryModal(!showCategoryModal);
          }}
        />
        <HomeFilterCategory
          modalVisible={showCategoryModal}
          navigation={navigation}
          setCategoryId={setCategoryId}
          callback={() => {
            setShowCategoryModal(!showCategoryModal);
          }}
        />
      </View>

      <HomeSearchData
        showSuggestion={showSuggestion}
        loading={loading2}
        suggestionTitleData={suggestionTitleData}
        setSuggestionTitleData={setSuggestionTitleData}
        setShowSuggestion={setShowSuggestion}
        setLocationTitle={setLocationTitle}
      />

      <PTRView onRefresh={_refresh}>
        <FlatList
          data={[...offerData].reverse()}
          numColumns={2}
          contentContainerStyle={{ justifyContent: "space-between", marginTop: 20 }}
          columnWrapperStyle={{ alignSelf: "center" }}
          renderItem={({ item }) => {
            console.log('====================================');
            console.log(item);
            console.log('====================================');
            return (
              <RenderSingleOffer
                item={item}
                bearerToken={bearerToken}
                navigation={navigation}
                setSavedItems={setSavedItems}
                savedItems={savedItems}
              />
            );
          }}
        />
        {/* <ScrollView>
          <HomeCarousel />
          {[...offerData].reverse()?.map((item, index) => {
            console.log('====================================');
            console.log(item);
            console.log('====================================');
            return (
              <View key={index}>
                <RenderSingleOffer
                  item={item}
                  bearerToken={bearerToken}
                  navigation={navigation}
                  setSavedItems={setSavedItems}
                  savedItems={savedItems}
                />
              </View>
            );
          })}

          {offerData?.length === 0 ? (
            <View
              style={{
                backgroundColor: '#fff',
                height: SIZES.height,
                ...commonStyles.centerStyles,
              }}>
              <Text style={{ ...commonStyles.fs14_400, color: '#000' }}>
                No Result
              </Text>
            </View>
          ) : (
            <></>
          )}
        </ScrollView> */}
        <View style={{ height: 64 }} />
      </PTRView>
      <CustomPanel loading={loading} />
      <CustomLoader loading={loading} />
    </View>
  );
}

function dayDiff(startDate, endDate, des, id, poststa) {
  const convertArr = d => {
    const a = d.replace('/', '-');
    const b = a.replace('/', '-');
    return b.split('-');
  };

  const diffInMs =
    moment(
      `${parseInt(convertArr(endDate)[0])}-${monthsArray[parseInt(convertArr(endDate)[1])]
      }-${parseInt(convertArr(endDate)[2])}`,
    ) - moment(startDate);

  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  if (des == 'Descriptioncheck') { }
  return diffInDays + 1;
}

const RenderSingleOffer = ({
  item,
  bearerToken,
  navigation,
  setSavedItems,
  savedItems,
}) => {
  const { userData } = useSelector(state => state.User);

  const [user, setUser] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [cateogyrName, setCateogyrName] = useState('');
  const [commentsCount, setCommentsCount] = useState(0);
  React.useEffect(() => {
    (async () => {
      const unsubscribe = navigation.addListener('focus', () => {
        setUser(item.ownerId);
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
  }, []);

  React.useEffect(() => {
    (async () => {
      getLikesCountByIDPostAPI(item?._id, bearerToken, response => {
        if (response !== null) {
          if (response.data) {
            setLikesCount(response?.count);
            const data = response?.data;
            for (let i = 0; i < data.length; i++) {
              if (data[i]?.likedBy === userData[0]?._id) {
                setIsLike(true);
              }
            }
          }
        }
      });

      getCommentsCountByIDPostAPI(item?._id, bearerToken, response => {
        if (response !== null) {
          if (response?.data) {
            setCommentsCount(response?.count);
          }
        }
      });
    })();
  }, []);

  const handleLike = async () => {
    const totalPrev = await AsyncStorage.getItem('LIKED_OFFER');
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

      const alllike = await AsyncStorage.getItem('LIKED_OFFER');
      if (alllike == 'NaN') {
        await AsyncStorage.setItem('LIKED_OFFER', `1`);
      } else if (alllike && parseInt(alllike) > 0) {
        const d = parseInt(alllike) - +1;
        await AsyncStorage.setItem('LIKED_OFFER', `${d}`);
      }
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
      const alllike = await AsyncStorage.getItem('LIKED_OFFER');
      if (alllike == 'NaN') {
        await AsyncStorage.setItem('LIKED_OFFER', `1`);
      }
      if (alllike) {
        const d = parseInt(alllike) + +1;
        await AsyncStorage.setItem('LIKED_OFFER', `${d}`);
      } else {
        await AsyncStorage.setItem('LIKED_OFFER', `1`);
      }
    }
  };

  const handleComment = () => {
    navigation.navigate('CommentScreen', {
      postUserData: user,
      bearerToken: bearerToken,
      offerItem: item,
      ownerId: item?.ownerId,
    });
  };

  const [homeModalVisible, setHomeModalVisible] = useState(false);

  var email = user?.email?.split('@')[0];

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `\nOffer Details\nLocation: ${item.location}\n Description${item?.description}`,
        url: 'data:image/png;base64,' + item.offerImage,
      });
      if (result.action === Share.sharedAction) {
        const sharedPost = await AsyncStorage.getItem('TOTAL_SHARED');
        if (sharedPost == null) {
          await AsyncStorage.setItem('TOTAL_SHARED', '1');
        } else {
          const num = parseInt(sharedPost) + +1;
          await AsyncStorage.setItem('TOTAL_SHARED', `${num}`);
        }
        if (result.activityType) { } else { }
      } else if (result.action === Share.dismissedAction) { }
    } catch (error) {
      alert(error.message);
    }
  };

  var startDate = moment(item?.startDate).format('DD/MM/YYYY');
  var endDate = moment(item?.endDate).format('DD/MM/YYYY');
  const d = new Date();
  const today = `${d.getDate()}-${monthsArray[+d.getMonth() + 1]
    }-${d.getFullYear()}`;
  var diffDays = dayDiff(today, endDate, item.description, item._id, startDate);

  const checkDaysFromCurrDate = dayDiff(
    `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
    endDate,
    'des',
    'id',
  );

  if (diffDays <= 0 || isNaN(diffDays)) {
    return null;
  } else {
    return (
      <View style={{ elevation: 9, shadowColor: "#ccc", margin: 8, backgroundColor: "#fff", borderRadius: 14 }}>
        <TouchableOpacity style={{ paddingHorizontal: 10, marginVertical: 12, width: SIZES.width / 2.2, alignItems: "center" }}
          onPress={() => {
            navigation.navigate('UserDetailsScreen', {
              userId: item?.ownerId,
              user: user,
            });
          }}
        >
          {item?.offerImage && (
            <ScrollView horizontal>
              {item?.offerImage && <Image
                source={{ uri: item?.offerImage }} resizeMode="contain"
                style={{ width: SIZES.width / 2.7, height: 110, borderRadius: 30, marginHorizontal: 8 }}
              />}
              {item?.offerImage1 && <Image
                source={{ uri: item?.offerImage1 }} resizeMode="contain"
                style={{ width: SIZES.width / 2.7, height: 110, borderRadius: 30, marginHorizontal: 8 }}
              />}
              {item?.offerImage2 && <Image
                source={{ uri: item?.offerImage2 }} resizeMode="contain"
                style={{ width: SIZES.width / 2.7, height: 110, borderRadius: 30, marginHorizontal: 8 }}
              />}
              {item?.offerImage3 && <Image
                source={{ uri: item?.offerImage3 }} resizeMode="contain"
                style={{ width: SIZES.width / 2.7, height: 110, borderRadius: 30, marginHorizontal: 8 }}
              />}
              {item?.offerImage34 && <Image
                source={{ uri: item?.offerImage34 }} resizeMode="contain"
                style={{ width: SIZES.width / 2.7, height: 110, borderRadius: 30, marginHorizontal: 8 }}
              />}
            </ScrollView>
          )}

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ width: SIZES.width / 2.8, paddingLeft: 12 }}>
              <Text style={{ ...commonStyles.fs14_400, marginTop: 10, color: '#131949' }}>
                {item?.cateoryId?.categoryName}
              </Text>

              {item?.price && (
                <Text style={{ ...commonStyles.fs14_300, color: '#444444' }}>
                  {item?.price}
                </Text>
              )}
              {/* <View style={{ ...commonStyles.rowStart, marginLeft: 20, marginTop: -10 }}> */}
              <Text style={{ ...commonStyles.fs13_500, marginBottom: 12 }}>
                Days left: {`${diffDays}`} Day(s)
              </Text>
              {/* </View> */}
            </View>

            <TouchableOpacity style={{ width: 22, height: 22, borderRadius: 9, backgroundColor: "#E68927", ...commonStyles.centerStyles }}>
              <Image
                source={require("../../assets/img/heart-outline.png")}
                resizeMode="contain"
                style={{ width: 14, height: 14 }}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  // if (diffDays <= 0 || isNaN(diffDays)) {
  //   return null;
  // } else {
  //   return (
  //     <View
  //       style={{
  //         borderBottomColor: '#D8D8D8',
  //         borderBottomWidth: 1,
  //         backgroundColor: '#fff',
  //       }}>
  //       <View
  //         style={{
  //           ...commonStyles.rowBetween,
  //           height: 62,
  //           width: '100%',
  //           padding: 20,
  //         }}>
  //         <View style={{ ...commonStyles.rowStart, alignItems: 'center' }}>
  //           <TouchableHighlight
  //             underlayColor="#f7f8f9"
  //             onPress={() => {
  //               navigation.navigate('UserDetailsScreen', {
  //                 userId: item?.ownerId,
  //                 user: user,
  //               });
  //             }}>
  //             {user?.userProfile !== undefined ? (
  //               <Image
  //                 source={{ uri: user?.userProfile }}
  //                 resizeMode="contain"
  //                 style={{
  //                   width: 40,
  //                   height: 40,
  //                   borderRadius: 100,
  //                   marginTop: 6,
  //                   borderWidth: 2,
  //                   borderColor: '#E27127',
  //                 }}
  //               />
  //             ) : (
  //               <View
  //                 style={{
  //                   width: 40,
  //                   height: 40,
  //                   borderRadius: 100,
  //                   marginTop: 6,
  //                   borderWidth: 2,
  //                   borderColor: '#E27127',
  //                 }}>
  //                 <Image
  //                   source={require('../../assets/img/profile-tab.png')}
  //                   resizeMode="contain"
  //                   style={{
  //                     width: 28,
  //                     height: 28,
  //                     borderRadius: 100,
  //                     marginHorizontal: 4,
  //                     marginVertical: 3,
  //                   }}
  //                 />
  //               </View>
  //             )}
  //           </TouchableHighlight>
  //           <View style={{ marginLeft: 6 }}>
  //             <TouchableHighlight
  //               underlayColor="#f7f8f9"
  //               onPress={() => {
  //                 navigation.navigate('UserDetailsScreen', {
  //                   userId: item?.ownerId,
  //                   user: user,
  //                 });
  //               }}>
  //               <Text style={{ ...commonStyles.fs14_700 }}>{user?.name}</Text>
  //             </TouchableHighlight>
  //             <View style={{ ...commonStyles.rowStart, alignItems: 'center' }}>
  //               <Image
  //                 source={require('../../assets/img/location.png')}
  //                 resizeMode="contain"
  //                 style={{ width: 18, height: 16 }}
  //               />

  //               <TouchableHighlight
  //                 onPress={() => {
  //                   navigation.navigate('LocationScreen');
  //                 }}
  //                 underlayColor="#f7f8f9">
  //                 <Text style={{ ...commonStyles.fs12_400, marginLeft: 2 }}>
  //                   {item?.location}
  //                 </Text>
  //               </TouchableHighlight>
  //             </View>
  //           </View>
  //         </View>
  //         <TouchableHighlight
  //           onPress={() => setHomeModalVisible(true)}
  //           underlayColor="#f7f8f9">
  //           <Image
  //             source={require('../../assets/img/3dots.png')}
  //             resizeMode="contain"
  //             style={{ width: 24, height: 24, borderRadius: 100 }}
  //           />
  //         </TouchableHighlight>
  //       </View>
  //       <TouchableHighlight
  //         onPress={() => {
  //           navigation.navigate('OfferDetail', {
  //             item,
  //           });
  //         }}>
  //         <>
  //           <ScrollView horizontal={true}>
  //             {item?.image && (
  //               <Image
  //                 source={{ uri: item?.image }}
  //                 style={{ width: SIZES.width, height: 311 }}
  //               />
  //             )}
  //             {item?.offerImage && (
  //               <Image
  //                 source={{ uri: item?.offerImage }}
  //                 style={{ width: SIZES.width, height: 311 }}
  //               />
  //             )}
  //             {item?.offerImage1 && (
  //               <Image
  //                 source={{ uri: item?.offerImage1 }}
  //                 style={{ width: SIZES.width, height: 311 }}
  //               />
  //             )}
  //             {item?.offerImage2 && (
  //               <Image
  //                 source={{ uri: item?.offerImage2 }}
  //                 style={{ width: SIZES.width, height: 311 }}
  //               />
  //             )}
  //             {item?.offerImage3 && (
  //               <Image
  //                 source={{ uri: item?.offerImage3 }}
  //                 style={{ width: SIZES.width, height: 311 }}
  //               />
  //             )}
  //             {item?.offerImage34 && (
  //               <Image
  //                 source={{ uri: item?.offerImage4 }}
  //                 style={{ width: SIZES.width, height: 311 }}
  //               />
  //             )}
  //           </ScrollView>
  //           {item?.code && (
  //             <View
  //               style={{
  //                 position: 'absolute',
  //                 borderWidth: 2,
  //                 borderColor: '#000',
  //                 bottom: 10,
  //                 right: 10,
  //                 backgroundColor: COLORS.primary,
  //                 borderRadius: 50,
  //                 width: 70,
  //                 height: 70,
  //                 display: 'flex',
  //                 justifyContent: 'center',
  //                 alignItems: 'center',
  //                 borderColor: '#fff',
  //                 color: '#fff',
  //                 fontWeight: 'bold',
  //                 padding: 5,
  //               }}>
  //               <Text
  //                 style={{
  //                   color: '#fff',
  //                   fontWeight: 'bold',
  //                   width: '100%',
  //                   textAlign: 'center',
  //                 }}>
  //                 {item?.code}
  //               </Text>
  //             </View>
  //           )}
  //         </>
  //       </TouchableHighlight>
  //       <View style={{ ...commonStyles.rowBetween, padding: 15 }}>
  //         <View style={{ ...commonStyles.rowStart }}>
  //           <TouchableHighlight
  //             onPress={handleLike}
  //             underlayColor="#eee"
  //             style={{ padding: 5 }}>
  //             <View style={{ ...commonStyles.row }}>
  //               <Image
  //                 source={
  //                   isLike
  //                     ? require('../../assets/img/heart.png')
  //                     : require('../../assets/img/hearto.png')
  //                 }
  //                 style={{
  //                   width: 24,
  //                   height: 24,
  //                   tintColor: isLike ? '#FF0000' : '#000',
  //                 }}
  //               />
  //               <Text style={{ ...commonStyles.fs14_500, marginLeft: 9 }}>
  //                 {likesCount} Likes
  //               </Text>
  //             </View>
  //           </TouchableHighlight>
  //           <TouchableHighlight
  //             onPress={handleComment}
  //             underlayColor="#eee"
  //             style={{ padding: 5, marginLeft: 34 }}>
  //             <View style={{ ...commonStyles.row }}>
  //               <Image
  //                 source={require('../../assets/img/comment.png')}
  //                 style={{ width: 26, height: 26, tintColor: '#000000' }}
  //               />
  //               <Text style={{ ...commonStyles.fs14_500, marginLeft: 9 }}>
  //                 {commentsCount} Comments
  //               </Text>
  //             </View>
  //           </TouchableHighlight>
  //         </View>
  //         <TouchableHighlight onPress={handleShare} underlayColor="#fff">
  //           <Image
  //             source={require('../../assets/img/share.png')}
  //             style={{ width: 22, height: 22, tintColor: '#000000' }}
  //           />
  //         </TouchableHighlight>
  //       </View>
  //       {item?.price && (
  //         <View
  //           style={{ ...commonStyles.rowStart, marginLeft: 20, marginTop: -5 }}>
  //           <Text style={{ ...commonStyles.fs14_500, marginBottom: 12 }}>
  //             Price
  //           </Text>
  //           <Text
  //             style={{
  //               ...commonStyles.fs12_400,
  //               marginLeft: 8,
  //               marginBottom: 10,
  //               marginTop: 2,
  //               color: '#E27127',
  //             }}>
  //             Rs {item?.price}
  //           </Text>
  //         </View>
  //       )}
  //       <View style={{ ...commonStyles.rowStart, marginLeft: 20, marginTop: -5 }}>
  //         <Text style={{ ...commonStyles.fs14_500, marginBottom: 12 }}>
  //           Category
  //         </Text>
  //         <Text
  //           style={{
  //             ...commonStyles.fs12_400,
  //             marginLeft: 8,
  //             marginBottom: 10,
  //             marginTop: 2,
  //             color: '#E27127',
  //           }}>
  //           {item?.cateoryId?.categoryName}
  //         </Text>
  //       </View>
  //       <View
  //         style={{ ...commonStyles.rowStart, marginLeft: 20, marginTop: -10 }}>
  //         <Text style={{ ...commonStyles.fs13_500, marginBottom: 12 }}>
  //           Days left: {`${diffDays}`} Day(s)
  //         </Text>
  //       </View>
  //       <HomeModal
  //         modalVisible={homeModalVisible}
  //         setModalVisible={setHomeModalVisible}
  //         feedbackFor="offer"
  //         feedbackNumber={item?.ownerId}
  //         callback={() => setHomeModalVisible(!homeModalVisible)}
  //         savedCallback={async () => {
  //           const oldData = await AsyncStorage.getItem('SAVED_OFFER');
  //           if (oldData == null) {
  //             await AsyncStorage.setItem('SAVED_OFFER', JSON.stringify([item]));
  //           } else {
  //             const parseIT = JSON.parse(oldData);
  //             const checkIfPresent = parseIT.filter(off => off._id == item._id);
  //             if (checkIfPresent?.lengt) {
  //               Toast.show('Already saved');
  //             } else {
  //               await AsyncStorage.setItem(
  //                 'SAVED_OFFER',
  //                 JSON.stringify([...parseIT, item]),
  //               );
  //             }
  //           }
  //         }}
  //       />
  //     </View>
  //   );
  // }
};
