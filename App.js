import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Ionicons} from "@expo/vector-icons";

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import HomeScreen from './screens/HomeScreen';
import ScanningScreen from './screens/ScanningScreen';
import GameScreen from './screens/GameScreen';
import LocationScreen from './screens/LocationScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';
import AdminHome from './screens/AdminHome';

import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBgEAN4lNtqkYzhilZYr6h0nz5gYXscSCs",
  authDomain: "fyp-goearth.firebaseapp.com",
  databaseURL: "https://fyp-goearth.firebaseio.com",
  projectId: "fyp-goearth",
  storageBucket: "fyp-goearth.appspot.com",
  messagingSenderId: "47240667694",
  appId: "1:47240667694:web:207faf3de900bff152b5bf",
  measurementId: "G-N68B2JS0W9"
};

firebase.initializeApp(firebaseConfig);

const AppTabNavigator = createBottomTabNavigator (
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name='ios-home' size={24} color={tintColor} />
      }
    },
    Scan: {
      screen: ScanningScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name='ios-camera' size={24} color={tintColor} />
      }
    },
    GOeARth: {
      screen: GameScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name='ios-finger-print' size={24} color={tintColor} />
      }
    },
    Location: {
      screen: LocationScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name='ios-pin' size={24} color={tintColor} />
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name='ios-menu' size={24} color={tintColor} />
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#f0634f',
      inactiveTintColor: '#b8bbc4'
    }
  }
);

const AppNavigator = createStackNavigator({
  Admin: {
    screen: AdminScreen
  },
  AdminHome: {
    screen: AdminHome
  }
});

const AuthStack = createStackNavigator ({
  Login: LoginScreen,
  Register: RegisterScreen
});

export default createAppContainer (
  createSwitchNavigator ({
    Loading: LoadingScreen,
    App: AppTabNavigator,
    Auth: AuthStack,
    Admin: AppNavigator
  },
  {
    initialRouteName: "Loading"
  })
);