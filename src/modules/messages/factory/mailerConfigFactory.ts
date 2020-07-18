import EtherealConfig from "@messages/config/EtherealConfig";
import ICreateMailerEtherealConfigDTO from "@messages/dtos/ICreateMailerEtherealConfigDTO";
import ICreateMailerSesConfigDTO from '@messages/dtos/ICreateMailerSesConfigDTO'
import SesConfig from "@messages/config/SesConfig";

const mailerConfigFactory = (type: string, data: any) => {
  if(type == 'ethereal')
    return new EtherealConfig(data as ICreateMailerEtherealConfigDTO)
  else if(type == 'ses')
    return new SesConfig(data as ICreateMailerSesConfigDTO)
  else
    return {} as any
}
export default mailerConfigFactory
