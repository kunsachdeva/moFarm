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
//TODO get products from DB

class ListOrders extends Component {
  constructor(props){
      super(props)
      this.state={orders:[],order:{items:[]},farmers:[]}
  }
  componentWillMount(){
    this.props.screenProps.progress.show()
  }
  componentDidMount(){
    
    getAllFarmers
    .then(data=>{
        this.state.farmers=data
        getOrderById(this.props.navigation.state.params.id)
        .then(data=>{
            this.state.order=data
            for(var i=0;i<this.state.order.items.length;i++){
                this.state.order.items[i]["farmers"]=[
                {farmerId:this.state.farmers[this.state.farmers.length-1].objectId,
                 name:this.state.farmers[this.state.farmers.length-1].name,
                 telephone:this.state.farmers[this.state.farmers.length-1].telephone}]
            }
        this.setState(this.state)
        
    })
    this.props.screenProps.progress.finish()
    })
    .catch(data=>console.warn(JSON.stringify(data)))
  }
  processOrder(){
    var isValid=true
    this.state.order.items.forEach(function(item) {
        var qty=item.qty
        var qty_=0
        item.farmers.forEach(function(farmer) {
            qty_+=Number(farmer.qty)
        }, this);
        if(Number(qty_)!=Number(qty)){
            alert("Quantities don't match for "+item.name);
            isValid=false
        }
    }, this);
    if(isValid){
        this.state.order.status=1
        this.props.screenProps.progress.show()
        updateOrder(this.state.order)
        .then(()=>{
            this.state.order.items.forEach(function(item) {
                item.farmers.forEach(function(farmer) {
                    sendSMS(farmer.telephone,'Step1',{date:this.state.order.dueDate,items:item.name})
                }, this);
            }, this);
            alert("Saved!");
            this.props.navigation.goBack();
            this.props.screenProps.progress.finish()
        })
        .catch((e)=>alert(e))
    }
  }
  render() {
        return(
        <ScrollView>
            <View style={{height:50,width,backgroundColor:theme.secondary,flexDirection:'row'}}>
                <Text onPress={()=>this.props.navigation.goBack()} style={{fontSize:30,color:'white',fontWeight:'500',marginLeft:10}}>{'←'}</Text>
                <Text style={{fontSize:20,color:'white',fontWeight:'500',margin:10}}>Order</Text>
            </View>
            <View style={[style.container,{justifyContent:'flex-start',minHeight:height}]}>
            <View style={{margin:20}}>
            <View style={{alignItems:'center',marginBottom:20,backgroundColor:'white',padding:10,paddingHorizontal:20,borderRadius:10,width:width-40,elevation:5}}>
                {this.state.order.items.map(function(item,i){
                    return <View key={i} style={{width:'100%',marginVertical:10,borderBottomWidth:2,borderBottomColor:'whitesmoke'}}>
                                <Text>{item.name+' - '+item.qty+' '+item.unit}</Text>
                                <View style={{flexDirection:'row',alignItems:'center',marginVertical:10}}>
                                    <Text style={{fontSize:18,fontWeight:'bold',marginRight:10}}>Farmers</Text>
                                    <Spinner max={1}
                                        min={1}
                                        default={1}
                                        color="#f60"
                                        numColor="#f60"
                                        onNumChange={(num)=>{
                                            if(num>this.state.order.items[i]["farmers"].length)this.state.order.items[i].farmers.push({})
                                            else this.state.order.items[i]["farmers"].pop()
                                            this.setState(this.state)
                                        }}/>
                                </View>
                                {this.state.order.items[i].farmers.map(function(farmer,j) {
                                    return <View key={j} style={{flexDirection:'row'}}>
                                <Picker
                                    onValueChange={value=>{this.state.order.items[i].farmers[j].farmerId=value.split('|')[0];this.state.order.items[i].farmers[j].name=value.split('|')[1];this.state.order.items[i].farmers[j].telephone=value.split('|')[2];this.setState(this.state)}}
                                    selectedValue={this.state.order.items[i].farmers[j].farmerId+'|'+this.state.order.items[i].farmers[j].name+'|'+this.state.order.items[i].farmers[j].telephone}
                                    style={{height:40,width:'85%'}}>
                                    {this.state.farmers.map(function(f){
                                        return <Picker.Item key={f.objectId} label={f.name+' ('+f.telephone+')'} value={f.objectId+'|'+f.name+'|'+f.telephone} color={theme.accent}/>
                                    })}
                                </Picker>
                                <TextInput
                                    style={{width:60,fontSize:14,color:theme.accent}}
                                    underlineColorAndroid={'rgba(0,0,0,0.5)'}
                                    placeholder={'0'}
                                    keyboardType={"numeric"}
                                    placeholderTextColor={theme.accent}
                                    onChangeText={value=>this.state.order.items[i].farmers[j]["qty"]=value}
                                />
                            </View>
                                
                                }.bind(this))}
                        </View>
                }.bind(this))}
            </View>
            <View style={{width:width-40,height:40,backgroundColor:theme.accent,borderRadius:5,elevation:5,marginBottom:30}}>
                <TouchableOpacity
                    onPress={this.processOrder.bind(this)}>
                    <Text style={{color:'white',textAlign:'center',fontWeight:'700',fontSize:18,marginTop:5}}>✓ DONE</Text>
                </TouchableOpacity>
            </View>
        </View>
            </View>
        </ScrollView>
    );
  }
}

export default ListOrders;