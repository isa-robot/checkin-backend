import { getRepository, Repository, Not } from "typeorm";
import MailerDestinataries from "@shared/container/providers/MailsProvider/infra/typeorm/entities/MailerDestinataries";
import IMailerDestinatariesDTO from "@shared/container/providers/MailsProvider/dtos/IMailerDestinatariesDTO";
import IMailerDestinatariesRepository from "@shared/container/providers/MailsProvider/repositories/IMailerDestinatariesRepository";

class MailerDestinatariesRepository implements IMailerDestinatariesRepository {

  private ormRepository: Repository<MailerDestinataries>

  constructor() {
    this.ormRepository = getRepository(MailerDestinataries);
  }

  public async create(mailerDestinatary: IMailerDestinatariesDTO): Promise<MailerDestinataries> {
    const mailerDestinataries = this.ormRepository.create(mailerDestinatary);

    await this.ormRepository.save(mailerDestinataries);

    return mailerDestinataries;
  }

  public async findDestinataries(): Promise<MailerDestinataries[]> {
    const destinataries = this.ormRepository.find()

    return destinataries;
  }

  public async findDestinatariesById(id:string): Promise<MailerDestinataries | undefined>{
    const destinatary = this.ormRepository.findOne({where: {id}})
    return destinatary
  }

  public async findDestinatariesByType(type: string): Promise<MailerDestinataries[]> {
    const destinataries = this.ormRepository.find({ destinatary_type: type })

    return destinataries;
  }

  public async findDestinatariesByTypeByAddress(type: string, address: string): Promise<MailerDestinataries | undefined> {
    const destinatarie = this.ormRepository.findOne({ where: { destinatary_type: type, address: address }})

    return destinatarie;
  }

  public async save(mailerDestinataries: MailerDestinataries): Promise<MailerDestinataries> {
    return await this.ormRepository.save(mailerDestinataries);
  }

  public async remove(mailerDestinataries: MailerDestinataries[]): Promise<MailerDestinataries[]>{
    return await this.ormRepository.remove(mailerDestinataries)
  }

  public async removeOne(mailerDestinataries: MailerDestinataries): Promise<MailerDestinataries>{
    return await this.ormRepository.remove(mailerDestinataries)
  }

}

export default MailerDestinatariesRepository;
