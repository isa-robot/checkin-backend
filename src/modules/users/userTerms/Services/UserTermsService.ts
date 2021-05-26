import {inject, injectable} from "tsyringe";
import IUserTerms from "@users/userTerms/Interfaces/UserTerms/IUserTerms";
import IUserTermsRepository from "@users/userTerms/Interfaces/Repositories/IUserTermsRepository";
import UserTerms from "../Entities/UserTerms";

@injectable()
class UserTermsService {

  constructor(
    @inject("UserTermsRepository")
    private userTermsRepository: IUserTermsRepository
  ) { }

  public async create(data: IUserTerms, userId: string): Promise<UserTerms> {
    data.canUseTheSystem = data.personalKidDataTerm && data.responsabilityTerm;
    data.userId = userId

    const userTerms = await this.userTermsRepository.create(data)
    return userTerms
  }

  public async index(): Promise<UserTerms[]> {
    const userTerms = await this.userTermsRepository.index()
    return userTerms
  }

  public async byUserId(userId: string): Promise<UserTerms | undefined> {
    const userTerms = await this.userTermsRepository.byUserId(userId)
    return userTerms;
  }

}

export default UserTermsService
