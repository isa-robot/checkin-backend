import EtherealConfig from "@shared/container/providers/Nodemailer/config/EtherealConfig";
import SesConfig from "@shared/container/providers/Nodemailer/config/SesConfig";

const isValidSmtpOrSes = async (mailer: EtherealConfig | SesConfig) => {
  const mail = await mailer.sendMail("test@hotmail.com")
  return mail

}

export default isValidSmtpOrSes
