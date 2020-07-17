import {container} from "tsyringe";
import ListMailerService from "@nodemailer/services/ListMailerService";
import mailerConfigFactory from "@nodemailer/factory/mailerConfigFactory";
import MailerConfigSingleton from "@nodemailer/singleton/MailerConfigSingleton";


const getMailerConfig = async() => {
  const listMailerService = container.resolve(ListMailerService)
  const mailer = await listMailerService.execute()

  if(mailer.type === "ethereal"){
    const mailerEtherealConfig = mailerConfigFactory(mailer.type, mailer)
    MailerConfigSingleton.transporter = mailerEtherealConfig.transporter
    MailerConfigSingleton.config = mailerEtherealConfig.config
    console.info("emails initialized")
  }else if(mailer.type === "ses"){
    const mailerSesConfig = mailerConfigFactory(mailer.type, mailer)
    MailerConfigSingleton.transporter = mailerSesConfig.transporter
    MailerConfigSingleton.config = mailerSesConfig.config
    console.info("emails initialized")
  }else if(!mailer) {
    return console.info("email doesnt have a config")
  }else{
    console.info("type doesnt exists")
  }
}

export default getMailerConfig
