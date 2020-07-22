import mailerConfigDTO from "@shared/container/providers/MailsProvider/dtos/mailerConfigDTO";

export default interface IMailerDestinatariesDTO extends mailerConfigDTO{
  destinatary_type: string
}
