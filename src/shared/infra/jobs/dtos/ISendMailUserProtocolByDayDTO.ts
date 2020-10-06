interface IContactMail {
  name: string;
  address: string;
}

export default interface ISendMailUserProtocolByDayDTO {
  to: IContactMail;
  from: IContactMail;
  data: {
    name: string;
    frontendUrl: string;
  };
}
