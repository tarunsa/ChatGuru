import React from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import User from './User';
//import Login from './Login';
import firebase from 'firebase';
export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }
  componentWillMount() {
    var firebaseConfig = {
      apiKey: 'AIzaSyBM7KBnG8fsXM5MXIJqSv2LZYeDjPbuW-w',
      authDomain: 'fir-chat-60b7a.firebaseapp.com',
      databaseURL: 'https://fir-chat-60b7a.firebaseio.com',
      projectId: 'fir-chat-60b7a',
      storageBucket: 'fir-chat-60b7a.appspot.com',
      messagingSenderId: '1066594273191',
      appId: '1:1066594273191:web:63b7c59e912faa4b691882',
      measurementId: 'G-NX7DMHB6NT',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem('userPhone');

    this.props.navigation.navigate(User.phone ? 'App' : 'Home');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
