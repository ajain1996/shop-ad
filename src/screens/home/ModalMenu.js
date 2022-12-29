import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {removeUser, userSlice} from '../../redux/reducer/user';
import {setUserType} from '../../redux/reducer/userType';
import Auth from '../../services/Auth';
import {commonStyles} from '../../utils/styles';
import {SIZES} from '../../utils/theme';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalMenu = ({modalVisible, callback, navigation}) => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.User);
  const {userType} = useSelector(state => state.UserType);
  //   console.log('this is user type \n\n\n\n', userType, '<<<< this is user type');

  var username = '';
  if (userData !== null && userData !== undefined) {
    username = userData[0]?.email?.split('@')[0];
  }

  const [userTypeModalVisible, setUserTypeModalVisible] = React.useState(false);

  return (
    <View style={{alignItems: 'flex-start'}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={callback}>
        <TouchableHighlight
          style={styles.centeredView}
          onPress={() => {
            callback();
          }}
          underlayColor="transparent">
          <View style={styles.modalView}>
            <View style={{...commonStyles.rowStart, alignItems: 'center'}}>
              <View>
                {userData?.userProfile !== undefined ? (
                  <Image
                    source={{uri: userData?.userProfile}}
                    resizeMode="contain"
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 100,
                      marginTop: 6,
                      borderWidth: 2,
                      borderColor: '#E27127',
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: '#f7f8f9',
                      borderRadius: 100,
                      ...commonStyles.centerStyles,
                    }}>
                    <Image
                      source={require('../../assets/img/profile-tab.png')}
                      resizeMode="contain"
                      style={{width: 45, height: 45, borderRadius: 100}}
                    />
                  </View>
                )}
              </View>

              <View style={{marginLeft: 9, marginTop: -5}}>
                <Text style={[commonStyles.fs16_500]}>{userData[0]?.name}</Text>
                <TouchableHighlight
                  style={{...styles.switchAccount}}
                  underlayColor="#eee"
                  onPress={async () => {
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
              </View>
            </View>

            <Text />
            <Text />
            <TouchableHighlight
              style={[styles.button]}
              underlayColor="#dcdcdc"
              onPress={() => {
                navigation.navigate('GetMembershipScreen');
              }}>
              <Text style={styles.textStyle}>Get Membership</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.button]}
              underlayColor="#dcdcdc"
              onPress={() => {
                navigation.navigate('SavedScreen');
              }}>
              <Text style={styles.textStyle}>Saved</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.button]}
              underlayColor="#dcdcdc"
              onPress={() => {
                Auth.logout().then(async () => {
                  dispatch(removeUser([]));
                  await AsyncStorage.setItem(
                    'LIKED_OFFER',
                    JSON.stringify(null),
                  );

                  await AsyncStorage.setItem(
                    'SAVED_OFFER',
                    JSON.stringify(null),
                  );
                  await AsyncStorage.setItem(
                    'TOTAL_SHARED',
                    JSON.stringify(null),
                  );
                });
              }}>
              <Text style={styles.textStyle}>Logout</Text>
            </TouchableHighlight>

            {userData?.qrImage !== null || userData?.qrImage !== undefined ? (
              <Image
                source={{
                  uri: 'https://res.cloudinary.com/strix-digital/image/upload/v1667034879/xgidqgtnys3ighei4tgy.png',
                }}
                resizeMode="contain"
                style={{
                  width: SIZES.width / 1.3,
                  height: SIZES.width / 1.3,
                  marginTop: 20,
                }}
              />
            ) : (
              <></>
            )}
          </View>
        </TouchableHighlight>
      </Modal>

      <UserTypeModal
        modalVisible={userTypeModalVisible}
        callback2={async type => {
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

export default ModalMenu;
