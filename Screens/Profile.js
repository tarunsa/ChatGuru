import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  AsyncStorage,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firebase from './config';
import Firebase from 'firebase';
import User from './User';
export default class Profile extends React.Component {
  state = {
    name: User.name,
    imageSource: require('./assets/profile.png'),
    upload: false,
  };
  handleChange = (key) => (val) => {
    this.setState({[key]: val});
  };
  _logut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  };
  changeName = async () => {
    if (this.state.name.length < 3) {
      Alert.alert('Error', 'Please enter valid name');
    } else if (User.name !== this.state.name) {
      User.name !== this.state.name;
      firebase
        .database()
        .ref('users')
        .child(User.phone)
        .set({name: this.state.name});
      User.name = this.state.name;
      Alert.alert('Sucess', 'Name changed Sucessful.');
    }
  };
  changeImage = () => {
    const options = {
      quality: 0.7,
      allowsEditing: true,
      mediaType: 'photo',
      noData: true,
      storageOptions: {
        skipBackup: true,
        waitUntilSaved: true,
        path: 'images',
        cameraRoll: true,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        console.log(error);
      } else if (!response.didCancel) {
        this.setState(
          {
            upload: true,
            imageSource: {uri: response.uri},
          },
          this.uploadFile,
        );
      }
    });
  };
  updateUser = () => {
    firebase.database().ref('users').child(User.phone).set(User);
    Alert.alert(sucess, 'sucessful saved');
  };
  updateUserImage = (imageUrl) => {
    User.image = imageUrl;
    this.updateUser();
    this.setState({upload: false, imageSource: {url: imageUrl}});
  };

  uploadFile = async () => {
    const file = await this.uriToBlob(this.state.imageSource.uri);
    firebase
      .storage()
      .ref(`profile_pictures/${User.phone}.png`)
      .put(file)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => this.updateUserImage(uri))
      .catch((error) => {
        this.setState({
          upload: false,
          imageSource: require('./assets/profile.png'),
        });
        Alert.alert('Error', 'Error on upload image');
      });
  };
  uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error('Error on upload image'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={this.changeImage}>
          {this.state.upload ? (
            <ActivityIndicator size="large" />
          ) : (
            <Image
              source={this.state.imageSource}
              style={{
                height: 110,
                width: 110,
                marginBottom: 10,
                resizeMode: 'cover',
                borderRadius: 110,
              }}
            />
          )}
        </TouchableOpacity>
        <Text style={{fontSize: 20}}>{User.phone}</Text>

        <TextInput
          style={styles.input}
          keyboardType="default"
          autoCapitalize="none"
          textAlign="center"
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />
        <TouchableOpacity onPress={this.changeName}>
          <Text style={styles.text}>Change Name</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._logut}>
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
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
  text: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    width: '80%',

    margin: 10,
    padding: 8,
    color: 'black',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
    borderColor: '#ccc',
  },
});
