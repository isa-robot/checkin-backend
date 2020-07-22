
import { inject, injectable } from "tsyringe";

import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@errors/AppError";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

interface Request {
  name: string;
  username: string;
  cpf: string;
  phone: string;
  email: string;
  user: User;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  public async execute({
    name,
    username,
    cpf,
    phone,
    email,
    user
  }: Request): Promise<User> {


    if (user.username !== username) {
      const checkUsernameExists = await this.usersRepository.findByUsername(
        username
      );

      if (checkUsernameExists) {
        throw new AppError("Username já utilizado", 400);
      }

      user.username = username;
    }

    if (user.cpf !== cpf) {
      const checkCPFExists = await this.usersRepository.findByCPF(cpf);

      if (checkCPFExists) {
        throw new AppError("CPF já utilizado", 400);
      }

      user.cpf = cpf;
    }

    if (user.email !== email) {
      const checkEmailExist = await this.usersRepository.findByEmail(email);

      if (checkEmailExist) {
        throw new AppError("E-mail já utilizado", 400);
      }

      user.email = email;
    }

    user.name = name;
    user.phone = phone;

    const userUpdated = await this.usersRepository.save(user);

    return userUpdated;
  }
}

export default UpdateUserService;
