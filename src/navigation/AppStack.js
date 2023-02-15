import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabs from '../bottom_tabs/BottomTabs';
import HomeScreen from '../screens/home/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import {StatusBar} from 'react-native';
import WorksScreen from '../screens/works/WorksScreen';
import AddSaleOfferScreen from '../screens/offer/AddSaleOfferScreen';
import JobsScreen from '../screens/jobs/JobsScreen';
import AddJobScreen from '../screens/jobs/AddJobScreen';
import GetMembershipScreen from '../screens/membership/GetMembershipScreen';
import AddWorksScreen from '../screens/works/AddWorksScreen';
import UserDetailsScreen from '../screens/home/details/UserDetailsScreen';
import UserPostScreen from '../screens/home/details/UserPostScreen';
import CommentScreen from '../screens/home/comment/CommentScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import UpdateProfileScreen from '../screens/profile/UpdateProfileScreen';
import LocationScreen from '../screens/location/LocationScreen';
import ApplyJobScreen from '../screens/jobs/ApplyJobScreen';
import SavedScreen from '../screens/saved/SavedScreen';
import GetAllCandidatesScreen from '../screens/profile/GetAllCandidateScreen';
import Offerdetail from '../screens/offer/OfferDetail';
import PreviewJobScreen, {PreviewJob} from '../screens/jobs/PreviewJob';
import PreviewWork from '../screens/works/PreviewWork';
import PreviewOffer from '../screens/offer/PreviewOffer';
import WorkDetail from '../screens/works/WorkDetail';
import WorkDetailPreview from '../screens/works/WorkDetailPreview';

export default function AppStack() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1572B9" />
      <Stack.Navigator initialRouteName="Root" screenOptions={screenOptions}>
        <Stack.Screen name="Root" component={BottomTabs} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="WorksScreen" component={WorksScreen} />
        <Stack.Screen
          name="AddSaleOfferScreen"
          component={AddSaleOfferScreen}
        />
        <Stack.Screen name="JobsScreen" component={JobsScreen} />
        <Stack.Screen name="AddJobScreen" component={AddJobScreen} />
        <Stack.Screen
          name="GetMembershipScreen"
          component={GetMembershipScreen}
        />
        <Stack.Screen name="AddWorksScreen" component={AddWorksScreen} />
        <Stack.Screen name="OfferDetail" component={Offerdetail} />
        <Stack.Screen name="PreviewJob" component={PreviewJobScreen} />
        <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} />
        <Stack.Screen name="PreviewWork" component={PreviewWork} />
        <Stack.Screen name="workDetail" component={WorkDetail} />
        <Stack.Screen name="workDetailPreview" component={WorkDetailPreview} />
        <Stack.Screen name="PreviewOffer" component={PreviewOffer} />
        <Stack.Screen name="UserPostScreen" component={UserPostScreen} />
        <Stack.Screen name="CommentScreen" component={CommentScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen
          name="UpdateProfileScreen"
          component={UpdateProfileScreen}
        />
        <Stack.Screen name="LocationScreen" component={LocationScreen} />
        <Stack.Screen name="ApplyJobScreen" component={ApplyJobScreen} />
        <Stack.Screen name="SavedScreen" component={SavedScreen} />
        <Stack.Screen
          name="GetAllCandidatesScreen"
          component={GetAllCandidatesScreen}
        />
      </Stack.Navigator>
    </>
  );
}
