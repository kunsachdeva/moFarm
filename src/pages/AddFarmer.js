// abbyBranch test

import React, { Component } from 'react';
import {
    View,Dimensions,Image,TouchableNativeFeedback,
    Text,TextInput,TouchableOpacity,ScrollView
} from 'react-native';
import theme from '../style/theme';
import style,{height,width} from '../style';
import {pushFarmer} from '../actions/farmer'

class AddFarmer extends Component {
    constructor(){
        super()
        this.state={farmer:{}}
    }

    addFarmer(){
        this.props.screenProps.progress.show()        
        var objKeys=Object.keys(this.state.farmer)
        if(objKeys.length<3)alert("Please fill all information")
        else 
            pushFarmer(this.state.farmer)
            .then(()=>{alert('Added :)');this.props.screenProps.progress.finish();this.props.navigation.goBack(null)})
            .catch((e)=>alert(e))
    }
  render() {
    return(
        <ScrollView>
            <View style={{height:50,width,backgroundColor:theme.secondary,flexDirection:'row'}}>
                <Text onPress={()=>this.props.navigation.goBack(null)} style={{fontSize:30,color:'white',fontWeight:'500',marginLeft:10}}>{'←'}</Text>
                <Text style={{fontSize:20,color:'white',fontWeight:'500',margin:10}}>Add New Farmer</Text>
            </View>
            <View style={[style.container,{justifyContent:'flex-start',padding:20}]}>
                <View style={{alignItems:'center',marginBottom:20,backgroundColor:'white',padding:10,paddingHorizontal:20,borderRadius:10,width:width-40,elevation:5}}>
                <TextInput
                    style={{width:'100%',fontSize:14,color:theme.accent}}
                    underlineColorAndroid={'rgba(0,0,0,0.1)'}
                    placeholder={'Name'}
                    placeholderTextColor={theme.accent}
                    onChangeText={value=>this.state.farmer.name=value}
                />
                <TextInput
                    style={{width:'100%',fontSize:14,color:theme.accent}}
                    underlineColorAndroid={'rgba(0,0,0,0.1)'}
                    placeholder={'Telephone'}
                    keyboardType={"numeric"}
                    placeholderTextColor={theme.accent}
                    onChangeText={value=>this.state.farmer.telephone=value}
                />
                <TextInput
                    style={{width:'100%',fontSize:14,height:100,textAlignVertical:'top',color:theme.accent}}
                    underlineColorAndroid={'rgba(0,0,0,0.1)'}
                    placeholder={'Address'}
                    multiline
                    placeholderTextColor={theme.accent}
                    onChangeText={value=>this.state.farmer.location=value}
                />
                </View>
                <View style={{width:width-40,height:40,backgroundColor:theme.accent,borderRadius:5,elevation:5,marginBottom:30}}>
                    <TouchableOpacity
                        onPress={this.addFarmer.bind(this)}>
                        <Text style={{color:'white',textAlign:'center',fontWeight:'700',fontSize:18,marginTop:5}}>✓ DONE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
  }
}

export default AddFarmer;