import { Response, Request} from 'express'
import {container} from "tsyringe";
import ListEstablishmentsService from "@establishments/services/ListEstablishmentsService";
import SendMailToHealthDestinatary
  from "@shared/container/providers/MailsProvider/services/SendMailToHealthDestinatary";

class SendMailController {
  async toHealthDestinatary(req: Request, res: Response) {
    const {
      textMail
    } = req.body

    const {
      protocolName,
      protocolGenerationDate
    } = req.params

    //@ts-ignore
    const userId = req.kauth.grant.access_token.content.sub;

    const establishmentService = container.resolve(ListEstablishmentsService);

    const establishment = await establishmentService.execute()

    const sendMailToHealtDestinatary = container.resolve(SendMailToHealthDestinatary)
    const sendMail = sendMailToHealtDestinatary.execute({textMail, protocolName, protocolGenerationDate}, userId, establishment[0])

    res.status(200).json(sendMail)
  }

}
export default new SendMailController()
