import AV from './index'

sendSMS=(to,template,data)=>{
    AV.Cloud.requestSmsCode({
        mobilePhoneNumber:to,
        template,
        ...data
      }).then(function(){
        //发送成功
      }, function(err){
        //发送失败
      });
}

export {sendSMS}
