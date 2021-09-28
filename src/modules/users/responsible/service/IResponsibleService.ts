import IResponsible from "@users/responsible/interfaces/IResponsible";

export default interface IResponsibleService {
  create(responsible: IResponsible, userId: string): Promise<IResponsible>;
  findUserResponsible(userId: string): Promise<IResponsible>;
}
