import {
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import HomeHeader from '../home/HomeHeader';
import HomeSearch from '../home/HomeSearch';
import {commonStyles} from '../../utils/styles';
import {SIZES} from '../../utils/theme';
import {useState} from 'react';
import {useEffect} from 'react';
import {
  getAllWorksPostRequest,
  getWorksByLocationPostAPI,
} from '../../utils/API';
import Auth from '../../services/Auth';
import CustomLoader, {CustomPanel} from '../../components/CustomLoader';
import PTRView from 'react-native-pull-to-refresh';
import {useDispatch, useSelector} from 'react-redux';
import work, {setWork} from '../../redux/reducer/work';
import HomeModal from '../home/HomeModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RenderUpload} from '../offer/AddSaleOfferScreen';

export default function WorksScreen({navigation}) {
  const dispatch = useDispatch();
  const {workData} = useSelector(state => state.Work);

  const [bearerToken, setBearerToken] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [allWork, setAllWork] = useState([]);

  React.useEffect(() => {
    (async () => {
      const unsubscribe = navigation.addListener('focus', () => {
        Auth.getLocalStorageData('bearer').then(token => {
          setBearerToken(token);
          getAllWorksPostRequest(token, response => {
            console.log(response, '<<<< allworks');
            if (response !== null) {
              dispatch(setWork(response?.data));
              setAllWork(response?.data);
            }
          });
        });
      });
      return unsubscribe;
    })();
  }, [navigation]);

  useEffect(() => {
    setLoading(true);
    Auth.getLocalStorageData('bearer').then(token => {
      setLoading(false);
      setBearerToken(token);
      getAllWorksPostRequest(token, response => {
        if (response !== null) {
          dispatch(setWork(response?.data));
        }
      });
    });
  }, []);

  function _refresh() {
    setLoading(true);
    Auth.getLocalStorageData('bearer').then(token => {
      setLoading(false);
      setBearerToken(token);
      getAllWorksPostRequest(token, response => {
        if (response !== null) {
          dispatch(setWork(response?.data));
        }
      });
    });
  }
  const filterIt = val => {
    console.log('val', val);
    setLoading(true);
    const smallVal = val.toLocaleLowerCase();
    if (val.trim() == '') {
      dispatch(setWork(allWork));
      return setLoading(false);
    }
    // let data = [];
    setLoading(true);
    const data = allWork.filter(item => {
      const smallLoc = item.location.toLowerCase();
      const matchLoc = smallLoc.match(smallVal);
      if (matchLoc != null) {
        console.log(matchLoc, '<<<thisisdata');

        return true;
      }
      if (item.ownerId) {
        const smallname = item.ownerId.name.toLocaleLowerCase();
        const matchLoc = smallname.match(smallVal);
        if (matchLoc != null) {
          console.log(matchLoc, '<<<thisisdata');

          return true;
        }
      }
      if (item.title) {
        const smallname = item.title.toLocaleLowerCase();
        const matchLoc = smallname.match(smallVal);
        if (matchLoc != null) {
          console.log(matchLoc, '<<<thisisdata');

          return true;
        }
      }
      if (item.designationName) {
        const smallname = item.designationName.toLocaleLowerCase();
        const matchLoc = smallname.match(smallVal);
        if (matchLoc != null) {
          console.log(matchLoc, '<<<thisisdata');

          return true;
        }
      }
      if (item.shopName) {
        const smallname = item.shopName.toLocaleLowerCase();
        const matchLoc = smallname.match(smallVal);
        if (matchLoc != null) {
          console.log(matchLoc, '<<<thisisdata');

          return true;
        }
      }
      // const matchName = smallname.match(smallVal);
      // console.log(matchLoc, smallLoc, smallVal, '<<<<checkmatch');
    });
    dispatch(setWork(data));
    setLoading(false);
    // return data;
    // console.log(data, '<<filterit');
    // relativeTimeRounding
  };

  return (
    <View style={{backgroundColor: '#f7f8f9'}}>
      <HomeHeader
        navigation={navigation}
        onPress={() => {
          navigation.navigate('AddWorksScreen');
        }}
      />
      <HomeSearch
        onChange={val => {
          // setLoading(true);
          filterIt(val);
          // Auth.getLocalStorageData('bearer').then(token => {
          //   setLoading(false);
          //   getWorksByLocationPostAPI(val, token, response => {
          //     if (response !== null) {
          //       dispatch(setWork(response?.data));
          //     }
          //   });
          // });
        }}
      />
      <PTRView onRefresh={_refresh}>
        <ScrollView>
          {[...workData]?.reverse().map((item, index) => {
            return (
              <View key={index}>
                <RenderSingleWork item={item} navigation={navigation} />
              </View>
            );
          })}
        </ScrollView>
        <View style={{height: 200}} />

        {workData?.length == 0 && (
          <View>
            <Text style={{width: '100%', textAlign: 'center'}}>
              No Data Found
            </Text>
          </View>
        )}

        {/* <FlatList
                    data={workData}
                    renderItem={({ item }) => {
                        return (
                            <RenderSingleWork
                                item={item}
                            />
                        );
                    }}
                    ListFooterComponent={
                        <View style={{ height: 200 }} />
                    }
                /> */}

        <CustomPanel loading={loading} />
        <CustomLoader loading={loading} />
      </PTRView>
    </View>
  );
}

export const RenderSingleWork = ({item, showDot, navigation}) => {
  const [homeModalVisible, setHomeModalVisible] = useState(false);
  console.log(item, '<<one job');
  const converIageArray = () => {
    let imageData = [];
    if (item.image) {
      imageData = [
        ...imageData,
        {
          uri: item.image,
        },
      ];
    }
    if (item.image1) {
      imageData = [
        ...imageData,
        {
          uri: item.image1,
        },
      ];
    }

    if (item.image2) {
      imageData = [
        ...imageData,
        {
          uri: item.image2,
        },
      ];
    }
    if (item.image3) {
      imageData = [
        ...imageData,
        {
          uri: item.image3,
        },
      ];
    }
    if (item.image4) {
      imageData = [
        ...imageData,
        {
          uri: item.image4,
        },
      ];
    }
    if (item.image5) {
      imageData = [
        ...imageData,
        {
          uri: item.image5,
        },
      ];
    }
    return imageData;
  };
  return (
    <View
      style={{
        margin: 10,
        padding: 9,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#D8D8D8',
        borderRadius: 4,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation?.navigate('workDetail', {
            data: {
              ...item,
            },
          });
        }}>
        <View style={{...commonStyles.rowBetween, alignItems: 'flex-start'}}>
          {/* {converIageArray().length > 0 && (
            <RenderUpload
              image={converIageArray()}
              showCross={false}
              // getImage={getImage}
              // imageError={false}
              // setImageError={setImageError}
              // setImageData={setImageData}
            />
          )} */}
          {item?.image1 && (
            <View>
              <Image
                source={{uri: item?.image1}}
                style={{width: 101, height: 61}}
              />
              <Text>{converIageArray().length} Image(s)</Text>
            </View>
          )}
          <View style={{width: SIZES.width / 1.85, marginHorizontal: 10}}>
            <Text style={{...commonStyles.fs18_700}}>{item?.description}</Text>

            {/* <Text style={{...commonStyles.fs16_700, marginTop: 12}}>
              Service Provider:{' '}
            </Text>
            <Text style={{...commonStyles.fs14_400}}>{item?.name}</Text> */}
            <Text style={{...commonStyles.fs16_700, marginTop: 12}}>
              Shop Name:{' '}
            </Text>
            <Text style={{...commonStyles.fs14_400}}>{item?.shopName}</Text>
            <Text style={{...commonStyles.fs16_700, marginTop: 12}}>
              Relationship:{' '}
            </Text>
            <Text style={{...commonStyles.fs14_400}}>
              {item?.designationName}
            </Text>

            <Text style={{...commonStyles.fs16_700, marginTop: 12}}>
              Contact Info:{' '}
            </Text>
            <Text style={{...commonStyles.fs14_400}}>
              {item?.contactNumber}, ( {item?.location} )
            </Text>
            {item?.instaId && (
              <>
                <Text style={{...commonStyles.fs16_700, marginTop: 12}}>
                  Instagram:{' '}
                </Text>
                <Text style={{...commonStyles.fs14_400}}>{item?.instaId}</Text>
              </>
            )}
            {item?.facebookId && (
              <>
                <Text style={{...commonStyles.fs16_700, marginTop: 12}}>
                  Facebook:{' '}
                </Text>
                <Text style={{...commonStyles.fs14_400}}>
                  {item?.facebookId}
                </Text>
              </>
            )}
            {item?.emailId && (
              <>
                <Text style={{...commonStyles.fs16_700, marginTop: 12}}>
                  Email:{' '}
                </Text>
                <Text style={{...commonStyles.fs14_400}}>{item?.emailId}</Text>
              </>
            )}
            {item?.websiteAddress && (
              <>
                <Text style={{...commonStyles.fs16_700, marginTop: 12}}>
                  Email:{' '}
                </Text>
                <Text style={{...commonStyles.fs14_400}}>
                  {item?.websiteAddress}
                </Text>
              </>
            )}
          </View>
          {showDot && (
            <TouchableHighlight
              onPress={() => setHomeModalVisible(true)}
              underlayColor="#f7f8f9">
              <Image
                source={require('../../assets/img/3dots.png')}
                resizeMode="contain"
                style={{width: 24, height: 24, borderRadius: 100}}
              />
            </TouchableHighlight>
          )}
        </View>
      </TouchableOpacity>

      <HomeModal
        modalVisible={homeModalVisible}
        setModalVisible={setHomeModalVisible}
        feedbackFor="work"
        onSaveIT={async () => {
          const prev = await AsyncStorage.getItem('SAVED_WORK');
          console.log(prev);
        }}
        feedbackNumber={item?.ownerId}
        savedCallback={async () => {
          // setSavedItems(oldArray => [...oldArray, item]);
          const oldData = await AsyncStorage.getItem('SAVED_WORK');
          // console.log(parseIT, '<<<this is od');
          if (oldData == null) {
            await AsyncStorage.setItem('SAVED_WORK', JSON.stringify([item]));
          } else {
            const parseIT = JSON.parse(oldData);
            await AsyncStorage.setItem(
              'Saved_Item',
              JSON.stringify([...parseIT, item]),
            );
          }
          setHomeModalVisible(false);
        }}
      />
    </View>
  );
};
