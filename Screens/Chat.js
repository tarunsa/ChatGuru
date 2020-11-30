import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  AsyncStorage,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  Animated,
  Platform,
  FlatList,
} from 'react-native';
import User from './User';
import Firebase from 'firebase';
import firebase from './config';
const isAndroid = Platform.OS === 'android';

export default class Chat extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('name', null),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: props.navigation.getParam('name'),
        phone: props.navigation.getParam('phone'),
      },
      textMessage: '',
      messageList: [],
      dbRef: firebase.database().ref('messages'),
    };
    this.keyboardHeight = new Animated.Value(0);
    this.bottomPadding = new Animated.Value(60);
  }
  componentDidMount() {
    this.keyboardShowListener = Keyboard.addListener(
      isAndroid ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => this.KeyboardEvent(e, true),
    );
    this.keyboardHideListener = Keyboard.addListener(
      isAndroid ? 'keyboardWillHide' : 'keyboardDidHide',
      (e) => this.KeyboardEvent(e, false),
    );
    this.state.dbRef
      .child(User.phone)
      .child(this.state.person.phone)
      .on('child_added', (value) => {
        this.setState((prevState) => {
          return {
            messageList: [...prevState.messageList, value.val()],
          };
        });
      });
  }
  componentWillUnMount() {
    this.state.dbRef.off();
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }
  KeyboardEvent = (event, isShow) => {
    let heightOs = isAndroid ? 60 : 100;
    let bottomOs = isAndroid ? 120 : 140;
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: isShow ? heightOs : 0,
      }),
      Animated.timing(this.bottomPadding, {
        duration: event.duration,
        toValue: isShow ? bottomOs : 80,
      }),
    ]).start();
  };

  handleChange = (key) => (val) => {
    this.setState({[key]: val});
  };
  convertTime = (time) => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes < 10 ? '0' : '') + d.getMinutes();
    if (c.getDay() !== d.getDay()) {
      result = d.getDay() + '' + d.getMonth() + '' + result;
    }
    return result;
  };
  sendMessage = async () => {
    if (this.state.textMessage.length > 0) {
      let msgId = this.state.dbRef
        .child(User.phone)
        .child(this.state.person.phone)
        .push().key;
      let updates = {};
      let message = {
        message: this.state.textMessage,
        time: Firebase.database.ServerValue.TIMESTAMP,
        from: User.phone,
      };
      updates[
        User.phone + '/' + this.state.person.phone + '/' + msgId
      ] = message;
      updates[
        this.state.person.phone + '/' + User.phone + '/' + msgId
      ] = message;
      this.state.dbRef.update(updates);
      this.setState({textMessage: ''});
    }
  };
  renderRow = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          maxWidth: '60%',
          alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start',
          backgroundColor: item.from === User.phone ? '#00897b' : '#7cb342',
          borderRadius: 10,
          marginBottom: 10,
        }}>
        <Text style={{color: '#fff', padding: 7, fontSize: 16}}>
          {item.message}
        </Text>
        <Text style={{color: '#eee', padding: 3, fontSize: 12}}>
          {this.convertTime(item.time)}
        </Text>
      </View>
    );
  };
  render() {
    let {height} = Dimensions.get('window');
    return (
      <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <Animated.View
          style={[styles.bottomBar, {bottom: this.keyboardHeight}]}>
          <TextInput
            style={styles.input}
            placeholder="type message..."
            value={this.state.textMessage}
            onChangeText={this.handleChange('textMessage')}
          />
          <TouchableOpacity style={styles.btn} onPress={this.sendMessage}>
            <Text style={styles.btntext}>Send</Text>
          </TouchableOpacity>
        </Animated.View>
        <FlatList
          ref={(ref) => {
            this.flatList = ref;
          }}
          onContentSizeChange={() =>
            this.flatList.scrollToEnd({animated: true})
          }
          onLayout={this.flatList.scrollToEnd({animated: true})}
          style={{paddingTop: 5, paddingHorizontal: 5}}
          data={this.state.messageList}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<Animated.View style={{height: this.bottom}} />}
        />
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width: 280,
    height: 50,
    backgroundColor: '#ccc',
    margin: 10,
    marginLeft: 10,
    padding: 10,

    borderRadius: 30,
    fontSize: 18,
    fontWeight: '500',
    borderColor: '#42A5F5',
  },
  btntext: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: 'blue',
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    padding: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    height: 60,
  },
});
