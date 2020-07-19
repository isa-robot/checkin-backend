import {container} from "tsyringe";
import ListMailerService from "@shared/container/providers/MailsProvider/services/ListMailerService";
import mailerConfigFactory from "@shared/container/providers/MailsProvider/factory/mailerConfigFactory";
import MailerConfigSingleton from "@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton";


const getMailerConfig = async() => {

  const listMailerService = container.resolve(ListMailerService)
  const mailer = await listMailerService.execute()
    .then((mail) => {
      if(mail){
        if(mail.type === "ethereal" || mail.type === "ses") {
          const mailerEtherealConfig = mailerConfigFactory(mail.type, mail)
          MailerConfigSingleton.setTransporter(mailerEtherealConfig.transporter)
          MailerConfigSingleton.setConfig(mailerEtherealConfig.config)
          MailerConfigSingleton.isActive = true
        }
      }else if(!mail) {
        MailerConfigSingleton.isActive = false
      }else{
        MailerConfigSingleton.isActive = false
      }
    }).catch((e)=> {
      throw new Error(e)
    })
}

export default getMailerConfig
