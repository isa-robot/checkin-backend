import {container} from "tsyringe";
import ListDestinatariesService from "@shared/container/providers/MailsProvider/services/ListDestinatariesService";
import GetMailerDestinataryByTypeService
  from "@shared/container/providers/MailsProvider/services/GetMailerDestinataryByTypeService";
import MailerDestinatariesSingleton
  from "@shared/container/providers/MailsProvider/singleton/MailerDestinatariesSingleton";
import IMailerDestinatariesDTO from "@shared/container/providers/MailsProvider/dtos/IMailerDestinatariesDTO";

const getMailerDestinataries = async() => {

  const types = {
    suport: "suport",
    usersNotApproved: "usersNotApproved"
  }

  const mailerDestinataryByTypeService = container.resolve(GetMailerDestinataryByTypeService)
  const suport = await mailerDestinataryByTypeService.execute({type: types.suport})

  if (suport){
    MailerDestinatariesSingleton.setSuport(suport)
    MailerDestinatariesSingleton.setSuportIsActive(true)
  }else{
    MailerDestinatariesSingleton.setSuport({} as IMailerDestinatariesDTO)
    MailerDestinatariesSingleton.setSuportIsActive(false)
  }
  const usersNotApproved = await mailerDestinataryByTypeService.execute({type: types.usersNotApproved})
  if(usersNotApproved){
    MailerDestinatariesSingleton.setUsersNotApproved(usersNotApproved)
    MailerDestinatariesSingleton.setUsersNotApprovedIsActive(true)
  }else{
    MailerDestinatariesSingleton.setUsersNotApproved({} as IMailerDestinatariesDTO)
    MailerDestinatariesSingleton.setUsersNotApprovedIsActive(false)
  }
}

export default getMailerDestinataries
