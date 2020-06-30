import { inject, injectable } from "tsyringe";

import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@errors/AppError";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IQueueProvider from "@shared/container/providers/QueueProvider/models/IQueueProvider";
import ITokensRepository from "../repositories/ITokensRepository";

interface Request {
  email: string;
}

@injectable()
class SendMailForgotPasswordService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("TokensRepository")
    private tokensRepository: ITokensRepository,
    @inject("QueueProvider")
    private queueProvider: IQueueProvider,
  ) { }

  public async execute({ email }: Request): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404)
    }

    const token = await this.tokensRepository.generate(user.id)

    this.queueProvider.runJob("SendMailForgotPassword", {
      to: {
        name: user.name,
        address: user.email
      },
      from: { name: "Qualis", address: "suporte@portalqualis.com.br" },
      data: {
        name: user.name,
        url: `${process.env.FRONT_URL}/trocar-senha?token=${token.token}`

      }
    })
  }
}

export default SendMailForgotPasswordService;
