import React, { Component } from 'react';
import {
    View,Dimensions,Image,Picker,ActivityIndicator,
    Text,TextInput,TouchableOpacity,ScrollView
} from 'react-native';
import theme from '../style/theme';
import style,{height,width} from '../style';
import quantities from '../constants/quantities'
import {getOrderById,updateOrder} from '../actions/order'
import {getAllFarmers} from '../actions/farmer'
import {sendSMS} from '../actions/sms'
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
var Spinner = require('rn-spinner');

class OrderProgress extends Component {
  constructor(props) {
    super(props)
    // this.state={orders:[], order:{items:[]}, farmers:[]}
  }

  render(){
    return(
    <ScrollView>
      <View style={style.container}></View>
    </ScrollView>
  )}
}

export default OrderProgress;