import {
  View,
  Text,
  Modal,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {commonStyles} from '../../utils/styles';
import {COLORS, SIZES} from '../../utils/theme';
import {getAppliedCandidate, getUserByIDPostAPI} from '../../utils/API';
import Auth from '../../services/Auth';
import {RFC_2822} from 'moment';

export default function Offerdetail({navigation, route}) {
  const {item} = route.params;
  const [allCandidate, setAllCandidate] = useState([]);
  const [tempData, setTempData] = useState([]);
  useEffect(() => {
    Auth.getLocalStorageData('bearer').then(token => {
      getAppliedCandidate(token, item._id, res => {
        console.log(res, '<<<<<jobdetail');
        setAllCandidate(res);
        setTempData(res);
      });
    });
  }, []);

  const searchIt = text => {
    if (text == '' || text == null) return setAllCandidate(tempData);
    const filter = tempData.filter(item => {
      const short1 = item.applicantName.toLowerCase();
      const short2 = text.toLowerCase();
      if (short1.match(short2)) {
        return true;
      }
    });
    setAllCandidate(filter);
  };

  console.log(item, '<<<this is item');
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      {/* {membersHeader(navigation, setSearchInput, searchInput)} */}
      <View style={styles.headerContainer}>
        <TouchableHighlight
          onPress={() => navigation.goBack()}
          underlayColor="#eee">
          <Image
            source={require('../../assets/img/left-arrow.png')}
            resizeMode="contain"
            style={{width: 25, height: 25}}
          />
        </TouchableHighlight>

        {/* <TextInput
            placeholder="Search Members"
            placeholderTextColor="#999"
            onChangeText={text => {
              console.log(text);
              searchIt(text);
            }}
            style={styles.searchInput}
          /> */}
      </View>
      <ScrollView>
        <GetAllCandidateScreen item={item} navigation={navigation} />

        <View style={{height: 20}} />
      </ScrollView>
    </View>
  );
}

export const GetAllCandidateScreen = ({item, index, navigation}) => {
  const userImage = require('../../assets/img/profile-tab.png');
  // const userImage = require('../../assets/img/pro');
  console.log('OFferdetailitem', item);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    Auth.getLocalStorageData('bearer').then(token => {
      getUserByIDPostAPI(item?.ownerId, token, res => {
        console.log('this is uer data', res);
        setUserData(res.data[0]);
      });
    });
  }, []);

  const openBrowser = link => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URI: " + link);
      }
      return false;
    });
  };

  return (
    <View
      style={styles.itemWrapper}
      activeOpacity={0.9}

      // onPress={() => {
      //   navigation.navigate('MemberDetailScreen', {
      //     item: item,
      //   });
      // }}
    >
      <View>
        <ScrollView horizontal={true}>
          {item?.offerImage && (
            <Image
              source={{uri: item?.offerImage}}
              style={{width: SIZES.width, height: 311}}
            />
          )}

          {item?.offerImage1 && (
            <Image
              source={{uri: item?.offerImage1}}
              style={{width: SIZES.width, height: 311}}
            />
          )}
          {item?.offerImage2 && (
            <Image
              source={{uri: item?.offerImage2}}
              style={{width: SIZES.width, height: 311}}
            />
          )}
          {item?.offerImage3 && (
            <Image
              source={{uri: item?.offerImage3}}
              style={{width: SIZES.width, height: 311}}
            />
          )}
          {item?.offerImage34 && (
            <Image
              source={{uri: item?.offerImage4}}
              style={{width: SIZES.width, height: 311}}
            />
          )}
        </ScrollView>
      </View>

      <View style={styles.itemContent}>
        {userData?.userProfile && (
          <Image
            source={{
              uri: userData.userProfile,
              // uri: userImage,
            }}
            style={styles.itemImg}
          />
        )}
        {!userData?.userProfile && (
          <Image source={userImage} style={styles.itemImg} />
        )}

        <View style={styles.memberNameBlock}>
          <Text style={[styles.memberName, {color: '#000'}]}>
            {/* {item.applicantName} */}
            {userData.name} ddd
          </Text>
          <Text style={styles.conpanyName}>location: {item?.location}</Text>
          <Text style={styles.conpanyName}>
            Description: {item?.description}
          </Text>
          <Text style={styles.conpanyName}>start date: {item.startDate}</Text>
          <Text style={styles.conpanyName}>End date: {item.endDate}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    elevation: 9,
    shadowColor: '#999',
    borderRadius: 8,
    marginTop: 16,
    marginHorizontal: 16,
  },
  itemContent: {
    ...commonStyles.rowStart,
    paddingHorizontal: 24,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  itemImg: {
    width: 90,
    height: 90,
    borderRadius: 100,
    marginTop: 20,
  },
  memberNameBlock: {
    width: '100%',
    padding: 16,
    width: '80%',
    // marginTop
  },
  memberName: {
    ...commonStyles.fs18_500,
    color: '#fff',
  },
  conpanyName: {
    ...commonStyles.fs12_400,
    color: '#000',
  },
  memberAddress: {
    ...commonStyles.fs18_500,
    marginTop: 14,
  },
  companywebsite: {
    ...commonStyles.fs12_400,
    color: COLORS.theme,
    marginTop: 5,
  },
  headerContainer: {
    ...commonStyles.rowStart,
    width: '100%',
    height: 50,
    ...commonStyles.elevation9,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    // elevation: 10,
    marginTop: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#999',
    width: '88%',
    marginLeft: 20,
    height: 45,
    borderRadius: 6,
    paddingHorizontal: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
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
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
