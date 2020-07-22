import { inject, injectable } from 'tsyringe';
import MailerDestinataries from "@shared/container/providers/MailsProvider/infra/typeorm/entities/MailerDestinataries";
import IMailerDestinatariesRepository
  from "@shared/container/providers/MailsProvider/repositories/IMailerDestinatariesRepository";

@injectable()
class ListDestinatariesService {

  constructor(
    @inject('MailerDestinatariesRepository')
    private mailerDestinatariesRepository: IMailerDestinatariesRepository,
  ) { }

  public async execute(): Promise<MailerDestinataries[]> {
    const mailerDestinataries = await this.mailerDestinatariesRepository.findDestinataries();
    return mailerDestinataries
  }
}

export default ListDestinatariesService;
