import React, { Component } from 'react';
import {
    View,Dimensions,Image,Picker,ActivityIndicator,
    Text,TextInput,TouchableOpacity,ScrollView,TouchableWithoutFeedback, 
} from 'react-native';
import theme from '../style/theme';
import style,{height,width} from '../style';
import quantities from '../constants/quantities'
import {getAllOrders} from '../actions/order'
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Button from 'react-native-button';
import ButtonStyles from '../style/buttons'

class Homepage extends Component {
  render() {
    return(
      <ScrollView>
      <View style={style.container}>
        <Button
          onPress={() => this.props.navigation.navigate('allocateOrder', {id:order.objectId})}
          title="Allocate Orders"
          containerStyle={ButtonStyles.button}
          style={ButtonStyles.buttonText}
          >Allocate Orders
        </Button>
        <Button
          onPress={() => this.props.navigation.navigate('listOrders')}
          title="Active Orders"
          containerStyle={ButtonStyles.button}
          style={ButtonStyles.buttonText}
          >Active Orders
        </Button>
        <Button
          onPress={() => this.props.navigation.navigate('allocateOrder')}
          title="Complete Orders"
          containerStyle={ButtonStyles.button}
          style={ButtonStyles.buttonText}
          >Complete Orders
        </Button>
        <Button
          onPress={() => this.props.navigation.navigate('addFarmer')}
          title="Add Farmer"
          containerStyle={ButtonStyles.button}
          style={ButtonStyles.buttonText}
          >Add Farmer
        </Button>
        </View>
        
      </ScrollView>

      );
  }
}
export default Homepage;