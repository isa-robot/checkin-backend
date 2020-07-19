import CreateMailerEtherealService from "@shared/container/providers/MailsProvider/services/CreateMailerEtherealService";
import CreateMailerSesService from "@shared/container/providers/MailsProvider/services/CreateMailerSesService";

const createMailerServiceFactory = (type: string) => {
  if(type == 'ethereal')
    return CreateMailerEtherealService
  else if(type == 'ses')
    return CreateMailerSesService
  else
    return {} as any
}
export default createMailerServiceFactory
