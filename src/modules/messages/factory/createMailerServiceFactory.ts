import CreateMailerEtherealService from "@messages/services/CreateMailerEtherealService";
import CreateMailerSesService from "@messages/services/CreateMailerSesService";

const createMailerServiceFactory = (type: string) => {
  if(type == 'ethereal')
    return CreateMailerEtherealService
  else if(type == 'ses')
    return CreateMailerSesService
  else
    return {} as any
}
export default createMailerServiceFactory
