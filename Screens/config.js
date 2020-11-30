import Firebase from 'firebase';
const firebaseConfig = {
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

export default Firebase.initializeApp(firebaseConfig);
