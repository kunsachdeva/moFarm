import React, { Component } from 'react';
import {
    View,Dimensions,Image,Picker,ActivityIndicator,
    Text,TextInput,TouchableOpacity,ScrollView
} from 'react-native';

import theme from '../style/theme';
import style,{height,width} from '../style';
import GeneralStyles from '../style/general';

import {getAllFarmers} from '../actions/farmer';
import quantities from '../constants/quantities';


class ListFarmers extends Component {
  constructor(props) {
    super(props)
    this.state={farmers: this.props.navigation.state.params.farmers}
  }

  componentWillMount(){
    this.props.screenProps.progress.show()
  }

  componentDidMount(){
    this.props.screenProps.progress.finish()
  }


  render(){
    return(
      <ScrollView>
        <View style={{height:50,width,backgroundColor:theme.secondary,flexDirection:'row'}}>
          <Text onPress={()=>this.props.navigation.goBack()} style={{fontSize:30,color:'white',fontWeight:'500',marginLeft:10}}>{'←'}</Text>
          <Text style={{fontSize:20,color:'white',fontWeight:'500',margin:10}}>Orders</Text>
        </View>
        <View style={style.container}>
          <View>{this.state.farmers.map((farmer, f) => {
            return(
              <View key={f} style={GeneralStyles.box}>
              <View style={GeneralStyles.horizontalBox}>
              <Text>{this.state.farmers[f].name}</Text>
              <Text>{this.state.farmers[f].telephone}</Text>
              <Text>{this.state.farmers[f].location}</Text>
              </View>
              </View>
              )})}
          </View>
        </View>
      </ScrollView>
      )
  }

}

  export default ListFarmers;