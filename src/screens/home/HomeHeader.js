import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import React from 'react';
import { commonStyles } from '../../utils/styles';
import ModalMenu from './ModalMenu';
import HomeModal from './HomeModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function HomeHeader({ navigation, onPress }) {
  const { userType } = useSelector(state => state.UserType);
  const { userData } = useSelector(state => state.User);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => setModalVisible(true)}
          underlayColor="#f7f8f9" style={styles.menuBlock}
        >
          <Image
            source={require('../../assets/img/menu2.png')}
            resizeMode="contain"
            style={{ width: 27, height: 27, marginTop: 6 }}
          />
        </TouchableHighlight>

        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 14, fontWeight: "400", color: "#595959" }}>Hello {userData[0]?.name}</Text>
          <Text style={{ fontSize: 13, fontWeight: "700", color: "#000", marginTop: -4 }}>Jakarta, IND</Text>
        </View>

        {/* <Image
          source={require('../../assets/img/shopad.png')}
          resizeMode="contain"
          style={{ width: 111, height: 48 }}
        /> */}

        <TouchableHighlight
          onPress={() => {
            if (onPress) {
              // onPress();
              navigation.navigate('ProfileScreen');
            }
          }}
          underlayColor="#f7f8f9">
          <Image
            source={{ uri: userData[0]?.userProfile ? userData[0]?.userProfile : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80" }}
            resizeMode="contain"
            style={{ width: 40, height: 40, borderRadius: 100 }}
          />
        </TouchableHighlight>
      </View>
      <ModalMenu
        modalVisible={modalVisible}
        navigation={navigation}
        callback={() => setModalVisible(!modalVisible)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    ...commonStyles.rowBetween,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 20
  },
  menuBlock: {
    width: 42,
    height: 42,
    backgroundColor: "#F2F2F2",
    borderRadius: 100,
    ...commonStyles.centerStyles,
  }
})
