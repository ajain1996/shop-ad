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
import {RenderUpload} from '../offer/AddSaleOfferScreen';

export default function WorkDetail({navigation, route}) {
  const dispatch = useDispatch();
  const {data} = route.params;
  console.log(data, '<<<<this is preview data');
  // const {jobsData} = useSelector(state => state.Job);
  const [jobsData, setJobData] = useState([]);
  const [bearerToken, setBearerToken] = useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setJobData(data);

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
        <ScrollView style={{marginTop: 20}}>
          <RenderSingleWork
            item={data}
            bearerToken={bearerToken}
            navigation={navigation}
          />

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

const RenderSingleWork = ({item, showDot}) => {
  const [homeModalVisible, setHomeModalVisible] = useState(false);
  console.log(item, '<<<<< thisispreviewitem');
  const converIageArray = () => {
    let imageData = [];
    if (item.image) {
      imageData = [
        {
          uri: item.image,
        },
      ];
    }
    if (item.image2) {
      imageData = [
        {
          uri: item.image2,
        },
      ];
    }
    if (item.image3) {
      imageData = [
        {
          uri: item.image3,
        },
      ];
    }
    if (item.image4) {
      imageData = [
        {
          uri: item.image4,
        },
      ];
    }
    if (item.image5) {
      imageData = [
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
      <RenderUpload
        image={converIageArray()}
        showCross={false}
        // getImage={getImage}
        // imageError={false}
        // setImageError={setImageError}
        // setImageData={setImageData}
      />
      <View>
        <Text> {converIageArray().length} Image (s)</Text>
      </View>
      <View style={{...commonStyles.rowBetween, alignItems: 'flex-start'}}>
        {/* {item?.image && (
          <Image source={{uri: item?.image}} style={{width: 101, height: 61}} />
        )} */}
        <View style={{width: SIZES.width / 1.85, marginHorizontal: 10}}>
          <Text style={{...commonStyles.fs18_700}}>{item?.description}</Text>

          <Text style={{...commonStyles.fs16_700, marginTop: 12}}>
            Shop Name:{' '}
          </Text>
          <Text style={{...commonStyles.fs14_400}}>{item?.shopName}</Text>
          <Text style={{...commonStyles.fs16_700, marginTop: 12}}>
            Service Provider:{' '}
          </Text>
          <Text style={{...commonStyles.fs14_400}}>
            {item?.designationName}
          </Text>

          <Text style={{...commonStyles.fs16_700, marginTop: 12}}>
            Contact Info:{' '}
          </Text>
          <Text style={{...commonStyles.fs14_400}}>{item?.contactNumber}</Text>
          <Text style={{...commonStyles.fs14_400}}>{item?.contactEmail}</Text>
          <Text style={{...commonStyles.fs16_700, marginTop: 12}}>
            Salary:{' '}
          </Text>
          <Text style={{...commonStyles.fs14_400}}>{item?.salary}</Text>
          <Text style={{...commonStyles.fs16_700, marginTop: 12}}>
            Shift Time:{' '}
          </Text>
          <Text style={{...commonStyles.fs14_400}}>{item?.shiftTime}</Text>
          <Text style={{...commonStyles.fs16_700, marginTop: 12}}>
            Location:{' '}
          </Text>
          <Text style={{...commonStyles.fs14_400}}>{item?.location}</Text>
        </View>
      </View>

      {/* <HomeModal
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
        /> */}
    </View>
  );
};
