import 'reflect-metadata'
import {delay, inject, injectable} from "tsyringe";
import IResponsibleService from "@users/responsible/service/IResponsibleService";
import ResponsibleRepository from "@users/responsible/orm/repository/ResponsibleRepository";
import IResponsibleRepository from "@users/responsible/orm/repository/IResponsibleRepository";
import IResponsible from "@users/responsible/interfaces/IResponsible";
import AppError from "@errors/AppError";

@injectable()
export default class ResponsibleService implements IResponsibleService {

  constructor(
    @inject(delay(ResponsibleRepository))
    private responsibleRepository: IResponsibleRepository,
  ) {
  }

  async create(responsible: IResponsible, userId: string): Promise<IResponsible> {
    responsible.userId = userId;
    return this.responsibleRepository.create(responsible);
  }
}
