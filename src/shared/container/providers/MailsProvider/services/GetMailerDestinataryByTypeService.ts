import { inject, injectable } from 'tsyringe';
import MailerDestinataries from "@shared/container/providers/MailsProvider/infra/typeorm/entities/MailerDestinataries";
import IMailerDestinatariesRepository
  from "@shared/container/providers/MailsProvider/repositories/IMailerDestinatariesRepository";

interface Request {
  type: string
}

@injectable()
class GetMailerDestinataryByTypeService {

  constructor(
    @inject('MailerDestinatariesRepository')
    private mailerDestinatariesRepository: IMailerDestinatariesRepository,
  ) { }

  public async execute({
                         type
                       }:Request): Promise<MailerDestinataries|any> {
    const mailerDestinataries = await this.mailerDestinatariesRepository.findDestinatariesByType(type);
    return mailerDestinataries
  }
}

export default GetMailerDestinataryByTypeService;
