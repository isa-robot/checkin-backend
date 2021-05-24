import { Column, Entity } from "typeorm";
import CustomBaseEntity from "@shared/BaseClasses/entity/CustomBaseEntity";

@Entity("document_signer")
export default class DocumentSignerEntity extends CustomBaseEntity {

  @Column({name: "request_signature_key"})
  requestSignatureKey?: string;

  @Column({ name: "user_id" })
  userId: string;
}
