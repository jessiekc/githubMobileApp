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

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <AppStackNavigator />,
        <AppTabNavigator />
    );
  }
}

const AppTabNavigator = createBottomTabNavigator({
    Profile: Profile,
    Repositories: Repositories,
    Following: Following,
    Follower: Follower
});

const AppStackNavigator = createStackNavigator({
  Profile: Profile,
  Repositories: Repositories,
  Following: Following,
  Follower: Follower

})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#707070',
  },

});
