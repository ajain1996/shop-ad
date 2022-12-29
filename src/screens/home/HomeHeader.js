import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {commonStyles} from '../../utils/styles';
import ModalMenu from './ModalMenu';
import HomeModal from './HomeModal';
import {useState} from 'react';
import {useSelector} from 'react-redux';

export default function HomeHeader({navigation, onPress}) {
  const {userType} = useSelector(state => state.UserType);
  const {userData} = useSelector(state => state.User);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View
        style={{
          width: '100%',
          height: 70,
          ...commonStyles.rowBetween,
          padding: 20,
          backgroundColor: '#fff',
        }}>
        <TouchableHighlight
          onPress={() => setModalVisible(true)}
          underlayColor="#f7f8f9">
          <Image
            source={require('../../assets/img/menu.png')}
            resizeMode="contain"
            style={{width: 27, height: 27}}
          />
        </TouchableHighlight>

        <Image
          source={require('../../assets/img/shopad.png')}
          resizeMode="contain"
          style={{width: 111, height: 48}}
        />

        {userType === 'shop' ? (
          <TouchableOpacity 
            onPress={() => {
              if (onPress) {
                onPress();
              }
            }}
            underlayColor="#f7f8f9">
            <Image
              source={require('../../assets/img/plus.png')}
              resizeMode="contain"
              style={{width: 28, height: 28, alignSelf: 'flex-end'}}
              />
              <Text style={{textAlign: "center"}}>{userData[0]?.name}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableHighlight
            onPress={() => {
              if (onPress) {
                // onPress();
                navigation.navigate('ProfileScreen');
              }
            }}
            underlayColor="#f7f8f9">
            <Image
              source={{uri: userData[0]?.userProfile}}
              resizeMode="contain"
              style={{width: 40, height: 40, borderRadius: 100}}
            />
          </TouchableHighlight>
        )}
        {/* <View style={{width: 28, height: 28}} /> */}
        {/* {userType === 'user' ? (
          <TouchableHighlight
            onPress={() => {
              if (onPress) {
                onPress();
              }
            }}
            underlayColor="#f7f8f9">
            <Image
              source={{uri: userData[0]?.userProfile}}
              resizeMode="contain"
              style={{width: 40, height: 40, borderRadius: 100}}
            />
          </TouchableHighlight>
        ) : (
          <View style={{width: 28, height: 28}} />
        )} */}
      </View>
      <ModalMenu
        modalVisible={modalVisible}
        navigation={navigation}
        callback={() => setModalVisible(!modalVisible)}
      />
    </>
  );
}
