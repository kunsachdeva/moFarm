import AV from './index'
import {Order} from './initialState'

var query = new AV.Query('order');

var pushOrder=(data)=>new Promise(
    (resolve, reject) => {
        var AVObject = AV.Object.extend('order');
        var obj = new AVObject();
        var keys=Object.keys(Order)
        keys.forEach((key)=>{
            obj.set(key,data[key])
        })

        obj.save()
        .then((obj)=> resolve(obj))
        .catch((error)=> reject(error))
    }
);


var getAllOrders=new Promise(
    (resolve, reject) => {
        query
        .find()
        .then(data=>{resolve(JSON.parse(JSON.stringify(data)));})
        .catch(data=>reject(data))
    }
);


var getOrderById=(id)=>new Promise(
    (resolve, reject) => {
        query
        .get(id)
        .then(data=>resolve(JSON.parse(JSON.stringify(data))))
        .catch(data=>reject(data))
    }
);


var updateOrder=(data)=>new Promise(
    (resolve, reject) => {
        var obj = AV.Object.createWithoutData('order',data.objectId);
        var keys=Object.keys(Order)
        keys.forEach((key)=>{
            obj.set(key,data[key])
        })
        obj.save()
        .then((obj)=> resolve(obj))
        .catch((error)=> reject(error))
    }
);

export {pushOrder,getAllOrders,getOrderById,updateOrder}