import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Auth from '../services/Auth';
import {setUser} from '../redux/reducer/user';
import {useDispatch, useSelector} from 'react-redux';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {useState} from 'react';
import SplashScreen from '../screens/SplashScreen';
import {StatusBar} from 'react-native';
import {getUserDataById} from '../utils/API';

export default function AppNavigation() {
  const dispatch = useDispatch();

  const {userData, login} = useSelector(state => state.User);

  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  const [loginChk, setLoginChk] = useState(true);

  const getUser = async () => {
    let data = await Auth.getAccount();
    console.log(data, '<<<< this is data at async');
    Auth.getLocalStorageData('bearer').then(token => {
      if (data == 'null' || data == null) {
        setLoginChk(false);
        return null;
      }
      console.log(data, '<<<< this is data at async 2');
      getUserDataById(data[0]?._id, token, res => {
        console.log(res.data, '<<<<< \n\n\n\n res at user get at navigation');
        console.log('\n\n\n\n\ndata fetched: ', data);
        if (data !== null) {
          dispatch(setUser(res.data));
          setLoginChk(false);
        } else {
          setLoginChk(false);
        }
      });
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loginChk) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1572B9" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={screenOptions}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          {!login ? (
            <Stack.Screen name="Auth" component={AuthStack} />
          ) : (
            <Stack.Screen name="AppStack" component={AppStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
