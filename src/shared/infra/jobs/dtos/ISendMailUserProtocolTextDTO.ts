import User from "@users/infra/typeorm/entities/User";

interface IContactMail {
  name: string;
  address: string;
}

export default interface ISendMailUserProtocolTextDTO {
  to: IContactMail;
  from: IContactMail;
  data: {
    name: string;
    protocol?: {
      name?: "string",
      generationDate?: "string"
    };
    attended: User;
    mailBodyText: string
    establishment: string;
    responsible?: User[];
  };
}
