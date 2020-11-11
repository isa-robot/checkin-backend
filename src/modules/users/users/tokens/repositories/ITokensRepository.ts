import Token from "../infra/typeorm/entities/Token";

export default interface ITokensRepository {
  generate(userId: string): Promise<Token>;
  findByToken(token: string): Promise<Token | undefined>;
}
