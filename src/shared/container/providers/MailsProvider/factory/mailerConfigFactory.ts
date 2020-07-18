import EtherealConfig from "@shared/container/providers/MailsProvider/config/EtherealConfig";
import ICreateMailerEtherealConfigDTO from "@shared/container/providers/MailsProvider/dtos/ICreateMailerEtherealConfigDTO";
import ICreateMailerSesConfigDTO from '@shared/container/providers/MailsProvider/dtos/ICreateMailerSesConfigDTO'
import SesConfig from "@shared/container/providers/MailsProvider/config/SesConfig";

const mailerConfigFactory = (type: string, data: any) => {
  if(type == 'ethereal')
    return new EtherealConfig(data as ICreateMailerEtherealConfigDTO)
  else if(type == 'ses')
    return new SesConfig(data as ICreateMailerSesConfigDTO)
  else
    return {} as any
}
export default mailerConfigFactory
