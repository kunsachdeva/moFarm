import React, { Component } from 'react';
import {
    View,Dimensions,Image,TouchableNativeFeedback,
    Text,TextInput,TouchableOpacity,ScrollView
} from 'react-native';
import theme from '../style/theme';
import style,{height,width} from '../style';
import Button from 'react-native-button';
import ButtonStyles from '../style/buttons'

class Login extends Component {
  render() {
    return(
        <ScrollView>
            <View style={style.container}>
                <TouchableNativeFeedback
                    onPress={()=>this.props.navigation.navigate('listOrders')}
                    style={{height:100,width,justifyContent:'center'}}>
                    <Text style={{fontSize:50,textAlign:'center',color:theme.accent}}>moFarm</Text>
                </TouchableNativeFeedback>
                <View>
                    <TextInput
                        style={{width:width-50,fontSize:24,paddingLeft:10}}
                        underlineColorAndroid={'white'}
                        placeholder={'Username'}
                        placeholderTextColor={'whitesmoke'}
                    />
                    <TextInput
                        style={{width:width-50,fontSize:24,paddingLeft:10}}
                        underlineColorAndroid={'white'}
                        placeholder={'Password'}
                        placeholderTextColor={'whitesmoke'}
                        secureTextEntry={true}
                    />
                </View>
                <Button
                  onPress={() => this.props.navigation.navigate('placeOrder')}
                  title="PLace Order"
                  containerStyle={ButtonStyles.button}
                  style={ButtonStyles.buttonText}
                  >Place Order
                </Button>
                <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('listOrders')}
                    style={{backgroundColor:'white',elevation:10,position:'absolute',bottom:-120,width:width+50,height:200,marginTop:50,borderRadius:200}}>
                    <Text style={{fontSize:32,textAlign:'center',color:theme.accent,fontWeight:'900',marginTop:15}}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
  }
}

export default Login;