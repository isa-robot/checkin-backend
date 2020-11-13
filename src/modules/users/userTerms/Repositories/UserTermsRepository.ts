import {getRepository, Repository} from "typeorm";
import User from "@users/infra/typeorm/entities/User";
import UserTerms from "@users/userTerms/Entities/UserTerms";
import IUserTermsRepository from "@users/userTerms/Interfaces/Repositories/IUserTermsRepository";
import IUserTerms from "@users/userTerms/Interfaces/UserTerms/IUserTerms";

export default class UserTermsRepository implements IUserTermsRepository{

  private ormRepository: Repository<UserTerms>;

  constructor() {
    this.ormRepository = getRepository(UserTerms);
  }

  public async create(data: IUserTerms): Promise<UserTerms> {
    const userTerms = this.ormRepository.create(data)

    await this.ormRepository.save(userTerms)

    return userTerms
  }

  public async index(): Promise<UserTerms[]> {
    const userTerms = this.ormRepository.find()

    return userTerms
  }

  public async byUserId(userId:string): Promise<UserTerms | undefined> {
    const userTerms = this.ormRepository.findOne({where: {"userId": userId}, order:{created_at: -1} })

    return userTerms;
  }

}
