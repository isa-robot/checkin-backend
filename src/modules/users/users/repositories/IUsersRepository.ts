import User from "@users/users/infra/typeorm/entities/User";
import ICreateUserDTO from "@users/users/dtos/ICreateUserDTO";

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByCPF(id: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByRole(roleId: string): Promise<User[]>;
  save(user: User): Promise<User>;
  findAll(): Promise<User[]>;
}
