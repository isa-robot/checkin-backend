import EtherealConfig from "@nodemailer/config/EtherealConfig";
import ICreateMailerEtherealConfigDTO from "@nodemailer/dtos/ICreateMailerEtherealConfigDTO";
import ICreateMailerSesConfigDTO from '@nodemailer/dtos/ICreateMailerSesConfigDTO'
import SesConfig from "@nodemailer/config/SesConfig";

const mailerConfigFactory = (type: string, data: any) => {
  if(type == 'ethereal')
    return new EtherealConfig(data as ICreateMailerEtherealConfigDTO)
  else if(type == 'ses')
    return new SesConfig(data as ICreateMailerSesConfigDTO)
  else
    return {} as any
}
export default mailerConfigFactory
