/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import Index from './src'
import Progress from 'react-native-progressbar';
var {width,height}=Dimensions.get('window');

export default class moFarm extends Component {
  render() {
    return (
        <Index/>
    );
  }
}

AppRegistry.registerComponent('moFarm', () => moFarm);
