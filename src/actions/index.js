import leancloud from '../constants/leancloud'

var AV=require('leancloud-storage')

const appId = leancloud.appId;
const appKey = leancloud.appKey;
AV.init({ appId, appKey });

export default AV