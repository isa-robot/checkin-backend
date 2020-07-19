import {container} from "tsyringe";
import ListMailerService from "@shared/container/providers/MailsProvider/services/ListMailerService";
import mailerConfigFactory from "@shared/container/providers/MailsProvider/factory/mailerConfigFactory";
import MailerConfigSingleton from "@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton";


const getMailerConfig = async() => {

  const listMailerService = container.resolve(ListMailerService)
  const mailer = await listMailerService.execute()

  if(mailer.type === "ethereal" || mailer.type === "ses") {
    const mailerEtherealConfig = mailerConfigFactory(mailer.type, mailer)
    MailerConfigSingleton.setTransporter(mailerEtherealConfig.transporter)
    MailerConfigSingleton.setConfig(mailerEtherealConfig.config)
    MailerConfigSingleton.isActive = true
  }else if(!mailer) {
    MailerConfigSingleton.isActive = false
    throw new Error("email doesnt have a initial config")
  }else{
    MailerConfigSingleton.isActive = false
    throw new Error("error ocurred")
  }
}

export default getMailerConfig
