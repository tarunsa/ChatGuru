import React from 'react';
import {View, Text, AppRegistry} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
// import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Login from './Login';
import AuthLoadingScreen from './AuthLoadingScreen';
import Home from './Home';
import Chat from './Chat';
import Profile from './Profile';
import {BottomStack} from './BottomTab';

export const AppNavigator = createStackNavigator(
  {
    AuthLoadingScreen: {
      screen: AuthLoadingScreen,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
      }),
      mode: 'none',
    },
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        title: 'Chats',
      }),
    },

    BottomTab: {
      screen: BottomStack,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
      }),
    },

    Login: {
      screen: Login,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
      }),
    },
    Chat: {
      screen: Chat,
      navigationOptions: ({navigation}) => ({
        title: navigation.getParam('name', null),
      }),
    },
    Profile: {
      screen: Profile,
      navigationOptions: ({navigation}) => ({
        title: 'Profile',
      }),
    },
  },
  {
    initialRouteName: 'Login',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
