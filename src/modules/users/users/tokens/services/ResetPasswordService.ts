import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError from "@errors/AppError";
import IUsersRepository from "@users/users/repositories/IUsersRepository";
import ITokensRepository from "../repositories/ITokensRepository";
import { addHours, isAfter } from 'date-fns'

interface Request {
  token: string;
  password: string;
  confirm_password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("TokensRepository")
    private tokensRepository: ITokensRepository,
  ) { }

  public async execute({ token, password, confirm_password }: Request): Promise<void> {

    const userToken = await this.tokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("Token não encontrado", 404)
    }

    const compareDate = addHours(userToken.created_at, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expirado", 401)
    }

    const user = userToken.user;

    if (password !== confirm_password) {
      throw new AppError("Senhas diferentes", 400);
    }

    const hashedPassword = await hash(password, 8);

    user.password = hashedPassword;

    await this.usersRepository.save(user)

  }
}

export default ResetPasswordService;
