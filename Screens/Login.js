import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import User from './User';
import firebase from './config';
import Firebase from 'firebase';

export default class Login extends Component {
  state = {
    phone: '',
    name: '',
  };
  handleChange = (key) => (val) => {
    this.setState({[key]: val});
  };
  submitForm = async () => {
    if (this.state.phone.length < 10) {
      Alert.alert('Error', 'Enter correct phone number');
    } else if (this.state.name.length < 3) {
      Alert.alert('Error', 'name with minimum 6 characters');
    } else {
      await AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      firebase
        .database()
        .ref('users/' + User.phone)
        .set({name: this.state.name});
      this.props.navigation.navigate('Home');
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="phone number"
          autoCapitalize="none"
          placeholderTextColor="white"
          maxLength={10}
          textAlign="center"
          keyboardType="numeric"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}
        />
        <TextInput
          placeholder="user name"
          keyboardType="default"
          autoCapitalize="none"
          textAlign="center"
          placeholderTextColor="white"
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />
        <TouchableOpacity style={styles.btn} onPress={this.submitForm}>
          <Text style={styles.text}>Enter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FcFF',
  },
  input: {
    borderWidth: 1,
    width: 280,
    height: 50,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
    borderColor: '#42A5F5',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn: {
    marginTop: 15,
    height: 45,
    width: 150,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 30,
  },
});
