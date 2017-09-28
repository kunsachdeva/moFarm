import AV from './index'
import {Farmer} from './initialState'

var query = new AV.Query('farmer');

var getAllFarmers=new Promise(
    (resolve, reject) => {
        query
        .find()
        .then(data=>resolve(JSON.parse(JSON.stringify(data))))
        .catch(data=>reject(data))
    }
);

var getFarmerById=(id)=>new Promise(
    (resolve, reject) => {
        query
        .get(id)
        .then(data=>resolve(JSON.parse(JSON.stringify(data))))
        .catch(data=>reject(data))
    }
);

var pushFarmer=(data)=>new Promise(
    (resolve, reject) => {
        var AVObject = AV.Object.extend('farmer');
        var obj = new AVObject();
        alert(Farmer)
        var keys=Object.keys(Farmer)
        keys.forEach((key)=>{
            obj.set(key,data[key])
        })

        obj.save()
        .then((obj)=> resolve(obj))
        .catch((error)=> reject(error))
    }
);

export {getAllFarmers,pushFarmer,getFarmerById}
