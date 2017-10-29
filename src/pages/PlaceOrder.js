import React, { Component } from 'react';
import {
    View,Dimensions,Image,Picker,ActivityIndicator,
    Text,TextInput,TouchableOpacity,ScrollView
} from 'react-native';
import theme from '../style/theme';
import style,{height,width} from '../style';
import products from '../constants/products'
import quantities from '../constants/quantities'
import {getAllProducts} from '../actions/product'
import {pushOrder} from '../actions/order'
//TODO get products from DB

class PlaceOrder extends Component {
  constructor(props){
      super(props)
      this.state={items:[{name:'',qty:0,unit:'kg'}],products:[],order:{}}
  }
  addItem(){
      this.state.items.push({name:'',qty:0,unit:'kg'})
      this.setState(this.state)
  }
  componentWillMount(){
    this.props.screenProps.progress.show()
  }
  componentDidMount(){
    getAllProducts
    .then(data=>{
        this.state.products=data
        this.setState(this.state)
        this.props.screenProps.progress.finish()
    })
    .catch(data=>alert(data))
  }
  placeOrder(){
    this.props.screenProps.progress.show()
    this.state.order.items=this.state.items
    this.state.order.status=0
    pushOrder(this.state.order).then(()=>{
        alert("Order Placed")
        this.props.screenProps.progress.finish()
    })
  }
  render() {
        return(
        <ScrollView>
            <View style={{height:50,width,backgroundColor:theme.secondary,flexDirection:'row'}}>
                <Text onPress={()=>this.props.navigation.goBack()} style={{fontSize:30,color:'white',fontWeight:'500',marginLeft:10}}>{'←'}</Text>
                <Text style={{fontSize:20,color:'white',fontWeight:'500',margin:10}}>Place Order</Text>
                <TouchableOpacity 
                    onPress={
                        this.placeOrder.bind(this)}
                    style={{width:80,height:30,backgroundColor:theme.accent,borderRadius:5,position:'absolute',right:15,top:15,justifyContent:'center'}}>
                    <Text style={{color:'white',textAlign:'center',fontWeight:'700',fontSize:12}}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
            <View style={[style.container,{justifyContent:'flex-start'}]}>
                <View style={{alignItems:'center',marginBottom:20,backgroundColor:theme.secondary,elevation:5,padding:10,paddingHorizontal:20,borderRadius:10,width:width+10}}>
                    <View style={{alignItems:'flex-start',width:'100%'}}>
                        <TextInput
                            style={{width:width-50,fontSize:16,paddingLeft:10,color:'white'}}
                            underlineColorAndroid={'white'}
                            placeholder={'Family Name'}
                            placeholderTextColor={'whitesmoke'}
                            onChangeText={value=>this.state.order.familyName=value}
                        />
                        <TextInput
                            style={{width:width-50,fontSize:16,paddingLeft:10,color:'white'}}
                            underlineColorAndroid={'white'}
                            placeholder={'Due Date (yyyy/mm/dd)'}
                            placeholderTextColor={'whitesmoke'}
                            onChangeText={value=>this.state.order.dueDate=value}
                        />
                        <TextInput
                            style={{width:width-50,fontSize:16,paddingLeft:10,color:'white'}}
                            underlineColorAndroid={'white'}
                            placeholder={'Telephone Number'}
                            placeholderTextColor={'whitesmoke'}
                            keyboardType={'numeric'}
                            onChangeText={value=>this.state.order.telephone=value}
                        />
                        <TextInput
                            style={{width:width-50,textAlignVertical:'top',fontSize:16,height:70,paddingLeft:10,color:'white'}}
                            underlineColorAndroid={'white'}
                            placeholder={'Delivery Address'}
                            multiline={true}
                            placeholderTextColor={'whitesmoke'}
                            onChangeText={value=>this.state.order.deliveryAddress=value}
                        />
                        <View style={{flexDirection:'row',marginVertical:10,flex:1}}>
                            <TouchableOpacity style={{flex:0.33,borderRadius:20,backgroundColor:'white',marginHorizontal:10,height:25,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:theme.accent}}>1.5 kg</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:0.33,borderColor:'white',backgroundColor:'rgba(255,255,255,0.3)',borderWidth:2,borderRadius:20,marginHorizontal:10,height:25,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:theme.accent}}>3 kg</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:0.33,borderColor:'white',backgroundColor:'rgba(255,255,255,0.3)',borderWidth:2,borderRadius:20,marginHorizontal:10,height:25,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:theme.accent}}>5 kg</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{margin:20}}>
                    {this.state.items.map(function(item,i){
                    return <View key={i} style={{alignItems:'center',marginBottom:20,backgroundColor:'white',padding:10,paddingHorizontal:20,borderRadius:10,width:width-40,elevation:5}}>
                            <Picker
                                onValueChange={value=>{this.state.items[i].name=value;this.setState(this.state)}}
                                selectedValue={this.state.items[i].name}
                                style={{height:40,width:'100%'}}>
                                {this.state.products.map(function(p){
                                    return <Picker.Item key={p.name} label={p.name} value={p.name} color={theme.accent}/>
                                })}
                            </Picker>
                            <View style={{flexDirection:'row',alignItems:'flex-start',width:'100%'}}>
                                <TextInput
                                    style={{width:60,fontSize:14,color:theme.accent}}
                                    underlineColorAndroid={'rgba(255,255,255,0.5)'}
                                    placeholder={'0'}
                                    keyboardType={"numeric"}
                                    placeholderTextColor={theme.accent}
                                    onChangeText={value=>this.state.items[i].qty=value}
                                />
                                <Picker
                                    onValueChange={value=>{this.state.items[i].unit=value;this.setState(this.state)}}
                                    selectedValue={this.state.items[i].unit}
                                    style={{height:40,width:100}}>
                                    {quantities.map(function(q){
                                        return <Picker.Item key={q} label={q} value={q} color={theme.accent}/>
                                    })}
                                </Picker>
                                <TouchableOpacity style={{width:60,height:20,backgroundColor:'#e74c3c',borderRadius:5,position:'absolute',right:0,top:20}}>
                                    <Text style={{color:'white',textAlign:'center',fontWeight:'700',fontSize:12}}>DELETE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }.bind(this))}
                    <View style={{width:width-40,height:40,backgroundColor:theme.accent,borderRadius:5,elevation:5,marginBottom:30}}>
                        <TouchableOpacity
                            onPress={this.addItem.bind(this)}>
                            <Text style={{color:'white',textAlign:'center',fontWeight:'700',fontSize:18,marginTop:5}}>➕ ADD MORE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
  }
}

export default PlaceOrder;