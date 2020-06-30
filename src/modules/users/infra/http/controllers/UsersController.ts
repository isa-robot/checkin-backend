import { Response, Request } from "express";
import { container } from "tsyringe";

import CreateUserService from "@modules/users/services/CreateUserService";
import ListUserService from "@modules/users/services/ListUserService";
import ShowUserService from "@modules/users/services/ShowUserService";
import UpdateUserService from "@users/services/UpdateUserService";

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUserService = container.resolve(ListUserService);

    const user = await listUserService.execute();

    return response.status(200).json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute(id);

    return response.status(200).json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      username,
      password,
      roleId,
      establishment,
      confirm_password,
      email,
      phone,
      cpf,
    } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      username,
      password,
      roleId,
      establishments: [establishment],
      confirm_password,
      email,
      phone,
      cpf,
    });

    delete user.password;

    return response.status(201).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      username,
      email,
      phone,
      cpf,
    } = request.body;

    // @ts-ignore
    const user = request.user;

    const updateUserService = container.resolve(UpdateUserService);

    const userUpdated = await updateUserService.execute({
      name,
      username,
      email,
      phone,
      cpf,
      user
    });

    return response.status(200).json(userUpdated);
  }
}

export default new UsersController();
