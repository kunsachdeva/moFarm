import React, { Component } from 'react';
import {
    View,Dimensions,Image,Picker,ActivityIndicator,
    Text,TextInput,TouchableOpacity,ScrollView
} from 'react-native';
import theme from '../style/theme';
import style,{height,width} from '../style';
import quantities from '../constants/quantities'
import {getAllOrders} from '../actions/order'
import {sendSMS} from '../actions/sms'
import GeneralStyles from '../style/general';
import Button from 'react-native-button';
import ButtonStyles from '../style/buttons';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
var Spinner = require('rn-spinner');
import {getAllFarmers} from '../actions/farmer'
import {getOrderById,updateOrder} from '../actions/order'

class OrderProgress extends Component {
  constructor(props) {
    super(props)
    this.state={orders:[], order:{items:[], status: 0}, farmers:[]}
  }

  componentWillMount(){
    this.props.screenProps.progress.show()
  }
  componentDidMount(){
    getOrderById(this.props.navigation.state.params.id).then(data=>{
      this.state.order=data
      this.setState(this.state)
      this.props.screenProps.progress.finish()
    })
    .catch(data=>console.warn(JSON.stringify(data)))
    // console.warn(JSON.stringify(this.state.order))
  }

  circleComplete() {
    if (this.state.order.status > 0) {
      return (
        <View>
        <View style={GeneralStyles.progressBoxCircleComplete}><Text style={{fontSize: 30, color: theme.secondary}}>&#10003;</Text></View>
        <Text style={{fontSize: 12, color: theme.secondary}}>Accepted</Text>
        </View>
    )} else {
      return (
        <View>
        <View style={GeneralStyles.progressBoxCircle}><Text style={{fontSize: 30, color: theme.secondary}}></Text></View>
        <Text style={{fontSize: 12, color: theme.fadedGrey}}>Accepted</Text>
        </View>
    )}
  }

  sendReminder(farmer, i) {
    console.warn(JSON.stringify(farmer))

    sendSMS(farmer.telephone, 'Step1', {date:this.state.order.dueDate,items:'blah'})
  }
    
  render(){
    return(
    <ScrollView>
      <View style={style.container}>
      <View style={{margin:20}}>{this.state.order.items.map((item,i)=>{
            return (
              <View key={i} style={GeneralStyles.box}>
                  <View style={GeneralStyles.horizontalBox}>
                  <Text style={GeneralStyles.title}>{item.name}</Text>
                  <Text style={GeneralStyles.title}>{item.qty+' '+item.unit}</Text>
                  </View>
                  <View>{item.farmers.map((farmer, f)=>{
                    return(
                      <View key={f}>
                      <View style={{marginTop: 30}}>
                      <View style={GeneralStyles.horizontalBox}>
                      <Text style={GeneralStyles.subtitle}>{farmer.name}</Text>
                      <Text style={GeneralStyles.subtitle}>{farmer.qty+ ' '+ item.unit}</Text>
                      </View>
                      <View style={GeneralStyles.progressBox}>
                      <View style={GeneralStyles.progressBoxItem}>{this.circleComplete()}
                      </View>
                      <View style={GeneralStyles.progressBoxItem}>
                      <View style={GeneralStyles.progressBoxCircle}></View>
                      <Text style={{fontSize: 12, color: theme.fadedGrey}}>Planted</Text>
                      </View>
                      <View style={GeneralStyles.progressBoxItem}>
                      <View style={GeneralStyles.progressBoxCircle}></View>
                      <Text style={{fontSize: 12, color: theme.fadedGrey}}>Harvested</Text>
                      </View>
                      <View style={GeneralStyles.progressBoxItem}>
                      <View style={GeneralStyles.progressBoxCircle}></View>
                      <Text style={{fontSize: 12, color: theme.fadedGrey}}>Packaged</Text>
                      </View>
                      <View style={GeneralStyles.progressBoxItem}>
                      <View style={GeneralStyles.progressBoxCircle}></View>
                      <Text style={{fontSize: 12, color: theme.fadedGrey}}>Ready</Text></View>
                      </View>
                      <View>
                      <Text>Reminders History:</Text>
                      <View style={GeneralStyles.horizontalBox}>
                      <Text>Date</Text>
                      <Text>Time</Text>
                      <Text>Reply</Text>
                      </View>
                      <View>{farmer.messageHistory.map((message, m)=> {
                        return(
                          <View key={m} style={GeneralStyles.horizontalBox}>
                          <Text>{message.date}</Text>
                          <Text>{message.time}</Text>
                          <Text>{message.reply}</Text>
                          </View>)
                      })}
                        
                      </View>
                      </View>
                      <Button containerStyle={GeneralStyles.button}
                        style={GeneralStyles.buttonText}
                        onPress={this.sendReminder(farmer, f)}>Send Reminder
                      </Button>
                      </View>
                      </View>)})}
                  </View>
                </View>
              )})}
      </View>
      </View>
    </ScrollView>
  )}
}

export default OrderProgress;