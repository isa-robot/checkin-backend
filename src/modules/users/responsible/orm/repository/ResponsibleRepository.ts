import {getRepository} from "typeorm";
import IResponsibleRepository from "@users/responsible/orm/repository/IResponsibleRepository";
import IResponsible from "@users/responsible/interfaces/IResponsible";
import Responsible from "@users/responsible/orm/entities/Responsible";
import AppError from "@errors/AppError";

export default class ResponsibleRepository implements IResponsibleRepository {
  repository: any;

  constructor() {
    this.repository = getRepository(Responsible);
  }

  async create(responsible: IResponsible): Promise<IResponsible> {
    try {
      return await this.repository.insert(responsible);
    } catch (e) {
      throw new AppError(e?.detail, Number(e?.code));
    }
  }

}
