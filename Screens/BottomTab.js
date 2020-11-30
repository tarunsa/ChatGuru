// import React from 'react';
// import {createAppContainer, createSwitchNavigator} from 'react-navigation';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
// import {Icon} from 'react-native-elements';
// import {View, Text, Button} from 'react-native';
// import Home from './Home';
// import Profile from './Profile';
// import {color} from 'react-native-reanimated';
// class BottomTab extends React.Component {
//   render() {
//     return (
//       <View>
//         <Text>HEllO</Text>
//       </View>
//     );
//   }
// }
// const TabNavigator = createMaterialBottomTabNavigator({
//   Home: {
//     screen: Home,
//     navigationOptions: {
//       tabBarLabel: 'Home',
//       activeColor: '#ff0000',
//       inactiveColor: '#00000',
//       barStyle: {backgroundColor: '#67baf6'},
//       tabBarIcon: () => (
//         <View>
//           <Icon name={'home'} size={25} style={{color: '#ff0000'}} />
//         </View>
//       ),
//     },
//   },
//   Profile: {
//     screen: Profile,
//     navigationOptions: {
//       tabBarLabel: 'Profile',
//       activeColor: '#ff0000',
//       inactiveColor: '#00000',
//       barStyle: {backgroundColor: '#67baf6'},
//       tabBarIcon: () => (
//         <View>
//           <Icon name={'settings'} size={25} style={{color: '#ff0000'}} />
//         </View>
//       ),
//     },
//   },
// });
// export default createAppContainer(TabNavigator);
// // export default BottomTab;

import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';
import {Image} from 'react-native';
import Home from './Home';
// import Friends from '../Screens/Friends'
import Chat from './Chat';

const bottomTabIcon = (options, TabImage) => {
  const {focused, tintColor} = options;
  return <TabImage />;
};

// export const HomeStack = createStackNavigator({
//   Home: {
//     screen: Home,
//     //navigationOptions: (options) => NavigationScanOptions(options, "Multiple scan games")
//   },
// });

export const BottomStack = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => {
        return {
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('./assets/user.png')}
                style={{height: 17, width: 21}}
              />
            ) : (
              <Image
                source={require('./assets/user.png')}
                style={{height: 17, width: 21}}
              />
            ),
          tabBarLabel: 'Home',
        };
      },
    },
    // Friends:{screen:Friends,
    //     navigationOptions: ({navigation}) => {
    //         return {
    //             tabBarIcon:
    //                 ({ focused }) =>  (
    //                     focused ? <Image source={require( '../../assets/Imagepng/friendsimage2.png')} style={{height:18, width:30}}  />
    //                     : <Image source={require( '../../assets/Imagepng/ActiveFriend2.png')} style={{height:18, width:30}}  />

    //                  ),

    //         }
    //     }
    // },
    Chat: {
      screen: Chat,
      navigationOptions: ({navigation}) => {
        return {
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('./assets/user.png')}
                style={{height: 18, width: 22}}
              />
            ) : (
              <Image
                source={require('./assets/user.png')}
                style={{height: 18, width: 22}}
              />
            ),
        };
      },
    },
    // Notifications:{screen:Notifications,
    //     navigationOptions: ({navigation}) => {
    //         return {
    //             tabBarIcon:
    //                 ({ focused }) =>  (
    //                     focused ? <Image source={require( '../../assets/Imagepng/ActiveNotification2.png')}style={{height:20, width:17}}  />
    //                     : <Image source={require( '../../assets/Imagepng/notificationimage2.png')}style={{height:20, width:17}}   />

    //                  )
    //         }
    //     }
    // },
    // Menu:{screen:Menu,
    //     navigationOptions: ({navigation}) => {
    //         return {
    //             tabBarIcon:
    //                 ({ focused }) =>  (
    //                     focused ? <Image source={require( '../../assets/Imagepng/activemenu2.png')} style={{height:20, width:20}} />
    //                     : <Image source={require( '../../assets/Imagepng/menuimage2.png')} style={{height:20, width:20}}  />

    //                  )
    //         }
    //     }
    // }
  },
  {
    tabBarOptions: {
      activeTintColor: '#80232A',
      inactiveTintColor: '#8C8C8C',
      labelStyle: {
        fontSize: 12,
      },
    },
    mode: 'screen',
    initialRouteName: 'Home',
    defaultNavigationOptions: ({navigation}) => ({
      // tabBarOnPress: ({ navigation, defaultHandler }) => {
      //   defaultHandler();
      // }
    }),
  },
);
