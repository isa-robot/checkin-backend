import IUserTerms from "@users/userTerms/Interfaces/UserTerms/IUserTerms";
import UserTerms from '@users/userTerms/Entities/UserTerms'

export default interface IUserTermsRepository {
  create(data: IUserTerms): Promise<UserTerms>;
  index(): Promise<UserTerms[]>;
  byUserId(userId: string): Promise<UserTerms | undefined>;
}
