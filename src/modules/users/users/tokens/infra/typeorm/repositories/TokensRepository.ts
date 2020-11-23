import { getRepository, Repository } from "typeorm";
import Token from "../entities/Token";
import { uuid } from 'uuidv4'
import ITokensRepository from "@users/users/tokens/repositories/ITokensRepository";

class TokensRepository implements ITokensRepository {
  private ormRepository: Repository<Token>;

  constructor() {
    this.ormRepository = getRepository(Token);
  }

  public async generate(userId: string): Promise<Token> {
    const token = this.ormRepository.create({ userId, token: uuid() });

    await this.ormRepository.save(token);

    return token;
  }

  public async findByToken(token: string): Promise<Token | undefined> {
    const userToken = await this.ormRepository.findOne({ where: { token }, relations: ['user'] });
    return userToken;
  }
}

export default TokensRepository;
