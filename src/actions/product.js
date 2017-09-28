import AV from './index'

var query = new AV.Query('product');

var getAllProducts=new Promise(
    (resolve, reject) => {
        query
        .select(['name'])
        .find()
        .then(data=>resolve(JSON.parse(JSON.stringify(data))))
        .catch(data=>reject(data))
    }
);

export {getAllProducts}
