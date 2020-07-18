import {container} from "tsyringe";
import ListMailerService from "@messages/services/ListMailerService";
import mailerConfigFactory from "@messages/factory/mailerConfigFactory";
import MailerConfigSingleton from "@messages/singleton/MailerConfigSingleton";


const getMailerConfig = async() => {

  const listMailerService = container.resolve(ListMailerService)
  const mailer = await listMailerService.execute()

  if(mailer.type === "ethereal" || mailer.type === "ses") {
    const mailerEtherealConfig = mailerConfigFactory(mailer.type, mailer)
    MailerConfigSingleton.transporter = mailerEtherealConfig.transporter
    MailerConfigSingleton.config = mailerEtherealConfig.config
  }else if(!mailer) {
    throw new Error("email doesnt have a initial config")
  }else{
    throw new Error("wrong type")
  }
}

export default getMailerConfig
