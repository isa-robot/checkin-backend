import { Column, Entity, Unique} from "typeorm";
import CustomBaseEntity from "@shared/BaseClasses/entity/CustomBaseEntity";
import IResponsible from "@users/responsible/interfaces/IResponsible";

@Entity("minor_responsible")
export default class Responsible extends CustomBaseEntity implements IResponsible {

  @Column({ name: "user_id" })
  @Unique(["user_id"])
  userId: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  name: string;

  @Column()
  rg: string;
}
