import {View, Text, Image, TextInput} from 'react-native';
import React from 'react';
import {commonStyles} from '../../utils/styles';
import {useDispatch, useSelector} from 'react-redux';
import {setUserType} from '../../redux/reducer/userType';

export default function HomeSearch({
  width,
  onChange,
  showSwitchText = false,
  ...rest
}) {
  const {userType} = useSelector(state => state.UserType);
  const dispatch = useDispatch();

  return (
    <>
      <View
        style={{
          width: width ? width : '100%',
          height: 58,
          ...commonStyles.rowStart,
          padding: 16,
          backgroundColor: '#EFEFEF',
          alignItems: 'center',
          padding: 20,
          elevation: 8,
          shadowColor: '#999',
        }}>
        <Image
          source={require('../../assets/img/location.png')}
          resizeMode="contain"
          style={{width: 22, height: 24}}
        />

        <TextInput
          placeholder="Near by location"
          placeholderTextColor="#999"
          onChangeText={onChange}
          style={{...commonStyles.fs14_500, height: 58, marginLeft: 12}}
          {...rest}
        />
      </View>
      {showSwitchText && userType == 'shop' && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 13,
              color: '#000',
              // textAlign: 'center',
              paddingLeft: 10,
              // width: '100%',
            }}>
            Switch to user profile to apply on Job
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: '#000',
              // textAlign: 'center',
              textAlign: 'right',
              paddingLeft: 10,

              // width: '100%',
              marginRight: 10,
            }}
            onPress={() => {
              dispatch(setUserType('user'));
            }}>
            Switch to User
          </Text>
        </View>
      )}
    </>
  );
}
