import {container} from "tsyringe";
import ListSmsConfigService from "@shared/container/providers/SmsProvider/services/ListSmsConfigService";
import SmsConfigSingleton from "@shared/container/providers/SmsProvider/singleton/SmsConfigSingleton";

const getSmsConfig = async() => {

  const listSmsService = container.resolve(ListSmsConfigService)
  await listSmsService.execute()
    .then((sms)=>{
      if(sms){
        SmsConfigSingleton.setConfig(sms)
        SmsConfigSingleton.isActive = true
      }else{
        SmsConfigSingleton.isActive = false
      }
    }).catch((e)=> {throw new Error(e)})
}

export default getSmsConfig
