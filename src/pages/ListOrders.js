import React, { Component } from 'react';
import {
    View,Dimensions,Image,Picker,ActivityIndicator,
    Text,TextInput,TouchableOpacity,ScrollView,TouchableWithoutFeedback
} from 'react-native';
import theme from '../style/theme';
import style,{height,width} from '../style';
import quantities from '../constants/quantities'
import {getAllOrders} from '../actions/order'
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
//TODO get products from DB

class ListOrders extends Component {
  constructor(props){
      super(props)
      this.state={
        orders:[],
        index: 0,
        routes: [
            { key: '1', title: 'New' },
            { key: '2', title: 'Active' },
            { key: '3', title: 'Ready for Pickup' },
        ],
    }
  }
  componentWillMount(){
    this.props.screenProps.progress.show()
  }
  componentDidMount(){
    getAllOrders
    .then(data=>{
        this.state.orders=data
        this.setState(this.state)
        this.props.screenProps.progress.finish()
    })
    .catch(data=>alert(data))
  }
    _handleChangeTab = (index) => {
        this.setState({ index });
    };
    getStatusText(status){
        switch(status){
            case 1:return 'Waiting for farmers';
            case 2:return 'Farmers are ready';
            default: return '';
        }
    }
    _renderScene = ({ route }) => {
        switch (route.key) {
        case '1':
            return <ScrollView><View style={[style.container,{justifyContent:'flex-start',minHeight:height,marginBottom:50}]}>
                <View style={{margin:20}}>
                    {this.state.orders.filter(o=>o.status==0).map(function(order,i){
                    return (
                <TouchableWithoutFeedback key={i} onPress={()=>this.props.navigation.navigate('allocateOrder',{id:order.objectId})}>
                    <View onPress={()=>alert(0)} style={{marginBottom:20,flexDirection:'row',backgroundColor:'white',padding:10,borderRadius:10,width:width-40,elevation:5}}>
                        <View style={{width:80,alignContent:'center',borderRightColor:'whitesmoke',borderRightWidth:1,marginRight:5}}>
                            <Text style={{textAlign:'center',fontWeight:'800',fontSize:44}}>{new Date(order.dueDate).toDateString().split(' ')[2]}</Text>
                            <Text style={{textAlign:'center',fontSize:24}}>{new Date(order.dueDate).toDateString().split(' ')[1]}</Text>
                            <Text style={{textAlign:'center',fontSize:14}}>{new Date(order.dueDate).toDateString().split(' ')[3]}</Text>
                            <Text style={{textAlign:'center',fontSize:14,fontWeight:'900',marginTop:20}}>Telephone</Text>
                            <Text style={{textAlign:'center',fontSize:14,marginBottom:20}}>{order.telephone}</Text>
                            <Text style={{textAlign:'center',fontSize:14,fontWeight:'900'}}>Address</Text>
                            <Text style={{textAlign:'center',fontSize:14,marginBottom:20}}>{order.deliveryAddress}</Text>
                        </View>
                        <View style={{justifyContent:'center',alignContent:'center',width:'100%'}}>
                        {order.items.map(function(item,i){
                        return <View key={i} style={{flex:1,flexDirection:'row',marginVertical:10}}>
                            <View style={{flex:0.5}}>
                                <Text>{item.name}</Text>
                            </View>
                            <View style={{flex:0.5}}>
                                <Text>{item.qty+' '+item.unit}</Text>
                            </View>
                        </View>
                        })}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                    )}.bind(this))}
                </View>
            </View></ScrollView>;
        case '2':
        return <ScrollView><View style={[style.container,{justifyContent:'flex-start',minHeight:height,marginBottom:50}]}>
        <View style={{margin:20}}>
            {this.state.orders.filter(o=>o.status>0 && o.status<99).map(function(order,i){
            return (
        <TouchableWithoutFeedback key={i} onPress={()=>this.props.navigation.navigate('orderProgress')}>
            <View onPress={()=>alert(0)} style={{marginBottom:20,flexDirection:'row',backgroundColor:'white',padding:10,borderRadius:10,width:width-40,elevation:5}}>
                <View style={{width:80,alignContent:'center',borderRightColor:'whitesmoke',borderRightWidth:1,marginRight:5}}>
                    <Text style={{textAlign:'center',fontWeight:'800',fontSize:44}}>{new Date(order.dueDate).toDateString().split(' ')[2]}</Text>
                    <Text style={{textAlign:'center',fontSize:24}}>{new Date(order.dueDate).toDateString().split(' ')[1]}</Text>
                    <Text style={{textAlign:'center',fontSize:14}}>{new Date(order.dueDate).toDateString().split(' ')[3]}</Text>
                    <Text style={{textAlign:'center',fontSize:14,fontWeight:'900',marginTop:20}}>Telephone</Text>
                    <Text style={{textAlign:'center',fontSize:14,marginBottom:20}}>{order.telephone}</Text>
                    <Text style={{textAlign:'center',fontSize:14,fontWeight:'900'}}>Address</Text>
                    <Text style={{textAlign:'center',fontSize:14,marginBottom:20}}>{order.deliveryAddress}</Text>
                </View>
                <View style={{alignContent:'center',width:'100%'}}>
                <Text>{this.getStatusText(order.status)}</Text>
                <View style={{width:width-150,height:10,borderRadius:30,backgroundColor:'lightgrey'}}>
                    
                </View>
                <View style={{height:10,borderRadius:30,backgroundColor:theme.accent,position:'relative',top:-10,width:(width-150)*(order.status-1)}}>
                    
                </View>
                {order.items.map(function(item,i){
                return <View key={i}>
                <View style={{flex:1,flexDirection:'row',marginVertical:10}}>
                    <View style={{flex:0.5}}>
                        <Text style={{fontWeight:'800'}}>{item.name}</Text>
                    </View>
                    <View style={{flex:0.5}}>
                        <Text style={{fontWeight:'800'}}>{item.qty+' '+item.unit}</Text>
                    </View>
                </View>
                {item.farmers.map(function(farmer,i){
                    return <View key={i} style={{flex:1,flexDirection:'row',marginVertical:10}}>
                    <View style={{flex:0.5}}>
                        <Text>{farmer.name}</Text>
                    </View>
                    <View style={{flex:0.5}}>
                        <Text>{farmer.qty+' '+item.unit}</Text>
                    </View>
                </View>
                })}
            </View>
                })}
                </View>
            </View>
        </TouchableWithoutFeedback>
            )}.bind(this))}
        </View>
    </View></ScrollView>;
        case '3':
        return <ScrollView><View style={[style.container,{justifyContent:'flex-start',minHeight:height,marginBottom:50}]}>
        <View style={{margin:20}}>
            {this.state.orders.filter(o=>o.status==100).map(function(order,i){
            return (
        <TouchableWithoutFeedback key={i} onPress={()=>this.props.navigation.navigate('allocateOrder',{id:order.objectId})}>
            <View onPress={()=>alert(0)} style={{marginBottom:20,flexDirection:'row',backgroundColor:'white',padding:10,borderRadius:10,width:width-40,elevation:5}}>
                <View style={{width:80,alignContent:'center',borderRightColor:'whitesmoke',borderRightWidth:1,marginRight:5}}>
                    <Text style={{textAlign:'center',fontWeight:'800',fontSize:44}}>{new Date(order.dueDate).toDateString().split(' ')[2]}</Text>
                    <Text style={{textAlign:'center',fontSize:24}}>{new Date(order.dueDate).toDateString().split(' ')[1]}</Text>
                    <Text style={{textAlign:'center',fontSize:14}}>{new Date(order.dueDate).toDateString().split(' ')[3]}</Text>
                    <Text style={{textAlign:'center',fontSize:14,fontWeight:'900',marginTop:20}}>Telephone</Text>
                    <Text style={{textAlign:'center',fontSize:14,marginBottom:20}}>{order.telephone}</Text>
                    <Text style={{textAlign:'center',fontSize:14,fontWeight:'900'}}>Address</Text>
                    <Text style={{textAlign:'center',fontSize:14,marginBottom:20}}>{order.deliveryAddress}</Text>
                </View>
                <View style={{justifyContent:'center',alignContent:'center',width:'100%'}}>
                {order.items.map(function(item,i){
                return <View key={i} style={{flex:1,flexDirection:'row',marginVertical:10}}>
                    <View style={{flex:0.5}}>
                        <Text>{item.name}</Text>
                    </View>
                    <View style={{flex:0.5}}>
                        <Text>{item.qty+' '+item.unit}</Text>
                    </View>
                </View>
                })}
                </View>
            </View>
        </TouchableWithoutFeedback>
            )}.bind(this))}
        </View>
    </View></ScrollView>;
        default:
            return null;
        }
    };
  
    _renderHeader = props => {
        return (
          <TabBar
            {...props}
            // scrollEnabled
            style={{backgroundColor: theme.secondary}}
            tabWidth={100}
          />
        );
    }    

    addFarmer(){
        this.props.navigation.navigate('addFarmer')
    }

  render() {
        return(
        <View>
            <View style={{height:50,width,backgroundColor:theme.secondary,flexDirection:'row'}}>
                <Text onPress={()=>this.props.navigation.goBack()} style={{fontSize:30,color:'white',fontWeight:'500',marginLeft:10}}>{'←'}</Text>
                <Text style={{fontSize:20,color:'white',fontWeight:'500',margin:10}}>Orders</Text>
                <TouchableOpacity 
                    onPress={this.addFarmer.bind(this)}
                    style={{width:100,height:30,backgroundColor:theme.accent,borderRadius:5,position:'absolute',right:15,top:15,justifyContent:'center'}}>
                    <Text style={{color:'white',textAlign:'center',fontWeight:'700',fontSize:12}}>ADD FARMER</Text>
                </TouchableOpacity>
            </View>
            <TabViewAnimated
                style={{flex:1,minHeight:height}}
                navigationState={this.state}
                renderScene={this._renderScene}
                onIndexChange={this._handleChangeTab}
                renderHeader={this._renderHeader}
            />
        </View>
    );
  }
}

export default ListOrders;