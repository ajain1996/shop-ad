import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableHighlight,
  FlatList,
  Share,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import UserdetailsHeader from './UserdetailsHeader';
import CustomLoader, {CustomPanel} from '../../../components/CustomLoader';
import {commonStyles} from '../../../utils/styles';
import {SIZES} from '../../../utils/theme';
import {
  addLikesByIDPostAPI,
  getLikesCountByIDPostAPI,
  getUserByIDPostAPI,
  monthsArray,
  unLikesByIDPostAPI,
} from '../../../utils/API';
import Auth from '../../../services/Auth';
import Toast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import moment from 'moment';

export default function UserPostScreen({navigation, route}) {
  const {item, user, userId} = route.params;

  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <UserdetailsHeader navigation={navigation} title={'Post'} />

      <RenderSingleOffer
        navigation={navigation}
        item={item}
        user={user}
        userId={userId}
      />

      <CustomPanel loading={loading} />
      <CustomLoader loading={loading} />
    </>
  );
}

const RenderSingleOffer = ({item, navigation, user, userId}) => {
  const {userData} = useSelector(state => state.User);

  const [likesCount, setLikesCount] = useState(0);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    Auth.getLocalStorageData('bearer').then(token => {
      getLikesCountByIDPostAPI(item?._id, token, response => {
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
    });
  }, []);

  const handleLike = () => {
    if (isLike) {
      setLikesCount(prev => prev - 1);
      setIsLike(false);
      Auth.getLocalStorageData('bearer').then(token => {
        unLikesByIDPostAPI(item?._id, item?.ownerId, token, response => {
          if (response !== null) {
            if (response?.message) {
              Toast.show('Un Liked Successfully!');
            }
          }
        });
      });
    } else if (!isLike) {
      setLikesCount(prev => prev + 1);
      setIsLike(true);
      Auth.getLocalStorageData('bearer').then(token => {
        addLikesByIDPostAPI(item?._id, item?.ownerId, token, response => {
          if (response !== null) {
            if (response?.message === 'Already Liked') {
              Toast.show(response?.message);
            } else if (response?.status.toString().toLowerCase() === 'true') {
              Toast.show('Liked Successfully!');
            }
          }
        });
      });
    }
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: item?.offerImage,
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

  var email = user?.email?.split('@')[0];
  console.log(user, '<<< this is user');
  function dayDiff(startDate, endDate, des, id) {
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
  }
  const d = new Date();
  let today = d.getDate() + '-' + +d.getMonth() + 1 + '-' + d.getFullYear();

  var startDate = moment(item?.startDate).format('DD/MM/YYYY');
  var endDate = moment(item?.endDate).format('DD/MM/YYYY');
  var diffDays = dayDiff(today, endDate, item.description, item._id);
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
              navigation.navigate('UserDetailsScreen', {
                user: user,
                userId: item?.ownerId,
              });
            }}>
            {user?.userProfile !== undefined ? (
              <Image
                source={{uri: user?.userProfile}}
                resizeMode="contain"
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 100,
                  marginTop: 6,
                  borderWidth: 2,
                  borderColor: '#E27127',
                }}
              />
            ) : (
              <View
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 100,
                  marginTop: 6,
                  borderWidth: 2,
                  borderColor: '#E27127',
                }}>
                <Image
                  source={require('../../../assets/img/profile-tab.png')}
                  resizeMode="contain"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 100,
                    marginHorizontal: 4,
                    marginVertical: 3,
                  }}
                />
              </View>
            )}
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor="#f7f8f9"
            onPress={() => {
              navigation.navigate('UserDetailsScreen', {
                user: user,
                userId: item?.ownerId,
              });
            }}>
            <Text style={{...commonStyles.fs16_700, marginLeft: 10}}>
              {user?.name}
            </Text>
          </TouchableHighlight>
        </View>
        <Image
          source={require('../../../assets/img/3dots.png')}
          resizeMode="contain"
          style={{width: 24, height: 24, borderRadius: 100}}
        />
      </View>

      <Image
        source={{uri: item?.offerImage}}
        style={{width: SIZES.width, height: 311}}
      />

      <View style={{...commonStyles.rowBetween, padding: 20}}>
        <View style={{...commonStyles.rowStart}}>
          <TouchableHighlight
            onPress={handleLike}
            underlayColor="#eee"
            style={{padding: 5}}>
            <View style={{...commonStyles.row}}>
              <Image
                source={
                  isLike
                    ? require('../../../assets/img/heart.png')
                    : require('../../../assets/img/hearto.png')
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
            onPress={handleShare}
            underlayColor="#eee"
            style={{padding: 5, marginLeft: 34}}>
            <View style={{...commonStyles.row}}>
              <Image
                source={require('../../../assets/img/share.png')}
                style={{width: 21, height: 21, tintColor: '#000000'}}
              />
              <Text style={{...commonStyles.fs14_500, marginLeft: 9}}>
                Share
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>

      <View style={{...commonStyles.rowStart, marginLeft: 20, marginTop: -16}}>
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
      </View>
      <View style={{...commonStyles.rowStart, marginLeft: 20, marginTop: -10}}>
        <Text style={{...commonStyles.fs13_500, marginBottom: 12}}>
          Start Date: {item.startDate}
        </Text>
        <Text style={{...commonStyles.fs13_500, marginBottom: 12}}>
          End Date: {item.endDate}
        </Text>
        <Text
          style={{...commonStyles.fs12_400, marginLeft: 8, marginBottom: 12}}>
          {item?.date}
        </Text>
      </View>
    </View>
  );
};
