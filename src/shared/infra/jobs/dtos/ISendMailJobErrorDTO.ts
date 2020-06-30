
interface IContactMail {
  name: string;
  address: string;
}

export default interface ISendMailJobErrorDTO {
  to: IContactMail;
  from: IContactMail;
  data: any;
}
