import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import WorksScreen from '../screens/works/WorksScreen';
import JobsScreen from '../screens/jobs/JobsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
        tabBarLabel: '',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: "#1178BB",
          height: 58,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 28,
          borderRadius: 15,
          marginBottom: 20,
          paddingTop: 28,
          paddingHorizontal: 20
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <BuildTabComponent
                image={require('../assets/img/offers-tab.png')}
                text="Offers"
                focused={focused}
                index={1}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="JobsTab"
        component={JobsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <BuildTabComponent
                image={require('../assets/img/job-tab.png')}
                text="Job"
                focused={focused}
                index={2}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="WorksTab"
        component={WorksScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <BuildTabComponent
                image={require('../assets/img/work-tab.png')}
                text="Works"
                focused={focused}
                index={3}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <BuildTabComponent
                image={require('../assets/img/profile-tab.png')}
                text="Profile"
                focused={focused}
                index={4}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const BuildTabComponent = ({ image, text, focused, index }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image source={image} resizeMode="contain"
        style={{
          width: 18, height: 18,
          tintColor: focused ? "#E68927" : '#FFF',
        }}
      />

      <View style={{ width: 24, height: 3, backgroundColor: focused ? "#E68927" : 'transparent', marginTop: 8 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default BottomTabs;
