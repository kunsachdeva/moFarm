import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import App from './app'
import Progress from 'react-native-progressbar';
var {width,height}=Dimensions.get('window');

export default class moFarm extends Component {
    constructor(){
        super()
        this.state={}
    }
    componentDidMount(){
        this.state.progress=this.refs.progress
        this.setState(this.state)
    }
    render() {
      return (
        <View style={{height,width}}>
          <Progress ref={'progress'} title={'正在下载'}/>
          <App screenProps={{progress:this.state.progress}}/>
        </View>
      );
    }
  }