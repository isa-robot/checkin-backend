import {container} from "tsyringe";
import ListSmsConfigService from "@shared/container/providers/SmsProvider/services/ListSmsConfigService";
import SmsConfigSingleton from "@shared/container/providers/SmsProvider/singleton/SmsConfigSingleton";
import ISmsConfigDTO from "@shared/container/providers/SmsProvider/dtos/ISmsConfigDTO";

const getSmsConfig = async() => {

  const listSmsService = container.resolve(ListSmsConfigService)
  await listSmsService.execute()
    .then((sms)=>{
      if(sms){
        SmsConfigSingleton.setConfig(sms)
        SmsConfigSingleton.setIsActive(true)
      }else{
        SmsConfigSingleton.setConfig({} as ISmsConfigDTO)
        SmsConfigSingleton.setIsActive(false)
      }
    }).catch((e)=> {throw new Error(e)})
}

export default getSmsConfig
