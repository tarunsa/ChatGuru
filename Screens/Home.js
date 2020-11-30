import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import User from './User';
import firebase from './config';
import AuthLoadingScreen from './AuthLoadingScreen';
export default class Home extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Chats',
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('./assets/profile.png')}
            style={{height: 40, width: 40, marginRight: 10, borderRadius: 20}}
          />
        </TouchableOpacity>
      ),
    };
  };
  state = {
    users: [],
    dbRef: firebase.database().ref('users'),
  };
  componentDidMount() {
    this.state.dbRef.on('child_added', (val) => {
      let person = val.val();
      person.phone = val.key;
      if (person.phone === User.phone) {
        User.name = person.name;
        User.image = person.image ? person.image : null;
      } else {
        this.setState((prevState) => {
          return {
            users: [...prevState.users, person],
          };
        });
      }
    });
  }
  componentWillUnMount() {
    this.state.dbRef.off();
  }
  renderRow = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Chat', item)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
        }}>
        <Image
          source={
            item.image ? {uri: item.image} : require('./assets/profile.png')
          }
          style={{
            width: 32,
            marginRight: 5,
            height: 32,
            resizeMode: 'cover',
            borderRadius: 32,
          }}
        />
        <Text style={{fontSize: 20}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={(item) => item.phone}
          // ListHeaderComponent={() => <Text>Chats</Text>}
        />
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
});
