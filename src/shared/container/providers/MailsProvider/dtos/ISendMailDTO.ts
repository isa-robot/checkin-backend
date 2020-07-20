import IParseMailTemplateDTO from '@shared/container/providers/MailsProvider/dtos/IParseMailTemplateDTO';
interface IContactMail {
  name: string;
  address: string;
}

export default interface ISendMailDTO {
  from?: IContactMail;
  to: IContactMail;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
