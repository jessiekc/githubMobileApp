/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
// https://www.youtube.com/watch?v=ocnxJtZ6JOg
// https://www.youtube.com/watch?v=A1MtUNujr9s
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {TabNavigator, createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import Profile from './components/Profile';
import Repositories from './components/Repositories';
import Following from './components/Following';
import Follower from './components/Follower';
import Home from './components/Home';
import Notification from './components/Notification';
import SearchUserList from './components/SearchUserList';
import SearchRepoList from './components/SearchRepoList';
export default class App extends Component<Props> {
  render() {
    return (
        <AppStackNavigator />
        // ,<AppTabNavigator />
    );
  }
}

// const AppTabNavigator = createBottomTabNavigator({
//     Home: {
//         screen: Home,
//         navigationOptions: {
//             tabBarLabel: 'Profile',
//             tabBarIcon: ({ tintColor }) => (<Icon name="ios-person" size={27} color={tintColor} />)
//         }
//     },
//     Repositories: {
//         screen: Repositories,
//         navigationOptions: {
//             tabBarLabel: 'Repositories',
//             tabBarIcon: ({ tintColor }) => (<Icon name="ios-list-box" size={30} color={tintColor}   />)
//         }
//     },
//     Following: {
//         screen: Following,
//         navigationOptions: {
//             tabBarLabel: 'Following',
//             tabBarIcon: ({ tintColor }) => (<Icon name="ios-contact" size={27} color={tintColor}  />)
//         }
//     },
//     Follower: {
//         screen: Follower,
//         navigationOptions: {
//             tabBarLabel: 'Follower',
//             tabBarIcon: ({ tintColor }) => (<Icon name="ios-contacts" size={27}  color={tintColor} />)
//         }
//     }
// });

const AppStackNavigator = createStackNavigator({
  Home: Home,
  Profile: Profile,
  Repositories: Repositories,
  Following: Following,
  Follower: Follower,
  Notification: Notification,
  SearchUserList: SearchUserList,
  SearchRepoList: SearchRepoList
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#707070',
  },

});
