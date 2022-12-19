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

export default function GetAllCandidatesScreen({navigation, route}) {
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
        <Text
          style={{
            width: '90%',
            textAlign: 'right',
            color: '#0073FF',
            fontSize: 20,
            // backgroundColor: '#0073ff',
          }}>
          Total applicant {allCandidate.length}
        </Text>
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
        {allCandidate?.map((item, index) => {
          return (
            <GetAllCandidateScreen
              item={item}
              index={index}
              navigation={navigation}
            />
          );
          //   return (
          //     <TouchableOpacity
          //       style={styles.itemWrapper}
          //       key={index}
          //       activeOpacity={0.9}
          //       onPress={() => {
          //         navigation.navigate('MemberDetailScreen', {
          //           item: item,
          //         });
          //       }}>
          //       <View style={styles.itemContent}>
          //         <Image
          //           source={{
          //             uri: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
          //           }}
          //           style={styles.itemImg}
          //         />
          //         <View style={styles.memberNameBlock}>
          //           <Text style={[styles.memberName, {color: '#000'}]}>
          //             User name
          //           </Text>
          //           <Text style={styles.conpanyName}>Phone Number</Text>
          //           <Text style={styles.conpanyName}>Phone Number</Text>
          //           <Text style={styles.conpanyName}>Phone Number</Text>
          //           <Text style={styles.conpanyName}>Phone Number</Text>
          //           <Text style={styles.conpanyName}>Phone Number</Text>
          //         </View>
          //       </View>
          //     </TouchableOpacity>
          //   );
        })}

        <View style={{height: 20}} />
      </ScrollView>
    </View>
  );
}

export const GetAllCandidateScreen = ({item, index, navigation}) => {
  console.log('this is item at user profile', item);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    Auth.getLocalStorageData('bearer').then(token => {
      getUserByIDPostAPI('638c4deb0a101475c9cd2ae9', token, res => {
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
    <TouchableOpacity
      style={styles.itemWrapper}
      key={index}
      activeOpacity={0.9}
      // onPress={() => {
      //   navigation.navigate('MemberDetailScreen', {
      //     item: item,
      //   });
      // }}
    >
      <View style={styles.itemContent}>
        <Image
          source={{
            uri: userData.userProfile,
          }}
          style={styles.itemImg}
        />
        {/* certificate :
        "https://res.cloudinary.com/strix-digital/image/upload/v1670781142/o6hgdoxrjd6djbsmku1z.pdf"
        certifiedCourse : "Course name" eduction : "undefined" email :
        "test@gmail.com" experienceYears : "5" fathername : "undefined" isActive
        : true isSubscribed : false martialStatus : "married" mobile :
        "1472222222" mothername : "Mother name" name : "Kashay10" pAddress :
        "Permanent address" password :
        "$2b$10$Jszs3x.mBC1mViIjMYq90.ca.pBhqgALUJSW3brou85jPlWJ0XgM." qrImage :
        "https://res.cloudinary.com/strix-digital/image/upload/v1670139372/jjslmfw4tkvxp7ft8lzp.png"
        rAddress : "Residential address" religion : "Hindu" resetToken : null
        subscriptionId : null transactionId : null userProfile :
        "https://res.cloudinary.com/strix-digital/image/upload/v1670751786/ohnjl7ifo1t32a4lv3ej.jpg"
        userType : "shop" */}
        <View style={styles.memberNameBlock}>
          <Text style={[styles.memberName, {color: '#000'}]}>
            {/* {item.applicantName} */}
            {userData.name}
          </Text>
          <Text style={styles.conpanyName}>Email: {userData.email}</Text>
          <Text style={styles.conpanyName}>Mobile: {userData.mobile}</Text>
          <Text style={styles.conpanyName}>Education: {userData.eduction}</Text>
          <Text style={styles.conpanyName}>
            Experience: {userData.experienceYears}
          </Text>
          <Text style={styles.conpanyName}>
            Father name: {userData.fathername}
          </Text>
          <Text style={styles.conpanyName}>
            Mother name: {userData.mothername}
          </Text>
          <Text style={styles.conpanyName}>
            Marital Status: {userData.martialStatus}
          </Text>
          {/* <Text style={styles.conpanyName}>{userData.martialStatus}</Text> */}
          <Text style={styles.conpanyName}>Address: {userData.rAddress}</Text>
          <Text style={styles.conpanyName}>Religion: {userData.religion}</Text>
          <Text style={styles.conpanyName}>Religion: {userData.religion}</Text>
          {item.resumeLink != '' && item.resumeLink != null && (
            <Text
              style={{
                height: 20,
                borderWidth: 1,
                textAlign: 'center',
                marginTop: 10,
                color: '#000',
              }}
              onPress={() => {
                openBrowser(item?.resumeLink);
              }}>
              Download Resume
            </Text>
          )}
          {item.certificateLink != '' && item.certificateLink != null && (
            <Text
              style={{
                height: 20,
                borderWidth: 1,
                textAlign: 'center',
                marginTop: 10,
                color: '#000',
              }}
              onPress={() => {
                openBrowser(item?.certificateLink);
              }}>
              Certificate
            </Text>
          )}
          {item.policeLink != '' && item.policeLink != null && (
            <Text
              style={{
                height: 20,
                borderWidth: 1,
                textAlign: 'center',
                marginTop: 10,
                color: '#000',
              }}
              onPress={() => {
                openBrowser(item?.policeLink);
              }}>
              Download Resume
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
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
