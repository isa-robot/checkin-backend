import IMailerDestinatariesDTO from "@shared/container/providers/MailsProvider/dtos/IMailerDestinatariesDTO";
import MailerDestinataries from "@shared/container/providers/MailsProvider/infra/typeorm/entities/MailerDestinataries";

export default interface IMailerDestinatariesRepository{
  create(mailerDestinatary: IMailerDestinatariesDTO): Promise<MailerDestinataries>
  findDestinataries(): Promise<MailerDestinataries[]>;
  findDestinatariesById(id:string): Promise<MailerDestinataries | undefined>;
  findDestinatariesByType(type: string): Promise<MailerDestinataries|undefined>
  save(mailerDestinatary: MailerDestinataries): Promise<MailerDestinataries>;
  remove(mailerEtherea: MailerDestinataries[]): Promise<MailerDestinataries[]>
  removeOne(mailerEtherea: MailerDestinataries): Promise<MailerDestinataries>
}
