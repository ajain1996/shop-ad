import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { commonStyles } from '../../utils/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setUserType } from '../../redux/reducer/userType';

export default function HomeSearch({
  width,
  onChange,
  showSwitchText = false,
  ...rest
}) {
  const { userType } = useSelector(state => state.UserType);
  const dispatch = useDispatch();

  return (
    <View style={styles.main}>
      <View style={[styles.container, { width: width ? width : '100%', }]}>
        <Image
          source={require('../../assets/img/searchicon.png')}
          resizeMode="contain"
          style={{ width: 16, height: 16, tintColor: "#999" }}
        />

        <TextInput
          // placeholder="Search"
          placeholderTextColor="#999"
          onChangeText={onChange}
          style={{
            ...commonStyles.fs14_500,
            height: 58,
            marginLeft: 12,
            width: '100%',
          }}
          {...rest}
        />

      </View>
      <View style={styles.filter}>
        <Image
          source={require('../../assets/img/filter3.png')}
          resizeMode="contain"
          style={{ width: 22, height: 22, tintColor: "#fff" }}
        />
      </View>
      {/* {showSwitchText && userType == 'shop' && (
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
            switch to user to apply on job
          </Text>
          <Text
            style={{
              fontSize: 13,
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
            switch to user
          </Text>
        </View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  container: {
    height: 24,
    ...commonStyles.rowStart,
    padding: 16,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    height: 44,
    borderRadius: 14
  },
  filter: {
    width: 44,
    height: 44,
    backgroundColor: "#E68927",
    borderRadius: 14,
    ...commonStyles.centerStyles
  }
})
