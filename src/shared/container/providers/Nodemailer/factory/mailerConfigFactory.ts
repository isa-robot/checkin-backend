import EtherealConfig from "@shared/container/providers/Nodemailer/config/EtherealConfig";
import ICreateMailerEtherealConfigDTO from "@shared/container/providers/Nodemailer/dtos/ICreateMailerEtherealConfigDTO";
import ICreateMailerSesConfigDTO from '@shared/container/providers/Nodemailer/dtos/ICreateMailerSesConfigDTO'
import SesConfig from "@shared/container/providers/Nodemailer/config/SesConfig";

const mailerConfigFactory = (type: string, data: any) => {
  if(type == 'ethereal')
      return new EtherealConfig(data as ICreateMailerEtherealConfigDTO)
  else if(type == 'ses')
      return new SesConfig(data as ICreateMailerSesConfigDTO)
}
export default mailerConfigFactory
