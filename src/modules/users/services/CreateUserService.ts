import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@errors/AppError";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IRolesRepository from "@security/roles/repositories/IRolesRepository";
import IEstablishmentsRepository from "@establishments/repositories/IEstablishmentsRepository";
import Role from "@security/roles/infra/typeorm/entities/Role";

interface Request {
  name: string;
  username: string;
  password: string;
  roleId: string;
  establishments: string[];
  confirm_password: string;
  cpf: string;
  phone: string;
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,
    @inject("EstablishmentsRepository")
    private establishmentsRepository: IEstablishmentsRepository
  ) { }

  public async execute({
    name,
    username,
    password,
    roleId,
    establishments,
    confirm_password,
    cpf,
    phone,
    email,
  }: Request): Promise<User> {
    let role: Role | undefined;
    try {
      role = await this.rolesRepository.findById(roleId);
      if (!role) {
        throw new AppError("Chave de usuário não encontrado", 404);
      }
    } catch {
      throw new AppError("Chave de usuário inválida", 400);
    }

    const checkUsernameExists = await this.usersRepository.findByUsername(
      username
    );

    if (checkUsernameExists) {
      throw new AppError("Username já utilizado", 400);
    }

    const checkCPFExists = await this.usersRepository.findByCPF(cpf);

    if (checkCPFExists) {
      throw new AppError("CPF já utilizado", 400);
    }

    const checkEmailExist = await this.usersRepository.findByEmail(email);

    if (checkEmailExist) {
      throw new AppError("E-mail já utilizado", 400);
    }

    // const allEstablishments = await Promise.all(
    //   establishments.map(async (establishmentsId) => {
    //     try {
    //       const establishment = await this.establishmentsRepository.findById(
    //         establishmentsId
    //       );
    //
    //       if (!establishment) {
    //         throw new AppError("Chave da instituição não encontrada", 404);
    //       }
    //       return establishment;
    //     } catch {
    //       throw new AppError("Chave da instituição inválida", 400);
    //     }
    //   })
    // );

    if (password !== confirm_password) {
      throw new AppError("Senhas diferentes", 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      password: hashedPassword,
      username,
      //@ts-ignore
      role,
      cpf,
      email,
      phone,
    });

    return user;
  }
}

export default CreateUserService;
