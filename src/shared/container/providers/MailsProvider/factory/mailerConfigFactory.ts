import EtherealConfig from "@shared/container/providers/MailsProvider/config/EtherealConfig";
import IMailerEtherealConfigDTO from "@shared/container/providers/MailsProvider/dtos/IMailerEtherealConfigDTO";
import ICreateMailerSesConfigDTO from '@shared/container/providers/MailsProvider/dtos/IMailerSesConfigDTO'
import SesConfig from "@shared/container/providers/MailsProvider/config/SesConfig";

const mailerConfigFactory = (type: string, data: any) => {
  if(type == 'ethereal')
    return new EtherealConfig(data as IMailerEtherealConfigDTO)
  else if(type == 'ses')
    return new SesConfig(data as ICreateMailerSesConfigDTO)
  else
    return {} as any
}
export default mailerConfigFactory
