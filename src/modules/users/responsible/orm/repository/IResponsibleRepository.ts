import IResponsible from "@users/responsible/interfaces/IResponsible";

export default interface IResponsibleRepository {
  create(responsible: IResponsible): Promise<IResponsible>;
  findUserResponsible(userId: string): Promise<IResponsible>;
}
